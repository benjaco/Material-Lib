/**
 * Created by Benjaco on 25-10-2014.
 */
materialFramework.core_elements.input = {
    last_mouse_down: 0,
    resizeTextarea : function(el, offset, minheight) {
        jQuery(el).css('height', 'auto').css('height',
            ((el.scrollHeight + offset)<minheight?minheight:(el.scrollHeight + offset))
        );
    },
    add_require_element: function () {

        $('.material-input:not([data-initilized])').attr("data-initilized", true).each(function () {


            $(this).wrap('<div class="material input down '+($(this).is("textarea")?'material-textarea':'')+'"></div>');

            var parent = $(this).parent();


            if ($(this).data('material-width-percent')) {
                parent.css("width", $(this).data('material-width-percent') + "%");
                $(this).css("width", "100%")
            }else{
                if( $(this).hasSetWidth() ){
                    parent.css("width", $(this).getWidth());
                } else {
                    parent.css("width", $(this).css("width"));
                }
            }
            if($(this).is("textarea")) {
                $(this).mouseup(function(){
                    if ($(this).data('material-width-percent')) {
                        parent.css("width", $(this).data('material-width-percent') + "%");
                        $(this).css("width", "100%")
                    }else{
                        if( $(this).hasSetWidth() ){
                            parent.css("width", $(this).getWidth());
                        } else {
                            parent.css("width", $(this).css("width"));
                        }
                    }

                });
                var min_height = 0;

                if(typeof $(this).data('material-min-height') !== "undefined"){
                    min_height=parseFloat($(this).data('material-min-height'))
                }
                if($(this).hasClass('material-autosize')){
                    var offset = this.offsetHeight - this.clientHeight;
                    jQuery(this).on('keyup input', function() {
                        materialFramework.core_elements.input.resizeTextarea(this, offset, min_height);
                    });
                    materialFramework.core_elements.input.resizeTextarea(this, offset, min_height);

                }
            }


            parent.append('<span class="highlight-bar"></span>' +
            '<span class="bar">' +
            '   <span class="left"></span>' +
            '   <span class="right"></span>' +
            '</span>' +
            '<label>' + $(this).attr('placeholder') + '</label><div>');

            parent.find("label").click(function () {
                parent.find("input, textarea").trigger("focus");
            })
            if ($(this).data('material-regexp')) {
                if (new RegExp($(this).data('material-regexp')).test($(this).val())) {
                    parent.addClass('material-valid').append("<div class='material-error-label'>" + $(this).data('material-error') + "</div>")
                } else {
                    parent.addClass('material-input-fail').append("<div class='material-error-label'>" + $(this).data('material-error') + "</div>")
                }


            }
            if ($(this).attr('maxlength')) {
                parent.append('<div class="material-char-count"><span class="material-char-count-currant">'+$(this).val().length+'</span>/'+$(this).attr('maxlength')+'</div>')
            }
            parent.append('<div class="clear"></div>')
            $(this).bind('input propertychange'+(detectIE()==9?" keyup":""), function () {
                if ($(this).data('material-regexp')) {
                    if (new RegExp($(this).data('material-regexp')).test($(this).val())) {
                        parent.addClass('material-valid').removeClass('material-input-fail')
                    } else {
                        parent.addClass('material-input-fail').removeClass('material-valid')
                    }
                }
                if ($(this).attr('maxlength')) {
                    parent.find('.material-char-count-currant').html($(this).val().length)
                }
            })

            $(this).attr('placeholder', '');
            if ($(this).val().length != 0) {
                parent.addClass('up');
            }



            $(this).focusout(function () {
                $(this).parent().removeClass('focused');

                if ($(this).val().length == 0) {
                    $(this).parent().addClass('down').removeClass('up');
                }

            });


            parent.mousedown(function (e) {
                materialFramework.core_elements.input.last_mouse_down = e.pageX
            });


            $(this).focusin(function (e) {

                var parent = $(this).parent();


                $(this).parent().addClass('up').removeClass('down');


                parent.addClass('focused');
                if ($(this).hasClass('material-input_no_float')) {
                    parent.addClass('material-input_no_float');
                } else {
                    parent.removeClass('material-input_no_float');
                }


                var x = materialFramework.core_elements.input.last_mouse_down - $(this).offset().left;
                var pctl = x / $(this).width() * 100;
                if (pctl > 100) {
                    pctl = 99;
                }
                var pctr = 100 - pctl;


                parent.find('.bar .left, .bar .right').css({
                    transition: ''
                });

                parent.find('.bar .left, .bar .right').css({
                    left: pctl + '%',
                    right: pctr + '%'
                });


                setTimeout(function () {
                    parent.find('.bar .left, .bar .right').css({
                        transition: '0.3s ease all'
                    });
                    parent.find('.bar .left').css({
                        left: '0'
                    });
                    parent.find('.bar .right').css({
                        right: '0'
                    });
                }, 100);

            });


        });

        $(".material-button:not([data-initilized])")
            .attr("data-initilized", true)
            .each(function () {
                if( $(this).parent().is("a") ) {
                    $(this).parent().attr("tabindex", -1);
                }
            })
    },
    init: function () {
        this.add_require_element();

    }
};




