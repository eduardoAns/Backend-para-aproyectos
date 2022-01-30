
const { Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete } = require('../controllers/user');
const { esRolValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();
// router.get('path', middleware, controller)
//validar campo delante de los checks para que no continue al controlador si hai algun error en los checks
router.get('/', usuariosGet );


router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),

    validarCampos

],usuariosPut);

router.post('/',[
    // CON CHECK SON LOS ARGUMENTOS OBLIGATORIOS
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('password','el password deve ser de mas de 6 letras').isLength({min:6}),
    check('correo','el correo no es valido').isEmail(),
    check('correo').custom(existeEmail),

    //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost)

router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos

] ,usuariosDelete)


module.exports = router;



