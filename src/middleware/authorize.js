const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("./asyncHandler");
const Role = require("../models/role");
const User = require("../models/user");

// Grant access to specific roles
const authorize = (...roles) =>
    asyncHandler(async (req, res, next) => {
        if (!req.headers.authorization) {
            return next(new ErrorResponse(`error authentification`, 404));
        }
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return res.status(402).json({
                success: false,
                message: "Session expired",
                code: "SESSION_EXPIRED",
            });
        }
        const roleUser = await Role.findById(req.user.roleId);
        console.log("🚀 ~ file: authorize.js ~ line 25 ~ asyncHandler ~ roleUser", roleUser)
        // if user has a role that is required to access any API

        if (!roles.includes(roleUser.roleName)) {
            return next(
                new ErrorResponse(
                    `The role ${roleUser.roleName} is not authorized to access this route`,
                    403
                )
            );
        }
        next();
    });

module.exports = authorize;
