const fs = require('fs');

module.exports = async function(req, res, next) {
    try {
        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({msg: "Ningun archivo fue cargado."})
            
        const file = req.files.file;

        if(file.size > 1024 * 1024){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "Archivo muy largo"})
        } // 1mb

        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "Formato de archivo incorrecto"})
        }

        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if(err) throw err
    })
}