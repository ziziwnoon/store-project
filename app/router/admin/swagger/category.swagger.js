/**
 * @swagger
 *  components:
 *      schemas:
 *          Category:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title for adding a new category 
 *                  parent:
 *                      type: string
 *                      description: the parent of category 
 */


/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          summary: add category
 *          tags: [Category(AdminPanel)]
 *          description: add category
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/Category"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Category"
 * 
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          summary: get all parents
 *          tags: [Category(AdminPanel)]
 *          description: get all parents
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *          summary: get children of parents
 *          tags: [Category(AdminPanel)]
 *          description: get children of parents
 *          parameters:
 *             -   in: path
 *                 name: parent
 *                 required: true
 *                 type: string
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          summary: get all categories
 *          tags: [Category(AdminPanel)]
 *          description: get all categories
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/category/delete/{id}:
 *      delete:
 *          summary: delete category
 *          tags: [Category(AdminPanel)]
 *          description: delete category
 *          parameters:
 *            -   in: path
 *                name: id
 *                required: true
 *                type: string
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/category/list-of-all:
 *      get:
 *          summary: get All Categories Without Populate
 *          tags: [Category(AdminPanel)]
 *          description: get All Categories Without Populate
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/category/{id}:
 *      get:
 *          summary: get category by Id
 *          tags: [Category(AdminPanel)]
 *          description: get category by Id
 *          parameters:
 *            -   in: path
 *                name: id
 *                required: true
 *                type: string
 *          responses:
 *              200:
 *                  description: success
 */

 /**
 * @swagger
 *  /admin/category/update/{id}:
 *      patch:
 *          summary: update category title by Id
 *          tags: [Category(AdminPanel)]
 *          description: update category title by Id
 *          parameters:
 *             -   in: path
 *                 name: parent
 *                 required: true
 *                 type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/Category"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Category"
 *          responses:
 *              200:
 *                  description: success
 */