import { Router } from "express";
import { usersCollection } from "../models/index.js";

export default ({ config, db }) => {
    let router = Router();

    router.get('/', async (req, res) => {
        try {
            const users = await usersCollection.aggregate([
                {
                    $lookup: {
                        from: "orders",
                        localField: "_id",
                        foreignField: "user",
                        as: "orders",
                    },
                },
                {
                    $match: {
                        $and: [
                            { "orders.1": { $exists: true } },
                            { "orders.products.quantity": { $gte: 2 } },
                        ],

                    },
                },
                {
                    $project: {
                        username: 1,
                        orders: 1
                    }
                }
            ]);
            res.json(users);
        } catch (error) {
            res
                .status(500)
                .json({ message: "an error occurred while fetching the users" });

        }
    })

    return router;
  }

/*
            import { Router } from 'express';
import { usersCollection, ordersCollection } from '../models/index.js';

export default ({ config, db }) => {
    let router = Router();

    // GET all users with 2 or more orders
    router.get('/', async (req, res) => {
        try {
            // Fetch all users and populate their orders
            const users = await usersCollection.find().populate('orders');
            
            // Filter users with 2 or more orders
            const filteredUsers = users.filter(user => user.orders.length >= 2);
            
            res.json(filteredUsers);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // Other user routes here

    return router;
}*/
