
class Users {

    getAll() {
        /**
         * @api {get} /api/v1/users/getAll/ Get All Paginate
         * @apiDescription get all users by a search criteria and paginated
         * @apiName GetAllPaginate
         * @apiGroup Users
         * 
         * @apiHeader {String} Authorization Bearer Token.
         * @apiHeader {String} Content-Type application/json
         * @apiParam {String} search criteria of search 
         * @apiParam {Number} page page number 
         * @apiParam {Number} pageSize number of records to display
         * 
         * @apiParamExample {path} Request-Example:
         *  {host}/api/v1/users/getAll/?search=&page=1&pageSize=10
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *          "data": {
         *              "count": 1,
         *              "users": [
         *                  {
         *                      "id": 1,
         *                      "firstName": "User",
         *                      "secondName": "",
         *                      "lastName": "Test",
         *                      "maidenName": "",
         *                      "email": "mail@correo.com",
         *                      "username": "testing",
         *                      "photo": "",
         *                      "phone": "1234456",
         *                      "status": true,
         *                      "recoveryPass": false,
         *                      "rolId": 1
         *                  }
         *              ]
         *          }
         *      }
         *          
         */
    }

    createUser() {
        /**
         * @api {post} /api/v1/users/create/ New User
         * @apiDescription create new user
         * @apiName PostUser
         * @apiGroup Users
         * 
         * @apiHeader {String} Authorization Bearer Token.
         * @apiHeader {String} Content-Type application/json
         * @apiParam {String} firstName first name
         * @apiParam {String} [secondName] second name 
         * @apiParam {String} lastName last name
         * @apiParam {String} [maidenName] maiden name
         * @apiParam {String} email email
         * @apiParam {String{..10}} [phone] phone number 
         * @apiParam {String} username user name of access to dashboard-medel
         * @apiParam {String} password password of access to dashboard-medel for the user
         * @apiParam {String} [photo] profile picture in base64
         * @apiParam {Boolean} status=true state of user true=active / false= inactive
         * @apiParam {Boolean} changePass=true required change password true=yes / false=no
         * @apiParam {Number} rolId identifier of rol
         * 
         * @apiParamExample {json} Request-Example:
         *  {
         *      "firstName": "User",
         *      "secondName": "",
         *      "lastName": "Test",
         *      "maidenName": "",
         *      "email": "mail@correo.com",
         *      "phone": "1234456",
         *      "photo": "",
         *      "username": "testing",
         *      "password": "Admin*12345",
         *      "status": true,
         *      "changePass": true,
         *      "rolId": 1
         *  }     
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *          "data": {
         *              "id": 1,
         *              "firstName": "User",
         *              "secondName": "",
         *              "lastName": "Test",
         *              "maidenName": "",
         *              "photo": "",
         *              "email": "mail@correo.com",
         *              "username": "testing",
         *              "status": true,
         *              "changePass": true,
         *              "rolId": 1
         *          }
         *      }
         *          
         */
    }
}