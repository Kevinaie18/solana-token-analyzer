from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import io
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

def validate_csv_data(df):
    """Validate the structure and content of the CSV data."""
    required_columns = ['time', 'token_value', 'wallet', 'market_cap']
    if not all(col in df.columns for col in required_columns):
        return False, f"Missing required columns. Required: {', '.join(required_columns)}"
    
    # Check for non-numeric values in numeric columns
    numeric_columns = ['token_value', 'market_cap']
    for col in numeric_columns:
        if not pd.to_numeric(df[col], errors='coerce').notnull().all():
            return False, f"Column '{col}' contains non-numeric values"
    
    return True, None

@app.route('/api/analyze', methods=['POST'])
def analyze():
    try:
        logger.info("Received analysis request")
        
        # Check if file is present
        if 'file' not in request.files:
            logger.error("No file uploaded")
            return jsonify({'error': 'No file uploaded'}), 400
        
        file = request.files['file']
        if file.filename == '':
            logger.error("No file selected")
            return jsonify({'error': 'No file selected'}), 400

        # Get parameters with defaults
        try:
            min_token_value = float(request.form.get('min_token_value', 0))
            min_market_cap = float(request.form.get('min_market_cap', 0))
            whale_threshold = float(request.form.get('whale_threshold', 0))
        except ValueError as e:
            logger.error(f"Invalid parameter values: {str(e)}")
            return jsonify({'error': 'Invalid parameter values'}), 400

        # Read CSV file
        try:
            df = pd.read_csv(file)
            logger.info(f"Successfully read CSV file with {len(df)} rows")
        except Exception as e:
            logger.error(f"Failed to read CSV: {str(e)}")
            return jsonify({'error': f'Invalid CSV format: {str(e)}'}), 400

        # Validate data
        is_valid, error_message = validate_csv_data(df)
        if not is_valid:
            logger.error(f"Data validation failed: {error_message}")
            return jsonify({'error': error_message}), 400

        # Filter data
        df = df[
            (df['token_value'] >= min_token_value) &
            (df['market_cap'] >= min_market_cap)
        ]
        logger.info(f"Filtered data to {len(df)} rows")

        # Convert to list of dicts for JSON response
        cleaned_data = df.to_dict('records')

        # Calculate whale analysis
        whale_data = df[df['token_value'] >= whale_threshold].groupby('wallet')['token_value'].sum()
        whale_analysis = [
            {'wallet': wallet, 'sol_spent': float(amount)}
            for wallet, amount in whale_data.items()
        ]
        whale_analysis.sort(key=lambda x: x['sol_spent'], reverse=True)
        logger.info(f"Found {len(whale_analysis)} whale wallets")

        return jsonify({
            'cleaned_data': cleaned_data,
            'whale_analysis': whale_analysis,
            'timestamp': datetime.now().isoformat()
        })

    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}", exc_info=True)
        return jsonify({'error': 'An unexpected error occurred'}), 500

@app.route('/api/ping', methods=['GET'])
def ping():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 