const PirataController = require("../controllers/pirata.controller");
const UsuarioController = require("../controllers/usuario.controller");

const {authenticate} = require("../config/jwt.config");

module.exports = app => {
    app.get('/api/piratas', authenticate, PirataController.obtenerTodo);
    app.post('/api/piratas', authenticate, PirataController.crearPirata);
    app.get('/api/piratas/:id', authenticate, PirataController.obtenerPirata);
    // app.put('/api/piratas/:id', authenticate, PirataController.actualizarPirata);
    app.delete('/api/piratas/:id', authenticate, PirataController.eliminarPirata);

    app.post('/api/registro', UsuarioController.registro);
    app.post('/api/login', UsuarioController.login);
    app.get('/api/logout', UsuarioController.logout);
}

