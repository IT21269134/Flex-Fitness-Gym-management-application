const PaymentController = require('../../controllers/PaymentController');

const router = require('express').Router();

// router.post('/addaddress', addAddress)
// router.post('/addaddress', PaymentController.addAddress)
router.post('/addcard',PaymentController.addCard)
router.get('/getcard/:id', PaymentController.getCard)
router.get('/getallcard', PaymentController.getAllCard)
router.patch('/updatecard/:id', PaymentController.updateCard)
router.delete('/deletecard/:id', PaymentController.deleteCard)
router.post('/addadress', PaymentController.addAddress)
router.get('/getalladdresses', PaymentController.getAllAddresses)
router.get('/getaddress/:id', PaymentController.getSingalAddress)
router.patch('/updateaddress/:id', PaymentController.updateAddress)
router.delete('/deleteaddress/:id', PaymentController.deleteAddress)
router.post('/addexpense', PaymentController.addExpense)
router.get('/getallexpenses', PaymentController.getAllExpenses)
router.delete('/deleteexpense/:id', PaymentController.deleteExpense)
router.patch('/updateexp/:id', PaymentController.updateExpense)
router.get('/getexpense/:id', PaymentController.getSingleExpense)
// router.delete('/deletecard',PaymentController.deleteCard)

module.exports = router;