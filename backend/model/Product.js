const mongoose = require('mongoose');
const {Schema} = mongoose;


function generateRandomSKU(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Allowed characters
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

const productSchema = new Schema({
    title: { type : String, required: true, unique: true},
    description: { type : String, required: true},
    price: { type: Number, min:[1, 'wrong min price'], max:[10000, 'wrong max price']},
    discountPercentage: { type: Number, min:[1, 'wrong min discount'], max:[99, 'wrong max discount']},
    rating: { type: Number, min:[0, 'wrong min rating'], max:[5, 'wrong max price'], default:0},
    stock: { type: Number, min:[0, 'wrong min stock'], default:0},
    brand: { type : String, required: true},
    category: { type : String, required: true},
    thumbnail: { type : String, required: true},
    images:{ type : [String], required: true},
    discountPrice: { type: Number},
    deleted: { type : Boolean, default: false},
    
    tags: { type: [String], default: [] }, // Array of Strings
    sku: { type: String, required: true ,default:generateRandomSKU(8)}, // String
    weight: { type: Number, default: 0 }, // Integer
    dimensions: {
      width: { type: Number, default: 0 }, // Float
      height: { type: Number, default: 0 }, // Float
      depth: { type: Number, default: 0 }, // Float
    },
    warrantyInformation: { type: String, default: "" }, // String
    shippingInformation: { type: String, default: "Ships in 1 week" }, // String
    availabilityStatus: { type: String, default: "In Stock" }, // String
    reviews: [
      {
        rating: { type: Number, required: true }, // Integer
        comment: { type: String, default: "" }, // String
        date: { type: Date, default: Date.now }, // Date
        reviewerName: { type: String, required: true }, // String
        reviewerEmail: { type: String, required: true }, // String
      },
    ],
    returnPolicy: { type: String, default: "7 days return policy" }, // String
    minimumOrderQuantity: { type: Number, default: 1 }, // Integer
    meta: {
      createdAt: { type: Date, default: Date.now }, // Date
      updatedAt: { type: Date, default: Date.now }, // Date
      barcode: { type: String, default: "" }, // String
      qrCode: { type: String, default: "" }, // String
    },
})

const virtualId  = productSchema.virtual('id');
virtualId.get(function(){
    return this._id;
})
// we can't sort using the virtual fields. better to make this field at time of doc creation
// const virtualDiscountPrice =  productSchema.virtual('discountPrice');
// virtualDiscountPrice.get(function(){
//     return Math.round(this.price*(1-this.discountPercentage/100));
// })
productSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})


exports.Product = mongoose.model('Product',productSchema)