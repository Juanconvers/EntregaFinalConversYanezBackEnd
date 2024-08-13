import { Schema, model } from 'mongoose'

const cartSchema = new Schema({
    products: {
        type: [
            {
                id_prod: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: 'products'
                },
                quantity: {
                    type: Number,
                    required: true
                },
                title: {
                    type: String,
                    required: true,
                    index: true
                },
                description: {
                    type: String,
                    required: true
                },
                price :{
                    type: Number,
                    required: true
                }
            }
        ],
        default: []
    }
})

cartSchema.pre('findOne', async function () {
    this.populate('products.id_prod')
})

const cartModel = model("carts", cartSchema)

export default cartModel