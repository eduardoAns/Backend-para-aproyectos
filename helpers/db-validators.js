
const Rol = require('../models/rol');
const Usuario = require('../models/usuario');


const esRolValido = async (rol = '') => {
    const existeRol = await Rol.findOne({rol});
    if (!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}

const existeEmail = async (correo = '') =>{
    //verificar si el correo existe
    const Email = await Usuario.findOne({correo});
    if(Email) {
        throw new Error(`el correo: ${correo}, ya esta registrado`)
    }
}

const existeUsuarioPorId = async (id) =>{
    //verificar si el id existe
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario) {
        throw new Error(`el id ${id} no existe`);
    }
}

module.exports={
    esRolValido,
    existeEmail,
    existeUsuarioPorId
}



