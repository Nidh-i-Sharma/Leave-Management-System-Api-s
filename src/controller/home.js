import { Router } from 'express';
const router = Router();
import Leave from '../modal/leave.js';
import User from '../modal/user.js';

router.post('/apply-leave', async (req, res) => {
  try {
    const { username, leave_type, duration } = req.body;

    const user = await User.findOne({ username });

    const availableLeaves = leave_type === 'Sick' ? user?.sick_leaves : user?.casual_leaves;

    if (duration > availableLeaves) {
      return res.status(400).json({ message: `Insufficient ${leave_type} leaves available` });
    }

    // Create new leave record
    const leave = new Leave({
      user_id: user._id,
      leave_type,
      leave_duration: duration,
      date_from: new Date(req.body.date_from),
      date_to: new Date(req.body.date_to)
    });

    // Update user's leave count for selected leave type
    if (leave_type === 'Sick') {
      user.sick_leaves -= duration;
    } else if (leave_type === 'Casual') {
      user.casual_leaves -= duration;
    }

    await leave.save();
    await user.save();

    res.status(201).json({ message: 'Leave application submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
router.post('/create-user', async (req, res) => {
    try {
      const { username, department } = req.body;
        
      const userName = await User.findOne({ username });
      if(userName) return res.status(400).json({message:'user already exist'})
      // Create new user record
      const user = new User({
        username,
        department
      });
  
      // Save user record to database
      await user.save();
  
      // Send response
      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
});

export default router;