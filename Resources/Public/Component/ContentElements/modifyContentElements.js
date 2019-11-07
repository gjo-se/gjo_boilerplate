var gjoSe = gjoSe || {};
gjoSe.modifyContentElements = {};

(function ($) {
    'use strict';

    gjoSe.modifyContentElements = {
        _config: {
            firstParagraphinCardBodyRem: 1
        },

        _setPrevNextArrowHeight: function (){

            // TODO: hier wird immer die Höhe de ersten Eleemnts genommen udn auf alle angewendet!!!
            var figure = $("div.card figure");

            figure.parent().find('.carousel-control-prev').height(figure.height());
            figure.parent().find('.carousel-control-next').height(figure.height());
        },

        _setFirstParagraphinCardBodyToRem: function (rem) {

            $("div.card-body").each(function(){
                $(this).find('p').first().css({
                    "font-size": rem + 'rem'
                })
            });

        }

    }

    $(document).ready(function () {

        gjoSe.modifyContentElements._setPrevNextArrowHeight();

        $( window ).resize(function() {
            gjoSe.modifyContentElements._setPrevNextArrowHeight();
        });

        // wird aktuell über RTE H3 gelöst
        // gjoSe.modifyContentElements._setFirstParagraphinCardBodyToRem(gjoSe.modifyContentElements._config.firstParagraphinCardBodyRem);

    });

})(jQuery);