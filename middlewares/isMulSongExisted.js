/**
 * Policy isMulSongExisted.js()
 * Check if group id found in URL
 */

 const constants = require("../constants");
 const SongService = require("../services/SongService");
 const HttpResponseService = require("../services/HttpResponseService");
 const logger = require('../winston');

 module.exports = {
    async isMulSongExisted(req, res, next) {
     
        let response = await SongService.getSongsByIds(req.body.ids);
        switch (response.status) {
            case constants.RESOURCES_SUCCESSFULLY_FETCHED :
                logger.info('Policies::isMulSongExisted() - policy validated');
                return next();
            case constants.RESOURCE_NOT_FOUND :
                return HttpResponseService.notFound(res, "Songs", "songsIds", response.data);
            default:
                return HttpResponseService.notFound(res, "Songs", "songsIds", response.data);
        }
    
    }
 }
