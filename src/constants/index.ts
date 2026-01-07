// src/constants/index.js

// Firebase Config
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

// ImgBB (Image Hosting) Key
export const imgHostingKey = import.meta.env.VITE_img_hosting_key;

// Payment Gateway (Stripe) Publishable Key
export const paymentGatewayPK = import.meta.env.VITE_Payment_Gateway_PK;
