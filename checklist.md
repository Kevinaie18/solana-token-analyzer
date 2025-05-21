
# MVP Build Checklist – Solana Token Transaction Analyzer

Use this checklist to track progress through the implementation tasks outlined in `tasks.md`.

---

## ✅ PHASE 1: Set Up Project Skeleton

- [x ] 1.1 Create project folders and base files
- [x ] 1.2 Initialize Git repository
- [ x] 1.3 Configure Vercel deployment

---

## ✅ PHASE 2: Implement Flask Backend

- [x ] 2.1 Build minimal Flask app with ping route
- [ x] 2.2 Define backend dependencies
- [x ] 2.3 Accept POST request with CSV and parameters
- [ x] 2.4 Parse CSV file into DataFrame
- [ x] 2.5 Compute token price and market cap
- [x ] 2.6 Filter transactions by token address
- [x ] 2.7 Detect whale wallets below threshold
- [ x] 2.8 Return structured analysis response

---

## ✅ PHASE 3: Build React Frontend (PWA-ready)

- [ ] 3.1 Set up base React app
- [ ] 3.2 Create CSV file upload component
- [ ] 3.3 Build token parameter input form
- [ ] 3.4 Submit data to Flask backend
- [ ] 3.5 Render parsed transactions in a table
- [ ] 3.6 Render whale wallet report
- [ ] 3.7 Show loading and error states
- [ ] 3.8 Enable CSV export of results

---

## ✅ PHASE 4: Add PWA Support

- [ ] 4.1 Create manifest for installability
- [ ] 4.2 Enable service worker for offline support
- [ ] 4.3 Test app install on mobile/desktop

---

## ✅ PHASE 5: QA and Finalization

- [ ] 5.1 Manually test full flow on Vercel
- [ ] 5.2 Add 404 page and basic branding
