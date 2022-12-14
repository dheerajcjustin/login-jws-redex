const mongoose = require("mongoose");
// const passportLocalMongoose=require("passport-local-mongoose")

const schema = mongoose.Schema;

const userSchema = new schema({
  name: { type: String, required: true },

  email: {
    type: String,
    required: [true, "email is can't be blank"],
    unique: true,
    trim: true,
  },
  password: { type: String, trim: true },
  refreshToken: { type: String },

  todos: [
    {
      todo: {
        type: String,
      },
    },
  ],
});
// userSchema.plugin(passportLocalMongoose);
module.exports;

const User = mongoose.model("User", userSchema);
module.exports = User;
