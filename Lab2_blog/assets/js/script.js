$(document).ready(function () {
   $('.burger').click(function (e) { 
      e.preventDefault();
      $('.menu_burger').toggleClass("menu_burger-active");
   });
   $('.input_wrapper').click(function (e) { 
      e.preventDefault();
      $('.input_wrapper span').addClass('active');
   });
   $(".input_wrapper").focusout(function (e) {
     var valset = $(".input_wrapper input").val();
     if (valset == "") {
       $(".input_wrapper span").removeClass("active");
     }
   });
});