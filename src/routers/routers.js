const { Router } = require('express');
const { cadAdm, login, getAllAdms, updateAdm } = require('../controllers/adm');
const { middlewareAdm, middlewareUpdateAdm } = require('../middlewares/adm-mid');
const { verifylogin } = require('../middlewares/login-mid');
const { verifyToken } = require('../middlewares/verifyToken');
const { AddTalker, deleteTalker, getAllAndFilterTalkers } = require('../controllers/talkers');
const { middlewareAddTalker, middlewareDeleteTalker, middlewareGetAllAndFilterTalkers } = require('../middlewares/talkers-mid');
const rota = Router();

rota.post('/admin', middlewareAdm, cadAdm);
rota.post('/login', verifylogin, login);

rota.use(verifyToken);

rota.get('/admin', getAllAdms);
rota.put('/admin', middlewareUpdateAdm, updateAdm);

rota.post('/talker', middlewareAddTalker, AddTalker);

rota.delete('/talker/:id', middlewareDeleteTalker, deleteTalker);

rota.get('/talker/search', middlewareGetAllAndFilterTalkers, getAllAndFilterTalkers);


module.exports = rota;
