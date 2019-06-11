# Development Notes

## Future Considerations

 - Routing and Web-crawl-able
 - Progressive Web apps
 - Content delivery networks

## Inspirations

 - Review `request` module created by TJ Hollowaychuk for communication layer
 - Alternatives to MVA, MVC and MVVM approaches to building front-facing apps.
 - React.js, Angular, and Vue.js approach to loading views in browser.
 - Webpack and other approaches to build files for deployment.

## References

 - Youtube channel
   [Google Chrome Developers](https://www.youtube.com/channel/UCnUYZLuoy1rq1aVMwx4aTzw)
   - Progressive Web Apps
   - UX Design & Accessibility

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
