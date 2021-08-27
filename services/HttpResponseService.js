module.exports = {

    /*
     * Handle '200 OK' or '201 Created' status code response
     * Example :
     *      {
     *          "status": 201,
     *          "message": "Created",
     *          "data": "..."
     *      }
     */
    json: (status, res, message, data) => {
        let response = {
            message: message,
            statusCode: status,
            data: data
        }
        return res.status(status).json(response);
    },

    /*
     * Handle '400 Bad Request' status code response
     * Example :
     *      {
     *          "error_code": 400,
     *          "errorMsg": "Bad Request",
     *          "errors": [
     *              {
     *                  "type": "any.required",
     *                  "field": "password",
     *                  "errorMsg: "password is required"
     *              }
     *          ]
     *      }
     */
    badRequest: (res, errors) => {
        var response = {
            errorCode: 400,
            errorMsg: "Bad Request",
            errors: []
        };
        if (errors.details) {
            errors.details.forEach(err => {
                var errObj = {
                    type: err.type,
                    field: err.path ? err.path.join("_") : "",
                    errorMsg: err.message
                };
                response.errors.push(errObj);
            });
        }

        return res.status(400).json(response);
    },

    /*
     * Handle '401 Unauthorized' status code response
     * Example:
     *      {
     *          "errorCode": 401,
     *          "errorMsg": "Unauthorized",
     *          "errorDetailsCode": "invalid_token",
     *          "errorDetails": "The access token provided is expired, revoked, malformed, or invalid for other reasons."
     *      }
     */
    unauthorized: (res, code, jsonData) => {
        var response = {
            errorCode: 401,
            errorMsg: "Unauthorized",
            errorDetailsCode: code,
        };

        if (jsonData){
            response.data = jsonData;
        }

        res.header("WWW-Authenticate", 'Bearer realm="Service"');

        return res.status(401).json(response);
    },

    /*
     * Handle '403 Forbidden' status code response
     */
    forbidden: (res, code, jsonData) => {
        var response = {
            errorCode: 403,
            errorMsg: "Forbidden",
            errorDetailsCode: code,
        };

        if (jsonData){
            response.data = jsonData;
        }

        return res.status(403).json(response);
    },

    /*
     * Handle '404 Not Found' status code response
     * Example:
     *      {
     *           "errorCode": 404,
     *           "errorMsg": "Resource Not Found",
     *           "errorDetails": "No Site found with siteId: 59889DEaszad51b33a982c96e"
     *      }
     */
    notFound: (res, resourceName, keyName, keyValue) => {
        var response = {
            errorCode: 404,
            errorMsg: "Resource Not Found",
            errorResourceName: resourceName,
            errorPropertyName: keyName,
            errorDetails: "No " + resourceName + " found with " + keyName + ": " + keyValue
        };

        // If statusCode is not 200, then it is modified and sent to client before, then don't send it again, unless express will crashed
        // https://nodejs.org/api/http.html#http_response_statuscode
        if (res.statusCode === 200) {
            return res.status(404).json(response);  //res.status(404).json(response);
        }
    },

    /*
     * Handle '409 Conflict' status code response
     */
    conflictError: (res, resourceName, conflictKeyName, errorLabel, conflictValuesArray) => {

        var response = {
            errorCode: 409,
            errorMsg: "Conflict",
            errorLabel: errorLabel,
            conflictValues: conflictValuesArray,
            errorDetails: resourceName + " with same " + conflictKeyName + " already exists."
        };

        // If statusCode is not 200, then it is modified and sent to client before, then don't send it again, unless express will crashed
        // https://nodejs.org/api/http.html#http_response_statuscode
        if (res.statusCode === 200) {
            return res.status(409).json(response);
        }
    },

    /*
     * Handle '500 Internal Server Error' status code response
     */
    internalServerError: (req, res, data) => {
        var response = {
            errorCode: 500,
            errorMsg: data
        };
        if (data) {
            if (data.message) {
                response.errorDetails = data.message;
            } else if (data.statusText) {
                response.errorDetails = data.statusText;
            }
        }

        // If statusCode is not 200, then it is modified and sent to client before, then don't send it again, unless express will crashed
        // https://nodejs.org/api/http.html#http_response_statuscode
        return res.status(500).json(response);
    },

    /*
     * Handle 406 Not acceptable error
     */
    notAcceptable: (res, code) => {
        var response = {
            errorCode: 406,
            errorMsg: "The 'Content-Type' header is missing or invalid. You should use 'Content-Type: application/json'.",
            errorDetailsCode: code,
        };

        // If statusCode is not 200, then it is modified and sent to client before, then don't send it again, unless express will crashed
        // https://nodejs.org/api/http.html#http_response_statuscode
        if (res.statusCode === 200) {
            return res.status(406).json(response);
        }
    },

};
