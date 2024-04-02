import Notification from "./Notification";
import NotificationManager from "./NotificationManager";
import INotificationOptions from "./INotificationOptions";
import NotificationContainer from "./NotificationContainer";

/**
 * Spawns a new notification.
 * Warning: You MUST use this library from another
 * Electron application (after the 'ready' event).
 * If you try to use this from a regular Node app, it
 * will not work.
 *
 * @param {*} [options]
 */
function createNotification(options: INotificationOptions): Notification {
    return NotificationManager.createNotification(options);
}

/**
 * Adds custom CSS to the notification container head.
 *
 * @param {string} css
 */
function setGlobalStyles(css: string) {
    NotificationContainer.CUSTOM_STYLES = css;
}

/**
 * Changes the container's width.
 * @default 300
 *
 * @param {number} width
 */
function setContainerWidth(width: number) {
    NotificationContainer.CONTAINER_WIDTH = width;
}


function setGlobalStyle2App() {


    // OPTIONAL: Set optional container width.
    // DEFAULT: 300
    // setContainerWidth(350);
    setContainerWidth(850);
}


function createMyNotification(options) {

    const myTitleVar = 'Notification title';
    const myBodyVar = 'Notification body';
    const notification = createNotification({
        content: `
  <div class="notification animate__animated animate__fadeInUp">
    <div class="logo">
        <img src="../../src/assets/logo-electron.svg"/>   
    </div>
    <div class="content-wrapper">
      <h1>${myTitleVar}</h1>
      <p>${myBodyVar}</p>
    </div>
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

export {
    setGlobalStyle2App,
    createMyNotification,
    createNotification,
    setContainerWidth,
    setGlobalStyles
};
