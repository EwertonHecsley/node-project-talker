const { Router } = require('express');
const { cadAdm } = require('../controllers/adm');
const { middlewareAdm } = require('../middlewares/adm-mid');
const rota = Router();

rota.post('/admin', middlewareAdm, cadAdm);

module.exports = rota;
