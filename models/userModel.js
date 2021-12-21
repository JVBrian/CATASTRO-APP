const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Ingresa tu nombre!"],
        trim: true,
       
    },
    lastname: {
        type: String,
        required: [true, "Ingresa tus apellidos!"]
    },
    email: {
        type: String,
        required: [true, "Ingresa tu correo electrónico!"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Ingresa tu contraseña!"]
    },
    
    role: {
        type: Number,
        required: [true, "Acepta los terminos"]
        
    },
    cedula: {
        type: String,
        required: [true, "Ingresa tu cédula!"]
    },
    telefono: {
        type: String,
        required: [true, "Ingresa tu telefono!"]
    },
    barrio: {
        type: String,
        required: [true, "Ingresa tu barrio!"]
    },
    direccion: {
        type: String,
        required: [true, "Ingresa tu dirección!"]
    },
    genero: {
        type: String,
        required: [true, "Ingresa tu sexo!"]
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)