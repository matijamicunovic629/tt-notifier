const NotificationManager = require("./NotificationManager")
const NotificationContainer = require("./NotificationContainer")
/**
 * Spawns a new notification.
 * Warning: You MUST use this library from another
 * Electron application (after the 'ready' event).
 * If you try to use this from a regular Node app, it
 * will not work.
 *
 * @param {*} [options]
 */
function createNotification(options) {
  return NotificationManager.createNotification(options);
}

/**
 * Adds custom CSS to the notification container head.
 *
 * @param {string} css
 */
function setGlobalStyles(css) {
  NotificationContainer.CUSTOM_STYLES = css;
}
/**
 * Changes the container's width.
 * @default 300
 *
 * @param {number} width
 */
function setContainerWidth(width) {
  NotificationContainer.CONTAINER_WIDTH = width;
}


function setGlobalStyle2App() {


  // OPTIONAL: Set optional container width.
  // DEFAULT: 300
  setContainerWidth(350);
  // OPTIONAL: Set custom styles.
  setGlobalStyles(`
    * {
      font-family: Helvetica;
    }
    .notification {
      display: block;
      padding: 20px;
      background-color: #fff;
      border-radius: 12px;
      margin: 10px;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      transition: 1s all;
    }
    .notification h1 {
      font-weight: bold;
    }
  `);

}


function createMyNotification(options) {

  const myTitleVar = 'Notification title';
  const myBodyVar = 'Notification body';
  const notification = createNotification({
    content: `
  <div class="notification animated fadeInUp">
    <h1>${myTitleVar}</h1>
    <p>${myBodyVar}</p>
  </div>
`,
    // timeout: 3000,
  });


  // When the notification was clicked.
  notification.on("click", () => {
    notification.close();
  });

  // When the notification was closed.
  notification.on("close", () => {
    console.log("Notification has been closed");
  });


}

module.exports = {
  setGlobalStyle2App,
  createMyNotification,
  createNotification,
  setContainerWidth,
  setGlobalStyles
};
