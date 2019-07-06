import {Schema, model, Document} from 'mongoose'
import IUser from './user.interface'

const userSchema = new Schema ({
  username: {type:String, unique:true, required:true},
  password: {type:String, required:true},
  role: {type:String, required:true, enum:['admin', 'customer']}
}, {timestamps:true})

userSchema.index({username:1})
userSchema.indexes()

const userModel = model<IUser & Document>('User', userSchema)

export default userModel