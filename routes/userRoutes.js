const express = require("express");

const router = express.Router();
const {
  getuservalidator,
  ubdateuservalidator,
  deleteuservalidator,
  createuservalidator,
  changeUserPasswordValidator,
} = require("../utils/validator/uservalidator");
const {
  getUser,
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  changePassword,
} = require("../controllers/userControllers");

router.put("/changePassword/:id", changeUserPasswordValidator, changePassword);

router.route("/").get(getUsers).post(createuservalidator, createUser);
router
  .route("/:id")
  .get(getuservalidator, getUser)
  .put(ubdateuservalidator, updateUser)
  .delete(deleteuservalidator, deleteUser);

module.exports = router;
