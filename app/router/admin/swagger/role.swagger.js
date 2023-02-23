/**
 * @swagger
 *  components:
 *      schemas:
 *          Permissions:
 *              type: string
 *              enum:
 *                  -   blog
 *                  -   course
 *                  -   product
 */

/**
 * @swagger
 *  definitions:
 *       getListOfRoles:
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
 *                       roles: 
 *                           _id:
 *                               type: string
 *                               example: 56464645
 *                           title:
 *                               type: string
 *                               example: 56464645
 *                           permissions:
 *                               type: array
 *                               items: 
 *                                  type: object
 *                                  properties:
 *                                      _id:
 *                                          type: string
 *                                          example: 56464645
 *                                      title:
 *                                          type: string
 *                                          example: title of permission
 *                                      description:
 *                                          type: string
 *                                          example: desc of permission
 *                                      
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Add-Role:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title for adding a new category 
 *                  permissions:
 *                      $ref: '#/components/schemas/Permissions'
 *          Edit-Role:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title for adding a new category 
 *                  permissions:
 *                      $ref: '#/components/schemas/Permissions'
 */

/**
 * @swagger
 *  /admin/role/add:
 *      post:
 *          tags: [RBAC(AdminPanel)]
 *          summary: add role
 *          description: add role
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Add-Role'
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Add-Role'
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
 *  /admin/role/edit/{id}:
 *      post:
 *          tags: [RBAC(AdminPanel)]
 *          summary: edit role
 *          description: edit role
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
 *                          $ref: '#/components/schemas/Edit-Role'
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Role'
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
 *  /admin/role/remove/{id}:
 *      delete:
 *          tags: [RBAC(AdminPanel)]
 *          summary: remove role
 *          description: edit role
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
 *  /admin/role/list:
 *      get:
 *          tags: [RBAC(AdminPanel)]
 *          summary: get roles
 *          description: get all roles
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                           $ref: '#/definitions/getListOfRoles'
 * 
 */
