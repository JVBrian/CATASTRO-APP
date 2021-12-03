const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Ingresa tu nombre!"],
        trim: true
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
        default: 0 // 0 = user, 1 = admin
    },
    cedula: {
        type: Number,
        required: [true, "Ingresa tu cédula!"]
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)