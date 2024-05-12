import mongoose, { Document, Schema, Model} from 'mongoose';
import bcrypt from 'bcrypt';
import { Product } from '../model/Product';

const SALT_FACTOR = 10;

interface IProducer extends Document{
    email: string;
    name: string;
    address: string;
    phone: string;
    title: string;
    password: string;
    comparePassword: (candidatePassword: string, callback: (error: Error | null, isMatch: boolean) => void) => void;
}

const ProducerSchema: Schema<IProducer> = new mongoose.Schema({
    email: {type: String, required: true},
    name: {type: String, required: true},
    address: {type: String, required: true},
    phone: {type: String, required: true},
    title: {type: String, required: false},
    password: {type: String, required: true},
})

//hook
ProducerSchema.pre<IProducer>('save', function(next) {
    const producer = this;
    //hash password
    bcrypt.genSalt(SALT_FACTOR, (error, salt) => {
        if(error){
            return next(error);
        }
        bcrypt.hash(producer.password, salt, (err, encrypted) => {
            if(err){
                return next(err);
            } 
            producer.password = encrypted;
            next();
        })
    })
})

ProducerSchema.methods.comparePassword = function(candidatePassword: string, callback: (error: Error | null, isMatch: boolean) => void) : void {
    const producer = this;
    bcrypt.compare(candidatePassword, producer.password, (error, isMatch) => {
        if(error){
            callback(error, false);
        }
        callback(null, isMatch);
    })
}

export const Producer: Model<IProducer> = mongoose.model<IProducer>('Producer', ProducerSchema);