// src/services/NotificationService.ts
import PushNotification, {
  PushNotificationScheduleObject,
} from 'react-native-push-notification';

class NotificationService {
  configure = () => {
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('Notification:', notification);
      },
      requestPermissions: true,
    });
  };

  scheduleReminder = (message: string, date: Date, id: string) => {
    const notificationConfig: PushNotificationScheduleObject = {
      id: id,
      message: message,
      date: date,
      allowWhileIdle: true,
    };
    PushNotification.localNotificationSchedule(notificationConfig);
  };
}

export default new NotificationService();
