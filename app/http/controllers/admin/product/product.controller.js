const { ProductModel } = require("../../../../models/products");
const { deleteFileInPublic, listOfImagesFromRequest, setFeatures, copyObject, deleteInvalidPropertiesInObject } = require("../../../../utils/functions");
const { addProductSchema } = require("../../../validators/admin/product.schema");
const Controller = require("../../controller");
const path = require("path");
const { ObjectIdValidator } = require("../../../validators/public.validator");
const createHttpError = require("http-errors");
const statusCode = require("http-status-codes");
const ProductBlackList = {
    SUPPLIER : "supplier" ,
    COMMENTS : "comments" ,
    LIKES : "likes" , 
    DISLIKES : "dislikes" , 
    BOOKMARK : "bookmark" , 
    COLORS : "colors" , 
    HEIGHT : "height" , 
    WEIGHT : "weight" , 
    WIDTH : "width" , 
    LENGTH : "length"
}
Object.freeze(ProductBlackList);

class ProductController extends Controller{
    async addProduct(req,res,next){
        try {
            const result = await addProductSchema.validateAsync(req.body);
            const images = listOfImagesFromRequest(req?.files || [] , req.body.fileUploadPath)
            const {title , text , short_text , category , tags , price , discount , count  } = result;
            const supplier = req.user._id;
            let features = setFeatures(req.body);
           
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
            const {id} = req.params;
            const product = this.findProductById(id)
            const data = copyObject(req.body);
            data.images = listOfImagesFromRequest(req?.files || [] , req.body.fileUploadPath);
            data.features = setFeatures(req.body);
            const blackListFields = [...Object.values(ProductBlackList)]
            deleteInvalidPropertiesInObject(data , blackListFields);
            const productUpdateResult = await ProductModel.updateOne({_id : product._id} , {$set : data})
            if(productUpdateResult.modifiedCount < 0) throw{status : statusCode.INTERNAL_SERVER_ERROR , message : "خطای سرور"}
            res.status(statusCode.OK).json({
                data : {
                    statusCode : statusCode.OK,
                    message : "بروزرسانی محصول با موفقیت انجام شد"
                }
            });
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
            const search = req?.query?.search || "";
            let products
            if(search){
                products = await ProductModel.find({
                $text : {
                    $search : new RegExp(search , "ig")
                }
                }); 
            } else {
                products = await ProductModel.find({})
            }
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