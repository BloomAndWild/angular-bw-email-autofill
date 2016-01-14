# angular-bw-email-autofill

[ ![Codeship Status for BloomAndWild/angular-bw-email-autofill](https://codeship.com/projects/a2cba380-9c7a-0133-a828-0e79d5c640a8/status)](https://codeship.com/projects/127180)

An angular module to add functionality to input fields allowing the user to autocomplete popular email domains.


![functionality demo gif](http://i.imgur.com/dbQVO52.gif)

### Demo

[Codepen](http://codepen.io/merrickfox/pen/JYKNqR)

### Installation instructions
`bower install angular-bw-email-autofill`

### Setup instructions

* Add `bw-emailAutofill` to your app dependencies

`var app = angular.module('myApp', ['bw-emailAutofill']);`

* Add the `email-typeahead` directive to your input element
* Add an ng-model directive to your input element
* Add a style class to your input element


`<input ng-model="data.email" email-typeahead class="typeahead" ></input>`

The directive will create another input element that you will need to overlay over your main input element using styles, this is the hint element and is a readonly element that displays the email suggestion. Z-index is important

* You should give your main input element style the following:

`background-color: transparent;
z-index: 1;`

The objectives are to make it so you can see through it to view the hint suggestion and to have it on top of the hint input box

* You should give the class .typeahead-hint the following:

`position: absolute;
  top: 0;
  left: 0;
  z-index: -1;`

  The objectives are to position it directly on top (underneath technically) of the main input element, you may need to fiddle with these values, it might be worth making the containing element `position: relative` to help aid this.

## Running unit tests
`npm install`
`npm run unit`
