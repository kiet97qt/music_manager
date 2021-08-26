/**
 * Policy isMulSongExisted.js()
 * Check if group id found in URL
 */

 const constants = require("../constants");
 const SongMiddleware = require("../middlewares/SongMiddleware");
 const HttpResponseMiddleware = require("../middlewares/HttpResponseMiddleware");

 module.exports = {
    async isMulSongExisted(req, res, next) {
     
        let response = await SongMiddleware.getSongsByIds(req.body.ids);
        console.log("response",response)
        switch (response.status) {
            case constants.RESOURCES_SUCCESSFULLY_FETCHED :
                console.log("Policies::isMulSongExisted() - policy validated");
                return next();
            case constants.RESOURCE_NOT_FOUND :
                return HttpResponseMiddleware.notFound(res, "Songs", "songsIds", response.data);
            default:
                return HttpResponseMiddleware.notFound(res, "Songs", "songsIds", response.data);
        }
    
    }
 }
