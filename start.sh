#!/bin/bash

# rcm

# Find PID of the processing using the port 6379
# lsof -i :6379

gnome-terminal --tab --title="Server" --working-directory="/home/tolley/MyStuff/sites/react_contact_manager/server" --command="gulp dev" --tab --title="Client" --working-directory="/home/tolley/MyStuff/sites/react_contact_manager/client" --command="npm start" --tab --title="Redis Commander" --working-directory="/home/tolley/MyStuff/sites/react_contact_manager/server" --command="redis-commander --redis-port 6379 --port 8989 --address localhost" --tab --title="Free" --working-directory="/home/tolley/MyStuff/sites/react_contact_manager"

exit 0
