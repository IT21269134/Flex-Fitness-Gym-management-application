const express = require('express')




const {
    getproducts,
    getcategories,
    getcat,
    getproduct,
    getsearch,
    getid,
    getsearching,
    getadmin,
    getreview,
    update,
    deletee,
    insert,
    Orderr,
    getOrderlist

} = require ("../../controllers/ProductController")




const productRouter = express.Router();

productRouter.get('/', getproducts)
productRouter.get('/orderList' , getOrderlist)
productRouter.get( '/categories' , getcategories)

productRouter.get( '/Category/:category' ,getcat)


productRouter.get('/id/:id' , getproduct)


productRouter.get('/search/:id' ,getsearch) 


productRouter.get('/:id' , getid)

 productRouter.get('/searching' , getsearching)
 productRouter.get('/cat/product-summary',getadmin )

 productRouter.post('/:id/reviews', getreview)
 productRouter.delete('/delete/:id', deletee)
 productRouter.put('/update/:id', update)
 productRouter.post('/insert', insert)

 productRouter.post('/order' , Orderr)



   



 module.exports =productRouter