const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    default: 'student'
  },
  classes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class'
    }
  ],
  quizzes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz'
    }
  ],
  badges: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Badge'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
