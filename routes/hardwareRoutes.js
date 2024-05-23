const { Router } = require('express');
const hardwareController = require('../controllers/hardwareController');

const router = Router();

router.post('/hardware/create', hardwareController.createNewHardware);

router.get('/hardware/list', hardwareController.retrieveHardwareList);

router.get('/hardware/getHardware', hardwareController.retrieveHardware);

router.put('/hardware/updateHardware', hardwareController.updateHardware);


module.exports = router;
