const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema ({
        name: { type: String, required: true },
});

const roleModel = mongoose.model('role', roleSchema)
exports.roleModel = roleModel;
exports.roleSchema = roleSchema;
