const {Songs} = require("../models/core/song");
const mongoose = require("mongoose");
const constants = require("../constants");
const _ = require("lodash");

 module.exports = {
 
     /**
      * Create Song
      *
      * @name createSong
      * @param {Object} params
      */
     async createSong(params) {
 
         try {
 
             let attributes = {};
 
             if (params.hasOwnProperty("name")) {
                 attributes.name = params.name;
             }
 
             if (params.hasOwnProperty("singer")) {
                 attributes.singer = params.singer;
             }
 
             if (params.hasOwnProperty("genre")) {
                 attributes.genre = params.genre;
             }
 
             if (params.hasOwnProperty("link")) {
                attributes.link = params.link;
            }
            
            if (params.hasOwnProperty("additional")) {
                attributes.additional = params.additional;
            }
            
            attributes._id = new mongoose.Types.ObjectId();
             // Create Site (name)
             let createdSong = await Songs.create(attributes);

             return {
                 status: constants.RESOURCE_SUCCESSFULLY_CREATED,
                 data: createdSong
             };
 
         } catch (err) {

             return {
                 status: constants.DATABASE_ERROR,
                 name: err.name ? err.name : "",
                 message: err.message ? err.message : "",
                 stack: err.stack ? err.stack : "",
                 code: err.code ? err.code : ""
             };
         }
     },
     
    /**
     * Get all Song(s)
     * This method is used to get all Song(s)
     *
     * @name getAllSongs
     *   
     */
    async getAllSongs() {

        try {

            let allSongs = await Songs.find({});

            return {
                status: constants.RESOURCES_SUCCESSFULLY_FETCHED,
                data: allSongs
            };

        } catch (err) {
            return {
                status: constants.DATABASE_ERROR,
                name: err.name ? err.name : "",
                message: err.message ? err.message : "",
                stack: err.stack ? err.stack : "",
                code: err.code ? err.code : ""
            };
        }
    },
    
    /**
     * Get one Song identified by its id 
     *
     * @name getSongById
     */
    async getSongById(songId) {

        try {
            let song = await Songs.findById(songId);

            if (!song) {
                return {
                    status: constants.RESOURCE_NOT_FOUND
                };
            } else {
                return {
                    status: constants.RESOURCE_SUCCESSFULLY_FETCHED,
                    data: song
                };
            }

        } catch (err) {
            return {
                status: constants.DATABASE_ERROR,
                name: err.name ? err.name : "",
                message: err.message ? err.message : "",
                stack: err.stack ? err.stack : "",
                code: err.code ? err.code : ""
            };
        }
    },   

    /**
     * get Songs By Ids
     * 
     * @param {Array} songsIds
     */
    async getSongsByIds(songsIds) {

        try {
            const songs = await Songs.find({ '_id': { $in: songsIds } });
            console.log("songs",songs)
            //  if a given id in array of ids doesnt exist in db , return not found error
            if (songsIds.length !== songs.length){
                let resourcesNotFound = songs.length?_.difference(songsIds,_.map(songs,'id')):songsIds;
                return {
                    status: constants.RESOURCE_NOT_FOUND,
                    data: resourcesNotFound
                };
            }
            return {
                status: constants.RESOURCES_SUCCESSFULLY_FETCHED,
                data: songs
            };

        } catch (err) {
            return {
                status: constants.DATABASE_ERROR,
                name: err.name ? err.name : "",
                message: err.message ? err.message : "",
                stack: err.stack ? err.stack : "",
                code: err.code ? err.code : ""
            };
        }
    },

    /**
     * Update properties of a Song identified by its id
     *
     * @name updateSongById
     * @param {Object} params
     */
    async updateSongById(params) {

        try {

            let attributesToUpdate = {};
            if (params.hasOwnProperty("name")) {
                attributesToUpdate.name = params.name;
            }

            if (params.hasOwnProperty("singer")) {
                attributesToUpdate.singer = params.singer;
            }

            if (params.hasOwnProperty("genre")) {
                attributesToUpdate.genre = params.genre;
            }

            if (params.hasOwnProperty("link")) {
                attributesToUpdate.link = params.link;
            }

            if (params.hasOwnProperty("additional")) {
                attributesToUpdate.additional = params.additional;
            }

            let updatedSong = await Songs.findOneAndUpdate({ _id: params.id }, attributesToUpdate, {
                new: true,
              })

            return {
                status: constants.RESOURCE_SUCCESSFULLY_UPDATED,
                data: updatedSong
            };

        } catch (err) {
            return {
                status: constants.DATABASE_ERROR,
                name: err.name ? err.name : "",
                message: err.message ? err.message : "",
                stack: err.stack ? err.stack : "",
                code: err.code ? err.code : ""
            };
        }
    },        
 
    /**
     * Delete one Song identified by its id 
     *
     * @name deleteSongById
     * @param {string} songId
     * 
     */
    async deleteSongById(songId) {

        try {
            let songDeleted = await Songs.deleteOne({ _id: songId})

            return {
                status: constants.RESOURCE_SUCCESSFULLY_DELETED,
                data: songDeleted
            };

        } catch (err) {
            return {
                status: constants.DATABASE_ERROR,
                name: err.name ? err.name : "",
                message: err.message ? err.message : "",
                stack: err.stack ? err.stack : "",
                code: err.code ? err.code : ""
            };
        }
    },
 
    /**
     * Delete multiples songs identified by there ids
     *
     * @name deleteSongsByIds
     * @param {Array} songIds
     */
    async deleteSongsByIds(songIds) {

        try {
            let songsDeleted = await Songs.deleteMany({ _id: { $in: songIds}})

            return {
                status: constants.RESOURCES_SUCCESSFULLY_DELETED,
                data: songsDeleted
            };

        } catch (err) {
            return {
                status: constants.DATABASE_ERROR,
                name: err.name ? err.name : "",
                message: err.message ? err.message : "",
                stack: err.stack ? err.stack : "",
                code: err.code ? err.code : ""
            };
        }
    },
      
 };
 