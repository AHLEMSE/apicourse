import { Router } from "express"
import { productsCollection } from "../models/index.js"
import moment from 'moment'
export default ({ config, db }) => {
    let router = Router()

    // TO retrieve all products where one of his tags is 'Electronic'
    // amani boutiche khorf

    //To retrieve all products where price > 30
    //Dib mehdi mouad

    //Add a field into all products 
    //which is 'stocked' true or false (if stock > 0 true else false)
    //afaf mouffok meliani dahmani
    router.get('/last_month', async (req, res) => {
        try {
            console.log('test')
            const products = await productsCollection.aggregate([
                {
                    $lookup: {
                        from: 'orders',
                        localField: '_id',
                        foreignField: 'products.product_id',
                        as: 'orders'
                    }
                },
                {
                    $unwind: '$orders'
                },
                {
                    $unwind: '$orders.products'
                },
                {
                    $match: {
                        $expr: { $eq: ["$_id", "$orders.products.product_id"] }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        'orders.createdAT': 1,
                        'orders.products': 1
                    }
                },
                {
                    $match: {
                        'orders.createdAT': { $gt: moment().subtract(1, 'month').toDate() }
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        sum_quantity: { $sum: "$orders.products.quantity" },
                        grouped_orders: { $push: "$orders" }
                    }
                },
            ])
            console.log(products)
            res.send(products)
        } catch (e) {
            res.send(e)
        }
    })
    return router;

}
// POST /products
/*router.post('/', async (req, res) => {
    let BreakException = { message: 'My error ! Please fill all info required' };
    try {

        const newProduct = req.body;
        if (newProduct.name && newProduct.price && newProduct.stock && newProduct.category) {
            await productsCollection.create(newProduct).then(response => {
                res.send({ success: true, payload: response })
            });
        } else {
            throw BreakException
        }
    } catch (error) {
        if (error == BreakException) {
            res.send({ error })
        } else if (error && error.code === 11000) {
            res.status(400).send({
                success: false,
                message: "Product with this name already exists"
            })
        } else {
            res.status(500).send({
                success: false,
                message: error && error.errorResponse ? error.errorResponse.errmsg : "Error"
            })
        }
    }
});*/


/*// Unwind the productDetails array
{ $unwind: { path: "$productDetails", preserveNullAndEmptyArrays: true } },

// Group by product and calculate total quantity ordered
{
    $group: {
        _id: "$productDetails._id",
        name: { $first: "$productDetails.name" },
        category: { $first: "$productDetails.category" },
        price: { $first: "$productDetails.price" },
        tags: { $first: "$productDetails.tags" },
        stock: { $first: "$productDetails.stock" },
        totalQuantityOrdered: { $sum: "$products.quantity" }
    }
},

// Sort by total quantity ordered in descending order
{ $sort: { totalQuantityOrdered: -1 } }
]).exec();

console.log("Aggregation results:", results);*/


/*
router.get('/products-users', async (req, res) => {
    try {
        const results = await ordersCollection.aggregate([
            // Unwind the products array
            { $unwind: "$products" },

            // Lookup to get product details
            {
                $lookup: {
                    from: "products",
                    localField: "products.product_id",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },

            // Unwind the productDetails array
            { $unwind: "$productDetails" },

            // Lookup to get user details
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
        
            // Unwind the userDetails array
            { $unwind: "$userDetails" },

            // Group by product and aggregate user details
            {
                $group: {
                    _id: "$productDetails._id",
                    users: {
                        $push: {
                            _id: "$userDetails._id",
                            username: "$userDetails.username",
                            email: "$userDetails.email",
                            age: "$userDetails.age",
                            address: "$userDetails.address",
                            orders: {
                                $push: "$_id" // Add order IDs for each user
                            }
                        }
                    }
                }
            }
        ]).exec();

        res.json(results);
    } catch (error) {
        console.error("Error fetching products with users:", error);
        res.status(500).json({ message: "An error occurred while fetching the products with users" });
    }
});


return router;
};*/


/*import { Router } from "express"
import { productsCollection } from "../models/index.js"

export default ({ config, db }) => {
    let router = Router()

    // TO retrieve all products
    // POST /product
    router.post('/', async (req, res) => {
        let ErrorException ={ message:'please fill all the info required'}
        try {
            const newProduct = req.body;
            if (newProduct.name && newProduct.price && newProduct.category && newProduct.stock){

            
            await productsCollection.create(newProduct).then(response => {
                res.send({ success:true , payload :response })
            });
        } else {
            throw ErrorException 
        }
        } catch (error) {
            if ( error === ErrorException){
                res.send({error})
            }
            else if (error & error.code === 11000) {
                //res.send({error})
                res.send({ success: false, message: "Product with this name already exists" })
            } else {
                res.status(500).send({ success: false, message: error && error.errorResponse ? error.errorResponse.errmsg : "Error" })
            }
        }
    });

    return router
}*/
/*import { Router } from "express"

export default ({config, db }) => {
    let router = Router()*/

   /* router.get('/', (req, res) => {
        res.status(200).send({
            product_count: 1,
            size: 'L'
        })
    })*/

   /* router.get('/:id([1-9]+)', (req, res) => {
        const { id } = req.params
        //params are in the url after /
        //query params are in the url after ?
        //body is insivible and accessible by body.
        // Regular Expressions
        //Logic of retireving a product from DB
        // const product = { name: 'Shirt', size: 'M' }
        const product = null
        if (!product) {
            res.status(404).send({ message: `Product with id=${id} not found` })
        
    } else {
            res.status(200).send({ product: product })
        }
    })

    router.post('/:id([1-9]+)', (req, res) => {
        // req.params
        // req.query
        // req.body
        const { id } = req.params;
        const { image } = req.body //Body not parsed yet
        //...
        //Do something in DB ...
        //...
        if (!image) {
            res.status(418).send({ message: 'No image sent' })
        }
        //...
        //Do something in DB ...
        //...
        res.status(200).send({
            product: `Image of product with id=${id} inserted`,
        })
    })

    return router
}*/