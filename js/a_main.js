/**
 * Created by Benjaco on 25-10-2014.
 */

(function ($) {
    $.fn.toggleCheck = function () {
        this.each(function () {
            this.checked = !this.checked;
        });

    }
    $.fn.hasSetWidth = function () {
        return (this[0].style.width != "");

    }
    $.fn.getWidth = function () {
        return this[0].style.width
    }
    $.fn.hasSetHeight = function () {
        return (this[0].style.height != "");

    }
    $.fn.getHeight = function () {
        return this[0].style.height
    }
}(jQuery));

function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // IE 12 => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}


materialFramework = {
    core_elements: {},

    isAppleOrSaferi: (
        navigator.userAgent.indexOf('Safari') != -1 &&
        navigator.userAgent.indexOf('Chrome') == -1
    )
    ||
    /iPad|iPhone|iPod/.test(navigator.platform),

    init: function (autoUpdate) {
        this.updateElements();
        if (typeof autoUpdate === "undefined") {
            document.addEventListener("DOMNodeInserted", function () {
                materialFramework.updateElements();
            });
        }
        this.tools.handelDefaultNotifications()
    },
    updateElements: function () {
        for (var key in this.core_elements) {
            if (this.core_elements[key].init()) {
            }
        }
    }
}



