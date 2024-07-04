//imports
const express = require('express')
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');




//ROUTE : 1 fetch all notes : GET "api/notes/fetchallnotes"  -->  login required
router.get('/fetchallnotes', fetchUser, async (request, response) =>
{
    try {

        //find all notes
        const notes = await Notes.find({user: request.user.id})       //pass user id which give through fetchuser
        response.json(notes)     //send response
        
    }
    //catch unexpected error and display into console and send internal error to user
    catch (error) {
        console.error(error.message);
        response.status(500).send("internal server error.....");
    }

})

//ROUTE : 2 add a n ew note : POST "api/notes/addnote"  -->  login required
router.post('/addnote', 
[
    body('title', 'please enter valid title').isLength({ min: 3 }),
    body('description', 'description should be atleast 5 characters').isLength({ min: 5 }),
], 
fetchUser, async (request, response) =>
{
    try {

        //if there are errors return bad request
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
        }

        //destructure
        const {title, description, tag} = request.body;     //this all things inpute by user

        const note = new Notes({title, description, tag, user: request.user.id})    //this all things get in response
        const savedNote = await note.save();    //return notes

        response.json(savedNote)     //send response
            
    } 
    //catch unexpected error and display into console and send internal error to user
    catch (error) {
        console.error(error.message);
        response.status(500).send("internal server error.....");
    }
})

//ROUTE : 3 update existing note : PUT "api/notes/updatenote"  -->  login required
router.put('/updatenote/:id',       //specify user own id
fetchUser, async (request, response) =>
{
    try 
    {
        //destructure
        const {title, description, tag} = request.body;     //this all things inpute by user

        //create updateNote object for store update notes
        const updateNote = {};

        if(title){updateNote.title = title};        //if title is available then update update.title into title
        if(description){updateNote.description = description};
        if(tag){updateNote.tag = tag};

        //find thae note to be update
        let note = await Notes.findById(request.params.id);       //params.id takes this id -> updatenote:id  -- which we want to update

        if(!note)       //note is not exits
        {
            return response.status(404).send("Not Found");
        }

        //if id is not match
        if(note.user.toString() !== request.user.id)        //not.user.toString() give that note id which we want to update
        {
            return response.status(401).send("Not Allowed");
        }

        //update note
        note = await Notes.findByIdAndUpdate(request.params.id, {$set: updateNote}, {new:true} )  //{new:true}  -- new content create

        response.json({note});
    } 
    catch (error) 
    {
        console.error(error.message);
        response.status(500).send("internal server error.....");
    }
    
    
})

//ROUTE : 4 delete existing note : DELETE "api/notes/deletenote"  -->  login required
router.delete('/deletenote/:id',       //specify user own id
fetchUser, async (request, response) =>
{
    try 
    {
        //find the note to be delete
        let note = await Notes.findById(request.params.id);       //params.id takes this id -> deletenote:id  -- which we want to delete
    
        if(!note)       //note is not exits
        {
            return response.status(404).send("Not Found");
        }
    
        //allow deletion  only if user owns not
        if(note.user.toString() !== request.user.id)        //not.user.toString() give that note id which we want to delete
        {
            return response.status(401).send("Not Allowed");
        }
    
        //delete note
        note = await Notes.findByIdAndDelete(request.params.id)

        response.json({"succes":"Your note has been deleted..."});
    } 
    catch (error) 
    {
        console.error(error.message);
        response.status(500).send("internal server error.....");
    }
        
})


module.exports = router