const express = require('express');
const router = express.Router();
const { createUser, updateUserOfferCompletion } = require('../controllers/userController');

router.post('/', createUser);
router.put('/:userId', updateUserOfferCompletion)

module.exports = router;