window.MutationObserver = window.MutationObserver
    || window.WebKitMutationObserver
    || window.MozMutationObserver;

materialFramework.core_elements.icon = {
    /*
     l1,l2,l3

     x1,y1,x2,y2,opacity
     */

    icons: {
        "plus": [
            [50, 5, 50, 95, 1],
            [5, 50, 95, 50, 1],
            [0, 0, 0, 0, 0]
        ],
        "close": [
            [15, 15, 85, 85, 1],
            [15, 85, 85, 15, 1],
            [0, 0, 0, 0, 0]
        ],
        "check": [
            [35, 80, 5, 52, 1],
            [95, 15, 35, 80, 1],
            [0, 0, 0, 0, 0]
        ],
        "menu": [
            [10, 20, 90, 20, 1],
            [10, 50, 90, 50, 1],
            [10, 80, 90, 80, 1]
        ],
        "arrow_back": [
            [10, 50, 40, 20, 1],
            [20, 50, 90, 50, 1],
            [10, 50, 40, 80, 1]
        ],
        "arrow_forward": [
            [90, 50, 60, 20, 1],
            [10, 50, 80, 50, 1],
            [90, 50, 60, 80, 1]
        ]
    },
    add_require_element: function () {
        $('.material-icon:not([data-initilized])').attr("data-initilized", true).each(function () {
            var element = $(this);
            var icon = materialFramework.core_elements.icon.icons[element.attr('data-icon')];
            element
                .attr("data-rotation", 0)
                .html("<svg style=\"stroke:inherit;stroke-width:inherit; height: inherit; width: inherit\">\n    <line stroke-linecap=\"round\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"0\" opacity=\"0\" class=\"material-icon-l-1\" />\n    <line stroke-linecap=\"round\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"0\" opacity=\"0\" class=\"material-icon-l-2\" />\n    <line stroke-linecap=\"round\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"0\" opacity=\"0\" class=\"material-icon-l-3\" />\n\n</svg>")
                .find(".material-icon-l-1")
                .attr("x1", icon[0][0] + "%")
                .attr("y1", icon[0][1] + "%")
                .attr("x2", icon[0][2] + "%")
                .attr("y2", icon[0][3] + "%")
                .attr("opacity", icon[0][4])
                .next()
                .attr("x1", icon[1][0] + "%")
                .attr("y1", icon[1][1] + "%")
                .attr("x2", icon[1][2] + "%")
                .attr("y2", icon[1][3] + "%")
                .attr("opacity", icon[1][4])
                .next()
                .attr("x1", icon[2][0] + "%")
                .attr("y1", icon[2][1] + "%")
                .attr("x2", icon[2][2] + "%")
                .attr("y2", icon[2][3] + "%")
                .attr("opacity", icon[2][4]);


            if (MutationObserver) {
                var observer = new MutationObserver(function(mutation) {
                    if(mutation[0].attributeName == "data-icon"){
                        materialFramework.core_elements.icon.attrChanged(element)
                    }
                });

                observer.observe(element[0], {
                    subtree: false,
                    attributes: true,
                    attributeOldValue: false
                });


            } else if ('onpropertychange' in document.body) { //works only in IE
                element[0].onpropertychange =  function(event){
                    if(event.propertyName == "data-icon"){
                        materialFramework.core_elements.icon.attrChanged(element)
                    }
                }
            }


        })
    },
    attrChanged: function (element) {

            icon = materialFramework.core_elements.icon.icons[element.attr('data-icon')];


            if ($.Velocity && !element.hasClass('material-icon_no_animation')) {


                if (element.attr("data-rotation") % 360 == 0) {
                    element
                        .attr("data-rotation", parseInt(element.attr("data-rotation")) + 180)
                        .velocity({rotateZ: "+=180"})
                        .find(".material-icon-l-1")
                        .velocity({
                            x1: 100 - icon[0][0] + "%",
                            y1: 100 - icon[0][1] + "%",
                            x2: 100 - icon[0][2] + "%",
                            y2: 100 - icon[0][3] + "%",
                            opacity: icon[0][4]
                        })
                        .next()
                        .velocity({
                            x1: 100 - icon[1][0] + "%",
                            y1: 100 - icon[1][1] + "%",
                            x2: 100 - icon[1][2] + "%",
                            y2: 100 - icon[1][3] + "%",
                            opacity: icon[1][4]
                        })
                        .next()
                        .velocity({
                            x1: 100 - icon[2][0] + "%",
                            y1: 100 - icon[2][1] + "%",
                            x2: 100 - icon[2][2] + "%",
                            y2: 100 - icon[2][3] + "%",
                            opacity: icon[2][4]
                        });
                } else {
                    element
                        .attr("data-rotation", parseInt(element.attr("data-rotation")) + 180)
                        .velocity({rotateZ: "+=180"})
                        .find(".material-icon-l-1")
                        .velocity({
                            x1: icon[0][0] + "%",
                            y1: icon[0][1] + "%",
                            x2: icon[0][2] + "%",
                            y2: icon[0][3] + "%",
                            opacity: icon[0][4]
                        })
                        .next()
                        .velocity({
                            x1: icon[1][0] + "%",
                            y1: icon[1][1] + "%",
                            x2: icon[1][2] + "%",
                            y2: icon[1][3] + "%",
                            opacity: icon[1][4]
                        })
                        .next()
                        .velocity({
                            x1: icon[2][0] + "%",
                            y1: icon[2][1] + "%",
                            x2: icon[2][2] + "%",
                            y2: icon[2][3] + "%",
                            opacity: icon[2][4]
                        });
                }

            }else {
                element
                    .find(".material-icon-l-1")
                    .attr("x1", icon[0][0] + "%")
                    .attr("y1", icon[0][1] + "%")
                    .attr("x2", icon[0][2] + "%")
                    .attr("y2", icon[0][3] + "%")
                    .attr("opacity", icon[0][4])
                    .next()
                    .attr("x1", icon[1][0] + "%")
                    .attr("y1", icon[1][1] + "%")
                    .attr("x2", icon[1][2] + "%")
                    .attr("y2", icon[1][3] + "%")
                    .attr("opacity", icon[1][4])
                    .next()
                    .attr("x1", icon[2][0] + "%")
                    .attr("y1", icon[2][1] + "%")
                    .attr("x2", icon[2][2] + "%")
                    .attr("y2", icon[2][3] + "%")
                    .attr("opacity", icon[2][4]);
            }



    },
    init: function () {
        this.add_require_element();
    }
};