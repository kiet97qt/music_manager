
 const constants      = require("../constants");
 const SongService = require("../services/SongService");
 const HttpResponseService = require("../services/HttpResponseService");

 const controllerName = "SongController";
 
 module.exports = {
 
     /**
      * Create Site
      *
      * @name createSong
      * @param {Object} req
      * @param {Object} res
      * @description
      *      This method is used to create Song.
      *      Only 'name' field is mandatory.
      */
     async createSong(req, res) {
 
         try {

             // Inside create the song by service

             let response = await SongService.createSong(req.body);

             switch (response.status) {
 
                 case constants.RESOURCE_SUCCESSFULLY_CREATED:
                     // Return the response
                     return HttpResponseService.json(201, res, constants.SONG_SUCCESSFULLY_CREATED, response.data);
 
                 default:
                     return HttpResponseService.internalServerError(req, res, response);
 
             }
 
         } catch (err) {
            return HttpResponseService.internalServerError(req, res, err);
         }
 
     },
 
     /**
      * Get all Song(s)
      *
      * @name getAllSongs
      * @param {Object} req
      * @param {Object} res
      * @description
      *      This method is used to get all Song(s) created.
      */
     async getAllSongs(req, res) {
 
         try {
            let response = await SongService.getAllSongs();
 
             switch (response.status) {
 
                 case constants.RESOURCES_SUCCESSFULLY_FETCHED:
                     return HttpResponseService.json(200, res, constants.RESOURCES_SUCCESSFULLY_FETCHED, response.data);
 
                 default:
                     return HttpResponseService.internalServerError(req, res, response);
 
             }
 
         } catch (err) {
             return HttpResponseService.internalServerError(req, res, err);
         }
 
     },

    /**
     * Get Song identified by its id
     *
     * @name getSongById
     * @param {Object} req
     * @param {Object} res
     * @description
     *      This method is used to get Song identified by its id.
     */
    async getSongById(req, res) {

        try {

            // First, get Group identify by its id
            let response = await SongService.getSongById(req.params.id);
            switch (response.status) {

                case constants.RESOURCE_SUCCESSFULLY_FETCHED:
                    // Return response
                    return HttpResponseService.json(200, res, constants.SONG_SUCCESSFULLY_FETCHED, response.data);
                case constants.RESOURCE_NOT_FOUND:
                    // Return response
                    return HttpResponseService.notFound(res, "Song", "songId", req.params.id);
                default:
                    return HttpResponseService.internalServerError(req, res, response);

            }

        } catch (err) {
            return HttpResponseService.internalServerError(req, res, err);
        }

    },     

    /**
     * Delete Songs identified by its ids
     *
     * @name deleteSongsByIds
     * @param {Object} req
     * @param {Object} res
     * @description
     *      This method is used to Delete Songs identified by its ids.
     */
     async deleteSongsByIds(req, res) {

        try {

            let response = await SongService.deleteSongsByIds(req.body.ids);
            switch (response.status) {

                case constants.RESOURCES_SUCCESSFULLY_DELETED:
                    // Return response
                    return HttpResponseService.json(200, res, constants.SONGS_SUCCESSFULLY_DELETED, response.data);

                default:
                    return HttpResponseService.internalServerError(req, res, response);

            }

        } catch (err) {
            return HttpResponseService.internalServerError(req, res, err);
        }

    },   

    /**
     * Delete Song identified by its id
     *
     * @name deleteSongById
     * @param {Object} req
     * @param {Object} res
     * @description
     *      This method is used to Delete Song identified by its id.
     */
     async deleteSongById(req, res) {

        try {

            let response = await SongService.deleteSongById(req.params.id);
            switch (response.status) {

                case constants.RESOURCE_SUCCESSFULLY_DELETED:
                    // Return response
                    return HttpResponseService.json(200, res, constants.SONG_SUCCESSFULLY_DELETED, response.data);

                default:
                    return HttpResponseService.internalServerError(req, res, response);

            }

        } catch (err) {
            return HttpResponseService.internalServerError(req, res, err);
        }

    }, 

    /**
     * Update properties of one Song identified by its id
     *
     * @name updateSongById
     * @param {Object} req
     * @param {Object} res
     * @description
     *      This method is used to update properties of a Song identified by its id.
     */
    async updateSongById(req, res) {

        try {
            
            let params = {
                ...req.params,
                ...req.body
            };

            let responseUpdate = await SongService.updateSongById(params);

            switch (responseUpdate.status) {

                case constants.RESOURCE_SUCCESSFULLY_UPDATED:
                    return HttpResponseService.json(200, res, constants.SONG_SUCCESSFULLY_UPDATED, responseUpdate.data);

                default:
                    return HttpResponseService.internalServerError(req, res, responseUpdate);

            }

        } catch (err) {
            return HttpResponseService.internalServerError(req, res, err);
        }

    },

 };