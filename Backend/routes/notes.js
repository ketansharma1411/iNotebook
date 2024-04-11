const express = require("express");
var forlogin = require("../middleware/forlogin");
const router = express.Router();

//for validation part
const { body, validationResult } = require("express-validator");

//to import notes module
const Notes = require("../models/Notes");

// ROUTE:1 ==> to add notes of logged in user<< api/notes/addnotes/ >>:login required
router.post(
  "/addnotes",
  forlogin,
  [
    body("title").isLength({ min: 3 }),
    body("description").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const { title, description, tags } = req.body;
    //if the validation error occured we  will show this result
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let note = new Notes({
        title,
        description,
        tags,
        user: req.user.id,
      });
      const saveNotes = await note.save();
      res.json(saveNotes);
    } catch (error) {
      res.send("some error occured " + error);
    }
  }
);

// ROUTE:2 ==> to fetch all the notes of logged in user<< api/notes/addnotes/ >>:login required
router.post("/fetchnotes", forlogin, async (req, res) => {
  const note = await Notes.find({ user: req.user.id });
  res.json(note);
});

// ROUTE:3 ==> to update the note of logged in user<< api/notes/updatenote/:id/ >>:login required
router.put("/updatenote/:id", forlogin, async (req, res) => {
  const { title, description, tags } = req.body;
  let newnote = {};
  if (title) {
    newnote.title = title;
  }
  if (description) {
    newnote.description = description;
  }
  if (tags) {
    newnote.tags = tags;
  }
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(401).json({ warning: "note not found" });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ alert: "not allowed" });
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newnote },
      { new: true }
    );
    res.json(note);
  } catch (err) {
    return res.json({ err: "some error occured" });
  }
});

// ROUTE:4 ==> to delete the note of logged in user<< api/notes/deletenote/:id/ >>:login required
router.delete("/deletenote/:id", forlogin, async (req, res) => {
  let note = await Notes.findById(req.params.id);
  try {
    if (!note) {
      return res.status(401).json({ warning: "note not found" });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ alert: "not allowed" });
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: "Note has been deleted successfully" });
  } catch (err) {
    return res.json({ err: "some error occured" });
  }
});
module.exports = router;
