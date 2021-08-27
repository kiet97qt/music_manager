/**
 * Policy isSongExisted.js()
 * Check if group id found in URL
 */

 const constants = require("../constants");
 const SongService = require("../services/SongService");
 const HttpResponseService = require("../services/HttpResponseService");

 module.exports = {
    async isSongExisted(req, res, next) {
     
        let response = await SongService.getSongById(req.params.id);
    
        switch (response.status) {
            case constants.RESOURCE_SUCCESSFULLY_FETCHED :
                console.log("Policies::isSongExisted() - policy validated");
                return next();
            case constants.RESOURCE_NOT_FOUND :
                return HttpResponseService.notFound(res, "Song", "songId", req.params.id);
            default:
                return HttpResponseService.notFound(res, "Song", "songId", req.params.id);
        }
    
    }
 }
