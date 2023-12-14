#!/bin/bash

# this file is copied into the CLI image to automate installing node dependencies

cd backend
npm install --include=dev
cd ../frontend
npm install --include=dev
