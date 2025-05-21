from flask import Flask, jsonify, request
from logic.parser import parse_csv_auto_delimiter
from logic.analytics import add_token_price_and_market_cap, filter_by_token_address, detect_whale_wallets
import pandas as pd

app = Flask(__name__)

@app.route('/api/ping', methods=['GET'])
def ping():
    return jsonify({"ping": "ok"})

@app.route('/api/analyze', methods=['POST'])
def analyze():
    try:
        # Get CSV data and parameters
        if request.content_type and request.content_type.startswith('multipart/form-data'):
            csv_file = request.files.get('file')
            if not csv_file:
                return jsonify({'error': 'CSV file missing'}), 400
            df = parse_csv_auto_delimiter(csv_file)
            token_address = request.form.get('token_address')
            sol_price = request.form.get('sol_price')
            total_supply = request.form.get('total_supply')
            market_cap_threshold = request.form.get('market_cap_threshold')
        elif request.is_json:
            data = request.get_json()
            csv_data = data.get('csv')
            if not csv_data:
                return jsonify({'error': 'CSV data missing'}), 400
            df = parse_csv_auto_delimiter(csv_data)
            token_address = data.get('token_address')
            sol_price = data.get('sol_price')
            total_supply = data.get('total_supply')
            market_cap_threshold = data.get('market_cap_threshold')
        else:
            return jsonify({'error': 'Unsupported content type'}), 415

        # Validate required parameters
        if not all([token_address, sol_price, total_supply, market_cap_threshold]):
            return jsonify({'error': 'Missing required parameters'}), 400

        # Process data
        df = add_token_price_and_market_cap(df, sol_price, total_supply)
        df = filter_by_token_address(df, token_address)
        whale_report = detect_whale_wallets(df, float(market_cap_threshold))

        # Convert DataFrames to dict for JSON response
        response = {
            'cleaned_data': df.to_dict(orient='records'),
            'whale_report': whale_report.to_dict(orient='records')
        }
        return jsonify(response), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True) 