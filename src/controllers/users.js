const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const User = require("../models/user");

// @desc    Create user
// @route   POST /api/v1/users
exports.createUser = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body);
    res.status(200).json({ success: true, data: user });
    next();
});

// @desc    Get all users
// @route   GET /api/v1/users
exports.getUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find({})
    .populate({ path: 'roleId', select: 'roleName' });
    if (!users) return next(new ErrorResponse(`No users exist`));
    return res.status(200).json({ result: users });
});

// @desc    Get single user
// @route   GET /api/v1/users/:id
exports.getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    .populate({ path: 'roleId', select: 'roleName' });

    if (!user)
        return next(
            new ErrorResponse(`No user with that id of ${req.params.id}`)
        );

    return res.status(200).json({ success: true, data: user });
});