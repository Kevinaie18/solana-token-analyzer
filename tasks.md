
# MVP Build Plan – Actionable Tasks (One Concern Each)

---

## PHASE 1: Set Up Project Skeleton

### 1.1 – Create project folders and base files
> Create folders `/api` and `/frontend`, and root files `.gitignore` and `README.md`.

### 1.2 – Initialize Git repository
> Run `git init`, commit the folder structure, and prepare for version control.

### 1.3 – Configure Vercel deployment
> Create `vercel.json` with builds and routes for Flask backend and React frontend.

---

## PHASE 2: Implement Flask Backend

### 2.1 – Build minimal Flask app with ping route
> Create `api/app.py` and expose `/api/ping` returning `{"ping": "ok"}`.

### 2.2 – Define backend dependencies
> Add `requirements.txt` in `/api` with `Flask`, `pandas`, and others.

### 2.3 – Accept POST request with CSV and parameters
> Add `/api/analyze` route that receives JSON or multipart form with a CSV and token info.

### 2.4 – Parse CSV file into DataFrame
> In `parser.py`, implement a function that detects delimiter and returns a clean DataFrame.

### 2.5 – Compute token price and market cap
> In `analytics.py`, write function to add `TOKEN2/USD` and `Market Cap` columns per rules.

### 2.6 – Filter transactions by token address
> Add logic to keep only rows where `Token2` matches user input.

### 2.7 – Detect whale wallets below threshold
> Aggregate SOL buys before market cap > threshold and return ranked wallets.

### 2.8 – Return structured analysis response
> Structure and return JSON: `{ cleaned_data, whale_report }`.

---

## PHASE 3: Build React Frontend (PWA-ready)

### 3.1 – Set up base React app
> Use `create-react-app` or Vite inside `/frontend`, verify `npm start`.

### 3.2 – Create CSV file upload component
> Build `CSVUploader.jsx` with drag-and-drop using `react-dropzone`.

### 3.3 – Build token parameter input form
> Create `ParameterForm.jsx` with fields: address, SOL price, supply, cap threshold.

### 3.4 – Submit data to Flask backend
> Bundle CSV + inputs, send POST request to `/api/analyze` via `api.js`.

### 3.5 – Render parsed transactions in a table
> Use `ResultTable.jsx` to display processed rows with pagination.

### 3.6 – Render whale wallet report
> Use `WhaleReport.jsx` to display wallet-level analysis sorted by SOL spent.

### 3.7 – Show loading and error states
> Add spinner during request, and display message if backend returns error.

### 3.8 – Enable CSV export of results
> Add download buttons to export the cleaned table and whale report.

---

## PHASE 4: Add PWA Support

### 4.1 – Create manifest for installability
> Add `manifest.json` with app name, icons, and theme.

### 4.2 – Enable service worker for offline support
> Activate and customize `serviceWorker.js` to cache the frontend.

### 4.3 – Test app install on mobile/desktop
> Confirm PWA can be added to home screen and works offline.

---

## PHASE 5: QA and Finalization

### 5.1 – Manually test full flow on Vercel
> Deploy preview build and verify: upload, analyze, view results, download, install app.

### 5.2 – Add 404 page and basic branding
> Implement `404.jsx`, favicon, and app title for a complete look.
