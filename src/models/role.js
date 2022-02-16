const mongoose = require("mongoose");

const { Schema } = mongoose;

const RoleSchema = new Schema(
    {
        roleName: {
            type: String,
            enum: ["user", "admin"], 
            default: "user",
            required: [true, "Please add a role name"],
        },
        description: {
            type: String,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    }
);

RoleSchema.virtual("user", {
    ref: "User",
    localField: "_id",
    foreignField: "roleId",
    justOne: true,
    count: true,
});

module.exports = mongoose.model("Role", RoleSchema);
