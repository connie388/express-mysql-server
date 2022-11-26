const MenuCategoryModel = require("../models/MenuCategory");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.category) {
    res
      .status(400)
      .send({ success: false, message: "Content can not be empty!" });
    return;
  }

  // Create a record
  const menucategory = new MenuCategoryModel({
    category: req.body.category,
  });

  // Save record in the database
  MenuCategoryModel.create(menucategory, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message:
          err.message ||
          "Some error occurred while creating the Menu Category.",
      });
    else res.status(200).json({ success: true, data });
  });
};

// Retrieve all from the database.
exports.findAll = (req, res) => {
  MenuCategoryModel.findAll((err, menucategory) => {
    if (err)
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while retrieving Menu Category.",
      });
    else res.status(200).json({ success: true, menucategory });
  });
};

exports.findById = (req, res) => {
  MenuCategoryModel.findById(req.params.id, (err, menucategory) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          success: false,
          message: `Not found Menu Category with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          success: false,
          message:
            err.message ||
            "Some error occurred while retrieving the Menu Category record " +
              req.params.id,
        });
      }
    } else res.status(200).json({ success: true, menucategory });
  });
};

// Update record by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res
      .status(400)
      .send({ success: false, message: "Data to update can not be empty!" });
  }

  MenuCategoryModel.updateById(
    req.params.id,
    new MenuCategoryModel(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).json({
            success: false,
            message: `Menu category not found with id ${req.params.id}.`,
          });
        } else {
          res.status(500).json({
            success: false,
            message: "Error updating menu category with id " + req.params.id,
          });
        }
      } else
        res.status(200).json({
          success: true,
          message: "The Menu Category was updated successfully ",
        });
    }
  );
};

// Delete a record with the specified id in the request
exports.delete = (req, res) => {
  MenuCategoryModel.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).json({
          success: false,
          message: `Record not found with id ${req.params.id}.`,
        });
      } else {
        res.status(500).json({
          success: false,
          message:
            err.message ||
            "Could not delete menu category with id " + req.params.id,
        });
      }
    } else
      res.status(200).json({
        success: true,
        message: "This record was deleted successfully!",
      });
  });
};
