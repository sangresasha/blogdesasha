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
  
  // DETECTAMOS SI ES MÓVIL O PC
  const userAgent = self.navigator.userAgent.toLowerCase();
  const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent);

  // Elegimos el sonido según el dispositivo
  let soundToPlay = '/blogdesasha/resident-evil-2-inventario.mp3'; // Tu MP3 personalizado
  if (isMobile) {
    soundToPlay = 'default'; // Sonido común del sistema en móviles
  }

  const notificationOptions = {
    body: payload.notification.body,
    icon: '/blogdesasha/icon-512.png',
    sound: soundToPlay,
    tag: 'notificacion-sasha'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
