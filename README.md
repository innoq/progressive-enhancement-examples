Progressive Enhancement Examples
================================

This repository collects different examples that showcase progressive
enhancement.


Static Examples
---------------

Static examples showcasing progressive enhancement can be found in
the following directories:

* `html/` contains examples of HTML elements which showcase progressive
  progressive enhancement (and a quiz!)
* `css/` constains examples of CSS rules which showcase progressive enhancement
  (and a quiz!)
* `js/` contains examples of HTML fallbacks which can be enhanced with
  JavaScript (instructions for how to perform the enhancements are also
	included).

Each static example is a self-contained HTML file which can be opened and viewed
in the browser. Many examples in this repository are not complete in themselves,
but are rather intended to be used as a skeleton upon which different exercises
can be solved individually or as a group. More information about the exercise
design is provided below.

For working through these examples, we recommend serving all of the files
statically. One way to do this is with the following command:

    python -m SimpleHTTPServer 5500

If using an editor like [Visual Studio Code], you can also use a plugin like
the [Live Server] plugin. The rest of this guide will assume that you are
serving the files on a server running under port 5500.

[Visual Studio Code]: https://code.visualstudio.com/
[Live Server]: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer


Dynamic Examples
----------------

There are also a few self-contained applications which are intended to showcase
larger aspects of progressive enhancement. These are all implemented as Node
applications and require the following to be installed on your computer:

* [Node](https://nodejs.org/en/)
* [npm](https://docs.npmjs.com/)

Each application can be started by executing the following steps.

1. Change into the application directory (in this instance `/form-validation`)

        cd /apps/form-validation

2. Execute `npm install` the first time to install any necessary dependencies

        npm install

3. Start the application with `npm start`

        npm start


Exercises
---------

Here we will briefly describe the exercises contained in this repository and
how they were intended to be used. Feel free to modify for your own purposes!


### HTML Quiz

The HTML Quiz is available at the following URL:

http://localhost:5500/html/quiz.html

The intention with this exercise is to modify the HTML file as an individual or
as a group in order to list out the HTML elements which are available to
perform each specific task. There may be more than one element which meets the
requirements.


### CSS Quiz

The CSS Quiz is available at the following URL:

http://localhost:5500/css/quiz.html

The intention of this exercise is to modify the CSS of the quiz page in order
to fulfill the different tasks which are listed out on the page. The CSS rules
selected are intended to showcase specific aspects of progressive enhancement.


## Coding a CSS Layout from Scratch

For this exercise, we need to start the complaints application

    cd /apps/complaints
    npm install
    npm start

The app itself is a pure HTML app with only very minimal CSS. The goal of this
exercise is to add a CSS layout to the application. Certain UI elements have
already been extracted out into components (you can find them in the
`/views/components` directory). To add CSS to a specific component, you can add
it to the `.scss` file contained in a component directory. An asset pipeline
is already set up for the application. When running the application via
`npm start`, the CSS file should be recompiled everytime an `.scss` file is
edited and saved.

An example CSS layout is available in the `example-css-layout` branch of this
repository.


## Tweaking an existing JavaScript component to make it progressively enhanced

This exercise is available at the following URL:

http://localhost:5500/js/bootstrap-collapser.html

The goal of this exercise is to modify an existing JavaScript component (the
[Bootstrap] Collapser element) in order to give it a better HTML and CSS only
fallback. Instructions for the steps that need to be taken are provided within
the exercise.

The reason that we would want to do this is because when we spend a lot of time
and effort ensuring that our application works without JavaScript, it is sad
when we drop in a ready-made component which breaks the HTML/CSS. This example
will showcase how easy it is to tweak those existing components so that they
are also progressively enhanced.

[Bootstrap]: https://getbootstrap.com/


## Developing an accessible Tabs component with progressive enhancement

This exercise is available at the following URL:

http://localhost:5500/js/tabs.html

This exercise is heavily influenced by the [Tabbed Interfaces] component
implemented by [Heydon Pickering]. Instructions for the steps that need to be
implemeted are provides within the exercise.

The goal of this exercise is to showcase the JavaScript that is necessary to
make a UI component conform to the ARIA specification for how an accessible
tabs component should work (certain UI widgets _require_ JavaScript in order to
be accessible). This exercise should also highlight why it would be much better
for us _not_ to have to roll our own components in order to conform to ARIA
specs. Unfortunately, in the case of the Tabs component, many implementations
of Tabs in frameworks do not correctly implement the spec ([Bootstrap]) or are
built in such a way that they do not support progressive enhancement
([Material Design], [Elix]). We have to look at experimental components like
[spicy-sections] to find a built-in component which does both.

[Tabbed Interfaces]: https://inclusive-components.design/tabbed-interfaces/
[Heydon Pickering]: https://heydonworks.com/
[Material Design]: https://material.io/components
[Elix]: https://component.kitchen/elix
[spicy-sections]: https://github.com/tabvengers/spicy-sections


## Client-side form validation

For this exercise, we need to start the form-validation application

    cd /apps/form-validation
    npm install
    npm start

For this exercise, the HTML and CSS for the example have already been written.
The purpose of this exercise is to showcase different aspects of progressive
enhancement:

1. Investigate the HTML structure of the form validation in order to understand
  how to correctly label input fields and how to add error messages which are
	visible to assistive technologies
2. Investigate how localization within HTML can be used in order to display
  numbers in a correct format (e.g. using `,` as a separator for numbers
	instead of `.`)
3. Add client-side JavaScript in order to take existing server-side validation
  and show those errors to the user while they are filling out the form (in
	a way that is also visible to assistive technologies).


## Pattern Library Demo

A pattern library using the [Fractal] pattern library.

For this exercise, we need to start the pattern-library application:

    cd /apps/pattern-library
    npm install
    npm start

The goal of this exercise is to implement the button component within the
pattern library in order to get a feeling for how developing UI components
within a pattern library works.

[Fractal]: https://fractal.build/
