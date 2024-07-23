const express = require('express');//creation d une instance app express js 
const Port = 8000
const app = express();
app.use(express.json())
app.get('/products', (req, res)=>{
    //...
    //... get product from database
//...
    res.status(200).send({
        product_count:1,
        size:'L'
    })
}
) 
app.post('/products/:id',(req,res)=> {
    const { id } = req.params;
    const { image } = req.body
    //... 
    //do something in db
    //...
    if(!image){
        res.status(418).send({message:'no image sent'});
    }
    res.status(200).send({
        product: `image of producr with ${id} created`
    })

})
app.listen(
    Port,
    ()=>console.log('Server is RUNNING')
)