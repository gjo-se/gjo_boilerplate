var _handleAnchorLinks = function () {

    var href = window.location.href;
    var hash = window.location.hash;
    var $accessoryKitAnchor = $('.accessoryKit-anchor');


    $accessoryKitAnchor.click(function(){
        var accessoryKitAnchorHash = this.hash;
        window.location.hash = accessoryKitAnchorHash;
    });

    if(hash){
        $('a[href="' + hash + '"]').trigger('click');
    }

};


$(document).ready(function () {
    _handleAnchorLinks();
});
