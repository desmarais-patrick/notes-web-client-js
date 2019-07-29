"use strict";

(function (Notes) {
    Notes.utilities.viewUtilities = function (options) {
        var document = options.document;
        var window = options.window;

        var viewUtilities = {};

        viewUtilities.traversal = {};

        viewUtilities.traversal.findWithId = function (id) {
            return document.getElementById(id);
        };

        viewUtilities.traversal.findWithCssClass = function (parentElement,
            cssClass) {

            var nodeList = parentElement.childNodes;
            var node;
    
            // Only goes one level deep!
            for (var i = 0; i < nodeList.length; i++) {
                node = nodeList[i];
                if (node.className && viewUtilities.css.hasClass(node, cssClass)) {
                    return node;
                }
            }

            throw new Error("Unable to find with CSS class " + 
                "'" + cssClass + "' within element " + 
                htmlNodeToString(parentElement));
        };

        viewUtilities.traversal.findWithCssSelector = function (parentElement,
            cssSelector) {

            var node = parentElement.querySelector(cssSelector);

            if (node === null) {
                throw new Error("Unable to find with CSS selector " +
                    "'" + cssSelector + "'" +
                    " within element " + htmlNodeToString(parentElement));
            }

            return node;
        };

        // For nice display when degugging with errors.
        var htmlNodeToString = function (htmlNode) {
            var tag = htmlNode.tagName;
            var id = htmlNode.id;
            var className = htmlNode.className;

            var str = tag;

            if (id.length > 0) {
                str += ("#" + id);
            }

            if (className.length > 0) {
                str += ("." + className.replace(/\s/g, "."));
            }

            return str;
        }

        viewUtilities.css = {};

        var SPACE = " ";

        viewUtilities.css.addClass = function (element, cssClass) {
            element.className += (SPACE + cssClass);
        };
        viewUtilities.css.addClassOnce = function (element, cssClass) {
            if (this.hasClass(element, cssClass)) {
                return;
            }
            this.addClass(element, cssClass);
        };

        viewUtilities.css.hasClass = function (element, cssClass) {
            var cssClasses = element.className.split(SPACE);
            return cssClasses.indexOf(cssClass) > -1;
        };

        viewUtilities.css.removeClass = function (element, cssClass) {
            var cssClasses = element.className.split(SPACE);
            var index = cssClasses.indexOf(cssClass);
            if (index === -1) {
                return;
            }
    
            cssClasses.splice(index, 1);
            element.className = cssClasses.join(SPACE);
        };

        viewUtilities.css.toggleClass = function (element, cssClass) {
            var cssClasses = element.className.split(SPACE);
            var index = cssClasses.indexOf(cssClass);
            if (index === -1) {
                element.className += (SPACE + cssClass);
            } else {
                cssClasses.splice(index, 1);
                element.className = cssClasses.join(SPACE);
            }
        };

        viewUtilities.html = {};
        viewUtilities.html.clearChildrenNodes = function (node) {
            var children = node.children;
            for (var i = children.length - 1; i >= 0; i--) {
                var child = children[i];
                node.removeChild(child);
            }
        };
        viewUtilities.html.removeChild = function (node, child) {
            node.removeChild(child);
        };

        viewUtilities.html.createElement = function (tagName, options) {
            var element = document.createElement(tagName);
            if (options.hasOwnProperty("cssClass")) {
                element.className = options.cssClass;
            }
            if (options.hasOwnProperty("type")) {
                element.setAttribute("type", options.type);
            }
            if (options.hasOwnProperty("text")) {
                element.textContent = options.text;
            }
            return element;
        };

        viewUtilities.html.append = function (node, childNode) {
            node.appendChild(childNode);
        };
        viewUtilities.html.appendMany = function (node, childNodes) {
            childNodes.forEach(function (childNode) {
                node.appendChild(childNode);
            });
        };

        viewUtilities.button = {};
        viewUtilities.div = {};

        viewUtilities.button.onClick =
        viewUtilities.div.onClick = function (element, callback) {
            element.addEventListener("click", callback);
        };
        viewUtilities.button.offClick =
        viewUtilities.div.offClick = function (element, callback) {
            element.removeEventListener("click", callback);
        };

        viewUtilities.scroll = {};

        viewUtilities.scroll.toNode = function (node, onScrollEnd) {
            var offset = node.offsetTop;

            // TODO Better smooth scrolling.
            setTimeout(function () {
                window.scrollTo(offset);
                onScrollEnd();
            }, 100);
        };

        viewUtilities.text = {};

        viewUtilities.text.toggleBetween = function (element, text1, text2) {
            if (element.textContent === text1) {
                element.textContent = text2;
            } else {
                element.textContent = text1;
            }
        };

        viewUtilities.text.get = function (element) {
            return element.textContent;
        };
        viewUtilities.text.set = function (element, newText) {
            element.textContent = newText;
        };

        viewUtilities.textarea = {};

        viewUtilities.textarea.getValue = function (element) {
            return element.value;
        };
        viewUtilities.textarea.setValue = function (element, newValue) {
            element.value = newValue;
        };
        viewUtilities.textarea.onValueChange = function (element, callback) {
            element.addEventListener("input", callback);
        };
        viewUtilities.textarea.offValueChange = function (element, callback) {
            element.removeEventListener("input", callback);
        };
        viewUtilities.textarea.hasScrollBar = function (element) {
            return (element.scrollHeight > element.clientHeight);
        };

        return viewUtilities;
    };
})(Notes);
