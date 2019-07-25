$(function(){
    console.log('ie8 in');
    $('.round').hover(function(){
        $(this).animate({width:150, height:150}, 400);
    },function(){
        $(this).animate({width:50, height:50}, 400);
    });
});