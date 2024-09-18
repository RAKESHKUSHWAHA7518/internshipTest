const express = require('express')

const router = express.Router()
const upload = require("../config/multer")
const  userSignUpController = require('../controller/userSignUp')
const userSignInController = require('../controller/userSignIn')
const userDetailsController = require('../controller/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/userLogout')
const createEmployee= require('../controller/createEmployee')
const getAllEmployees= require('../controller/getEmployee')
const toggleActiveStatus= require('../controller/ActivateandDeativate')
const deleteEmployee= require('../controller/delete')
const editEmployee= require('../controller/editEmployee')
const getEmployees= require('../controller/getEmployee')


router.post("/signup", userSignUpController)
router.post("/signin", userSignInController)
router.get('/user-details',authToken, userDetailsController)
router.get('/userLogout',userLogout)
router.post('/employee', upload.single('image'), createEmployee);
router.get('/employeedata',getAllEmployees)
router.patch('/activate-deactivate/:id',toggleActiveStatus)
router.delete('/delete/:id',deleteEmployee)
router.put('/edit/:id',upload.single('image'),editEmployee)
router.get('/getsorteddata',getEmployees)



module.exports = router