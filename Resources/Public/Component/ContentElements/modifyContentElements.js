var gjoSe = gjoSe || {};
gjoSe.modifyContentElements = {};

(function ($) {
    'use strict';

    gjoSe.modifyContentElements = {
        _config: {
            firstParagraphinCardBodyRem: 1
        },

        _setPrevNextArrowHeight: function (){

            var figure = $("div.card figure");

            figure.parent().find('.carousel-control-prev').height(figure.height());
            figure.parent().find('.carousel-control-next').height(figure.height());
        },

        _setFirstParagraphinCardBodyToRem: function (rem) {

            var cardBody = $("div.card-body");

            $("div.card-body p").first().css({
                "font-size": rem + 'rem'
            })
        }

    }

    $(document).ready(function () {

        gjoSe.modifyContentElements._setPrevNextArrowHeight();

        $( window ).resize(function() {
            gjoSe.modifyContentElements._setPrevNextArrowHeight();
        });

        gjoSe.modifyContentElements._setFirstParagraphinCardBodyToRem(gjoSe.modifyContentElements._config.firstParagraphinCardBodyRem);

    });

})(jQuery);