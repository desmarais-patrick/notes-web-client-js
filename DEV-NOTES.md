# Development Notes

## Future Considerations

 - Detect browser language
 - Accessibility
 - Browser zoom support
 - Routing and Web-crawl-able
 - Progressive Web apps and offline support.
 - Content delivery networks
 - No JavaScript
 - Test performance with loading resources asynchronously with JavaScript.
 - Retry connection automatically.
 - Error class with message and reporting instructions (auto-fade or manual).
 - Statistics on application usage and errors.
 - User interface components and design system.

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