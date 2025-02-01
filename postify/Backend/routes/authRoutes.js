const { signup, login } = require('../controllers/authController');
const { signupValidation, loginValidation } = require('../middleware/authValidation');

const router = require('express').Router();


router.post('/signup',  signupValidation , signup)
router.post('/login',  loginValidation , login)


router.post('/logout', (req, res) => {
    res.send('logout success')
})

module.exports = router;