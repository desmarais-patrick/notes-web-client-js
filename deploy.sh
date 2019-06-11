#! /bin/bash

echo
echo

if [ ! $NOTES_APP_WEB_CLIENT_RESOURCES_BUCKET ]
then
    echo 'Missing value for environment variable:'
    echo '    $NOTES_APP_WEB_CLIENT_RESOURCES_BUCKET'
    echo
    echo 'Please set variable for uploading to the right bucket using:'
    echo
    echo '    export NOTES_APP_WEB_CLIENT_RESOURCES_BUCKET=<BUCKET_NAME>'
    echo '    where <BUCKET_NAME> could be: notes-55123-client-resources'
    echo
    echo 'Please also make sure your Google Cloud project is set correctly.'
    echo 'See README.md for more details.'
    echo
    echo
    exit 1
fi

ROOT_FILE_1=index.html
ROOT_FILE_2=favicon.ico
DIR_1=css
DIR_2=img
DIR_3=js

echo "Sending $FILE to '$NOTES_APP_WEB_CLIENT_RESOURCES_BUCKET'"
gsutil cp ${ROOT_FILE_1} ${ROOT_FILE_2} gs://${NOTES_APP_WEB_CLIENT_RESOURCES_BUCKET}
gsutil cp -r ${DIR_1} gs://${NOTES_APP_WEB_CLIENT_RESOURCES_BUCKET}
gsutil -m cp -r ${DIR_2} gs://${NOTES_APP_WEB_CLIENT_RESOURCES_BUCKET}
gsutil cp -r ${DIR_3} gs://${NOTES_APP_WEB_CLIENT_RESOURCES_BUCKET}

echo
echo

exit 0
