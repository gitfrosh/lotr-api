#!/bin/bash

# Script to import JSON files to MongoDB collections
for file in db/json/*.json; do
    # Extract the collection name from the filename
    collection=$(basename "$file" .json)
    echo "Importing $file to collection $collection"
    # Run mongoimport command
    mongoimport --type json --uri "$MONGODB_URI" --collection $collection --file "$file" --drop --maintainInsertionOrder --jsonArray
done