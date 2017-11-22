(function ($) {
    'use strict';
    var pageType = 901;
    var timer = null;

    var initAutocomplete = function () {
        var $searchbox = $('.tx-indexedsearch-searchbox-sword');
        $searchbox.attr('autocomplete', 'off');
        var container = $('.search-suggestions');

        $searchbox.bind('click keyup', function (e) {
            var $this = jQuery(this);
            var L = $('body').attr('data-languid');
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(function () {
                container.show();
                if (e.type != 'click') {
                    jQuery('.search-suggestions').html('<div class="ajax-loader"></div>');
                }
                if ($this.val().length > 2) {
                    $.ajax({
                        //TODO: die URL sollte generisch im template gesetzt weden
                    	url: '/index.php?type=' + pageType + '&tx_gjotiger%5BsearchString%5D=' + encodeURIComponent($this.val()),
                    	success: function(response) {
                            container.html(response);
                    	},
                    	error: function(error) {
                    		console.error(error);
                    	}
                    });
                } else {
                    container.hide();
                    container.html('');
                }
            }, 300);
        });
        $(document).bind('click keyup', function (e) {
            if (!container.is(e.target) && container.has(e.target).length === 0 && !$(e.target).hasClass('tx-indexedsearch-searchbox-sword')) {
                container.hide();
            }
        });

    };

    $(function () {
        initAutocomplete();
    });

})(jQuery);