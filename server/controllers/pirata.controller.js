const Pirata = require("../models/pirata.model");

module.exports.obtenerTodo = (req, res) => {
    Pirata.find().sort({nombre: 1})
        .then(piratas => res.json(piratas))
        .catch( err =>{
            console.log(err);
            res.status(400).json(err);
        });
}

module.exports.crearPirata = (req, res) => {
    Pirata.create(req.body)
        .then(pirata => res.json(pirata))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
}

module.exports.obtenerPirata = (req, res) => {
    Pirata.findOne({_id: req.params.id})
        .then(pirata => res.json(pirata))
        .catch(err => res.status(400).json(err));
}

module.exports.actualizarPirata = (req, res) => {
    Pirata.findByIdAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators:true})
        .then(pirata => res.json(pirata))
        .catch(err => res.status(400).json(err));
}

module.exports.eliminarPirata = (req, res) => {
    Pirata.deleteOne({_id: req.params.id})
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
}