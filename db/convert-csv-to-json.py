import os
import pandas as pd
import regex as re
import json  # Needed to write JSON files

def transform_objectid(text):
    """Replace MongoDB ObjectId references to proper JSON format."""
    return re.sub(r'ObjectId\((.*?)\)', r'{"$oid": "\1"}', text)

def main():
    os.makedirs('db/json', exist_ok=True)
    csv_files = [f for f in os.listdir('db/csv') if f.endswith('.csv')]
    
    all_data = []  # List to collect all data

    for file in csv_files:
        df = pd.read_csv(f'db/csv/{file}')
        for column in df.select_dtypes(include=['object']):
            df[column] = df[column].apply(lambda x: transform_objectid(str(x)) if x else x)
        # Convert DataFrame to a list of dictionaries and extend all_data with these records
        all_data.extend(df.to_dict(orient='records'))
    
    # Write all collected data to a single JSON file
    json_path = 'db/json/all_data.json'
    with open(json_path, 'w') as f:
        json.dump(all_data, f, indent=4)

if __name__ == "__main__":
    main()