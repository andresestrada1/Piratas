const mongoose = require("mongoose");

const EsquemaPirata = new mongoose.Schema({

    nombre: {
        type: String,
        required: [true, "Nombre obligatorio"],
        minLength: [3, "Nombre debe tener al menos 3 caracteres"]
    },
    imagen: {
        type: String
    },
    pataDePalo: {
        type: Boolean,
        default: true
    },
    ParcheOjo: {
        type: Boolean,
        default: true
    },
    Gancho: {
        type: Boolean,
        default: true
    },
    cofresDeTesoro: {
        type: Number
    },
    posicion: {
        type: String
    }

}, {timestamps: true, versionKey:false})

const Pirata = mongoose.model("piratas", EsquemaPirata);
module.exports = Pirata;