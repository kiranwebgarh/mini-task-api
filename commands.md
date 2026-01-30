#!/bin/bash

echo "---- Health Check ----"
curl http://localhost:3000/health

echo -e "\n\n---- Add a New Task ----"
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"checking"}'

echo -e "\n\n---- Get All Tasks ----"
curl http://localhost:3000/tasks

echo -e "\n\n---- Patch Task (Mark Done) ----"
curl -X PATCH http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"done":true}'

echo -e "\n\nDone!"
