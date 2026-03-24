import express from "express";
import Problem from "../models/Problem.js";
import authMiddleware from "../middlewares/authMiddle.js";

const router = express.Router();

// basic crud operations on the database 

router.post("/", authMiddleware, async (req, res) => {
  const { title, description, scheduledTime } = req.body;
  try {
    // here a unique id gets assigned automatically when you do modelname.create(); 
    const problem = await Problem.create({
      title,
      description,
      scheduledTime,
      user: req.user._id,
    });
    res.json(problem);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const now = new Date();
    const problems = await Problem.find({
      user: req.user._id,
      scheduledTime: { $lte: now },
    }).sort({ scheduledTime: 1 });
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const problem = await Problem.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!problem) return res.status(404).json({ message: "Problem not found" });
    res.json({ message: "Problem deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;