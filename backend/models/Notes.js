//imports
const mongoose = require('mongoose')
const { Schema } = mongoose;

//define schemas
const NoteSchema = new Schema({

    //link to user with their own notes
    user:
    {
        type:mongoose.Schema.Types.ObjectId,  //like foreign key
        ref: 'user'
    },

    title:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    tag:{
        type: String,
        required: true,
        default: 'General'

    },
    date:{
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('notes', NoteSchema);