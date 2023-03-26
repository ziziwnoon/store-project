const { PaymentController } = require("../../http/controllers/api/payment.controller");
const { verifyAccesstoken } = require("../../http/middleweares/verifyAccessToken");

const router = require("express").Router();
router.post("/payment" , verifyAccesstoken , PaymentController.paymentGatewat)
router.get("/verify" , PaymentController.verifyPayment)
module.exports = {
    apiPaymentRoutes : router 
}


//----------- bank Melli - Shaparak - Saman - Iran Kish
//1) payment
//2) check Transaction
//3) verify Transaction

//----------- ZarinPal - DigiPay
//1) payment
//2) verify

