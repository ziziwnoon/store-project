/**
 * @swagger
 *  components:
 *      schemas:
 *          GetOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: the user's mobile for sign up or sign in
 *          CheckOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: the user's mobile for sign up or sign in
 *                  code:
 *                      type: integer
 *                      description: the user's code for getting access token
 *          RefreshToken:
 *              type: object
 *              required:
 *                  -   refreshToken
 *              properties:
 *                  refreshToken:
 *                      type: string
 *                      description: the user's refresh token for getting a new refresh token
 */
/**
 * @swagger
 * tags:
 *  name: Authorization
 *  description : Login Page with one time password
 */
/**
 * @swagger
 *  /user/get-otp:
 *      post:
 *          summary: get one time password
 *          tags: [Authorization]
 *          description: get one time password
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/GetOTP"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/GetOTP"
 *          responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              500:
 *                  description: internal server error
 */

/**
 * @swagger
 *  /user/check-otp:
 *      post:
 *          summary: check one time password
 *          tags: [Authorization]
 *          description: check one time password
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/CheckOTP"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/CheckOTP"
 * 
 *          responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              500:
 *                  description: internal server error
 */

/**
 * @swagger
 *  /user/refresh-token:
 *      post:
 *          summary: refresh token
 *          tags: [Authorization]
 *          description: refresh token
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/RefreshToken"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/RefreshToken"
 * 
 *          responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              500:
 *                  description: internal server error
 */