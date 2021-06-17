export function swDev() {
  let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  navigator.serviceWorker.register(swUrl).then((res) => {
    console.warn("res", res);
  });
}

export function showNotification(message) {
  Notification.requestPermission(function (result) {
    if (result === "granted") {
      navigator.serviceWorker.ready.then(function (registration) {
        registration.showNotification("Gift Card Shop", {
          body:
            message.sendTime +
            "\nNew Message From: " +
            message.senderName +
            "\n" +
            message.body,
          icon: "./android-chrome-192x192.png",
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: new Date(),
        });
      });
    }
  });
}
