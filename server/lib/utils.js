'use strict';

const crypto = require('crypto');
const errors = require('../lib/errors');

const genRandomString = function (length) {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
};

const sha512 = function (password, salt) {
  let hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  return hash.digest('hex');
};

exports.saltHashPassword = function (password) {
  let salt = genRandomString(16);
  let passwordHash = sha512(password, salt);
  return {
    salt: salt,
    passwordHash: passwordHash
  };
};

exports.hashPassword = function (password, salt) {
  return sha512(password, salt);
};

exports.successResponse = function (data = null) {
  if (data == null) {
    return {
      success: true
    };
  }

  return {
    success: true,
    data: data
  };
};

exports.failedResponse = function (error = null) {
  if (error != null) {
    if (error.name == 'SequelizeDatabaseError') {
      return {
        success: false,
        message: errors.SERVICE_01,
        code: 'SERVICE_01'
      };
    }

    if (error.name == 'JsonWebTokenError') {
      return {
        success: false,
        message: errors.AUTHORIZE_01,
        code: 'AUTHORIZE_01'
      };
    }

    if (error.message && error.code) {
      return {
        success: false,
        message: error.message,
        code: error.code
      };
    }

    if (error.message) {
      return {
        success: false,
        message: error.message,
        code: 'SERVICE_01'
      };
    }
  }

  return {
    success: false,
    message: errors.SERVICE_01,
    code: 'SERVICE_01'
  };
};