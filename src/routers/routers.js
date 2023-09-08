const { Router } = require('express');
const { cadAdm, login, getAllAdms, updateAdm } = require('../controllers/adm');
const { middlewareAdm, middlewareUpdateAdm } = require('../middlewares/adm-mid');
const { verifylogin } = require('../middlewares/login-mid');
const { verifyToken } = require('../middlewares/verifyToken');
const rota = Router();

rota.post('/admin', middlewareAdm, cadAdm);
rota.post('/login', verifylogin, login);

rota.use(verifyToken);

rota.get('/admin', getAllAdms);
rota.put('/admin', middlewareUpdateAdm, updateAdm);


module.exports = rota;
