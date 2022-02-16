const express = require("express");

const { getUsers, getUser, createUser } = require("../controllers/users");
const protect = require("../middleware/protect");
const authorize = require("../middleware/authorize");

const router = express.Router({ mergeParams: true });

router
    .route("/")
    .get(protect, authorize("admin","user"), getUsers)
    .post(protect, authorize("admin","user"),createUser);
router
    .route("/:id")
    .get(protect, authorize("admin","user"), getUser)

module.exports = router;