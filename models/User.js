const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true, // this is equal not null in mysql
      lowercase: true,
    },
    items: [
      {
        text: {
          type: String,
          required: true,
        },
        isDone: {
          type: Boolean,
          required: true,
        },
        time: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    //SchemaOptions
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

//due to 'this' you cannot use arrow function
userSchema.virtual('totalTime').get(function () {
  return this.items.reduce((t, item) => t + item.time, 0);
});

module.exports = model('User', userSchema);