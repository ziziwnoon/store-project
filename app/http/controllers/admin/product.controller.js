const { ProductModel } = require("../../../models/products");
const { deleteFileInPublic, listOfImagesFromRequest } = require("../../../utils/functions");
const { addProductSchema } = require("../../validators/admin/product.schema");
const Controller = require("../controller");
const path = require("path");
const { ObjectIdValidator } = require("../../validators/public.validator");
const createHttpError = require("http-errors");
class ProductController extends Controller{
    async addProduct(req,res,next){
        try {
            console.log(req.body)
            const result = await addProductSchema.validateAsync(req.body);
            const images = listOfImagesFromRequest(req?.files || [] , req.body.fileUploadPath)
            const {title , text , short_text , category , tags , price , discount , count , width , height , weight , length ,colors } = result;
            const supplier = req.user._id;
            let features = {};
            features.colors = colors;
            let type = "physical";
            if (!isNaN(+width) || !isNaN(+weight) || !isNaN(+height) || !isNaN(+length)){
                if(!width) features.width = 0;
                else features.width = +width;
                if(!weight) features.weight = 0;
                else features.weight = +weight;
                if(!height) features.height = 0;
                else features.height = +height;
                if(!length) features.length = 0;
                features.length = +length;
            }
            else {
                type = "virtual"
            }
           
            const createProduct = await ProductModel.create({title , text , short_text , category , tags , price , discount , count , features , supplier , type , images })
            return res.status(statusCode.OK).json({
                data : {
                    statusCode : statusCode.OK ,
                    message : "محصول با موفقیت اضافه شد"
                }
            })
        } catch (error) {
            deleteFileInPublic(req.body.image)
            next(error)
        }
    }

    async editProduct(req,res,next){
        try {
            
        } catch (error) {
            next(error)
        }
    }

    async removeProduct(req,res,next){
        try {
            const {id} = req.params;
            const product = await this.findProductById(id);
            const deleteResult = await ProductModel.deleteOne({_id : product._id})
            if(deleteResult.deletedCount < 0) throw createHttpError.InternalServerError("محصول مورد نظر حذف نشد");
            return res.status(statusCode.OK).json({
                data:{
                    statusCode : statusCode.OK,
                    message: "محصول با موفقیت حذف شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async getAllProducts(req,res,next){
        try {
            const products = await ProductModel.find({});
            return res.json({
                data : {
                    statusCode : statusCode.OK ,
                    products
                }
            })
            
        } catch (error) {
            next(error)
        }
    }

    async getProductById(req,res,next){
        try {
            const {id} = req.params;
            const product = await this.findProductById(id);
            return res.status(statusCode.OK).json({
                data : {
                    statusCode : statusCode.OK,
                    product
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async findProductById(productID){
        const {id} = await ObjectIdValidator.validateAsync({id : productID});
        const product = await ProductModel.findOne({id});
        if(!product) throw createHttpError.NotFound("محصول مورد نظر یافت نشد");
        return product;
    }
}

module.exports = {
    ProductController : new ProductController()
}