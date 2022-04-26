const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
        name: { type: String, required: true },
        password: { type: String,
           required: true,
           match:/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
          },
        email: {
          type: String,
          required: true,
          match: /.+\@.+\..+/,
          unique: true
          },
        phoneNumber: { type: Number, required: true },

        admin: {type: Boolean, default: false }

});

const userModel = mongoose.model('user', userSchema)
exports.userModel = userModel;
exports.userSchema = userSchema;
