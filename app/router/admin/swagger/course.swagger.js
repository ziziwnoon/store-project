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
 *          Edit-Course:
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
 *  definitions:
 *       getListOfCourses:
 *           type: array
 *           items:
 *               type: object
 *               properties:
 *                   statusCode:
 *                       type: integer
 *                       example: 200
 *               data:
 *                   type: object
 *                   propertise:
 *                       courses: 
 *                           _id:
 *                               type: string
 *                               example: 56464645
 *                           title:
 *                               type: string
 *                               example: 56464645
 *                           short_text:
 *                               type: string
 *                               example: 56464645
 *                           text:
 *                               type: string
 *                               example: 56464645
 *                           tags:
 *                               type: array
 *                               example: 56464645
 *                           category:
 *                               type: string
 *                               example: 56464645
 *                           price:
 *                               type: string
 *                               example: 56464645
 *                           discount:
 *                               type: string
 *                               example: 56464645
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
 *                  content:
 *                      application/json:
 *                          schema: 
 *                           $ref: '#/definitions/getListOfCourses'
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
 *                  content:
 *                      application/json: 
 *                          schema: 
 *                           $ref: '#/definitions/publicDefinition'
 * 
 */

/**
 * @swagger
 *  /admin/course/add-course:
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
 *                  content:
 *                     application/json:
 *                         schema: 
 *                          $ref: '#/definitions/publicDefinition'
 */


/**
 * @swagger
 *  /admin/course/edit-course/{id}:
 *      patch:
 *          tags: [Course(AdminPanel)]
 *          summary: edit course
 *          description: edit course
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Course'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                     application/json:
 *                         schema: 
 *                          $ref: '#/definitions/publicDefinition'
 */

