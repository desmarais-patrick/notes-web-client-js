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
| *css*/                      | Styles                                       |
| *img*/                      | Image resources                              |
| *img/favorites-icons*/      | Secondary favorites icons (Chrome, iOS, etc.)|
| *js*/                       | JavaScript                                   |
| *js/communication*/         | Module to communicate with API server        |
| *js/config*/                | Module to divide environment settings        |
| *js/model*/                 | Module to cache objects and keep data logic  |
| *js/test*/                  | Module to test with `*.test.js`              |
| *js/test/mocks*/            | Module to re-use mock classes for tests      |
| *js/view*/                  | Module to render views: pages and components |
| *js/viewModel*/             | Module to hold model for views               |
| *js*/index.js               | App root script for structure                |
| *js*/main.js                | App entry point and initialization           |
| *js*/main.liveTest.js       | App live tests entry point                   |
| *js*/main.test.js           | App tests initialization                     |
| *js*/main.unitTest.js       | App unit tests entry point                   |
| deploy.sh                   | Deployment script                            |
| favicon.ico                 | Default favorites icon                       |
| index.html                  | App launch page                              |
| index.liveTest.html         | Live test launch page                        |
| index.unitTest.html         | Unit test launch page                        |

Each module contains an `index.js` file which initializes the module structure.

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

> In Python 3, command is a bit different. It uses `http.server` module instead of `SimpleHTTPServer`.

Visit [`http://localhost:8000/`](http://localhost:8000/) in your favorite browser. 🤗


[Back to top ↑](#)


## Running tests

*Unit tests* can be run by opening [`http://localhost:8000/index.unitTest.html`](http://localhost:8000/index.unitTest.html). ✓

*Live tests* can be run by opening [`http://localhost:8000/index.liveTest.html`](http://localhost:8000/index.liveTest.html). ✓

> You may follow the above instructions in *Running locally* to start a development server.

> For live tests, you may refer to the `config`'s `configurations.js` file for
> connecting to an API server. Note that live tests dirty the database. 

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
