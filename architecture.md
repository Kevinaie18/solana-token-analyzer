
# Architecture Documentation — Solana Token Transaction Analyzer

## Overview
The Solana Token Transaction Analyzer is a serverless web application built with React (frontend) and Flask (backend), designed to process Solscan-exported CSVs and analyze token activity. It is installable as a Progressive Web App (PWA) and deployable on Vercel with no manual server provisioning.

---

## 1. System Components

### 1.1 Frontend (React + PWA)
- Built with React using Vite or CRA.
- Includes:
  - `CSVUploader.jsx`: drag-and-drop interface
  - `ParameterForm.jsx`: token address, SOL price, etc.
  - `ResultTable.jsx`: transaction data
  - `WhaleReport.jsx`: wallet breakdown
- Features:
  - Responsive layout
  - CSV + parameter submission
  - Downloadable results
  - Offline support with PWA

### 1.2 Backend (Flask)
- Deployed as a serverless function via `@vercel/python`.
- Single entrypoint: `app.py`
- Modules:
  - `parser.py`: cleans and parses CSV with delimiter detection
  - `analytics.py`: computes prices, market caps, whales
- Endpoints:
  - `POST /api/analyze`: CSV + params → JSON report
  - `GET /api/ping`: health check

---

## 2. Deployment (Vercel)

### 2.1 Routing (`vercel.json`)
```json
{
  "version": 2,
  "builds": [
    { "src": "api/app.py", "use": "@vercel/python" },
    { "src": "frontend/package.json", "use": "@vercel/static-build" }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "api/app.py" },
    { "src": "/(.*)", "dest": "/frontend/$1" }
  ]
}
```

### 2.2 Backend Handling
- Flask app runs as serverless on Vercel.
- `requirements.txt` must be colocated in `/api`.

---

## 3. Directory Structure

```
solana-token-analyzer/
│
├── api/
│   ├── app.py                # Flask entrypoint
│   ├── logic/
│   │   ├── parser.py         # CSV parsing
│   │   ├── analytics.py      # Price + whale logic
│   │   └── config.py         # Constants
│   └── requirements.txt      # Flask, pandas
│
├── frontend/
│   ├── public/
│   │   ├── manifest.json     # PWA manifest
│   │   └── icons/            # PWA icons
│   ├── src/
│   │   ├── App.jsx
│   │   ├── index.js
│   │   ├── api.js
│   │   ├── components/
│   │   │   ├── ParameterForm.jsx
│   │   │   ├── CSVUploader.jsx
│   │   │   ├── ResultTable.jsx
│   │   │   └── WhaleReport.jsx
│   │   └── serviceWorker.js
│   └── package.json
│
├── vercel.json
├── tasks.md
├── architecture.md
├── README.md
```

---

## 4. Data Flow

1. User enters parameters + uploads CSV
2. Frontend sends data via `POST /api/analyze`
3. Flask parses CSV, filters transactions, computes metrics
4. JSON response returned with:
   - Cleaned transactions
   - Whale report
5. Frontend renders tables + export options

---

## 5. Offline Capability

- Uses service worker to cache frontend assets
- Can optionally cache last analysis results
- `manifest.json` makes app installable on desktop/mobile

---

## 6. Development Strategy

This architecture is built to align with atomic, testable steps defined in `tasks.md`. Each step reflects a focused concern:
- Clear file boundaries
- Testable units (routes, components, utilities)
- Seamless local → cloud parity via Vercel

---

## 7. Status

**Ready to implement.**  
Follow `tasks.md` to build MVP incrementally.
