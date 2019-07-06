import {Schema, model, Document} from 'mongoose'
import ICoffe from './coffe.interface'

const coffeSchema = new Schema({
  name: {type:String, unique:true, required:true},
  intensity: {type:Number, required:true},
  price: {type:Number, required:true},
  stock: {type:Number, required:true, min:0}
}, {timestamps:true})

coffeSchema.index({intensity:1})
coffeSchema.indexes()

const coffeModel = model<ICoffe & Document>('Coffee', coffeSchema)

export default coffeModel