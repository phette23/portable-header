# Portable Header

HTML header meant for inclusion in LibGuides, OPACs, and other third-party apps where you can paste some HTML in a textarea but not much else.

# Templating

The intention is to make this header as reusable as possible simply by specifying different configurations. To build a new header, run `grunt build` (see **Getting Started** section below) and then copy the output inside "build/index.html". To create a new configuration, write your own config.json and then point to it with the "config" flag. E.g. I might create "libguides.json" and run `grunt build --config=libguides.json`.

Inside config.json, you can define strings that will be replaced in the SASS, JS, and HTML files. The strings to be replaced look like typical Mustache templates; double curly braces around their identifier, e.g. {{prefix}}. An example configuration for California College of the Arts is included as "cca.config.json".

# Getting Started

To work on this using its development tools:

- Install [NodeJS](http://nodejs.org/)
- Install [Grunt](http://gruntjs.com/) globally; on the command line, run `npm install -g grunt-cli`
- Inside this project, install its dependencies: `npm install`

There are 3 major Grunt tasks available:

- `grunt build` compiles the SASS into CSS, inlines the CSS and JavaScript into index.html, and puts the final product in a new "build" folder
- `grunt watch` watches for any changes to files inside the "app" folder & then runs `grunt build`
- `grunt lint` tests your code quality (JSHint on JavaScript files, soon I'll add SCSS-lint for SASS)

# To Do

[ ] Image URLs as part of config.json
[ ] Explain JSON options
[ ] Variable number of links
