import os
import pandas as pd
import json
import regex as re

def transform_objectid(text):
    """Replace MongoDB ObjectId references to proper JSON format."""
    # Use non-capturing group and directly format the string with $oid.
    pattern = r'ObjectId\(([^)]+)\)'
    replacements = re.findall(pattern, text)
    for r in replacements:
        text = text.replace(f'ObjectId({r})', f'{{"$oid": "{r}"}}')
    return text

def main():
    os.makedirs('db/json', exist_ok=True)  # Ensure the directory for JSON files exists
    csv_files = [f for f in os.listdir('db/csv') if f.endswith('.csv')]
    
    for file in csv_files:
        df = pd.read_csv(f'db/csv/{file}')
        # Transform all string columns that may contain ObjectId references
        for column in df.select_dtypes(include=['object']):
            df[column] = df[column].apply(lambda x: transform_objectid(str(x)) if pd.notna(x) else x)
        # Convert transformed string JSON to actual JSON objects
        for column in df.select_dtypes(include=['object']):
            df[column] = df[column].apply(lambda x: json.loads(x) if pd.notna(x) and x.startswith('{') else x)
        # Save each dataframe as a JSON file with all objects in a single array
        json_path = f'db/json/{file.replace(".csv", ".json")}'
        df.to_json(json_path, orient='records', indent=4)

if __name__ == "__main__":
    main()