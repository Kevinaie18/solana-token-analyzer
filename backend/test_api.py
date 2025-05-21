import requests
import pandas as pd
import io
import json

BASE_URL = 'http://localhost:5000'

def test_ping():
    """Test the health check endpoint."""
    response = requests.get(f'{BASE_URL}/api/ping')
    print("\nTesting /api/ping:")
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")

def test_analyze():
    """Test the analyze endpoint with sample data."""
    # Create sample data
    data = {
        'time': ['2024-01-01 10:00:00', '2024-01-01 10:01:00', '2024-01-01 10:02:00'],
        'token_value': [100.0, 200.0, 300.0],
        'wallet': ['wallet1', 'wallet2', 'wallet1'],
        'market_cap': [1000000.0, 2000000.0, 3000000.0]
    }
    df = pd.DataFrame(data)
    
    # Convert to CSV
    csv_buffer = io.StringIO()
    df.to_csv(csv_buffer, index=False)
    csv_data = csv_buffer.getvalue()
    
    # Create files and data for request
    files = {
        'file': ('test.csv', csv_data, 'text/csv')
    }
    data = {
        'min_token_value': '150.0',
        'min_market_cap': '1500000.0',
        'whale_threshold': '250.0'
    }
    
    print("\nTesting /api/analyze:")
    try:
        response = requests.post(f'{BASE_URL}/api/analyze', files=files, data=data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to the server. Make sure it's running on http://localhost:5000")

if __name__ == '__main__':
    print("Starting API tests...")
    test_ping()
    test_analyze() 