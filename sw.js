importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyCOdpTR_Y-9eQoCJBlZ-OMybckIPqdstQo",
  authDomain: "aao-ecds-1.firebaseapp.com",
  projectId: "aao-ecds-1",
  storageBucket: "aao-ecds-1.firebasestorage.app",
  messagingSenderId: "186213040999",
  appId: "1:186213040999:web:9e8c9fd8e7ac7e3dc065c2"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/blogdesasha/icon-512.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
