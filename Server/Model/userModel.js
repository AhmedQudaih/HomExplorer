const mongoose = require('mongoose');
const role = require("./roleModel");
const Schema = mongoose.Schema;

const userSchema = new Schema ({
        name: { type: String, required: true },
        password: { type: String,
           required: true,
          },
        email: {
          type: String,
          required: true,
          match: /.+\@.+\..+/,
          unique: true
          },
        phoneNumber: { type: Number, required: true },
        role: {type:  Schema.Types.ObjectId, ref: 'role', required: true }
});

const userModel = mongoose.model('user', userSchema)
exports.userModel = userModel;
exports.userSchema = userSchema;
