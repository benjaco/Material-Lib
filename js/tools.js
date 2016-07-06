materialFramework.tools = {
    validation_group: function (name) {
        var el = $('[data-material-validation-group=' + name + ']');
        var passed = 0;
        el.each(function () {
            if ($(this).parent().hasClass('material-valid')) {
                passed++;
            }
        });
        return (el.size() == passed);
    },
    alert: function (title, message, buttontext, close_on_outerpress) {
        var alert = this.custom('<p class="material-alert-header">'
            + title + '</p><p>' + message + '</p><div class="material-alert-bottom"> <button class="material-ink material-button material-prim-text-color">'
            + buttontext + ' </button></div>', close_on_outerpress);

        alert.obj.find('button').click(function () {
            alert.close()
        });
        alert.obj.keydown(function (e) {
            e.stopPropagation();

            if (e.which == 27 || e.which == 13) {
                alert.close()
            }
        });
        setTimeout(function () {
            alert.obj.find('button').focus()
        }, 0);
    },
    confirm: function (title, message, buttontext_ok, buttontext_fail, callback_ok, callback_fail, close_on_outerpress) {

        if (typeof close_on_outerpress === "undefined") {
            close_on_outerpress = function (confirm) {
                confirm.close();
                callback_fail();
            }
        }

        var confirm = this.custom('<p class="material-alert-header">'
            + title + '</p><p>' + message + '</p><div class="material-alert-bottom"> <button class="material-ink material-button material-alert-confirm-fail">'
            + buttontext_fail + ' </button> <button class="material-ink material-button material-alert-confirm-ok material-prim-text-color">'
            + buttontext_ok + ' </button></div>', close_on_outerpress);


        confirm.obj.find('.material-alert-confirm-ok').click(function () {
            confirm.close();
            callback_ok();
        });
        setTimeout(function () {
            confirm.obj.find('.material-alert-confirm-ok').focus()
        }, 0);

        confirm.obj.find('.material-alert-confirm-fail').click(function () {
            confirm.close();
            callback_fail();
        });


        confirm.obj.keydown(function (e) {
            e.stopPropagation();

            if (e.which == 27) {
                confirm.close();
                callback_fail();
            } else if (
                e.which == 37 ||
                e.which == 38 ||
                e.which == 39 ||
                e.which == 40 ||
                e.which == 9
            ) {
                e.preventDefault();

                if (confirm.obj.find('.material-alert-confirm-ok').is(":focus")) {
                    confirm.obj.find('.material-alert-confirm-fail').focus()
                } else {
                    confirm.obj.find('.material-alert-confirm-ok').focus()
                }
            }

        });

        return confirm;
    },
    prompt: function (title, message, buttontext_ok, buttontext_fail, callback_ok, callback_fail, placeholder, default_text, regexp, error_msg, close_on_outerpress) {
        return this.prompt_form(
            title,
            message,
            buttontext_ok,
            buttontext_fail,
            function (values) {
                callback_ok(values[0])
            },
            callback_fail,
            [
                {
                    regexp: regexp,
                    error_msg: error_msg,
                    placeholder: placeholder,
                    value: default_text
                }
            ],
            close_on_outerpress)
    },
    form_error: "Complete the formular",
    prompt_form: function (title, message, buttontext_ok, buttontext_fail, callback_ok, callback_fail, inputs, close_on_outerpress) {
        var form = "",
            validation_group = "prompt-" + new Date().getTime(),
            validation = false;

        function _callback_ok(popup) {
            if (materialFramework.tools.validation_group(validation_group)) {
                var values = [];
                popup.obj.find("input").each(function () {
                    values.push($(this).val())
                });

                popup.close();

                callback_ok(values)
            } else {
                popup.obj.find(".material-popup-error")
                    .css("opacity", 1);

                setTimeout(function () {
                    popup.obj.find(".material-popup-error")
                        .css("opacity", 0)
                }, 5000)
            }
        }

        for (var i = 0; i < inputs.length; i++) {
            var obj = inputs[i];
            form += '<div style="margin-top: 10px"><input class="material-input" type="' + (typeof obj.type == "undefined" ? "text" : obj.type) + '" ';

            if (typeof obj.regexp != "undefined") {
                validation = true;
                form += 'data-material-validation-group="' + validation_group + '" ' +
                    'data-material-regexp="' + obj.regexp + '" ' +
                    'data-material-error="' + obj.error_msg + '" '
            }

            if (typeof obj.value != "undefined") {
                form += 'value="' + obj.value + '" '
            }

            form += ' placeholder="' + obj.placeholder + '" ></div>';
        }

        var popup = this.custom(
            '<p class="material-alert-header">' + title + '</p>' +
            '<p>' + message + '</p>' +
            '<div style="'+(validation?'margin-bottom: 10px;':'') +'clear: both">' + form + '</div>' +
            '<div class="material-alert-bottom">' +
            (validation?'<div class="material-popup-error" >' + this.form_error + '</div>':'') +
            '<div style="display: inline-block;">' +
            '<button class="material-ink material-button material-alert-confirm-fail">' + buttontext_fail + ' </button> ' +
            '<button class="material-ink material-button material-alert-confirm-ok material-prim-text-color">' + buttontext_ok + ' </button>' +
            '</div>' +
            '</div>', close_on_outerpress);

        popup.obj.find('.material-alert-confirm-ok').click(function () {
            _callback_ok(popup);
        });

        popup.obj.find('.material-alert-confirm-fail').click(function () {
            popup.close();
            callback_fail();
        });

        setTimeout(function () {
            popup.obj.find("input:first").focus();
        }, 0);


        popup.obj.keydown(function (e) {
            e.stopPropagation();

            if (e.which == 27) {
                popup.close();
                callback_fail();
            } else if (
                e.which == 13
            ) {
                _callback_ok(popup);
            }
        });

        return popup;
    },
    custom: function (contex, close_on_outerpress) {
        var custom = {
            obj: $('<div class="material-alert" style="display: none" tabindex="1"><div><div class="material-fadeout"><div class="material-z3">' + contex + '</div></div></div></div>')
                .appendTo('body').fadeIn(200),
            isClosed: false,
            close: function () {
                if (!this.isClosed) {
                    this.isClosed = true;
                    var t = this;
                    t.obj.fadeOut(200, function () {
                        t.obj.remove();
                    })
                }
            },
            bindEsc: function () {
                this.obj.keydown(function (e) {
                    e.stopPropagation();
                    e.preventDefault();

                    if (e.which == 27) {
                        custom.close();
                    }
                });
            }
        };
        setTimeout(function () {
            custom.obj.focus();
        }, 0);

        if (typeof close_on_outerpress === 'function' || typeof close_on_outerpress === "undefined") {
            custom.obj.find('>div>div').click(function (e) {
                if (e.target.className == "material-fadeout") {
                    if (typeof close_on_outerpress === 'function') {
                        close_on_outerpress(custom)
                    } else {
                        custom.close();
                    }
                }
            })
        }
        return custom;

    },
    new_notification: function (options) {
        var outerbox = false;

        var option = {
            text: "",
            place: 4,
            time: 3000,
            css: "",
            cssInner: "",
            actiontext: "",
            action: false,
            actiontextcolor: "#FFF"
        };

        for (var settings in options) {
            option[settings] = options[settings];
        }

        if ($('.material-notification[data-material-place=' + option.place + ']').length == 0) {
            outerbox = $('<div class="material-notification" data-material-place="' + option.place + '"></div>')
                .appendTo('body')
        } else {
            outerbox = $('.material-notification[data-material-place=' + option.place + ']');
        }


        var stripe = $("<div class='material-notification-stripe " + option.css + "' data-material-allready-processed><div class='material-notification-stripe-inner " + option.cssInner + "'>" + option.text + "</div></div>");


        stripe
            .appendTo(outerbox)
            .animate({
                opacity: 1,
                top: 0
            }, 200);
        setTimeout(function () {
            stripe.animate({
                left: (option.place == 1 || option.place == 4 ? "-300px" : "300px")
            }, 100).delay(100).animate({
                height: 0,
                margin: 0
            }, 100);
            delete stripe;
        }, option.time)

        if (option.action) {
            stripe.append("<div class='material-notification-action'>" + option.actiontext + "</div>").find(".material-notification-action")
                .click(function () {
                    stripe.animate({
                        left: (option.place == 1 || option.place == 4 ? "-300px" : "300px")
                    }, 100).delay(100).animate({
                        height: 0,
                        margin: 0
                    }, 100);
                    option.action()
                }).css('color', option.actiontextcolor)
        }


        delete outerbox;

    },
    handelDefaultNotifications: function () {
        $('.material-notification').each(function () {
            var way = $(this).data('material-place');
            $(this).find('.material-notification-stripe:not([ data-material-allready-processed ])').each(function () {
                var stripe = $(this);
                setTimeout(function () {
                    stripe.animate({
                        left: (way == 1 || way == 4 ? "-300px" : "300px")
                    }, 100).delay(100).animate({
                        height: 0,
                        margin: 0
                    }, 100);
                }, (typeof stripe.data('material-duration') != "undefined" ? parseInt(stripe.data('material-duration')) : 3000))
            })
        })
    }
};