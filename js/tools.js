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
        var alert = {
            obj: $(
                '<div class="material-alert" style="display: none"><div><div class="material-fadeout"><div class="material-z3"><p class="material-alert-header">'
                + title + '</p><p>' + message + '</p><div class="material-alert-bottom"> <button class="material-ink material-button material-prim-text-color">'
                + buttontext + ' </button></div></div></div></div></div>').appendTo('body').fadeIn(200),
            close: function () {
                this.obj.fadeOut(200, function () {
                    $(this).remove();
                })
            }
        };

        alert.obj.find('button').focus().click(function () {
            alert.close()
        });

        if (typeof close_on_outerpress === 'function' || typeof close_on_outerpress === "undefined") {
            alert.obj.find('>div>div').click(function (e) {
                if(e.target.className=="material-fadeout"){
                    if(typeof close_on_outerpress === 'function'){
                        close_on_outerpress(alert)
                    }else{
                        alert.close();
                    }
                }
            })
        }
        return alert;
    },
    confirm: function (title, message, buttontext_ok, buttontext_fail, callback_ok, callback_fail, close_on_outerpress) {
        var confirm = {
            obj: $('<div class="material-alert" style="display: none"><div><div class="material-fadeout"><div class="material-z3"><p class="material-alert-header">'
                + title + '</p><p>' + message + '</p><div class="material-alert-bottom"> <button class="material-ink material-button material-alert-confirm-fail">'
                + buttontext_fail + ' </button> <button class="material-ink material-button material-alert-confirm-ok material-prim-text-color">'
                + buttontext_ok + ' </button></div></div></div></div></div>').appendTo('body').fadeIn(200),
            close: function () {
                this.obj.fadeOut(200, function () {
                    $(this).remove();
                });
            }
        };

        confirm.obj.find('.material-alert-confirm-ok').focus().click(function () {
            callback_ok();
            confirm.close();
        });
        confirm.obj.find('.material-alert-confirm-fail').click(function () {
            callback_fail();
            confirm.close()
        });

        if (typeof close_on_outerpress === 'function' || typeof close_on_outerpress === "undefined") {
            confirm.obj.find('>div>div').click(function (e) {
                if(e.target.className=="material-fadeout"){
                    if(typeof close_on_outerpress === 'function'){
                        close_on_outerpress(confirm)
                    }else{
                        callback_fail();
                        confirm.close()
                    }
                }
            })
        }
        return confirm;
    },
    custom: function (contex, close_on_outerpress) {
        var custom = {
            obj: $('<div class="material-alert" style="display: none"><div><div class="material-fadeout"><div class="material-z3">' + contex + '</div></div></div></div>')
                .appendTo('body').fadeIn(200),
            close: function () {
                var t = this;
                t.obj.fadeOut(200, function () {
                    t.obj.remove();
                })
            }
        };
        if (typeof close_on_outerpress === 'function' || typeof close_on_outerpress === "undefined") {
            custom.obj.find('>div>div').click(function (e) {
                if(e.target.className=="material-fadeout"){
                    if(typeof close_on_outerpress === 'function'){
                        close_on_outerpress(custom)
                    }else{
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

        for(var settings in options) {
            option[settings]=options[settings];
        }

        if ($('.material-notification[data-material-place=' + option.place + ']').length == 0) {
            outerbox = $('<div class="material-notification" data-material-place="' + option.place + '"></div>')
                .appendTo('body')
        } else {
            outerbox = $('.material-notification[data-material-place=' + option.place + ']');
        }




        var stripe = $("<div class='material-notification-stripe "+option.css+"' data-material-allready-processed><div class='material-notification-stripe-inner "+option.cssInner+"'>" + option.text + "</div></div>");


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
                }, (typeof stripe.data('material-duration')!="undefined"?parseInt(stripe.data('material-duration')):3000))
            })
        })
    }
};