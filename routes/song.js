const router = require("express").Router();
const SongController = require("../controllers/SongController");
const {isSongExisted} = require("../policies/isSongExisted");
const {isMulSongExisted} = require("../policies/isMulSongExisted");

router.post("/song", SongController.createSong);
router.get("/song", SongController.getAllSongs);
router.get("/song/songId/:id", SongController.getSongById);
router.put("/song/songId/:id", isSongExisted, SongController.updateSongById);
router.delete("/song/songId/:id", isSongExisted, SongController.deleteSongById);
router.delete("/song",isMulSongExisted, SongController.deleteSongsByIds);

module.exports = router;
