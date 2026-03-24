import mongoose from "mongoose";

// notes
// Every document you create in MongoDB gets an _id field automatically.
// By default, this is an ObjectId, a 12-byte unique identifier.
// You don’t need to manually assign IDs — Mongoose handles it when you call Model.create().
// and it looks like
// "_id": "63f9c0a1a2b3c4d5e6f7g8h9"

const problemSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  scheduledTime: { 
    type: Date, 
    required: true 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
}, { timestamps: true });

export default mongoose.model("Problem", problemSchema);