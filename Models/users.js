const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, default: null },
  email: { type: String, default: null },
  password: { type: String, default: null },
  accessToken:{
    type: String,
    default: null
  },
  createdAt:{
    type: Number,
    default: new Date()
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
});

module.exports = mongoose.model("User", schema);

