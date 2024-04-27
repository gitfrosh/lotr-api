import os
import pandas as pd
import regex as re

def transform_objectid(text):
    """Replace MongoDB ObjectId references to proper JSON format."""
    return re.sub(r'ObjectId\((.*?)\)', r'{"$oid": "\1"}', text)

def main():
    os.makedirs('db/json', exist_ok=True)  # Ensure the directory for JSON files exists
    csv_files = [f for f in os.listdir('db/csv') if f.endswith('.csv')]
    
    for file in csv_files:
        df = pd.read_csv(f'db/csv/{file}')
        # Transform all string columns that may contain ObjectId references
        for column in df.select_dtypes(include=['object']):
            df[column] = df[column].apply(lambda x: transform_objectid(str(x)) if x else x)
        # Save each dataframe as a JSON file with all objects in a single array
        json_path = f'db/json/{file.replace(".csv", ".json")}'
        df.to_json(json_path, orient='records', indent=4, ensure_ascii=False)

if __name__ == "__main__":
    main()