import mongoose, { Document, Schema, Model} from 'mongoose';

interface IProduct extends Document{
    name: string;
    producer: string;
    price: string;
    quantity?: string;
    origin?: string;
    preorder?: string;
    delivery?: string;
    availability?: string;
    discount?: string;
}

const ProductSchema: Schema<IProduct> = new mongoose.Schema({
    name: {type: String, required: true},
    producer: {type: String, required: true},
    price: {type: String, required: true},
    quantity: {type: String, required: false},
    origin: {type: String, required: true},
    preorder: {type: String, required: false},
    delivery: {type: String, required: false},
    availability: {type: String, required: false},
    discount: {type: String, required: false}
})

export const Product: Model<IProduct> = mongoose.model<IProduct>('Product', ProductSchema);
