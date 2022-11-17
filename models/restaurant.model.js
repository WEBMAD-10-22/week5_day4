const { Schema, model } = require('mongoose');

const restaurantSchema = new Schema(
  {
    name: { type: String, trim: true, required: true },
    description: { type: String },
    location: { 
      type: { type: String }, 
      coordinates: [{ type: Number }]
    },
  },
  { timestamps: true, versionKey: false }
);

restaurantSchema.index({ location: '2dsphere' });

const RestaurantModel = model('Restaurant', restaurantSchema);

module.exports = RestaurantModel;

/**
  
  const restaurant = {
    name: "pepe",
    description: "Me encantan las croquetas :D",
    location: { type: 'Point', coordinates: [lng, lat]}
  }

 */
