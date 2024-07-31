
import mongoose from 'mongoose';

let Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    address: {
        street: String,
        city: String,
        zipcode: String
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
});
userSchema.index('username')
userSchema.virtual('fullname')
    .get(function () {
        return `${this.firstname} ${this.lastname}`;
    })
    .set(function (v) {
        const [firstname, lastname] = v.split('');
        this.firstname = firstname,
            this.lastname = lastname
    })
export default userSchema
/*import mongoose from 'mongoose';
import auditSchema from './auditSchema.js';

let Schema = mongoose.Schema;

const userSchema = auditSchema({
    id: {
        type: Number,
        index: true,
        unique: true,
        sparse: true
    },
    name: String,
    email: [
        Schema(
            {
                value: {
                    type: String,
                    trim: true,
                    lowercase: true
                }
            },
            { _id: false, strict: false }
        )
    ],
    type: String,
})


export default us*/