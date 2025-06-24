


import cron from "node-cron";
import { User } from "./models/user.model.js";
import { Planner } from "./models/exercisePlanner.model.js";
import { Exercises } from "./models/status.exercise.model.js";
import { sendNotification } from "./utils/sendNotification.js";

// 1. 🔔 Notify if exercises not completed – at 10am and 7pm daily
cron.schedule('0 10,19 * * *', async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const users = await User.find();

  for (const user of users) {
    const exercises = await Exercises.find({
      userId: user._id,
      'date': today
    });


    if (!exercises) continue;


    const isIncomplete =exercises.some(ex => {
      return (
        ex.status.completedReps < ex.status.totalReps ||
        ex.status.completedSets < ex.status.totalSets
      );
    });

    if (isIncomplete) {
      await sendNotification(user._id, `You still have some workouts to complete today. Let's crush it! 💪`);
    }
  }

  console.log(`[${new Date().toLocaleString()}] Daily workout reminder sent.`);

    
});

// 2. 💡 Notify if premium expired – daily at 12pm
cron.schedule('0 12 * * *', async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const expiredUsers = await User.find({
    premiumExpiry: {
      $lte: today
    }
  });

  for (const user of expiredUsers) {
    user.tier = 'free';
    user.premiumExpiry = null;
    await user.save();

    await sendNotification(user._id, `Your premium has expired. Upgrade now to unlock more features 🚀`);
  }

  const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    const reminderUsers = await User.find({
    tier: 'free',
    premiumExpiry: { $lte: sevenDaysAgo }
    });

    for (const user of reminderUsers) {
    await sendNotification(user._id, `It's been a week! Consider upgrading to premium for personalized nutrition and advanced tracking ✨`);
    }

  console.log(`[${new Date().toLocaleString()}] Checked and downgraded expired premium users.`);
});
