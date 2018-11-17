'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ThisSchema = new Schema({
  type: String,
  color: String,
  size: String,
  mass: Number,
  name: String
});

module.exports.ThisSchema = ThisSchema;
