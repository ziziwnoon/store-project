/**
 * @swagger
 *  components:
 *      schemas:
 *          Add-Episode:
 *              type: object
 *              required:
 *                  -   courseID
 *                  -   chapterID
 *                  -   title
 *                  -   text
 *                  -   type
 *                  -   video
 *              properties:
 *                 courseID:
 *                     type: string
 *                     description: courseID of episode
 *                 chapterID:
 *                     type: string
 *                     description: chapterID of episode
 *                 title:
 *                     type: string
 *                     description: title of episode
 *                 text:
 *                     type: string
 *                     description: text of episode
 *                 type:
 *                     type: string
 *                     description: type of episode
 *                     enum:
 *                          -   lock
 *                          -   unlock
 *                 video:
 *                     type: string
 *                     description: time of episode
 *                     format: binary
 *          Edit-Episode:
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
 *  /admin/episode/add:
 *      post:
 *          tags: [Episode(AdminPanel)]
 *          summary: add episode
 *          description: add episode
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Add-Episode'
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
 *  /admin/episode/remove/{episodeID}:
 *      delete:
 *          tags: [Episode(AdminPanel)]
 *          summary: remove episode
 *          description: remove episode
 *          parameters:
 *              -   in: path
 *                  name: episodeID
 *                  type: string
 *                  required: true
 *          responses:
 *              201:
 *                  description: success
 *                  content:
 *                     application/json:
 *                         schema: 
 *                          $ref: '#/definitions/publicDefinition'
 */
