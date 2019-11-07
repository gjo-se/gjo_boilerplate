(function ($) {
    'use strict';
    var pageType = 901;
    var timer = null;

    var initAutocomplete = function () {

        var url = '/index.php';

        var $btnMenu = $('.btn-menu');
        var $btnSearch = $('.btn-search');
        var $btnProfile = $('.btn-profile');
        var $btnShop = $('.btn-shop');
        var $btnCross = $('.btn-cross');

        var $logo = $('.logo');
        var $searchForm = $('.search-form');
        var $mainNav = $('.main-nav');
        var $feUsermenu = $('.fe-user-menu');
        var $txFeLogin = $('.tx-felogin-pi1');
        var $languageMenu = $('.languageMenu');

        var $searchbox = $('.search-sword');
        var sysLanguageUid = $('#lang-helper-sysLanguage').text();
        $searchbox.attr('autocomplete', 'off');
        var $searchSuggestions = $('.search-suggestions');

        if(sysLanguageUid){
            url = url + '?L=' + sysLanguageUid;
        }

        $searchbox.bind('click keyup', function (e) {
            var $this = jQuery(this);
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
                        url: url,
                        method: 'POST',
                        data: {
                            type: pageType,
                            searchString: $this.val()
                        },
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


        $btnMenu.click(function(){
            $btnCross.trigger('click');
            $feUsermenu.collapse('hide');

            $searchSuggestions.hide();
            $searchbox.val('');

        });

        $btnSearch.click(function(){
            $(this).addClass('d-none');
            $btnProfile.addClass('d-none');
            $btnShop.addClass('d-none');
            $logo.addClass('d-none');

            $searchForm.removeClass('d-none');
            $btnCross.removeClass('d-none');
            $mainNav.collapse('hide');
            $feUsermenu.collapse('hide');
            $languageMenu.addClass('d-none');

            $searchbox.focus();

        });

        $btnProfile.click(function () {
            $mainNav.collapse('hide');
            $txFeLogin.toggleClass('d-none');
        });

        $btnCross.click(function(){
            $(this).addClass('d-none');
            $btnSearch.removeClass('d-none');
            $btnProfile.removeClass('d-none');
            // $iconProfileActive.parent().removeClass('d-none');
            $btnShop.removeClass('d-none');
            $logo.removeClass('d-none');

            $searchForm.addClass('d-none');
            $languageMenu.removeClass('d-none');

            $searchSuggestions.hide();
            $searchbox.val('');

        });

    };

    $(function () {
        initAutocomplete();
    });

})(jQuery);