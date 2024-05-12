import mongoose, { Document, Schema, Model} from 'mongoose';

interface IEvent extends Document{
    name: string;
    place: string;
    date: string;
    time: string;
    organizer: string;
    price: string;
    capacity?: string;
}

const EventSchema: Schema<IEvent> = new mongoose.Schema({
    name: {type: String, required: true},
    place: {type: String, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true},
    organizer: {type: String, required: true},
    price: {type: String, required: true},
    capacity: {type: String, required: false}
})

export const Event: Model<IEvent> = mongoose.model<IEvent>('Event', EventSchema);