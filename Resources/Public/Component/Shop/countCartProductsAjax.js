var _countCartProducts = function () {
    var typeNum = 1516964175;
    var $iconShop = $('.icon-shop');
    var $iconShopActive = $('.icon-shop-active');
    var $badgeShopActive = $('.badge-shop-active');


    $.ajax({
        url: '/index.php',
        method: 'POST',
        data: {
            type: typeNum
        },
        success: function (response) {

            var responseObj = jQuery.parseJSON(response);
            var openOrderCountProducts = responseObj.openOrderCountProducts;

            _setOpenOrderCountProducts(openOrderCountProducts);
            _setCartIcon(openOrderCountProducts);
            _setCartBadge(openOrderCountProducts);
        },
        error: function (error) {
            console.error(error);
        }
    });

    var _setOpenOrderCountProducts = function (openOrderCountProducts) {
        $('.openOrderCountProducts').html(openOrderCountProducts)
    };

    var _setCartIcon = function (openOrderCountProducts) {
        if(parseInt(openOrderCountProducts) > 0){
            $iconShop.addClass('d-none');
            $iconShopActive.removeClass('d-none');
        }else{
            $iconShop.removeClass('d-none');
            $iconShopActive.addClass('d-none');
        }
    };

    var _setCartBadge = function (openOrderCountProducts) {
        if(parseInt(openOrderCountProducts) > 0){
            $badgeShopActive.removeClass('d-none');
            $badgeShopActive.text(openOrderCountProducts);
        }else{
            $badgeShopActive.addClass('d-none');
            $badgeShopActive.text('');
        }
    };
};


$(document).ready(function () {
    _countCartProducts();
});
