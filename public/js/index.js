$(function () {
    $('#mnav h2').on('click',function(){
      $('#mnav>ul').toggle();
      $('#mnav h2').toggleClass('open');
    });
    $(".menu ul").css({ display: "none" }); 
    $(".menu li").hover(function () {
      $(this).find('ul:first').css({ visibility: "visible"}).slideDown("normal");
    }, function () {
      $(this).find('ul:first').css({ visibility: "hidden" });
    });
  });