import { Router } from "express"
import { ordersCollection, productsCollection } from "../models/index.js"

export default ({ config, db }) => {
    let router = Router()

    //Retrieve all orders where status = 'ordered'
    //hannah lina manar ibtissem

    //Create a new order for product 2001
    //ibtissem boualam chahd malak

    //Create order
    router.post('/', async (req, res) => {
        const newOrder = req.body;
        await ordersCollection.create(newOrder).then(response => {
            res.send({ payload: response })
        });
    });

    router.get('/', async (req, res) => {
        try {
            const orders = await ordersCollection.aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "user",
                        foreignField: "_id",
                        as: "rel_users",
                    },

                },

            ]);
            res.json(orders);
        } catch (error) {
            res
                .status(500)
                .json({ message: "an error occurred while fetching the users" });

        }
    });

    return router;
}