
import mongoose from 'mongoose';

let Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    tags: [String],
    stock: { type: Number, required: true }
});

export default productSchema
/*import mongoose from 'mongoose';
let Schema = mongoose.Schema;

const auditSchema = (add, options) => {
    const now = Date.now
    let schema = new Schema({
        createdAt: {
            type: Date,
            default: now
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        updatedAt: {
            type: Date,
            default: now
        },
        updatedBy: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    }, options);

    if (add) {
        schema.add(add);
    }

    return schema;
};

export default auditSchema;*/