/// ism vo apn ko tractor dikhega ki kesa kya haii   jb owner dalega apna tractor tb
const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
//const owner = require("../models/owner-model");

const tractorSchema = new Schema({
    name: { type: String, required: true },
    model: { type: String, required: true },
    image:{type:String,required:true},
    pricePerDay: { type: Number, required: true },
    phone_number :{type:String, required:true},
    location: { type: String, required: true },
     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    availability: {
        isAvailable: { type: Boolean, default: true },
    //     nextAvailableDate: { type: Date, default: Date.now }
     },
    rentalPeriods: [
        {
            startDate: { type: Date, required: true },
            endDate: { type: Date, required: true }
        }
    ],
});
 
const Tractor = new model("Tractor", tractorSchema);
module.exports = Tractor;
