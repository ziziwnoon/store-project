/**
 * @swagger
 *  definitions:
 *       listOfChaptersDefinition:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  propertis:
 *                      course:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                                  example: id
 *                              title:
 *                                  type: string
 *                                  example: title of chapter
 *                              text:
 *                                  type: string
 *                                  example: text of chapter
 */


/**
 * @swagger
 *  components:
 *      schemas:
 *          Add-Chapter:
 *              type: object
 *              required:
 *                  -   id
 *                  -   title
 *              properties:
 *                 id:
 *                     type: string
 *                     description: id of chapter
 *                 title:
 *                     type: string
 *                     description: title of chapter
 *                 text:
 *                     type: string
 *                     description: text of product
 *          Edit-Chapter:
 *              type: object
 *              properties:
 *                 title:
 *                     type: string
 *                     description: title of chapter
 *                 text:
 *                     type: string
 *                     description: text of product
 * 
 */



/**
 * @swagger
 *  /admin/chapter/add-chapter:
 *      put:
 *          tags: [Chapter(AdminPanel)]
 *          summary: add chapter
 *          description: add chapter
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Add-Chapter'
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Add-Chapter'
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
 *  /admin/chapter/list/{courseID}:
 *      get:
 *          tags: [Chapter(AdminPanel)]
 *          summary: list of chapters of course
 *          description: list of chapters of course
 *          parameters:
 *              -   in: path
 *                  name: courseID
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                     application/json:
 *                         schema: 
 *                          $ref: '#/definitions/listOfChaptersDefinition'
 */

/**
 * @swagger
 *  /admin/chapter/remove/{id}:
 *      patch:
 *          tags: [Chapter(AdminPanel)]
 *          summary: remove a chapter of course
 *          description: remove a chapter of course
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
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
 *  /admin/chapter/edit/{id}:
 *      patch:
 *          tags: [Chapter(AdminPanel)]
 *          summary: edit chapter
 *          description: edit chapter
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Chapter'
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Chapter'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                     application/json:
 *                         schema: 
 *                          $ref: '#/definitions/publicDefinition'
 */