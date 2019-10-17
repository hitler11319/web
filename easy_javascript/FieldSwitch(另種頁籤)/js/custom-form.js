$.fn.datepickerInit = function() {
  var $this = $(this);
  if(!curIsMobile) {
    $('input.datepicker:not(.datetimepicker):not(.datepicker-inited)', $this).addClass('datepicker-inited').datepicker({
      language: 'zh-TW',
      format: 'yyyy-mm-dd'
    });
    $('input.datetimepicker:not(.datepicker-inited)', $this).addClass('datepicker-inited').picker({
      datepickerOptions: {
        language: 'zh-TW',
        format: 'yyyy-mm-dd'
      },
      startDate: null,
      dateFormat: 'YYYY-MM-DD',
      timeFormat: 'HH:mm:ss',
      doneText: '確定',
      removeText: '清空',
      template:
        '<div id="datepicker">' +
        '  <div class="row"><div class="col"><div class="calendar"></div></div></div>' +
        '  <div class="row mt-2"><div class="col">' +
        '    <input type="text" value="{date}" name="date" id="date-picker" class="form-control">' +
        '    <input type="text" value="{time}" name="time" id="time-picker" class="form-control">' +
        '  </div></div>' +
        '  <div class="row mt-2"><div class="col">' +
        '    <a href="javascript:;" class="btn btn-primary btn-sm pull-left done">{doneText}</a>' +
        '    <a href="javascript:;" class="btn btn-sm text-danger pull-right remove hidden">{removeText}</a>' +
        '  </div></div>' +
        '</div>'
    });
  }
  else {
    $('input.datepicker:not(.datetimepicker):not([type="date"])', $this).attr('type', 'date');
    /*$('input.datetimepicker:not([type="datetime-local"])', $this).each(function() {
      $(this).val($(this).val().replace(' ', 'T')).attr('type', 'datetime-local')
    });*/
  }
  return this;
};

$(function() {

// 表單處理
$('[data-enabled-by]').each(function() {
  var $this = $(this), selector = $this.data('enabled-by');
  $this.prop('disabled', $(selector).filter(':checked').length == 0);
  $(document).on('change', selector, function() {
    $this.prop('disabled', $(selector).filter(':checked').length == 0);
  });
});
$('[data-confirm]').on('submit', function(e) {
  if(!confirm($(this).data('confirm'))) {
    e.preventDefault();
  }
});
$('.back-to-default-value').on('click', function() {
  var $form = $(this).closest('form');
  $form.find('select').each(function() {
    var $defaultSelected = $(this).find('option[selected]');
    if($defaultSelected.length > 0) {
      $defaultSelected.prop('selected', true).trigger('change');
    }
    else {
      $(this).prop('selectedIndex', 0);
    }
  });
  $form.find('textarea, input:not([type="radio"]):not(input[type="checkbox"]):not(input[type="submit"]):not(input[type="button"])').each(function() {
    $(this).val($(this).prop('defaultValue')).trigger('change');
  });
  $form.find('input[type="radio"], input[type="checkbox"]').each(function() {
    var defChecked = $(this).is('[checked]');
    $(this).prop('checked', defChecked).trigger('change');
    $(this).closest('.btn').toggleClass('active', defChecked);
  });
});

$(document).on('ready-or-resize-pc', function() {
  $('input.datepicker[type="date"]').attr('type', 'text');
  /*$('input.datepicker').attr('type', 'text');
  $('input.datetimepicker').each(function() {
    $(this).val($(this).val().replace('T', ' '));
  });*/
  $(document).datepickerInit();
}).on('ready-or-resize-mobile', function() {
  $(document).datepickerInit();
});

$('.password-mask-toggle').on('click', function() {
  var fieldType = $(this).closest('.input-group').find('input').attr('type');
  $(this).closest('.input-group').find('input').attr('type', fieldType == 'text' ? 'password' : 'text');
});

$('.field-append-btn').on('click', function() {
  var $container = $(this).closest('.field-box');
  var flLimit = parseInt($container.data('file-limit')) || 0;
  $('.field-list', $container).append($($(this).data('template')).text());
  if(flLimit != 0 && $('.field-item', $container).length >= flLimit) {
    $('.field-append-btn').addClass('d-none', $container);
  }
});
$(document).on('click', '.field-remove-btn', function() {
  var $container = $(this).closest('.field-box');
  var flLimit = parseInt($container.data('file-limit')) || 0;
  $(this).closest('.field-item').remove();
  if(flLimit != 0 && $('.field-item', $container).length < flLimit) {
    $('.field-append-btn').removeClass('d-none', $container);
  }
});

$('*[data-maptype] input').on('change', function(){
  var blanks = $(this).parents('.btn-group');
  console.log(blanks.find('.maptype-address'))
  if($(this).val() == 'address'){
    blanks.siblings('.maptype-address').removeClass('d-none');
    blanks.siblings('.maptype-latlng').addClass('d-none');
  }else if ($(this).val() == 'latlng'){
    blanks.siblings('.maptype-latlng').removeClass('d-none');
    blanks.siblings('.maptype-address').addClass('d-none');
  }
});

// 根據選項收合/顯示欄位
$('.field-switch .field-group-toggle input').on('change', function() {
  var $container = $(this).closest('.field-switch');
  var $target = $($(this).closest('.field-group-toggle').find(':checked').data('fields'), $container);
  $('.field-group', $container).each(function() {
    if($(this).closest('.field-switch').is($container)) {
      $(this).removeClass('active')
    }
  });
  $target.addClass('active');
});

// 整體搜尋條件收合
$(document).ready(function(){
  $(document).on('click', '.field-collapse .btn-field-collapse', function() {
    var $container = $(this).closest('.field-collapse');
    if($(this).hasClass('.btn-field-collapse-open')) {
      $container.removeClass('collapsed');
      return;
    }
    if($(this).hasClass('.btn-field-collapse-close')) {
      $container.addClass('collapsed');
      return;
    }
    $container.toggleClass('collapsed');
  });
});

// radio to switch show / hidden
$('input.radio-show-switch').on('change', function(){
  var showItem = $('#' + $(this).attr('name'));
  console.log($(this).val(),$(this).attr('name'))
  if($(this).val() == 'yes'){
    showItem.removeClass('d-none');
  }else{
    showItem.addClass('d-none');
  }
});

});
