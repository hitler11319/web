var lastWinWidth = window.innerWidth, curIsMobile = lastWinWidth < 992, lastIsMobile = lastWinWidth < 992;
var boxOpener; // 暫存開啟目前 box 的按鈕
$(function() {

/*$('#ui-view').ajaxLoad();
$(document).ajaxComplete(function() {
  Pace.restart()
});*/

var announceLen = $('.announcement li').length;
var announceClosed = false;
if(announceLen > 0) {
	$('.announcement li').eq(0).addClass('active');
  if(announceLen >= 2) {
    setInterval(function() {
      if($('body').hasClass('announcement-hide')) {
        return;
      }
      var $curItem = $('.announcement .active');
      var $nextItem = $curItem.next('li');
      $curItem.removeClass('active');
      if($nextItem.length > 0) {
        $nextItem.addClass('active');
      }
      else {
        $('.announcement li:first-child').addClass('active');
      }
    }, 6000);
  }
}

$('.project-title, .todo-list, .sign-status', '.header-secondary').on('show.bs.dropdown', function() {
  $('body').addClass('special-menu-show');
}).on('hide.bs.dropdown', function() {
  $('body').removeClass('special-menu-show');
});

$('.announcement-toggler').on('click', function() {
  announceClosed = true;
  $('body').toggleClass('announcement-hide');
  if($('body').hasClass('announcement-hide')) {
    $('.announcement .active').removeClass('active');
    $('.announcement li:first-child').addClass('active');
  }
});

if(curIsMobile && $('.singular-page').length == 0) {
  setTimeout(function() {
    if(announceClosed) { return; }
    $('body').addClass('announcement-hide');
  }, 6000);
}

$('.special-menu-close-link').on('click', function() {
  $(this).closest('.special-menu').removeClass('show');
});

$('.special-menu-control-link').on('click', function() {
  $(this).closest('.special-menu').removeClass('show');
});

// 暫存開啟目前 box 的按鈕
$(document).on('click', '[data-menu-target]', function() {
  $($(this).data('menu-target')).addClass('show');
  boxOpener = $(this);
  console.log(boxOpener);
  // $($(this).data('menu-target')).attr('data-input', $(this).data('menu-target'));
});

// $(document).on('click', '.special-menu .list-group-item', function(){
//   $(this).closest('.special-menu').attr('data-value', $(this).text());
// });
// $(document).on('click', '.special-menu .card-footer .btn-primary', function(){
//   if($(this).closest('.special-menu').find('.list-group')){
//     $('.input-group-text[data-menu-target="' + menuBox.attr('data-input') + '"]').text(menuBox.attr('data-value'));
//   }
// });

$('[data-full-image-url]').on('click', function() {
  $($(this).data('menu-target')).find('.image-canvas').html('<img alt="" src="' + $(this).data('full-image-url') + '">');
});

$(document).on('click', '.dropdown-menu', function (e) {
  if(!$(e.target).is('.btn') && !$(e.target).is('.fa')) {
    e.stopPropagation();
  }
});

$(document).ready(function(){
  $('.sidebar-nav > .nav').prepend(
    function() { return $('#template-header-item').text(); }
  );
  $('.sidebar .nav-dropdown-list').each(function() {
    $(this).prepend(
      function() { return $('#template-back-item').text().replace('{{parent_title}}', $(this).parent().prev().text()); }
    );
  });
  $('.nav-dropdown-list .back-link').on('click', function(e){
    $(this).parents('.nav-item.open').removeClass('open');
  });
  var subSidePs;
  $('.nav-dropdown-items').each(function(){
    var tempPS = new PerfectScrollbar(this);
  });
  $(document).on('ready-or-resize-mobile', function() {
    $('body').removeClass('brand-minimized sidebar-minimized');
  });
});
$('.todo-list.dropdown').on({
  "hide.bs.dropdown":  function(e) {
      //console.log(e.clickEvent);
      if(typeof e.clickEvent != 'undefined' && !curIsMobile) return false;
  }
});
$('.todo-menu .todo-close').on('click', function(){
  $('.todo-list *[data-toggle="dropdown"]').trigger('click');
});

$('.list-group-item:not(.list-group-item-title)').on('click', function() {
  //if($(this).closest('.multi-level-list-group').length == 0 || $(this).siblings('.list-group').length == 0 || $(this).is('.level-root')) {
    $(this).parents('.list-group').last().find('.active').removeClass('active');
    $(this).addClass('active');
  //}
  if($(this).siblings('.list-group').length > 0) {
    $(this).toggleClass('show');
  }
});

//alert control
function showNotification(selector){
  $(selector).addClass('show');

}
$('*[data-alert]').click(function(){
  //$('.' + $(this).attr('data-alert')).alert();
  showNotification($(this).attr('data-alert'))
});


// fake loading
$('*[data-alert=".loading"]').click(function(){
  //$('.' + $(this).attr('data-alert')).alert();
  showNotification($(this).attr('data-alert'));
  $($(this).attr('data-alert')).find('.text').html($(this).attr('data-completed'));
  $('body').append('<div class="alert-overlay"></div>');
  startLoading();
});
function startLoading(){
  $('.loading i').show();
  $('.loading .text').addClass('d-none');
  setTimeout(function(){
    $('.loading i').hide();
    $('.loading .text').removeClass('d-none');
    setTimeout(function(){
      $('.loading').removeClass('show');
      $('.alert-overlay').remove();
    }, 1000);
  }, 2000);

}

// 收合內文控制
$(window).on('resize', function(){
  $('.fold-content').removeClass('unfold');
  $('.fold-content').each(function(){
    //console.log($(this).get(0).scrollHeight, $(this).innerHeight())
    if($(this).get(0).scrollHeight >  $(this).innerHeight()){
      $(this).addClass('folded')
    }else{
      $(this).removeClass('folded')
    }
  });
});
$('.tabs.page-tabs a').on('click', function(){
  setTimeout(function(){$(window).trigger('resize');}, 300);
})

$(document).on('click', '.fold-toggle', function(){
  var target = $(this).prev('.fold-content');
  if(target.is('.unfold')){
    target.removeClass('unfold');
  }else{
    target.addClass('unfold')
  }
});

// tabs
$(document).on('click', '.page-tabs a', function(e) {
  e.preventDefault();
  if($(this).hasClass('active')) { return; }
  var $container = $(this).closest('.tabs-container');
  var targetSelector = $(this).attr('href');
  $(this).addClass('active').siblings('.active').removeClass('active');
  $('.page-tab-content', $container).each(function() {
    if(!$(this).closest('.tabs-container').is($container)) { return true; }
    $(this).toggleClass('active', $(this).is(targetSelector));
  });
});

//videobox
$(document).on('click', '*[data-video]', function(){
  var url = $(this).attr('data-video');
  var videoType = $(this).attr('data-type');
  var box = $($(this).attr('data-menu-target'));
  if(box.length > 0){
    if(box.find('video')) box.find('video').remove();
    var video = $('<video id="#videoWrap" preload  controls loop></video>');
    video.html('<source src="' + url + '" type="' + videoType + '">');
    box.find('.video-wrap').append(video);
    box.find('.down-video').attr('href', url);
  }
});

// load remote content to modal content
// 避免其他意想不到的衝突，改用 data-href
$(document).on('show.bs.modal', function (e) {
  //console.log(e.relatedTarget)
  var button = $(e.relatedTarget);
  var modal = $(e.target);
  var href = button.data("href");
  if(href && href.length > 0) {
    modal.find('.modal-content').load(href);
  }

});




});
