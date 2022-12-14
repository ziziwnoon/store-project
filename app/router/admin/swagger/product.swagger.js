/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   count
 *                  -   price
 *                  -   discount
 *                  -   images
 *                  -   type
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of product
 *                  short_text:
 *                      type: string
 *                      description: short_text of product
 *                  text:
 *                      type: string
 *                      description: text of product
 *                  tags:
 *                      type: array
 *                      description: tags of product
 *                  category:
 *                      type: string
 *                      description: category of product
 *                  type:
 *                      type: string
 *                      description: type of product
 *                  count:
 *                      type: string
 *                      description: count of product
 *                  price:
 *                      type: string
 *                      description: price of product
 *                  discount:
 *                      type: string
 *                      description: discount of product
 *                  colors:
 *                      type: array
 *                      description: color of product
 *                  height:
 *                      type: string
 *                      description: height of product
 *                  width:
 *                      type: string
 *                      description: width of product
 *                  weight:
 *                      type: string
 *                      description: weight of product
 *                  length:
 *                      type: string
 *                      description: length of product
 * 
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Edit-Product:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of product
 *                  short_text:
 *                      type: string
 *                      description: short_text of product
 *                  text:
 *                      type: string
 *                      description: text of product
 *                  tags:
 *                      type: array
 *                      description: tags of product
 *                  category:
 *                      type: string
 *                      description: category of product
 *                  type:
 *                      type: string
 *                      description: type of product
 *                  count:
 *                      type: string
 *                      description: count of product
 *                  price:
 *                      type: string
 *                      description: price of product
 *                  discount:
 *                      type: string
 *                      description: discount of product
 *                  colors:
 *                      type: array
 *                      description: color of product
 *                  height:
 *                      type: string
 *                      description: height of product
 *                  width:
 *                      type: string
 *                      description: width of product
 *                  weight:
 *                      type: string
 *                      description: weight of product
 *                  length:
 *                      type: string
 *                      description: length of product
 * 
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 */


/**
 * @swagger
 *  /admin/product/add:
 *      post:
 *          tags: [Product(AdminPanel)]
 *          summary: add product
 *          description: add product
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          responses:
 *              200:
 *                  description: success
 */


/**
 * @swagger
 *  /admin/product/edit/{id}:
 *      patch:
 *          tags: [Product(AdminPanel)]
 *          summary: add product
 *          description: add product
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Product'
 *          responses:
 *              200:
 *                  description: success
 */

/** 
 * @swagger
 *  /admin/product/list-of-all:
 *      get:
 *          tags: [Product(AdminPanel)]
 *          summary: get products
 *          description: get products
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: enter text to search in title , text , short text of products
 *          responses:
 *              200:
 *                  description: success
 */


/**
 * @swagger
 *  /admin/product/{id}:
 *      get:
 *          tags: [Product(AdminPanel)]
 *          summary: get product by id
 *          description: get product by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: ObjectId of product
 *          responses:
 *              200:
 *                  description: success
 */


/**
 * @swagger
 *  /admin/product/delete/{id}:
 *      delete:
 *          tags: [Product(AdminPanel)]
 *          summary: delete product by id
 *          description: delete product by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: ObjectId of product
 *          responses:
 *              200:
 *                  description: success
 */
