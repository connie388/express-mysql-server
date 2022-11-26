const conn = require("./connection");
// constructor
const MenuCategory = function (menuCategory) {
  this.category = menuCategory.category;
};

MenuCategory.create = (newMenuCategory, result) => {
  conn.query(
    "INSERT INTO menucategories SET ?",
    newMenuCategory,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created menu category: ", {
        id: res.id,
        ...newMenuCategory,
      });
      result(null, { id: res.id, ...newMenuCategory });
    }
  );
};

MenuCategory.findById = (id, result) => {
  conn.query(`SELECT * FROM menucategories WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found menu category: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found menu category with the id
    result({ kind: "not_found" }, null);
  });
};

MenuCategory.findAll = (result) => {
  conn.query(`SELECT * FROM menucategories `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("menucategories: ", res);
    result(null, res);
  });
};

exports.getAllTodos = (req, res, next) => {
  conn.query("SELECT * FROM menucategories", function (err, data, fields) {
    if(err) return next(new AppError(err))
    res.status(200).json({
      status: "success",
      length: data?.length,
      data: data,
    });
  });
 };
 
MenuCategory.updateById = (id, menuCategory, result) => {
  conn.query(
    "UPDATE menucategories SET category = ? WHERE id = ?",
    [menuCategory.category, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found menu category with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated menucategories: ", { id: id, ...menuCategory });
      result(null, { id: id, ...menuCategory });
    }
  );
};

MenuCategory.remove = (id, result) => {
  conn.query("DELETE FROM menucategories WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found menu category with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted menu categories with id: ", id);
    result(null, res);
  });
};

module.exports = MenuCategory;
