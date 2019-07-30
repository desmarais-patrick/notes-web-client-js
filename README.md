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
| *css*/                      | Styles (.CSS files)                          |
| *img*/                      | Image resources (.SVG, .PNG files)           |
| *img/favorites-icons*/      | Secondary favorites icons (Chrome, iOS, etc.)|
| *js*/                       | JavaScript (.JS files)                       |
| *js/communication*/         | To send requests, ex. Get `/notes` API server|
| *js/config*/                | To run under different environments, ex. dev |
| *js/model*/                 | To hold business logic and cache objects     |
| *js/test*/                  | To test scripts, see `*.test.js` files       |
| *js/test/mocks*/            | To re-use mock classes for tests             |
| *js/utilities*/             | To interface with dates, DOM, arrays, etc.   |
| *js/view*/                  | To render view components                    |
| *js/viewModel*/             | To hold model for views                      |
| *js*/index.js               | App root script for structure                |
| *js*/main.designSystem.js   | App *design system* entry point              |
| *js*/main.js                | *App* entry point and initialization         |
| *js*/main.liveTest.js       | App *live tests* entry point                 |
| *js*/main.test.js           | App common tests initialization              |
| *js*/main.unitTest.js       | App *unit tests* entry point                 |
| deploy.sh                   | Deployment script                            |
| DEV-NOTES.md                | TODOs and other development notes            |
| favicon.ico                 | Default favorites icon                       |
| index.designSystem.html     | *Design system* launch page                  |
| index.html                  | *App* launch page                            |
| index.liveTest.html         | *Live test* launch page                      |
| index.unitTest.html         | *Unit test* launch page                      |

*Notes*

 - Each module under `js/` contains an `index.js` file which initializes the 
   module "namespace".
 - To launch a different environment, see `main.js`'s `chosenConfiguration`
   variable and its reference to one of the configurations in 
   `js/config/configurations.js`.


[Back to top ↑](#)


## Deploy

The following steps have been tested on Google Cloud tools.
(July 2019)

### Setup

Create a storage bucket, say `notes-123456-client-resources` with bucket-level permissions.

To set permissions to public [[1](#references)], add permission for `allUsers` with *Storage Legacy Object Reader* (no listing necessary).

### Steps

Run the deploy script after setting the environment variable with the
chosen bucket name:

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

> If you're using Python 3, the command is a bit different.
> It uses `http.server` module instead of `SimpleHTTPServer`.

Visit [`http://localhost:8000/`](http://localhost:8000/) in your 
favorite browser. 🤗


[Back to top ↑](#)


## Running tests

*Unit tests* can be run by opening [`http://localhost:8000/index.unitTest.html`](http://localhost:8000/index.unitTest.html). ✓

*Live tests* can be run by opening [`http://localhost:8000/index.liveTest.html`](http://localhost:8000/index.liveTest.html). ✓

> Follow the above instructions in [Running locally](#running-locally)
> to start a development server in order to load all scripts.

> For live tests, you may refer to the `config`'s `configurations.js` file for
> connecting to an API server.
> *Note*: live tests dirty the database. 

[Back to top ↑](#)


## Running design system

To preview project styles, components and animations, you may open 
[`http://localhost:8000/index.designSystem.html`](http://localhost:8000/index.designSystem.html). ✓

> Follow the above instructions in [Running locally](#running-locally)
> to start a development server in order to load all scripts.

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
