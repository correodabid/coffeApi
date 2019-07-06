import {Schema, model, Document} from 'mongoose'
import IOrder from './order.interface'

const orderSchema = new Schema({
  user_id: {type:Schema.Types.ObjectId, ref:'User', required:true},
  coffee_id: {type:Schema.Types.ObjectId, ref: 'Coffee', required:true},
  amount: Number,
  quantity:{type:Number, required:true}
})

const orderModel = model<IOrder & Document>('Order', orderSchema)
export default orderModel