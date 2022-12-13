/**
 * @swagger
 *  components:
 *      schemas:
 *          Blog:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   image
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of new blog
 *                  short_text:
 *                      type: string
 *                      description: the short_text of new blog
 *                  text:
 *                      type: string
 *                      description: the text of new blog
 *                  tags:
 *                      type: string
 *                      description: the tags of new blog(tag1#tag2_example)
 *                  category:
 *                      type: string
 *                      description: the category of new blog
 *                  image:
 *                      type: file
 *                      description: the image of new blog
 */

/**
 * @swagger
 *  /admin/blog/add:
 *      post:
 *          summary: add blog
 *          tags: [Blog(AdminPanel)]
 *          description: add blog
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/Blog"
 * 
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/blog/update/{id}:
 *      patch:
 *          summary: update blog
 *          tags: [Blog(AdminPanel)]
 *          description: update blog by id
 *          parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/Blog"
 * 
 *          responses:
 *              200:
 *                  description: success
 */



/**
 * @swagger
 *  /admin/blog/list:
 *      get:
 *          summary: get list of blogs
 *          tags: [Blog(AdminPanel)]
 *          description: get blogs
 *          responses:
 *              200:
 *                  description: success
 */



/**
 * @swagger
 *  /admin/blog/delete/{id}:
 *      delete:
 *          summary: delete blog by id
 *          tags: [Blog(AdminPanel)]
 *          description: delete blog by id
 *          parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: success
 *              400:
 *                  description: failiure
 */


/**
 * @swagger
 *  /admin/blog/{id}:
 *      get:
 *          summary: get blog by id
 *          tags: [Blog(AdminPanel)]
 *          description: get blog by id
 *          parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: success
 */
