const http = require('http');
const app = require('./app');
const sequelize = require('./config/database');
const User = require('./models/user.model');