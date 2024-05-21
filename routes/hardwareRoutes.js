const { Router } = require('express');
const hardwareController = require('../controllers/hardwareController');

const router = Router();

router.post('/hardware/create', hardwareController.createNewHardware);

router.get('/hardware/list', hardwareController.retreiveHarwareList);

router.get('/hardware/getHardware', hardwareController.retreiveHardware);

module.exports = router;
