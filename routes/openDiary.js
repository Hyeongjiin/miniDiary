const express = require('express');
const router = express.Router();
const { postOpenStory } = require('../controllers/openDiary')

router.post('/openstory', postOpenStory);

module.exports = router;