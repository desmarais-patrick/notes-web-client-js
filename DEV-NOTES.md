# Development Notes

## Future Considerations

 - Detect browser language
 - Accessibility
 - Browser zoom support
 - Routing and Web-crawl-able
 - Progressive Web apps and offline support.
 - Content delivery networks
 - No JavaScript (a simple editor?)
 - Cookie notice and tracking settings.
 - Test performance with loading resources asynchronously with JavaScript.
 - Retry connection automatically.
 - Error class with message and reporting instructions (auto-fade or manual).
   Error strategy consuming errors and displaying them using error class.
 - Statistics on application usage and errors.
 - Reference for user interface components and design system.
 - Application strings and formats; notify on change language or settings.
 - App-wide event logger for debugging or informing user on app state.
 - Command router to centralize event triggers and navigation.
 - "Are you sure you want to quit? There are pending changes."
 - Request queue for multiple, optionally dependent, operations.
 - Authentication and app secret with server API.
 - App-wide notifications (dismissable errors, actionable events).
 - Undo.


 Extra:

 - Review NoteList class:
   - Use a sorted linked list data structure and insertion sort algorithm.
   - Compare performance with old implementation.
   - Store list by IDs and sort field values to optimize access for sorting.
   - Use a binary search algorithm to find notes in list.
 - Re-build the same app with:
   - ES2015
   - TypeScript
   - React.js
   - Angular
   - Vue.js
   - Svelt (?)
   - Gatsby (?)
 - Read on Enums and their implementation in TypeScript.
   - Why use enums over simple strings?
 - Review how to make it clear what kind of options are expected,
   and how to reuse this options object as basis for object returned.
 - Review push and pull approach for efficient rendering, animations and 
   user interface reactivity.
 - Review how to refresh lists efficiently in a concurrent client setting.
   (Some inspiration from GraphQL? Keep-Alive mechanism? Meteor live feature?)
 - Review how I should handle data corruption from back-end service.
   (To avoid front-end becoming unresponsive!)

## Inspirations

 - Review `request` module created by TJ Hollowaychuk for communication layer
 - Alternatives to MVA, MVC and MVVM approaches to building front-facing apps.
 - React.js, Angular, and Vue.js approach to loading views in browser.
 - Webpack and other approaches to build files for deployment.
 - Review `@google-cloud/datastore`'s and GMail's approaches to retry connect.
 - Review how to use HTTP/2 properly with front-end apps.
 - Review how Sentry.io reports errors in production (and privacy policy).
 - Review Meteor's module for error overlay during development.
 - Review how UXPin displays user interface components and design system.
 - How do React and Angular build around the shadow DOM?
 - What is the Google Lighthouse performance for this app?
 - Review how e-tag works and what are the caveats for caching.

## References

 - Youtube channel
   [Google Chrome Developers](https://www.youtube.com/channel/UCnUYZLuoy1rq1aVMwx4aTzw)
   - Progressive Web Apps
   - UX Design & Accessibility
 - Udacity courses
   - Responsive Images by Google
   - Responsive Web Design Fundamentals by Google

## Thoughts

🤔 **Q1** File structure

Approach A:
 - `/static` or `/public` directory with sub-folders for CSS, Image and JavaScript files.
 - Files referenced with relative paths from `index.html`.
 - Take advantage of HTTP/2 to serve separate files.

Approach B:
 - Put placeholder in `index.html` for referenced files.
 - Compile `index.html` with real paths for deployment.
 - Create special folders for each version to avoid caching problems.

Approach C:
 - Bundle up CSS and JavaScript files.
 - Create sprite images.
 - Serve bundles and sprite images from a few references in `index.html`


*Approach A* seems to require the least setup: writing a deploy script to upload files in the same hierarchy as found in the project and hope to avoid any caching problems when updating files. This approach seems to favor rapid development.

*Approach B* is the enhancement of approach A to take into consideration caching purposes. The additional step to build `index.html` file isn't the most obvious step when opening the project, but it could be alleviated with a BASH script to outline those steps.

*Approach C* seems to require a bulkier system for building and deploying files. However, with the advent of HTTP/2, I wish to research more on the effects of bundles versus individual files. Bundling seems to lose flexibility in serving the most important files first, unless we're clever about it. With a lot of files though, serving the application in a bundle seems to help linking everything together.

Decision: *Approach A* first, then B, then C in later iterations.


🤔 **Q2** Loading CSS and JavaScript

Reading Google Developers' web fundamentals and a few more articles, 
I learned more about script loading.

*Stylesheets* can be loaded following responsive design guidelines.

The following HTML snippet ensures good scaling of pixels on high-dpi devices.
```
<meta name="viewport" content="width=device-width, initial-scale=1">
```

The following HTML snippet supports major breakpoints, 
while minor breakpoints can be defined with `@media` queries in CSS code.
```
<link rel="stylesheet" media="(max-width:600px)" href="css/index-small.css">
<link rel="stylesheet" media="(min-width:601px)" href="css/index-large.css">
```

*JavaScript* loading and rendering performance adds tension.
Script directives in HTML can block rendering.
Asynchronous loading in HTML can cause confusion about what is executed first.
Script directives added through JavaScript can hinder pre-loading.
Moreover, HTTP/2 is putting in question whether bundles should be created.

Recommended, simple approach involves adding directives at the end of HTML body:
```
<script src="//other-domain.com/1.js"></script>
<script src="2.js"></script>
```


*Articles*

 - Developers.google.com
  [HTTP Requests](https://developers.google.com/web/fundamentals/performance/get-started/httprequests-5)
  (May 2019)
 - HTML5Rocks.com
  [Deep dive into the murky waters of script loading](https://www.html5rocks.com/en/tutorials/speed/script-loading/)
 - Developers.google.com
  [Responsive Web Design Basics](https://developers.google.com/web/fundamentals/design-and-ux/responsive/)
 - Bits of Code
  [Understanding the Critical Rendering Path](https://bitsofco.de/understanding-the-critical-rendering-path/)
  (2017)

 - Developers.google.com
  [Introduction to HTTP/2](https://developers.google.com/web/fundamentals/performance/http2/)


🤔 **Q3** Which browser to support?

While I don't plan to test on all the browsers, I want to be compatible with:

 - Edge
 - Chrome
 - Safari
 - Firefox
 - Safari on iOS
 - Chrome on Android

...in their latest versions.

Some browsers that I may support include IE11 and Safari 9.
Let's how many JavaScript features can be well ported for these older versions.


🤔 **Q4** How to work with CORS?

CORS: Cross-Origin Resource Sharing

Since the Front-End is hosted on a different domain from the API server,
I must circumvent a security established by browsers for running scripts
from multiple domains.

In the API server, I temporarily added a new header:

 - `Access-Control-Allow-Origin: http://localhost:8000`

This temporary solution needs to be re-worked.
How to set this configuration to abstract running in development or production?

Moreover, when working through live tests, I realized a new method.
The `OPTIONS` method is a preflight request for special requests.
`PUT` or `DELETE` requests which intend for modification are sensitive.
Hence, the `OPTIONS` method validates if this is allowed when CORS'ing. 😛

I implemented this call as well.
The live tests revealed quite interested topic.
Having control over the API server helped resolve this issue today. 😃
