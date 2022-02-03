importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

const firebaseConfig = {
    apiKey: "AIzaSyBevXIOJuQCkCIEgjlGRdc6LmjHMrozBqg",
    authDomain: "client-330913.firebaseapp.com",
    projectId: "client-330913",
    storageBucket: "client-330913.appspot.com",
    messagingSenderId: "819926568297",
    appId: "1:819926568297:web:489257cd02a4dccc47c1f8",
    measurementId: "G-RH4P1MDW10"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log("Received background message ", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/logo192.png",
    };

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions
    );
});