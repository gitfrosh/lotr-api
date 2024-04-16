import os
import pandas as pd
import regex as re

def transform_objectid(text):
    """Replace MongoDB ObjectId references to proper JSON format."""
    # This pattern captures the contents inside ObjectId()
    pattern = re.compile(r'ObjectId\((.*?)\)')
    # Replace using a function to format as a dictionary object
    return pattern.sub(lambda match: f'{{"$oid": "{match.group(1)}"}}', text)

def main():
    csv_folder = 'db/csv/'
    json_folder = 'db/json/'
    os.makedirs(json_folder, exist_ok=True)
    csv_files = [f for f in os.listdir(csv_folder) if f.endswith('.csv')]
    
    for file in csv_files:
        file_path = os.path.join(csv_folder, file)
        df = pd.read_csv(file_path)
        # Apply transformation to each string column
        for column in df.select_dtypes(include=['object']):
            df[column] = df[column].apply(transform_objectid)
        json_path = os.path.join(json_folder, file.replace(".csv", ".json"))
        # Use pandas to_json method to ensure proper JSON formatting
        df.to_json(json_path, orient='records', lines=True)

if __name__ == "__main__":
    main()