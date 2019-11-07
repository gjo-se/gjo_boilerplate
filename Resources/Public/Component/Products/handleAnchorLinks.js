var _handleAnchorLinks = function () {

    var href = window.location.href;
    var anchor = window.location.hash;
    var $accessoryKitAnchor = $('.accessoryKit-anchor');

    $accessoryKitAnchor.click(function(){
        _setAccessoryKitAnchorForURL(this.hash);
    });

    _setAccessoryKitAnchorForURL = function(accessoryKitAnchorHash, href){
        window.location.hash = accessoryKitAnchorHash;
    };


    if(anchor){
        $('a[href="' + anchor + '"]').trigger('click');
    }

};


$(document).ready(function () {
    _handleAnchorLinks();
});
