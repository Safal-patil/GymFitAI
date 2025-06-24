
import admin from './firebase';
import { User } from '../models/user.model';
const sendNotification = async (userId, message) => {
  try {
    const user = await User.findById(userId);
    if (!user || !user.deviceToken) {
      console.log(`❌ No device token for user ${userId}`);
      return;
    }

    const payload = {
      notification: {
        title: "FitNation Reminder 💪",
        body: message,
        sound: "default",
      },
      data: {
        userId: String(userId),
      },
      token: user.deviceToken,
    };

    const response = await admin.messaging().send(payload);
    console.log(`✅ Notification sent to ${userId}:`, response);
  } catch (err) {
    console.error(`🔥 Error sending notification to ${userId}:`, err.message);
  }
};

module.exports = sendNotification;
