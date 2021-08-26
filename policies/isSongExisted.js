/**
 * Policy isSongExisted.js()
 * Check if group id found in URL
 */

 const constants = require("../constants");
 const SongMiddleware = require("../middlewares/SongMiddleware");
 const HttpResponseMiddleware = require("../middlewares/HttpResponseMiddleware");

 module.exports = {
    async isSongExisted(req, res, next) {
     
        let response = await SongMiddleware.getSongById(req.params.id);
    
        switch (response.status) {
            case constants.RESOURCE_SUCCESSFULLY_FETCHED :
                console.log("Policies::isSongExisted() - policy validated");
                return next();
            case constants.RESOURCE_NOT_FOUND :
                return HttpResponseMiddleware.notFound(res, "Song", "songId", req.params.id);
            default:
                return HttpResponseMiddleware.notFound(res, "Song", "songId", req.params.id);
        }
    
    }
 }
