# AI Agent


This project is part of the **“Software Development – From Saudi Arabia to Germany”** program, within the **AI‑Powered Web Development with React** track.


---

## 🚀 Features

* **🤖 AI Chat Interface**: Converse with OpenAI's GPT-4o-mini model in real time.
* **🎙️ Audio Transcription**: Upload audio files and get transcriptions powered by OpenAI's Whisper API.
* **🔑 API Key Management**: Securely store, update, and delete your OpenAI API keys via Firebase.
* **🔐 User Authentication**: Email/password and Google sign-in, backed by Firebase Auth.
* **🌓 Dark/Light Mode**: Toggle UI themes with persistent user preferences.
* **📱 Responsive Design**: Adaptive layouts and collapsible sidebar for mobile and desktop.
* **🔄 Persistent State**: Conversations, settings, and API keys saved in browser local storage.
* **📝 Markdown Support**: Chat responses rendered with Markdown formatting.
* **📋 Copy Functionality**: One-click copy for both chat messages and transcriptions.

---

## 🛠️ Tech Stack

* **Frontend**: React 19, Vite 6, Tailwind CSS 4
* **Routing**: React Router 7
* **State Management**: React Context + useReducer
* **Data Fetching**: TanStack Query (React Query)
* **Authentication & DB**: Firebase Authentication
* **AI Services**: OpenAI API (GPT-4o-mini, Whisper)
* **Markdown**: React Markdown
* **Notifications**: React Toastify
* **Icons**: Heroicons & React Icons
* **UI Components**: Headless UI

---

## 📂 Project Structure

```
ai-agent/
├── public/                  # Static assets, favicons, index.html
├── src/
│   ├── components/          # Shared and feature-specific React components
│   ├── context/             # React Context providers (Auth, App state)
│   ├── hooks/               # Custom hooks (useChat, useTranscription)
│   ├── pages/               # Route page components (Home, Login, Register)
│   ├── services/            # API integration services (openai.js)
│   ├── utils/               # Utility functions (formatting, validation)
│   ├── config/              # Firebase and environment configuration
│   ├── router/              # Route definitions and PrivateRouter
│   ├── App.jsx              # Main app component and layout
│   └── main.jsx             # Entry point
├── .env                     # Environment variables (gitignored)
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
└── tailwind.config.js       # Tailwind CSS configuration
```

---

## 🔧 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/nawaf110005/ai-agent.git
   cd ai-agent
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or yarn install
   ```

3. **Configure environment**

   * Copy `.env.example` to `.env`
   * Fill in your Firebase and OpenAI API credentials.

4. **Start development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📖 Usage

* **Sign Up / Sign In**: Register a new account or sign in with Google.
* **Chat**: Navigate to the Chat tab to interact with the AI.
* **Transcription**: Upload audio files (.mp3, .wav) and view generated text.
* **Profile**: Manage your OpenAI API key or sign out.
* **Theme**: Use the toggle switch in the sidebar to switch between dark and light modes.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🎓 Acknowledgements

* SDA Bootcamp instructors and mentors
* [OpenAI](https://openai.com) for their powerful APIs
* The open-source community for React, Tailwind, and Firebase tools
