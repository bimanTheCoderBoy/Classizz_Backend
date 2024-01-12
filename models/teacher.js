const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default: 'teacher',
  },
  ownclasses: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Class',
  },
  joinedInstitutes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Teacher',
  },
  otherClasses: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Class',
  },
  myteachers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Teacher',
  },
  sendCollab: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Teacher',
  },
  receivedCollab: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Teacher',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
