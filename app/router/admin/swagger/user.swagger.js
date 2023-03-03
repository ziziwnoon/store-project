/**
 * @swagger
 *  components:
 *      schemas:
 *          Edit-Profile:
 *              type: object
 *              properties:
 *                  first_name:
 *                      type: string
 *                      description: the first_name of user
 *                      example: Zeinab
 *                  last_name:
 *                      type: string
 *                      description: the last_name of user
 *                      example: Naderi
 *                  email:
 *                      type: string
 *                      description: the email of user
 *                      example: ziziwnoon@gmail.com
 *                  username:
 *                      type: string
 *                      example: ziziwnoon
 *                      description: the username of user
 *                      
 */
/**
 * @swagger
 *  definitions:
 *      ListOfUsers:
 *          type: object
 *          properties:
 *              statusCode: 
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      users:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "62822e4ff68cdded54aa928d"
 *                                  first_name:
 *                                      type: string
 *                                      example: "user first_name"
 *                                  last_name:
 *                                      type: string
 *                                      example: "user last_name"
 *                                  username:
 *                                      type: string
 *                                      example: "username"
 *                                  email:
 *                                      type: string
 *                                      example: "the_user_email@example.com"
 *                                  mobile:
 *                                      type: string
 *                                      example: "09332255768"
 */

/**
 * @swagger
 *  /admin/user/list:
 *      get:
 *          tags: [User(AdminPanel)]
 *          summary: get all users
 *          description: get all users
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: Enter first name, last name, email, username to search 
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                           $ref: '#/definitions/ListOfUsers'
 * 
 */
/**
 * @swagger
 *  /admin/user/profile:
 *      get:
 *          tags: [User(AdminPanel)]
 *          summary: get user profile
 *          description: get user information
 *          responses:
 *              200:
 *                  description: success
 * 
 */

/**
 * @swagger
 *  /admin/user/edit-profile:
 *      patch:
 *          tags: [User(AdminPanel)]
 *          summary: edit user info
 *          description: edit user info
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Profile'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Profile'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                     application/json:
 *                         schema: 
 *                          $ref: '#/definitions/publicDefinition'
 */