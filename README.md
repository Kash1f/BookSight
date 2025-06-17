
# 📚 Book Store App

Discover and manage your favorite books with this full-stack Book Store App! Developed with a modern tech stack including **React Native** for the mobile frontend and **Node.js, Express, and MongoDB** for the backend, this app provides a smooth and efficient book browsing and purchasing experience.

## ✨ Features

* **User-Friendly Interface**: A clean, attractive UI for seamless book discovery and navigation.
* **Book Catalog**: Browse a wide range of books with detailed information and categorization.
* **User Authentication**: Secure login and signup functionality.
* **RESTful API Integration**: Real-time communication with the backend server for data fetching and updates.

## 🛠️ Tech Stack

* **React Native**: Cross-platform mobile development with a single codebase.
* **Node.js & Express.js**: Fast and scalable backend services.
* **MongoDB**: Flexible and powerful NoSQL database for storing books, users, and order data.

## 📁 Folder Structure

```
/book-store-app
  ├── /client             # React Native frontend
  └── /server             # Node.js + Express + MongoDB backend
```

---

## 🚀 Getting Started

🔧 Backend Setup (Node.js + MongoDB)

1. Navigate to the `server` directory:

   ```bash
   cd server
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the backend server:

   ```bash
   npm run dev
   ```

---

##📱 Frontend Setup (React Native)

1. Navigate to the `client` directory:

   ```bash
   cd client
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the Expo development server:

   ```bash
   npx expo start
   ```
4. Use the Expo Go app (iOS/Android) to scan the QR code and run the app on your mobile device.

---

## 🔗 API Overview

* `GET /api/books` - Fetch all books
* `GET /api/books/:id` - Fetch a single book by ID
* `POST /api/auth/register` - Register a new user
* `POST /api/auth/login` - Login user

---

## 🤝 Contributions

Contributions are highly encouraged! If you have suggestions or feature ideas, feel free to open an issue or submit a pull request.

---

## 🙌 Acknowledgments

Thanks to the open-source community behind **React Native**, **Express**, and **MongoDB** for their powerful and accessible development tools.
