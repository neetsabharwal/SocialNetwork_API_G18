const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    email:{
      required: true,
      type: String,
      unique: true,
      match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends:[
      {
        type: Schema.Types.ObjectId,
        ref:'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// get total count of thought and reactions on retrieval
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// create the User model using the UserSchema
const User = model("User", UserSchema);

// export the User model
module.exports = User;
