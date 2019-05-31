#! /bin/bash

echo
echo

if [ ! $NOTES_APP_WEB_CLIENT_RESOURCES_BUCKET ]
then
    echo 'Missing value for environment variable $NOTES_APP_WEB_CLIENT_RESOURCES_BUCKET'
    echo
    echo 'Please set variable for uploading to the right bucket using:'
    echo
    echo '    export NOTES_APP_WEB_CLIENT_RESOURCES_BUCKET=<BUCKET>'
    echo
    echo
    exit 1
fi

FILE=index.html

echo "Sending $FILE to '$NOTES_APP_WEB_CLIENT_RESOURCES_BUCKET'"
gsutil cp ${FILE} gs://${NOTES_APP_WEB_CLIENT_RESOURCES_BUCKET}

echo
echo

exit 0
