const mongoose = require('mongoose');
const CSchemahema = require('./ContentSchema')

const schema = new mongoose.Schema(CSchemahema, { timestamps: true })
const ContentSchema = mongoose.model("ContentSchema", schema)

module.exports = ContentSchema