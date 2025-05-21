# Solana Token Transaction Analyzer

A serverless web application that analyzes Solana token transactions from Solscan-exported CSVs. Built with React and Flask, deployable on Vercel.

## Features

- Upload and analyze Solscan CSV exports
- Calculate token prices and market caps
- Identify whale wallets
- Export results as CSV
- Installable as a Progressive Web App (PWA)

## Development

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Setup

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd api
   pip install -r requirements.txt
   ```
3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

### Running Locally

1. Start the backend:
   ```bash
   cd api
   python app.py
   ```
2. Start the frontend:
   ```bash
   cd frontend
   npm start
   ```

## Deployment

The application is configured for deployment on Vercel. Push to the main branch to trigger automatic deployment.

## License

MIT 