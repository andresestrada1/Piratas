const Usuario = require("../models/usuario.model");
const jwt = require('jsonwebtoken');
const secret_key = "llave secreta"; 

const bcrypt = require('bcrypt');

module.exports.registro = (req, res) => {
    const usuario = new Usuario(req.body);
    console.log(req.body)
    usuario.save()
        .then(usuario =>{
            const payload = {
                _id: usuario._id
            }

            const myJWT = jwt.sign(payload, secret_key);

            res.cookie("usertoken", myJWT, secret_key,{
                    httpOnly: true 
                }).json(usuario);


        })
        .catch(err => res.status(400).json(err));
}

module.exports.login = (req, res) => {
    Usuario.findOne({email: req.body.email})
        .then(usuario => {
            if(usuario === null) {
                res.json({error: true, message: "Correo electrónico incorrecto."});
            } else {
                bcrypt.compare(req.body.contraseña, usuario.contraseña)
                    .then(passwordValid => {
                        if(passwordValid) {
                            const payload = {
                                _id: usuario._id
                            }

                            const myJWT = jwt.sign(payload, secret_key);

                            res
                                .cookie("usertoken", myJWT, secret_key, {
                                    httpOnly: true
                                })
                                .json({error: false, message: "Inicio de sesión correcto"})

                        } else {
                            res.json({error: true, message: "Contraseña incorrecta."});
                        }
                    })
            }
        })
}

module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.json({message: "Fin de sesión!"});
}