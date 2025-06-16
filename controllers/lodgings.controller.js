const db = require('../models/db.js'); 
const Lodging = db.lodging; 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { ErrorHandler } = require("../utils/error.js");