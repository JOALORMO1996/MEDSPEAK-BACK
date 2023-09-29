const {httpError} = require('../helpers/handleError');
const pacienteModel = require('../models/pacienteModel');


const getPacientes = async (req, res) => {
    try {
      const pacientes = await pacienteModel.getPacientes();
      res.status(200).json(pacientes);
    } catch (e) {
      console.error(error);
      httpError(res, e);
    }
  };

  const pacientePorId = async (req, res) => {
    try {
      const id = req.params.id;
     const paciente = await pacienteModel.pacientePorId(id);
     if (!paciente) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }
  
    res.json(paciente);
  
    } catch (e) {
      httpError(res, e);
    }
  };

  const crearPaciente = async (req, res) => {
    try {
      const { identificacion, nombre, apellido, fecha_nacimiento, telefono, departamento, ciudad, direccion, estado_civil, ocupacion, asegurador, afiliacion, correo } = req.body;
  
   // Verificar si ya existe un paciente con el mismo ID
   const pacienteExistente = await pacienteModel.pacientePorIdentificacion(identificacion);
   if (pacienteExistente) {
     return res.status(409).json({ mensaje: 'El paciente ya se encuentra registrado en el sistema.'});
   }
      // Verificar si ya existe un paciente con el mismo Correo
      const correoExistente = await pacienteModel.pacientePorCorreo(correo);
      if (correoExistente) {
        return res.status(409).json({ mensaje: 'El correo electronico ya se encuentra registrado en el sistema.'});
      }

      const correoValido = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!correoValido.test(correo)) {
        return res.status(400).json({ mensaje: 'Por favor Ingrese una dirección de correo electrónico válida.' });
      }
  
        const paciente = {
          identificacion, 
          nombre,
          apellido, 
          fecha_nacimiento, 
          telefono, 
          departamento, 
          ciudad, direccion, 
          estado_civil, 
          ocupacion, 
          asegurador, 
          afiliacion, 
          correo
        };
      await pacienteModel.crearPaciente(paciente);
      res.json({ mensaje: 'Paciente creado correctamente.' });
    } catch (e) {
      httpError(res, e);
      console.log(e)
    }
  };
  
  const editarPaciente = async (req, res) => {
    try {
      const { id } = req.params; 
      const { identificacion, nombre, apellido, fecha_nacimiento, telefono, departamento, ciudad, direccion, estado_civil, ocupacion, asegurador, afiliacion, correo } = req.body;
  
      // Verificar si el paciente existe en la base de datos
      const pacienteExistente = await pacienteModel.pacientePorId(id);
    
      if (!pacienteExistente) {
        return res.status(404).json({ mensaje: 'El paciente no se encuentra en el sistema.'});
      }
  
      // Verificar si ya existe otro paciente con el mismo Correo
      const correoExistente = await pacienteModel.pacientePorCorreo(correo);
      // Verificar que el correo existente sea diferente del correo a actualizar
      if (correoExistente && correoExistente.id != id) {
        return res.status(409).json({ mensaje: 'El correo electrónico ya se encuentra registrado en el sistema.'});
      }

      const correoValido = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!correoValido.test(correo)) {
        return res.status(400).json({ mensaje: 'Por favor Ingrese una dirección de correo electrónico válida.' });
      }
  
      // Crear un objeto con los campos actualizados del paciente
      const pacienteActualizado = {
        id,
        identificacion, 
        nombre,
        apellido, 
        fecha_nacimiento, 
        telefono, 
        departamento, 
        ciudad, direccion, 
        estado_civil, 
        ocupacion, 
        asegurador, 
        afiliacion, 
        correo
      };
  
      // Actualizar el paciente en la base de datos
      await pacienteModel.editarPaciente(pacienteActualizado);
      
      
      res.json({ mensaje: 'Paciente actualizado correctamente.' });
    } catch (e) {
     
      console.error(e);
      res.status(500).json({ mensaje: 'Error al procesar la solicitud' });
    }
  };

  const inactivarPaciente = async( req, res) => {
    const { id } = req.params;
    try {
      await pacienteModel.inactivarPaciente(id);
      res.json({ mensaje: 'Paciente inactivado correctamente' });
    } catch (error) {
      console.error('Error al inactivar el paciente:', error);
      res.status(500).json({ mensaje: 'Error al inactivar el paciente' });
    }
  };

  const activarPaciente = async( req, res) => {
    const { id } = req.params;
    try {
      await pacienteModel.activarPaciente(id);
      res.json({ mensaje: 'Paciente inactivado correctamente' });
    } catch (error) {
      console.error('Error al inactivar el paciente:', error);
      res.status(500).json({ mensaje: 'Error al inactivar el paciente' });
    }
  };


  const getEstadoCivil = async (req, res) => {
    try {
      const estado_civil = await pacienteModel.getEstadoCivil();
      res.status(200).json(estado_civil);
    } catch (e) {
      console.error(error);
      httpError(res, e);
    }
  };

  module.exports = {
    getPacientes,
    pacientePorId,
    crearPaciente,
    editarPaciente,
    inactivarPaciente,
    activarPaciente,
    getEstadoCivil
    
  };