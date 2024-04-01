var NotificationContainer = require('./NotificationContainer');
var Notification = require('./Notification');

/**
 * Handles the creation of NotificationContainer and
 * Notifications that get pushed into them.
 *
 * @todo Change to Singleton
 *
 * @constructor
 */
function NotificationManager() {}

NotificationManager.container = null;

NotificationManager.getContainer = function() {
  if (!NotificationManager.container) {
    NotificationManager.container = new NotificationContainer();
  }

  return NotificationManager.container;
};

NotificationManager.destroyNotification = function(notification) {
  if (NotificationManager.container) {
    NotificationManager.container.removeNotification(notification);

    // Once we have no notifications left, destroy the container.
    if (NotificationManager.container.notifications.length === 0) {
      NotificationManager.container.dispose();
      NotificationManager.container = null;
    }
  }
};

NotificationManager.createNotification = function(options) {
  var container = NotificationManager.getContainer();
  var notification = new Notification(options, NotificationManager);

  container.addNotification(notification);

  return notification;
};


module.exports = NotificationManager;
