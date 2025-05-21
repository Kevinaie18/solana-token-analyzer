# Solana Token Analyzer Backend

This is the backend server for the Solana Token Analyzer application. It provides API endpoints for analyzing token transaction data.

## Setup

1. Make sure you have Python 3.11 installed:
   ```bash
   python3.11 --version
   ```

2. Create a virtual environment:
   ```bash
   python3.11 -m venv venv
   ```

3. Activate the virtual environment:
   ```bash
   # On macOS/Linux:
   source venv/bin/activate
   
   # On Windows:
   .\venv\Scripts\activate
   ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Server

1. Make sure your virtual environment is activated
2. Run the Flask server:
   ```bash
   python app.py
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
- **GET** `/api/ping`
- Returns server health status

### Analyze Data
- **POST** `/api/analyze`
- Accepts CSV file with token transaction data
- Parameters:
  - `file`: CSV file (required)
  - `min_token_value`: Minimum token value to include (default: 0)
  - `min_market_cap`: Minimum market cap to include (default: 0)
  - `whale_threshold`: Threshold for whale analysis (default: 0)

## CSV Format Requirements

The input CSV file must contain the following columns:
- `time`: Transaction timestamp
- `token_value`: Token value in SOL
- `wallet`: Wallet address
- `market_cap`: Market capitalization 