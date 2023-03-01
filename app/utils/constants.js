module.exports = {
        EXPIRES_IN : new Date().getTime()+120000 ,
        ROLE : {
                USER : "USER" ,
                ADMIN : "ADMIN",
                WRITER : "WRITER",
                SUPPLIER : "SUPPLIER",
                TEACHER : "TEACHER"
        },
        PERMISSION : {
                USER : ["profile"] ,
                ADMIN : ["all"],
                SUPERADMIN : ["all"] ,
                CONTENT_MANAGER : ["course" , "blog" , "product" , "category"],
                SUPPLIER : ["product"],
                TEACHER : ["course" , "blog"],
                ALL : "all"
        },
        ACCESS_TOKEN_SECTERT_KEY : "361756A1C755558F03685E39AC24497C17A7C330EADAD1693D66E777E49037D1",
        REFRESH_TOKEN_SECTERT_KEY : "17B60A6827349B2466FF953376A243AFD6694D4B932B29C607DF8A5FAEAD73C4",
        MongoIdPattern : /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
}