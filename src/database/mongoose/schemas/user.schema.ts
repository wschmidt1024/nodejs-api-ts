import mongoose, { Model, ObjectId } from 'mongoose';

export interface IUserDocument extends mongoose.Document {
	_id: ObjectId;
	first: string;
	last: string;
	email: string;
	username: string;
	password: string;
}

export const UserSchema = new mongoose.Schema({
	first: { type: String, required: true },
	last: { type: String, required: true },
	email: { type: String, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true }
});

const UserModel: Model<IUserDocument> = mongoose.model<IUserDocument>('user', UserSchema);
export default UserModel;
