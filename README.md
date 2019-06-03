# Web Client

This JavaScript Web client interfaces with API server and file servers.
The following instructions have been divided into:

 - [Project Structure](#project-structure)
 - [Deploy](#deploy)
 - [Running locally](#running-locally)
 - [Running tests](#running-tests)
 - [Troubleshooting](#troubleshooting)
 - [References](#references)

See also mother [notes](https://github.com/desmarais-patrick/notes) repo for global information about the project.


## Project Structure

| Name                        | Description                                  |
|-----------------------------|----------------------------------------------|
| deploy.sh                   | Script to deploy to Google Cloud Storage.    |
| index.html                  | App home page                                |

<!-- TODO How to point to different API URLs. -->


[Back to top ↑](#)


## Deploy

### Setup

Create a storage bucket, say `notes-123456-client-resources` with bucket-level permissions.

To set permissions to public [[1](#references)], add permission for `allUsers` with *Storage Legacy Object Reader* (no listing necessary).

### Steps

Run the deploy script:

```
NOTES_APP_WEB_CLIENT_RESOURCES_BUCKET=notes-123456-client-resources
./deploy.sh
```

### Clean-up

Remote the storage bucket from your Google Cloud project, or delete your Google Cloud project.

<!-- TODO Review versioning considerations. -->
<!-- TODO Review caching considerations. -->

<!-- Consider doing fake authentication with client-side secret, at first. -->
<!-- TODO Error logging considerations as with Sentry.io -->


[Back to top ↑](#)


## Running locally

To run a basic Web server using Python ([[2](#references)], [[3](#references)]), run the following command in folder containing `index.html`:

```
python -m SimpleHTTPServer 8000
```

With Python 3, command is a bit different:

```
python -m http.server 8000
```

Visit `http://localhost:8000/` in your favorite browser. 🤗


[Back to top ↑](#)


## Running tests

No tests have been implemented yet. 😕

<!-- TODO Unit tests -->
<!-- TODO Preview project styles, components and animations. Like UXPin ad. -->


[Back to top ↑](#)


## Troubleshooting

No troubleshooting advice has been recorded yet. 😕


[Back to top ↑](#)


## References

 [1] Google Cloud. *Making data public*.
     https://cloud.google.com/storage/docs/access-control/making-data-public

 [2] Python. *SimpleHTTPServer*
     https://docs.python.org/2/library/simplehttpserver.html

 [3] Python. *http.server*
     https://docs.python.org/3/library/http.server.html

[Back to top ↑](#)
