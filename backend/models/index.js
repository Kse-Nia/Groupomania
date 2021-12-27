'use strict';
const fs = require('fs');
const path = require('path');
const {
  Sequelize,
  DataTypes
} = require('sequelize');
const sequelize = require('../config/database');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
  },
  useremail: {
    type: DataTypes.STRING
  },
  userpassword: {
    type: DataTypes.STRING,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN
  }
});