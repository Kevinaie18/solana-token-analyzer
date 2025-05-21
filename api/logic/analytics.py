import pandas as pd

def add_token_price_and_market_cap(df, sol_price, total_supply):
    """
    Adds 'TOKEN2/USD' and 'Market Cap' columns to the DataFrame.
    Assumes df has an 'Amount2' column (SOL/token value), uses sol_price and total_supply.
    """
    if 'Amount2' not in df.columns:
        raise ValueError("Input DataFrame must have an 'Amount2' column.")
    # Calculate TOKEN2/USD (assuming Amount2 is in SOL)
    df['TOKEN2/USD'] = df['Amount2'] * float(sol_price)
    # Calculate Market Cap
    df['Market Cap'] = df['TOKEN2/USD'] * float(total_supply)
    return df

def filter_by_token_address(df, token_address):
    """
    Filters the DataFrame to keep only rows where the 'Token2' column matches the provided token address.
    """
    if 'Token2' not in df.columns:
        raise ValueError("Input DataFrame must have a 'Token2' column.")
    return df[df['Token2'] == token_address]

def detect_whale_wallets(df, market_cap_threshold):
    """
    Aggregates SOL (Amount2) buys for each wallet ('From') before market cap exceeds threshold.
    Returns a DataFrame of ranked wallets based on SOL spent.
    """
    if 'Market Cap' not in df.columns or 'Amount2' not in df.columns or 'From' not in df.columns:
        raise ValueError("Input DataFrame must have 'Market Cap', 'Amount2', and 'From' columns.")
    # Filter transactions before market cap threshold
    df_before_threshold = df[df['Market Cap'] <= market_cap_threshold]
    # Aggregate SOL (Amount2) buys per wallet
    whale_df = df_before_threshold.groupby('From')['Amount2'].sum().reset_index()
    # Sort by SOL spent in descending order
    whale_df = whale_df.sort_values('Amount2', ascending=False)
    return whale_df 