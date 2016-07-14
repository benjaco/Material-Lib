materialFramework.core_elements.checkbox = {
    add_require_element: function () {


        $('.material-checkbox[type="checkbox"]').hide();
        $('.material-checkbox:not([data-initilized])')
            .attr("data-initilized", true)
            .change(function () {
                var checkbox = $(this);

                checkbox.next().attr("aria-checked", (checkbox[0].checked ? "true" : "false"));

                if (detectIE() == 9) {
                    if (checkbox[0].checked) {

                        checkbox.next().find('.material-checkbox_inner').css({
                            'borderColor': "#0f9d58",
                            'borderTop': 'none',
                            'borderLeft': 'none',
                            'msTransform': "rotate(45deg)",
                            'width': 10,
                            'height': 21,
                            'bottom': 4,
                            'left': 6
                        })
                    } else {
                        checkbox.next().find('.material-checkbox_inner').css({
                            'borderColor': "#000000",
                            'borderTop': '2px solid',
                            'borderLeft': '2px solid',
                            'msTransform': "rotate(0deg)",
                            'width': 18,
                            'height': 18,
                            'bottom': 0,
                            'left': 0
                        })
                    }
                } else {
                    if ($(this).parent().hasClass("material-no-animation")) {
                        if (checkbox[0].checked) {
                            checkbox.delay(250).next().find('.material-checkbox_inner').css({
                                'borderColor': "#0f9d58",
                                'borderTop': 'none',
                                'borderLeft': 'none'
                            })
                        } else {
                            checkbox.delay(250).next().find('.material-checkbox_inner').css({
                                'borderColor': "#000000",
                                'borderTop': '2px solid',
                                'borderLeft': '2px solid'
                            })
                        }

                    } else {

                        setTimeout(function () {
                            if (checkbox[0].checked) {
                                checkbox.delay(250).next().find('.material-checkbox_inner').css({
                                    'borderColor': "#0f9d58",
                                    'borderTop': 'none',
                                    'borderLeft': 'none'
                                })
                            } else {
                                checkbox.delay(250).next().find('.material-checkbox_inner').css({
                                    'borderColor': "#000000",
                                    'borderTop': '2px solid',
                                    'borderLeft': '2px solid'
                                })
                            }
                        }, 250)
                    }
                }


            })
            .wrap("<label class='material-checkbox-label material-no-animation'></label>")

            .parent()

            .append("<div class=\'material-checkbox_outer\' tabindex='0'  role='checkbox' aria-checked='false'>\n    <div class=\"material-checkbox_inner\"></div>\n</div>")
            .append("<div class=\'material-checkbox_ink\' ></div>")
            .queue(function () {
                if($(this).find("input").attr("disabled") == "disabled"){
                    $(this).find(".material-checkbox_outer").attr("tabindex", -1)
                }
                $(this).find("input").attributeChange(function (ele, attrname) {
                    if(attrname == "disabled") {
                        if($(ele).attr("disabled") == "disabled"){
                            $(ele).next().attr("tabindex", -1)
                        }else {
                            $(ele).next().attr("tabindex", 0)

                        }
                    }
                });
                var element = $(this);
                setTimeout(function () {
                    element.removeClass("material-no-animation")
                }, 550)
            })

            .find('input')
            .trigger('change')
            .click(function () {
                $(this).next().finish().focus().delay(300).queue(function () {
                    $(this).blur()
                });
            })
            .next()
            .keyup(function (e) {
                if(e.which == 32 && !$(this).prev().is(":disabled") ) {
                    $(this).prev()[0].checked = !$(this).prev()[0].checked;
                    $(this).prev().trigger("change");
                    return false;
                }
            })
            .keydown(function(e) {
                if (e.which == 32) {
                    return false;
                }
            });


        $('.material-radio:not([data-initilized])')
            .attr("data-initilized", true)
            .wrap("<label class='material-radio-label'></label>")
            .parent()
            .append("<div class=\'material-radio_outer\'>\n    <div class=\"material-radio_inner\"></div>\n</div>")
            .append("<div class=\'material-checkbox_ink\' ></div>")
            .mouseup(function (e) {
                var element = $(this).find("input");
                setTimeout(function () {
                    element.blur()
                },300)
            })
            .find("input")

    },
    init: function () {
        this.add_require_element();
    }
};