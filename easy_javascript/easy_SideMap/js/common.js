$(function () {
  $.jvmobilemenu({
    mainContent: $('.page'),
    theMenu: $('.mobile-nav'),
    slideSpeed: 0.3,
    menuWidth: 260,
    position: 'right',
    menuPadding: '20px 20px 60px'
  });
});

$(function () {
  $('.mobile-left-menu-hamburger').click(function () {
    if ($('.left_sideMenu').is(':hidden')) {
      $('.left_sideMenu').show();
    } else {
      $('.left_sideMenu').hide();
    }
  });
  if ($('.here a').attr('href') != undefined) {
    var here = $('.here a').attr('href').split('/').reverse()[0];
    $.each($('.left_sideMenu .subMenu a'), function () {
      var pageUrl = $(this).attr('href').split('/').reverse()[0];
      if (pageUrl == here) {
        $(this).parent().addClass('btn_in');
        $(this).closest(".subMenu").prev().addClass('btn_in');
        $(this).closest(".subMenu").show();
      }
    });
  }

  $('.left_sideMenu h3').click(function () {
    var dir = $(this);
    if (dir.next().is(':hidden')) {
      dir.next().show();
    } else {
      dir.next().hide();
    }
  });
  $('[data-toggle="tooltip"]').tooltip();
});