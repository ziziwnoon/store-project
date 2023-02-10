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
 *                           $ref: '#/definitions/getListOfCourses'
 * 
 */