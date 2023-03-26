const createHttpError = require("http-errors");
const { getBasketOfUser, invoiceNumberGenerator } = require("../../../utils/functions");
const {default : axios} = require("axios")
const Controller = require("../controller");
const { PaymentModel } = require("../../../models/payments");
const moment = require("moment-jalali");
const {StatusCodes : httpStatus} = require("http-status-codes");
const { UserModel } = require("../../../models/users");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
class PaymentController extends Controller{
    async paymentGatewat(req, res, next){
        try {
            const user = req.user; //1
            if(user.basket.courses.length == 0 && user.basket.products.length == 0) throw new createHttpError.BadRequest("سبد خرید شما خالی است"); //1
            const basket = (await getBasketOfUser(user._id))?.[0]; //1
            if(!basket?.paymentDetail?.totalPayment) throw createHttpError.BadRequest("مشخصات پرداخت یافت نشد") //1
            const zarinpal_request_url = "https://api.zarinpal.com/pg/v4/payment/request.json"; //1
            const zarinpal_gateway_url = "https://www.zarinpal.com/pg/StartPay";
            const description = "انجام عمملیات پرداخت برای دوره ها و محصولات" , amount = basket?.paymentDetail?.totalPayment //1
            const zarinpal_options = { //1
                merchant_id : process.env.ZARINPAL_MECHANTID ,
                amount ,
                description ,
                metadata : {
                    email : user?.email || "example@domain.com" ,
                    mobile : user.mobile
                },
                callback_url : "http://localhost:5000/verify"
            }
            const requestResult = await axios.post(zarinpal_request_url , zarinpal_options).then(result => result.data) //1
            const {code , authority} = requestResult.data; //2
            await PaymentModel.create({ //2
                invoiceNumber : invoiceNumberGenerator(),
                paymentDate : moment().format("jYYYYjMMjDDHHmmssSSS") ,
                authority ,
                verify : false ,
                description,
                amount ,
                basket,
                user : user._id
            })
            if(code == 100 && authority){ //2
                return res.status(httpStatus.OK).json({ //2
                    statusCode : httpStatus.OK,
                    data : {
                        code ,
                        gatewayURL : `${zarinpal_gateway_url}/${authority}`
                    }
                })
            }
            throw createHttpError.BadRequest("پارامتر های ارسال شده صحیح نمیباشد") //2
        } catch (error) {
            next(error)
        }
    }

    async verifyPayment(req, res, next){
        try {
            const {Authority : authority} = req.query;
            const verify_URL = "https://api.zarinpal.com/pg/v4/payment/verify.json";
            const payment = await PaymentModel.findOne({authority});
            if(!payment) throw createHttpError.BadRequest("اطلاعاتی برای تراکنش موردنظر یافت نشد")
            if(payment.verify) throw createHttpError.BadRequest("این تراکنش قبلا انجام شده است")

            const verifyBody = JSON.stringify({
                authority,
                amount : payment.amount,
                merchant_id : process.env.ZARINPAL_MECHANTID
            })
            //نصب node-fetch برای ارسال اطلاعات
            const verifyResult = await fetch(verify_URL , {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : verifyBody
            }).then(result => result.json())

            if(verifyResult.data.code == 100){
                await PaymentModel.updateOne({authority} , {
                    $set : {
                        verify : true ,
                        refID : verifyResult.data.ref_id ,
                        cardHash : verifyResult.data.card_hash
                    }
                })
                const boughtCourses = payment?.basket?.paymentDetail?.courseIDs
                const boughtProducts = payment?.basket?.paymentDetail?.productIDs 
                const user = await UserModel.findById(payment.user)
                //اضافه کردن دوره ها و محصولات به حساب کاربر و حذف آن از سبد خرید
                await UserModel.updateOne({_id : payment.user} , {
                    $set : {
                        products : [...boughtProducts || [] , ...user.products] ,
                        courses : [... boughtCourses || [] , ...user.courses] ,
                        basket : {
                            courses : [] ,
                            products : []
                        }
                    }
                })
                return res.status(httpStatus.OK).json({
                    statusCode : httpStatus.OK,
                    data : {
                        message : "پرداخت با موفقیت انجام شد"
                    }
                })
            }
            
            throw createHttpError.BadRequest("تراکنش موفقیت آمیز نبود، در صورت کسر مبلغ از کارت شما طی 72 ساعت به حساب شما بازمیگردد")
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    PaymentController : new PaymentController()
}