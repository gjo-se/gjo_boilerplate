var _countCartProducts = function () {
    var typeNum = 1516964175;

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
        },
        error: function (error) {
            console.error(error);
        }
    });

    var _setOpenOrderCountProducts = function (openOrderCountProducts) {
        $('.openOrderCountProducts').html('(' + openOrderCountProducts + ')')
    };
};


$(document).ready(function () {
    _countCartProducts();
});
