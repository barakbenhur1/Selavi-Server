const mongoose = require('mongoose');
const LSchema = require('./ProfileSchema')

const schema = new mongoose.Schema(LSchema, { timestamps: true })
const ProfileSchema = mongoose.model("ProfileSchema", schema)

module.exports = ProfileSchema