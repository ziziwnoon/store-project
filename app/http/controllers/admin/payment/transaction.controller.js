const { PaymentModel } = require("../../../../models/payments");
const {StatusCodes : httpStatus} = require("http-status-codes");
const Controller = require("../../controller");

class TransactionController extends Controller{
    async getLisOfTransactions(req, res, next){
        try {
            const transactions = await PaymentModel.find({},{basket : 0}).sort({_id : -1})
            return res.status(httpStatus.OK).json({
                statusCode : httpStatus.OK ,
                data : {
                    transactions
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    TransactionController : new TransactionController()
}