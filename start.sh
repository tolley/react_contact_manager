#!/bin/bash

gnome-terminal --tab --title="Server" --working-directory="/home/tolley/MyStuff/sites/react_contact_manager/server" --command="gulp dev" --tab --title="Client" --working-directory="/home/tolley/MyStuff/sites/react_contact_manager/client" --command="npm start" --tab --title="Free" --working-directory="/home/tolley/MyStuff/sites/react_contact_manager"

exit 0


