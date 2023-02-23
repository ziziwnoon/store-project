/**
 * @swagger
 *  definitions:
 *       getListOfPermissions:
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
 *                       permissions: 
 *                           _id:
 *                               type: string
 *                               example: 56464645
 *                           title:
 *                               type: string
 *                               example: 56464645
 *                           description:
 *                               type: string
 *                               example: 56464645
 *                                      
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Add-Permission:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title for adding a new category 
 *                  description:
 *                      type: string
 *                      description: the description for adding a new category 
 *          Edit-Permission:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title for adding a new category 
 *                  description:
 *                      type: string
 *                      description: the description for adding a new category 
 */

/**
 * @swagger
 *  /admin/permission/add:
 *      post:
 *          tags: [RBAC(AdminPanel)]
 *          summary: add permission
 *          description: add permission
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Add-Permission'
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Add-Permission'
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
 *  /admin/permission/edit/{id}:
 *      post:
 *          tags: [RBAC(AdminPanel)]
 *          summary: edit permission
 *          description: edit permission
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
 *                          $ref: '#/components/schemas/Edit-Permission'
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Permission'
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
 *  /admin/permission/remove/{id}:
 *      delete:
 *          tags: [RBAC(AdminPanel)]
 *          summary: remove permission
 *          description: edit permission
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
 *  /admin/permission/list:
 *      get:
 *          tags: [RBAC(AdminPanel)]
 *          summary: get permissions
 *          description: get all permissions
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                           $ref: '#/definitions/getListOfPermissions'
 * 
 */
