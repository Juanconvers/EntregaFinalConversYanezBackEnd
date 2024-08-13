import { Schema, model } from "mongoose";
import cartModel from "./cart.js";

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        
    },
    email: {
        type: String,
        unique: true,
        index: true
    },
    role: {
        type: String,
        default: "User"
    },
    cart_id:{
         type: Schema.Types.ObjectId,
         ref: 'carts'
    },
    documents:{
        type: Object,
        default: []
    },
    last_connection:{
        type: Date 
    }
})

userSchema.pre('save', async function (next) {
    if (this.isNew) {
        try {
            const newCart = await cartModel.create({ products: [] })
            this.cart_id = newCart._id;
        } catch (error) {
        // Si ocurre un error, pásalo al siguiente middleware en la cadena
        //NEXT se usa para continuar
        return next(error)
        }
    }
    next();
});

userSchema.pre(['find', 'findOne'], function (next) {
    try {
        // const prods = await cartModel.findOne({ _id: })
        // console.log(prods)
        this.populate('cart_id')
        next()
    } catch (e) {
        next(e)
    }
})

export const userModel = model("users", userSchema)

export default userModel





// {
//     "first_name": "Juan",
//     "last_name": "Convers",
//     "password": "miyiqenemitabayajepu",
//     "age": 53,
//     "email": "Elmira60@hotmail.com",
//     "role": "Admin"
// }