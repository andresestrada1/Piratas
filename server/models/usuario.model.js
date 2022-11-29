const mongoose = require('mongoose');
const bcrypt = require('bcrypt') 

const UsuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "Nombre es requerido."]
    },
    apellido: {
        type: String,
        required: [true, "Apellido es requerido."]
    },
    email: {
        type: String,
        required: [true, "Correo electronico requerido."],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Ingrese un correo válido."
        },
        unique: true 
    },
    contraseña: {
        type: String,
        required: [true, "La contraseña es obligatoria."],
        minlength: [8, "La contraseña debe de tener al menos 8 caracteres"]
    }

}, {timestamps: true, versionKey: false})


UsuarioSchema.virtual('confirmarContraseña')
    .get( ()=> this.confirmarContraseña )
    .set( value => this.confirmarContraseña = value );



UsuarioSchema.pre('validate', function(next) {
    if(this.contraseña != this.confirmarContraseña) {
        this.invalidate('confirmarContraseña', 'Las contraseñas no coinciden');
    }

    next();
});


UsuarioSchema.pre('save', function(next){
    bcrypt.hash(this.contraseña, 10)
        .then(hash => {
            this.contraseña = hash;
            next();
        });
});

const Usuario = mongoose.model("usuarios", UsuarioSchema);
module.exports = Usuario;
