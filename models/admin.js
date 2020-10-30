const mongoose = require("mongoose");
const AdminSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isactive: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("admin", AdminSchema);
