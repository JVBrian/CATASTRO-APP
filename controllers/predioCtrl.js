
const Predios = require('../models/predioModel')
const predioCtrl = {
  registerPredio: async (req, res) => {
    try {
      const { codigo, nombre, cedula, area, barrio, direccion } = req.body;

      if (!codigo || !nombre || !area || !cedula || !barrio || !direccion)
        return res
          .status(400)
          .json({ msg: "Por favor rellena todos los campos." });
          const newPredio = new Predios({
            nombre, codigo, area, cedula, direccion, barrio
        })

        await newPredio.save()

        

      res.json({ msg: "Predio registrado correctamente!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getPredioInfor: async (req, res) => {
    try {
        const predio = await Predios.findById(req.predio.id)

        res.json(predio)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
getPrediosAllInfor: async (req, res) => {
  try {
      const predios = await Predios.find()

      res.json(predios)
  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
},
};
module.exports = predioCtrl;
