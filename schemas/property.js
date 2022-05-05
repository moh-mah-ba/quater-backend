const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        typeOfProperty: { type: String, required: true },
        saleType: { type: String, required: true },
        saleStatus: { type: String, required: true },
        images: { type: Array, required: true },
        video: { type: String},
        city: { type: String, required: true },
        address: { type: String, required: true },
        neighborhood: { type: String, required: true },
        size: { type: Number, required: true },
        rooms: { type: Number, required: true },
        bedrooms: { type: Number, required: true },
        bathrooms: { type: Number, required: true },
        garages: { type: String, required: true },
        yearBuilt: { type: String, required: true },
        available: { type: String, required: true },
        basement: { type: String , required: true },
        extraDetails: { type: String , required: true },
        roofing: { type: String , required: true },
        floorNumber: { type: Number, required: true },
    },
    {
        timestamps: true,
      }
)

module.exports = mongoose.model("property" , propertySchema)