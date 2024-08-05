const mongoose = require('mongoose');
const ContentSchema = require('./schema');

const Content = mongoose.model('Content', ContentSchema);

module.exports = Content;
