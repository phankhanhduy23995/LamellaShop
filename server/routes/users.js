'use strict';

const express = require('express');
const router = express.Router();
const auth_utils = require('../lib/auth_utils');

/**
 * @api {get} /users Get Users
 * @apiVersion 1.0.0
 * @apiPermission Admin
 * @apiGroup Users
 *
 * @apiUse TokenHeader
 * @apiUse PagingParam
 *
 * @apiParam {String} [q] Keywords to search
 * @apiParam {Number} [active] Active Or Inactive
 *
 * @apiSuccessExample {json} Success Response
 *  HTTP/1.1 200 OK
 *  {
 *    "success": true,
 *    "data": {
 *      "total_items": 25,
 *      "current_page": 1,
 *      "page_size": 10,
 *      "users": [{
 *        "id": 1,
 *        "account": "account",
 *        "fullname": "User",
 *        "active": true,
 *        "role_name": "HR"
 *      }]
 *    }
 *  }
 * @apiUse FailedResponse
 */
router.get('/', auth_utils.authorizeAdmin, function (req, res) { });

module.exports = router;
