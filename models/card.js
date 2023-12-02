const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    validate: {
      validator: function (v) {
        // Custom validation for cardNumber format (####-####-####-####)
        return /^\d{4}-\d{4}-\d{4}-\d{4}$/.test(v);
      },
      message: props => `${props.value} is not a valid card number!`
    },
    required: [true, 'Card number is required']
  },
  country: {
    type: String,
    required: [true, 'Country is required']
  },
  cvc: {
    type: String,
    validate: {
      validator: function (v) {
        // Custom validation for cvc format (e.g., "111")
        return /^\d{3}$/.test(v);
      },
      message: props => `${props.value} is not a valid CVC!`
    },
    required: [true, 'CVC is required']
  },
  endDate: {
    type: String,
    validate: {
      validator: function (v) {
        // Custom validation for endDate format (MM/YY)
        return /^(0[1-9]|1[0-2])\/\d{2}$/.test(v);
      },
      message: props => `${props.value} is not a valid expiration date!`
    },
    required: [true, 'Expiration date is required']
  },
  type:{
    type:String,
  }
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
