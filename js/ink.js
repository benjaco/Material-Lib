materialFramework.core_elements.ink = {
    init: function () {
        $(document).on("mousedown", ".material-ink, .new_ink", function (e) {

            var rippler = $(this);

            if (rippler.children(".material-ink_outer").length == 0) {
                rippler.append("<div class='material-ink_outer'><span class='material-ink_e'></span></div>");

                if (materialFramework.isAppleOrSaferi) {
                    $(this).click();
                }
            }

            var ink = rippler.children(".material-ink_outer").find(".material-ink_e");

            if(rippler.data('material-ink-color')){
                ink.css("background-color",rippler.data('data-material-ink-color'));
            }

            // prevent quick double clicks
            ink.removeClass("animate");

            // set .ink diameter
            if (!ink.height() && !ink.width()) {
                var d = Math.max(rippler.outerWidth(), rippler.outerHeight());
                ink.css({height: d, width: d});
            }

            // get click coordinates
            var x = e.pageX - rippler.offset().left - ink.width() / 2;
            var y = e.pageY - rippler.offset().top - ink.height() / 2;

            // set .ink position and add class .animate
            ink.css({
                top: y + 'px',
                left: x + 'px'
            }).addClass("animate");


        })

    },
    fire_ink:function(el, x, y){

        if (el.children(".material-ink_outer").length == 0) {
            el.append("<div class='material-ink_outer'><span class='material-ink_e'></span></div>");
        }

        var ink = el.children(".material-ink_outer").find(".material-ink_e");

        if(el.data('material-ink-color')){
            ink.css("background-color",el.data('data-material-ink-color'));
        }

        // prevent quick double clicks
        ink.removeClass("animate");

        // set .ink diameter
        if (!ink.height() && !ink.width()) {
            var d = Math.max(el.outerWidth(), el.outerHeight());
            ink.css({height: d, width: d});
        }


        // set .ink position and add class .animate
        ink.css({
            top: y + 'px',
            left: x + 'px'
        }).addClass("animate");


    }
};