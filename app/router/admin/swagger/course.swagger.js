/**
 * @swagger
 *  components:
 *      schemas:
 *          Types:
 *              type: string
 *              enum:
 *                  -   free
 *                  -   paid
 *                  -   VIP
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Add-Course:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   image
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
 *                      $ref: '#/components/schemas/Types'
 *                  price:
 *                      type: string
 *                      description: price of product
 *                  discount:
 *                      type: string
 *                      description: discount of product
 *                  image:
 *                      type: string
 *                      format: binary
 */




/**
 * @swagger
 *  /admin/course/list-of-all:
 *      get:
 *          tags: [Course(AdminPanel)]
 *          summary: get courses
 *          description: get all courses
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: Enter text to search 
 *          responses:
 *              200:
 *                  description: success
 * 
 */

/**
 * @swagger
 *  /admin/course/{id}:
 *      get:
 *          tags: [Course(AdminPanel)]
 *          summary: get course by Id
 *          description: get course by Id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: Enter id to search 
 *          responses:
 *              200:
 *                  description: success
 * 
 */

/**
 * @swagger
 *  /admin/course/add:
 *      post:
 *          tags: [Course(AdminPanel)]
 *          summary: add course
 *          description: add course
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Add-Course'
 *          responses:
 *              200:
 *                  description: success
 */