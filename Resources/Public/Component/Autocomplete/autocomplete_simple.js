(function ($) {
    'use strict';
    var pageType = 901;
    var timer = null;

    var initAutocomplete = function () {
        var $iconMenu = $('.icon-menu');
        var $iconSearch = $('.icon-search');
        var $iconProfile = $('.icon-profile');
        var $iconProfileLoggedIn = $('.fa-user');
        var $iconShop = $('.icon-shop');
        var $iconCross = $('.icon-cross');

        var $logo = $('.logo');
        var $searchForm = $('.search-form');
        var $mainNav = $('.main-nav');
        var $feUsermenu = $('.fe-user-menu');
        var $txFeLogin = $('.tx-felogin-pi1');

        var $searchbox = $('.search-sword');
        $searchbox.attr('autocomplete', 'off');
        var $searchSuggestions = $('.search-suggestions');

        $searchbox.bind('click keyup', function (e) {
            var $this = jQuery(this);
            var L = $('body').attr('data-languid');
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(function () {
                $searchSuggestions.show();
                if (e.type != 'click') {
                    jQuery('.search-suggestions').html('<div class="ajax-loader"></div>');
                }
                if ($this.val().length > 2) {
                    $.ajax({
                        //TODO: die URL sollte generisch im template gesetzt weden
                    	url: '/index.php?type=' + pageType + '&tx_gjotiger%5BsearchString%5D=' + encodeURIComponent($this.val()),
                    	success: function(response) {
                            $searchSuggestions.html(response);
                    	},
                    	error: function(error) {
                    		console.error(error);
                    	}
                    });
                } else {
                    $searchSuggestions.hide();
                    $searchSuggestions.html('');
                }
            }, 1);
        });


        $iconMenu.click(function(){
            $iconCross.trigger('click');
            $feUsermenu.collapse('hide');

            $searchSuggestions.hide();
            $searchbox.val('');

        });

        $iconSearch.click(function(){
            $(this).parent().addClass('d-none');
            $iconProfile.parent().addClass('d-none');
            $iconShop.parent().addClass('d-none');
            $logo.addClass('d-none');

            $searchForm.removeClass('d-none');
            $iconCross.parent().removeClass('d-none');
            $mainNav.collapse('hide');
            $feUsermenu.collapse('hide');

            $searchbox.focus();

            // $searchSuggestions.addClass('d-none');
            // $searchbox.val('');
        });

        $iconProfile.click(function () {
            $mainNav.collapse('hide');
            $txFeLogin.toggleClass('d-none');
        });

        $iconProfileLoggedIn.click(function () {
            $mainNav.collapse('hide');
            $txFeLogin.toggleClass('d-none');
        });

        $iconCross.click(function(){
            $(this).parent().addClass('d-none');
            $iconSearch.parent().removeClass('d-none');
            $iconProfile.parent().removeClass('d-none');
            $iconShop.parent().removeClass('d-none');
            $logo.removeClass('d-none');

            $searchForm.addClass('d-none');

            $searchSuggestions.hide();
            $searchbox.val('');

        });

    };

    $(function () {
        initAutocomplete();
    });

})(jQuery);