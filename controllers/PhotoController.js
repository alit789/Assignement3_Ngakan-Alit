const { Photo, User } = require("../models");

class PhotoController {
  static async getAllPhotos(req, res) {
    try {
      const data = await Photo.findAll({
        include: User,
      });
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getPhotoById(req, res) {
    try {
      const { id } = req.params;
      const userData = req.userData;

      const data = await Photo.findOne({
        where: { id: id, UserId: userData.id },
      });

      if (!data) {
        throw {
          code: 404,
          message: "Photo tidak ditemukan",
        };
      }

      res.status(200).json(data);

    } catch (error) {
      res.status(error.code || 500).json(error.message);
    }
  }

  static async addPhoto(req, res) {
    try {
      const { title, caption, image_url } = req.body;
      const userData = req.userData;
      const data = await Photo.create({
        title,
        caption,
        image_url,
        UserId: userData.id,
      });

      res.status(201).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async updatePhoto(req, res) {
    try {
      const { id } = req.params;
      const { title, caption, image_url } = req.body;
      const data = await Photo.update(
        { title, caption, image_url },
        { where: { id: id }, returning: true }
      );

      if (!data[0]) {
        throw {
          code: 404,
          message: "Photo tidak ditemukan",
        };
      }

      res.status(201).json(data);
    } catch (error) {
      res.status(error.code || 500).json(error.message);
    }
  }

  static async deletePhotoById(req, res) {
    try {
      const { id } = req.params;
      const data = await Photo.destroy({ where: { id: id } });

      if (!data) {
        throw {
          code: 404,
          message: "Photo tidak ditemukan",
        };
      }

      res.status(200).json({ message: "Photo berhasil dihapus" });
    } catch (error) {
      res.status(error.code || 500).json(error.message);
    }
  }
}

module.exports = PhotoController;
