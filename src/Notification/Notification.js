const {v4} = require("uuid");
const { EventEmitter } = require("events");

function Notification(options, notificationManager) {
  EventEmitter.call(this);
  this.id = v4();
  this.options = options;
  this.notificationManager = notificationManager;
}

// Inherit methods from EventEmitter
Notification.prototype = Object.create(EventEmitter.prototype);
Notification.prototype.constructor = Notification;

/**
 * Asks the NotificationManager to remove this notification.
 */
Notification.prototype.close = function() {
  this.notificationManager.destroyNotification(this);
};

/**
 * Returns the processed template source.
 *
 * @returns {string}
 */
Notification.prototype.getSource = function() {
  if (!this.options.content) return '';
  var firstClosingTagIndex = this.options.content.indexOf('>');
  var idAttribute = ' data-notification-id="' + this.id + '"';
  var output = [
    this.options.content.slice(0, firstClosingTagIndex),
    idAttribute,
    this.options.content.slice(firstClosingTagIndex)
  ];
  return output.join('');
};




module.exports = Notification;
