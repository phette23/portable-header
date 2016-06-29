# Portable Header

HTML header meant for inclusion in LibGuides, OPACs, & other third-party apps where you can paste some HTML in a textarea but not much else. See [an example](https://phette23.github.io/portable-header/).

# Templating

The intention is to make this header as reusable as possible simply by specifying different configurations. To build a new header, run `grunt build` (see **Getting Started** section below) & then copy the output inside "build/index.html". To create a new configuration, write your own config.json & then point to it with the "config" flag. So for a "libguides.json" I created, I might run

```bash
grunt build --config=libguides.json
```

Inside config.json, you define text that will be replaced in the header's code. Currently, you can specify an institutional prefix to avoid code conflicts (e.g. a site might already have an `"id=header"` element), five links and their link text, and two logo images (one for larger screens and one for small). The easiest way to customize is to edit config.json but keep the existing text the same. The configuration must be valid JSON.

There are 2 example configurations in the project in the "config" folder, including one for the California College of the Arts in "config/libguides.cca.json".

# Getting Started

To work on this using its development tools:

- Install [NodeJS](http://nodejs.org/)
- Install [Grunt](http://gruntjs.com/) globally; on the command line, run `npm install -g grunt-cli`
- Inside this project, install its dependencies: `npm install`

There are 3 major Grunt tasks available:

- `grunt build` compiles the SASS into CSS, inlines the CSS & JavaScript into index.html, & puts the final product in a new "build" folder
- `grunt watch` watches for any changes to files inside the "app" folder & then runs `grunt build`
- `grunt lint` tests your code quality (JSHint on JavaScript, SCSS-lint for SASS)

# To Do

- [x] Image URLs as part of config.json
- [x] Explain JSON options
- [x] Example on GitHub pages
- [x] Bigger touch targets (`<a>` inside `<li>` should be larger)
- [x] Logo should link somewhere
- [ ] Variable number of links?
