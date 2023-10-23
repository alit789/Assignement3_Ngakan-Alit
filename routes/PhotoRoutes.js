const PhotoController = require("../controllers/PhotoController")
const router = require("express").Router()

router.get("/", PhotoController.getAllPhotos)
router.get("/:id", PhotoController.getPhotoById)
router.put("/:id", PhotoController.updatePhoto)
router.delete("/:id", PhotoController.deletePhotoById)
router.post("/", PhotoController.addPhoto)

module.exports = router