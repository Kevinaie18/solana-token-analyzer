import pandas as pd
import io
import csv

def parse_csv_auto_delimiter(csv_input):
    """
    Accepts a file-like object or string containing CSV data.
    Detects delimiter and returns a cleaned pandas DataFrame.
    """
    if hasattr(csv_input, 'read'):
        sample = csv_input.read(4096)
        csv_input.seek(0)
    else:
        sample = str(csv_input)[:4096]

    sniffer = csv.Sniffer()
    try:
        dialect = sniffer.sniff(sample)
        delimiter = dialect.delimiter
    except Exception:
        delimiter = ','  # fallback

    if hasattr(csv_input, 'read'):
        csv_input.seek(0)
        df = pd.read_csv(csv_input, delimiter=delimiter)
    else:
        df = pd.read_csv(io.StringIO(csv_input), delimiter=delimiter)

    # Clean DataFrame: drop empty columns, strip whitespace from headers
    df.columns = [col.strip() for col in df.columns]
    df = df.dropna(axis=1, how='all')
    return df 