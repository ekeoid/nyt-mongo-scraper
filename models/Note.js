const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object

const NoteSchema = new Schema({
  
  title: {
    type: String
  },

  body: {
    type: String
  },

  created: {
    type: Date,
    default: Date.now()
  }
    
});

// This creates our model from the above schema, using mongoose's model method
const Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;