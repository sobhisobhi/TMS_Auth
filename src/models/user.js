/* eslint-disable func-names */
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uniqueValidator = require("mongoose-unique-validator");
const { boolean } = require("joi");

const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        userName: {
            type: String,
            required: [true, "Please add a userName"],
            unique: true,
            uniqueCaseInsensitive: true,
        },
        email: {
            type: String,
            required: [true, "Please add an email"],
            unique: true,
            uniqueCaseInsensitive: true,
            match: [
                /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
                "Please add a valid email",
            ],
        },
        roleId: {
            type: mongoose.Schema.ObjectId,
            ref: "Role"
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
            minlength: [6, "Must be six characters long"],
            select: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    }
);

UserSchema.index({ userName: "text" });

UserSchema.plugin(uniqueValidator, { message: "{PATH} already exists." });

// Ecrypt Password
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

module.exports = mongoose.model("User", UserSchema);
