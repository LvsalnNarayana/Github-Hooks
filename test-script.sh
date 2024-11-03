#!/bin/bash

# Print all environment variables, each on a new line
echo "Environment Variables:"
printenv | while IFS= read -r line; do
  echo "$line"
done

# List all files in the root directory
echo -e "\nFiles in the root directory (/):"
ls -la /
