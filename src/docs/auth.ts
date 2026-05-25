/**
 * @swagger
 * /api/auth/login:
 *      post:
 *          summary: User Authentication
 *          tags: 
 *              - Authentication
 *          description: Json Web Token Authentication
 *          requestBody:
 *              required: true
 *              content: 
 *                     application/json:
 *                          schema:
 *                                type: object
 *                                properties:
 *                                      email:
 *                                          type: string
 *                                          example: "correo@correo.com"
 *                                      password:
 *                                          type: string
 *                                          example: "Abc123"
 *          responses:
 *              200:
 *                  description: Successful Response
*              404:
*                  description: User not Found
*              500:
*                  description: Server Internal Error
*/

