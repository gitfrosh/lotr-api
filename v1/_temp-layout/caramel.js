/*!
// Caramel (http://caramel.ga/)
// Copyright 2015, All Rights Reserved
// @version 1.5.1
// @license SEE <LICENSE>
*/
$(document).ready(function() {
    var $nav = $('.nav');
    var $outside = $(document);

    $nav.on('click', '.collapse', function(e){
        e.stopPropagation();
        e.preventDefault();

        var $this = $(this);
        $this.parents($nav).toggleClass('open');

        $outside.one('click', function(e) {
            $nav.removeClass('open');
        });
    });

    $nav.on('click', '.dropdownitem', function(e){
        e.stopPropagation();
        e.preventDefault();

        var $this = $(this);
        $this.parent('.dropdown').toggleClass('open');

        $outside.one('click', function(e) {
            $nav.removeClass('open');
        });
    });

    // Alert Dismissables
    $(".dismiss").click(function() {
        $(this).closest("#close").fadeOut(300, function() {
            $(this).remove();
        });
    });

    $(window).resize();
});
