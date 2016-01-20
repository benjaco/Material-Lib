materialFramework.core_elements.checkbox = {
    add_require_element: function () {


        $('.material-checkbox[type="checkbox"]').hide();
        $('.material-checkbox:not([data-initilized])')
            .attr("data-initilized", true)
            .change(function(){
                var checkbox = $(this);

                if(detectIE() == 9) {
                    if(checkbox[0].checked) {

                        checkbox.next().find('.material-checkbox_inner').css({
                            'borderColor':"#0f9d58",
                            'borderTop':'none',
                            'borderLeft':'none',
                            'msTransform':"rotate(45deg)",
                            'width': 10,
                            'height': 21,
                            'bottom': 4,
                            'left': 6
                        })
                    }else{
                        checkbox.next().find('.material-checkbox_inner').css({
                            'borderColor':"#000000",
                            'borderTop':'2px solid',
                            'borderLeft':'2px solid',
                            'msTransform':"rotate(0deg)",
                            'width': 18,
                            'height': 18,
                            'bottom': 0,
                            'left': 0
                        })
                    }
                }else{
                    setTimeout(function(){
                        if(checkbox[0].checked) {
                            checkbox.delay(250).next().find('.material-checkbox_inner').css({
                                'borderColor':"#0f9d58",
                                'borderTop':'none',
                                'borderLeft':'none'
                            })
                        }else{
                            checkbox.delay(250).next().find('.material-checkbox_inner').css({
                                'borderColor':"#000000",
                                'borderTop':'2px solid',
                                'borderLeft':'2px solid'
                            })
                        }
                    }, 250)
                }


            })
            .wrap("<label class='material-checkbox-label'></label>")

            .parent()

            .css("opacity", 0.01)
            .append("<div class=\'material-checkbox_outer\'>\n    <div class=\"material-checkbox_inner\"></div>\n</div>")


            .delay(350)
            .animate({opacity:1}, 20)

            .find('input')
            .trigger('change')




        $('.material-radio[type="radio"]').hide();
        $('.material-radio:not([data-initilized])')
            .attr("data-initilized", true)
            .wrap("<label class='material-radio-label'></label>")
            .parent()
            .append("<div class=\'material-radio_outer\'>\n    <div class=\"material-radio_inner\"></div>\n</div>")


    },
    init: function () {
        this.add_require_element();
    }
}