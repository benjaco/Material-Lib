# Material lib

License: MIT

A javascript micro framework there let you add basic material effects to your web app.

See examples of all functions in index.html [demo](http://benjaco.github.io/Matrial-Lib/)

## Initializing the library
Call `materialFramework.init()` when the app has been loaded.

Call `materialFramework.init(false)` if you want to call `materialFramework.updateElements()` by yourself when new elements are added to the page, otherwise the framework will keep a look for new elements automatically.

It´s possible to change the autoupdate settings by calling `materialFramework.setAutoupdate(true/false)`  

## Classes/Elements to use

### Input
Class: `material-input`

Do: styles an input or a textarea element and uses the placeholder attribute for the label.

Things to add:

`.material-input_no_float` Hides the label when focused or filled.

If you want to define the width of the input in percent, use the `data-material-width-percent` attribute.

`.material-autosize` Can autogrow/shink a textarea

`data-material-min-height` Set a min-height for an autosize textarea input

Validation:
>Attributes:
>`data-material-validation-group` Used to group multiple inputs for form validation
>`data-material-regexp` Regular expression the input must match
>`data-material-error` Error to show when regex doesn't match

>`materialFramework.tools.validation_group("GROUP-NAME")` return true if all inputs in the group is valid.

Do not forget to call `.change()` when inputs with a floating label are changed programmatically, it will update the position of the label.

Support for autocomlete
### Radio buttons
Class: material-radio

Disabled and checked attributes are supported.

### Checkboxes
Class: material-checkbox

Disabled and checked attributes are supported.

### Ink
Class: `material-ink`

Override position relative, overflow hidden is necessary to get the ink working.

Things to add:
`.material-ink-round` Round ink for round elements

##### Change color
``` css
{{our selector}} .material-ink_e{
    background-color: rgba(77, 212, 79, .5) !important;
}   
```

The speed of the ink can be adjusted by adding those classes:

`material-ink_slow` or `material-ink_slower`

## Button
Class: `material-button`

Do: remove default styling of a button

Add: `material-ripple` and `material-ink` to make it look like a material button

### Ripple
Class: `material-ripple`

Do: gives it a shadow that animate when active


### Icons
Class: `material-icon`

Do: set the class and attribute on a div
 
Attribute:
`data-icon` sets the icon
 
Style the size of the icon with setting the height and width of the div, the icon can be styled using stroke-width and stroke
`.material-icon_no_animation` can be added to disable the animation when icon attribute changes
###### Animation requires Velocity.js 

Icons:

plus

close

check

menu

arrow_back

arrow_forward

## Tools

`materialFramework.tools.validation_group("GROUP-NAME")` return true if all inputs in the group is valid 

`materialFramework.tools.alert(title, message, buttontext, close_on_outerpress)` shows a alert

`materialFramework.tools.confirm(title, message, buttontext_ok, buttontext_fail, callback_ok, callback_fail, close_on_outerpress)` shows a confirm box

`materialFramework.tools.prompt(title, message, buttontext_ok, buttontext_fail, callback_ok, callback_fail, placeholder, default_text, regexp, error_msg, close_on_outerpress)` shows a prompt

`materialFramework.tools.prompt_form(title, message, buttontext_ok, buttontext_fail, callback_ok, callback_fail, inputs, close_on_outerpress)` shows a form as prompt

`materialFramework.tools.form_error` can be changed for customizing the error

The input parameter is an array of object with "regexp, error_msg, placeholder, value, type" in it, "regexp, error_msg, value, type" is optional

`materialFramework.tools.custom(html, close_on_outerpress)` shows a alert styled box, but use the first parameter as the html content, `.bindEsc()` can be added

alert, confirm, prompt, prompt_form and custom returns an object with `obj` their reference to the markup and a `close` method

close_on_outerpress can be set to false or you can specify e function to fire when the user clicks on the area around of the popup
if it's a function, you must self fire close
if it's on the confirm element, and close_on_outerpress isn't a function, callback_fail will be fired

its possible to listen for a close on all popup function with `popup.onClose=function(){}`, this function will also be called when you call `popup.close()` manually

## Minifying it

You need to have grunt install, just run `grunt` after installing

Quick script
```
npm install -g grunt-cli

npm install grunt

npm install grunt-contrib-clean

npm install grunt-contrib-cssmin

npm install grunt-contrib-uglify
```
node.js is required
