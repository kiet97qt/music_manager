const router = require("express").Router();
const SongController = require("../controllers/SongController");
const {isSongExisted} = require("../middlewares/isSongExisted");
const {isMulSongExisted} = require("../middlewares/isMulSongExisted");

router.post("/song", SongController.createSong);
router.get("/songs", SongController.getAllSongs);
router.get("/song/:id", SongController.getSongById);
router.put("/song/:id", isSongExisted, SongController.updateSongById);
router.delete("/song/:id", isSongExisted, SongController.deleteSongById);
router.delete("/songs",isMulSongExisted, SongController.deleteSongsByIds);

module.exports = router;
