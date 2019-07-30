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

ROOT_FILES="index.html favicon.ico index.designSystem.html index.unitTest.html index.liveTest.html"
DIR_CSS=css
DIR_IMG=img
DIR_JS=js

echo "Sending files to bucket '$NOTES_APP_WEB_CLIENT_RESOURCES_BUCKET'"
gsutil    cp    ${ROOT_FILES} gs://${NOTES_APP_WEB_CLIENT_RESOURCES_BUCKET}
gsutil -m cp -r ${DIR_CSS}    gs://${NOTES_APP_WEB_CLIENT_RESOURCES_BUCKET}
gsutil -m cp -r ${DIR_IMG}    gs://${NOTES_APP_WEB_CLIENT_RESOURCES_BUCKET}
gsutil -m cp -r ${DIR_JS}     gs://${NOTES_APP_WEB_CLIENT_RESOURCES_BUCKET}

echo
echo

exit 0
