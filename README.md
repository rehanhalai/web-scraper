# Full-Stack AI Web Scraper & Summarizer

A simple, minimal full-stack monorepo application that accepts a webpage URL, scrapes its text content, and uses the **Google Gemini API** to generate an executive AI summary.

Built with **React (Vite)** on the frontend and **NestJS (TypeScript)** on the backend.

---

## 📁 Monorepo Structure

```
assessment1/
├── README.md               # Setup and execution guide
├── package.json            # Root convenience scripts
├── .gitignore              # Git ignore rules
└── apps/
    ├── api/                # NestJS Backend Application
    │   ├── .env            # Environment configuration (Gemini API Key)
    │   ├── .env.example    # Example environment template
    │   ├── package.json
    │   └── src/
    │       ├── main.ts
    │       ├── app.module.ts
    │       └── scraper/    # Scraper module, controller & service
    └── web/                # React (Vite) Frontend Application
        ├── .env            # Frontend environment (VITE_API_URL)
        ├── .env.example    # Frontend environment template
        ├── index.html
        ├── package.json
        ├── vite.config.js
        └── src/
            ├── main.jsx
            ├── App.jsx     # High-level orchestrator
            ├── App.css     # Warm human styling
            ├── index.css   # Tokens & typography
            └── components/ # Modular UI components
```

---

## ⚙️ Prerequisites

- **Node.js**: v18.0.0 or later (v20+ recommended, Node 18+ provides native `fetch`)
- **npm**: v9.0.0 or later

---

## 🔑 Environment Configuration (.env)

### 1. Backend (`apps/api/.env`)
The backend uses the **Google Gemini API** (`gemini-2.5-flash`).

1. Get a free API key at [Google AI Studio](https://aistudio.google.com/apikey).
2. Edit **`apps/api/.env`**:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   PORT=3000
   ```

### 2. Frontend (`apps/web/.env`)
Configures the backend API URL for the React app:
```env
VITE_API_URL=http://localhost:3000
```

> **Note:** A placeholder `.env` and template `.env.example` are already created in `apps/api/`. If you run the app with the placeholder key, the backend will successfully scrape the webpage and provide instructions on where to add your API key.

---

## 🚀 Running the Application Locally

You can run both apps either using the root helper commands or by navigating into each app directory.

### Option 1: From the Root Directory (Recommended)

1. **Install all dependencies (single command)**:
   ```bash
   npm run install:all
   ```

2. **Start both Backend and Frontend together**:
   ```bash
   npm run dev
   ```
   *(Or run them individually via `npm run dev:api` and `npm run dev:web`)*

---

### Option 2: Running Independently

#### 1. Backend (NestJS)
```bash
cd apps/api
npm install
npm run start:dev
```
- API Base URL: `http://localhost:3000`
- Summarize Endpoint: `POST http://localhost:3000/scraper/summarize`

#### 2. Frontend (React + Vite)
```bash
cd apps/web
npm install
npm run dev
```
- Open browser at `http://localhost:5173`

---

## 🧪 Testing

Run backend unit and integration tests:

```bash
# From root
npm test

# Or directly in apps/api
cd apps/api && npm test
```

Build both frontend and backend for production:

```bash
npm run build
```

---

## 🔌 API Reference

### `POST /scraper/summarize`

Receives a target URL, extracts text from the HTML, and summarizes it using Gemini.

**Request Body:**
```json
{
  "url": "https://en.wikipedia.org/wiki/Artificial_intelligence"
}
```

**Response (200 OK):**
```json
{
  "url": "https://en.wikipedia.org/wiki/Artificial_intelligence",
  "textLength": 5420,
  "summary": "Artificial intelligence (AI) is the intelligence of machines or software, as opposed to the intelligence of living beings..."
}
```

---

## 💡 Design Highlights

- **Zero Heavy Third-Party Scraping Bloat**: Uses native Node.js `fetch` and lightweight regex tag stripping. No Puppeteer, Cheerio, or headless browser overhead.
- **REST-based Gemini Integration**: Directly calls the Google Generative Language REST API without bulky SDKs.
- **Modern UI**: Dark-mode palette, glassmorphism cards, responsive layout, loading indicator, one-click sample URLs, and one-click copy to clipboard.
