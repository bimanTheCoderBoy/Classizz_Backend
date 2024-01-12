const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clasesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  creator: {
    type:  mongoose.Schema.Types.ObjectId,
    ref:"Teacher",
    required: true
  },
  teachers: {
    type: [ mongoose.Schema.Types.ObjectId], 
    ref:"Teacher",
    default: []
  },
  subjects: {
    type: [String], 
    default: []
  },
  subTeacherPair: {
    type: [ {
        teacher:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Teacher"
        },
        subject:{type:String}
    }], 
    default: []
  },

  quizes: {
    type: [mongoose.Schema.Types.ObjectId], 
    ref:"Quiz",
    default: []
  },
  students: {
    type: [mongoose.Schema.Types.ObjectId],
    ref:"Student",
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Class = mongoose.model('Teacher', clasesSchema);

module.exports = Class;
