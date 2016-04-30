#Matrial lib

License: MIT

A javascript micro framework there let you add basic material effects to your web app

See examples of all functions in index.html

##Initalising the libery
Call `materialFramework.init()` when the app has ben loaded

Call `materialFramework.init(false)` if you want to call `materialFramework.updateElements()` by yourself when new elements has ben added, otherwise the framework will keep a look for new elements automatically

##Classes/Elements to use

###Input
Class: `material-input`

Do: style a input or a textarea element and use the placeholder attribute for the label

Things to add:

`.material-input_no_float` Will do ass the label disappear when focused or filled 

If you want to define the width of the input in percent, use the `data-material-width-percent` attribute

`.material-autosize` Can autogrow/shink a textarea

`data-material-min-height` Can set a min height for a autosize textarea using the attribute

Validation:
>Attributes:
>`data-material-validation-group` Give the form a reference
>`data-material-regexp` Regular expession the input must match
>`data-material-error` Error to show when regesx dont match

>`materialFramework.tools.validation_group("GROUP-NAME")` return true if all inputs in the group is valid 

Support for autocomlete
###Radio buttons
Class: material-radio

Support for disabled and checked attributes

###Checkboxes
Class: material-checkbox

Support for disabled and checked attributes

###Ink
Class: `material-ink`

Override position relative, overflow hidden is necessary

Things to add:
`.material-ink-round` When round ink for a round element

#####Change color
``` css
{{our selector}} .material-ink_e{
    background-color: rgba(77, 212, 79, .5) !important;
}   
```

The speed of the ink can be adjust by adding those classes:

`material-ink_slow` or `material-ink_slower`

##Button
Class: `material-button`

Do: remove default styling of a button

Add: `material-ripple` and `material-ink` to make it look like a material button

###Ripple
Class: `material-ripple`

Do: gives it a shadow that animate when active


###Icons
Class: `material-icon`

Do: set the class and attribute on a div
 
Attribute:
`data-icon` sets the icon
 
Style the size of the icon with setting the height and width of the div, the icon using stroke-width and stroke
`.material-icon_no_animation` can be added to disable the animation when icon attribute changes
######Animation requires Velocity.js 

Icons:

plus

close

check

menu

arrow_back

arrow_forward

##Tools

`materialFramework.tools.validation_group("GROUP-NAME")` return true if all inputs in the group is valid 

`materialFramework.tools.alert(title, message, buttontext, close_on_outerpress)` shows a alert

`materialFramework.tools.confirm(title, message, buttontext_ok, buttontext_fail, callback_ok, callback_fail, close_on_outerpress)` shows a confirm box

`materialFramework.tools.custom(html, close_on_outerpress)` shows a alert styled box, but use the first parameter as the html content

alert, confirm and custom returns a object with `obj` there reference to the markup and a `close` method

close_on_outerpress can be set to false or you can specify e function to fire when the user clicks on the area around of the popup
if its a function, you must self fire close
if its on the confirm element, and close_on_outerpress isn't a function, callback_fail will be fired
