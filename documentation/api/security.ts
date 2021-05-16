
class Security {

    login() {
        /**
         * @api {post} /api/v1/auth/login Login
         * @apiDescription  Generate token of access
         * @apiName PostAuth
         * @apiGroup Auth
         * 
         * @apiParam {String} username user name of access to dashboard-medel
         * @apiParam {String} password password of access to dashboard-medel for the user
         *
         * @apiParamExample {json} Request-Example:
         *     {
         *       "username": "testing",
         *       "password": "password_is_here"
         *     }
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *          "data": {
         *              "token": "token_is_here",
         *              "refreshToken": "refresh_token_is_here",
         *              "type": "Bearer",
         *              "expireInMin": 180,
         *                  "user": {
         *                       "id": 1,
         *                       "fullName": "User Test",
         *                       "username": "testing",
         *                       "email": "mail@example.com",
         *                       "state": true,
         *                       "changePass": false
         *                   }
         *           }
         *       }
         */
        
    }

    tokenRefresh() {
        /**
         * @api {post} /api/v1/auth/token Refresh Token
         * @apiDescription  Generate new token of access
         * @apiName PostToken
         * @apiGroup Auth
         * 
         * @apiHeader {String} Authorization Bearer Token.
         * @apiHeader {String} Content-Type application/json
         * @apiParam {String} username user name of access to dashboard-medel
         * @apiParam {string} refreshToken refresh token obtained at login
         *
         * @apiParamExample {json} Request-Example:
         *     {
         *       "username": "testing",
         *       "refreshToken": "refresh_token_is_here"
         *     }
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *          "data": {
         *              "token": "token_is_here",
         *              "refreshToken": "refresh_token_is_here",
         *              "type": "Bearer",
         *              "expireInMin": 180,
         *                  "user": {
         *                       "id": 1,
         *                       "fullName": "User Test",
         *                       "username": "testing",
         *                       "email": "mail@example.com",
         *                       "state": true,
         *                       "changePass": false
         *                   }
         *           }
         *       }
         */
    }

    logout() {
        /**
         * @api {delete} /api/v1/auth/logout Logout
         * @apiDescription delete the user  session 
         * @apiName DeleteLogout
         * @apiGroup Auth
         * 
         * @apiHeader {String} Authorization Bearer Token.
         * @apiHeader {String} Content-Type application/json
         * @apiParam {String} username user name of access to dashboard-medel
         *
         * @apiParamExample {json} Request-Example:
         *     {
         *       "username": "testing"
         *     }
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *          "data": {
         *              "ok": true,
         *              "message": "La sessión se eliminó correctamente."
         *          }
         *      }
         */
    }

}