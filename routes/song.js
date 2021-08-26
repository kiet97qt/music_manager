const router = require("express").Router();
const SongController = require("../controllers/SongController");
const {isSongExisted} = require("../policies/isSongExisted");
const {isMulSongExisted} = require("../policies/isMulSongExisted");

router.post("/", SongController.createSong);
router.get("/", SongController.getAllSongs);
router.get("/songId/:id", SongController.getSongById);
router.put("/songId/:id", isSongExisted, SongController.updateSongById);
router.delete("/songId/:id", isSongExisted, SongController.deleteSongById);
router.delete("/",isMulSongExisted, SongController.deleteSongsByIds);

module.exports = router;
