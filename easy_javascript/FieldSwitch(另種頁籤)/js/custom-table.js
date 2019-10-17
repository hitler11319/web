$.fn.getSort = function() {
  return $(this).data('cur-sort') || null;
};

$.fn.switchFoldableRemove = function(){
  return this.each(function() {
    var item = $(this);
    if(!item.hasClass('foldable-item')) {
      item = item.find('.foldable-item');
    }
    item.each(function() {
      if($(this).find('.foldable-list').length <= 0 ) {
        $(this).find('.btn-foldable-remove').removeClass('d-none');
        $(this).find('.fa-angle-up, .fa-angle-down').addClass('d-none');
      }else{
        $(this).find('.btn-foldable-remove').eq(0).addClass('d-none');
        $(this).find('.fa-angle-up, .fa-angle-down').eq(0).removeClass('d-none');
      }
    });
  });
}

$.fn.tableInit = function(triggerOnReady) {

  return this.each(function() {

    var $this = $(this);
    var $allTable;

    if($this.closest('table').length > 0) {
      $this = $this.closest('table');
    }
    if($this.is('table')) {
      $allTable = $this.filter('.table');
    }
    else {
      $allTable = $('.table', $this);
    }

    // RWD 表格處理

    $('thead th', $allTable).each(function() {

      var $thCell = $(this);
      var thIdx = $thCell.index();
      var $thTable = $thCell.closest('.table');
      var thInResTable = $thTable.hasClass('responsive-table');
      var $tdCell = $('tbody td:nth-child(' + (thIdx + 1) + ')', $thTable);

      if(thInResTable && $thCell.is('[data-responsive-title]')) {
        $tdCell.filter(':not([data-responsive-title])').attr('data-responsive-title', $thCell.data('responsive-title'));
      }
      if(thInResTable && $thCell.is('[data-required-label]')) {
        $tdCell.filter(':not([data-required-label])').attr('data-required-label', $thCell.data('required-label'));
      }
      if(thInResTable && $thCell.is('[data-title="true"]')) {
        $tdCell.addClass('data-title');
      }
      if(thInResTable && $thCell.is('[data-id="true"]')) {
        $tdCell.addClass('data-id');
      }

      if(thInResTable && $thCell.is('[data-control-links="true"]')) {
        $tdCell.addClass('control-links');
      }
      if(thInResTable && $thCell.is('[data-checkbox-cell="true"]')) {
        $tdCell.addClass('checkbox-cell');
        if(triggerOnReady) {
          $thCell.toggleClass('checkbox-cell', $thCell.data('checkallable'));
        }
      }

      if(triggerOnReady && $thCell.is('[data-checkbox-cell="true"]')) {
        $thCell.html('<input type="checkbox" class="column-check-all">');
        if($thTable.prev('.data-sort').length == 0) {
          $thTable.before('<div class="data-sort' + ($thTable.hasClass('force-mobile-table') ? ' data-sort-force-mobile-table' : '') + '"></div>');
        }
        var checkAllLabel = $thCell.data('checkall-label') || '選擇全部';
        $thTable.prev('.data-sort').append('<div class="data-check-all-func checkbox-cell"><input type="checkbox" class="column-check-all-mobile" data-index="' + thIdx + '"><span class="column-check-all-label">' + checkAllLabel + '</span></div>');
      }

      if(thInResTable && $thCell.is('[data-radio-cell="true"]')) {
        $tdCell.addClass('radio-cell');
      }

    });

    $('tbody tr[data-link] td:not(.checkbox-cell):not(.radio-cell):not(.control-links):not(.unclickable-cell)', $allTable).addClass('clickable-cell');

    $allTable.filter('.responsive-table[data-mobile-column]').each(function() {
      var visibleCol = parseInt($(this).data('mobile-column'));
      if(visibleCol < 1) { return true; }
      if(triggerOnReady) { $('thead tr', this).append('<th class="hide-column-on-pc"></th>'); }
      $('tbody td:nth-child(n+' + (visibleCol + 1) + ')', this).addClass('hide-column-on-mobile');
      $('tbody tr', this).append('<td class="hide-column-on-pc toggle-column-mobile-visible"><div class="toggle-text"></div></td>');
    });

  });

};

$(function() {

// RWD 表格處理

$(document).tableInit(true)

  .on('change', '.column-check-all', function() {
    $(this).closest('table').find('tbody td:nth-child(' + ($(this).index() + 1) + ') input[type="checkbox"]').prop('checked', $(this).prop('checked')).trigger('change');
  })
  .on('change', '.column-check-all-mobile', function() {
    $(this).closest('.data-sort').next('table').find('tbody td:nth-child(' + ($(this).data('index') + 1) + ') input[type="checkbox"]').prop('checked', $(this).prop('checked')).trigger('change');
  })

  .on('click', '.table:not(.checkable-table-rows) .checkbox-cell, .data-check-all-func', function() {
    $(this).find('input').prop('checked', !$(this).find('input').prop('checked')).trigger('change');
  })
  .on('click', '.table:not(.checkable-table-rows) .radio-cell', function() {
    $(this).find('input').prop('checked', true).trigger('change');
  })

  .on('change', '.table .checkbox-cell input, .data-check-all-func input', function() {
    $(this).closest('.checkbox-cell').toggleClass('active', $(this).prop('checked'));
  })
  .on('change', '.table .radio-cell input', function() {
    $(this).closest('table').find('.radio-cell.active').removeClass('active');
    $(this).closest('.radio-cell').toggleClass('active', $(this).prop('checked'));
  })

  .on('click', '.table tbody tr[data-link] td:not(.checkbox-cell):not(.radio-cell):not(.control-links):not(.unclickable-cell)', function() {
    window.location.href = $(this).closest('tr').data('link');
  })

  .on('click', '.table.checkable-table-rows.type-checkbox tr', function() {
    var $field = $(this).closest('tr').find('.checkbox-cell input');
    $field.prop('checked', $field.prop('checked')).trigger('change');
  })
  .on('click', '.table.checkable-table-rows.type-radio tr', function() {
    $(this).closest('tr').find('.radio-cell input').prop('checked', true).trigger('change');
  })

  .on('click', '.toggle-column-mobile-visible', function() {
    $(this).closest('tr').toggleClass('uncollapsed-row');
  });

// sort arrow switch
$('[data-sort]').on('click', function(){
  switch($(this).attr('data-sort')) {
    case 'asc':
      $(this).attr('data-sort', 'desc').siblings('[data-sort]').attr('data-sort', 'none');
      break;
    case 'desc':
    default:
      $(this).attr('data-sort', 'asc').siblings('[data-sort]').attr('data-sort', 'none');
  }
  $(this).closest('table').prev('.data-sort').find('.data-sort-func select').val($(this).index() + '-' + $(this).attr('data-sort'));
  tableSortEvt($(this).closest('table'));
});
$('[data-sort]').each(function() {
  var $table = $(this).closest('table');
  if($table.prev('.data-sort').length == 0) {
    $table.before('<div class="data-sort' + ($table.hasClass('force-mobile-table') ? ' data-sort-force-mobile-table' : '') + '"></div>');
  }
  if($table.prev('.data-sort').find('.data-sort-func').length == 0) {
    $table.prev('.data-sort').prepend('<div class="data-sort-func input-group' +
      '"><div class="input-group-prepend"><div class="input-group-text">排序</div></div>' +
      '<select class="form-control field-switch"><option value="">無</option></select></div>');
  }
  var $sortUI = $table.prev('.data-sort');
  var dataSort = $(this).attr('data-sort');
  var fieldIdx = $(this).index();
  $('.field-switch', $sortUI).append('<option value="' + fieldIdx + '-asc"' + (dataSort == 'asc' ? ' selected' : '') + '>' + $(this).text() +
    ' ▲</option><option value="' + fieldIdx + '-desc"' + (dataSort == 'desc' ? ' selected' : '') + '>' + $(this).text() + ' ▼</option>');
});
$('.field-switch').on('change', function() {
  var $table = $(this).closest('.data-sort').next('table');
  var curSort = $(this).val().split('-');
  if(curSort.length == 1) {
    $('[data-sort]', $table).attr('data-sort', 'none');
  }
  else {
    $('th', $table).eq(curSort[0]).attr('data-sort', curSort[1]).siblings('[data-sort]').attr('data-sort', 'none');
  }
  tableSortEvt($table);
});
$('table:has([data-sort])').each(function() {
  tableSortEvt($(this), true);
});
function tableSortEvt($table, triggerOnReady) {
  var curVal = $('[data-sort="asc"],[data-sort="desc"]', $table).map(function() {
    return {
      index: $(this).index(),
      name: $(this).attr('data-name') || '',
      text: $(this).text() || '',
      order: $(this).attr('data-sort'),
    };
  }).get();
  $table.data('cur-sort', curVal.length > 0 ? curVal[0] : null);
  if(triggerOnReady) { return; }
  $table.trigger({
    type: 'change-sort',
    sort: curVal.length > 0 ? curVal[0] : null
  });
}

//control table to map
$(document).on('click', '.map-item.pickable-item', function(){
  $(this).addClass('picked-item').siblings().removeClass('picked-item');
  var table = $(this).parents('.map-table');
  var top = table.find('tr').index($(this));
  var h = ($(this).height() <= 10)? 49 : $(this).height();
  table.find('.arrow').css({
    'top': (h * (top + 0.5)) + 'px'
  });
  $($(this).attr('data-info')).show();
}).eq(0).click();
$(document).on('click', '.close-map-info', function(){
  $(this).parents('.map-info').hide();
});
if($('.map-table').length > 0) {
  $('.map-table').prepend('<a href="javascript:;" class="map-table-collapse-btn d-lg-none"></a>');
}
$('.map-table-collapse-btn').on('click', function() {
  var $mapTable = $(this).closest('.map-table');
  if($mapTable.hasClass('show')) {
    $mapTable.removeClass('show')
    $mapTable.addClass('hide')
  }
  else {
    $mapTable.addClass('show')
    $mapTable.removeClass('hide')
  }
});
// 多層表格收合控制
$(document).on('click', '.foldable-toggle', function(){
  $(this).closest('.foldable-item').children('.foldable-list').toggleClass('unfold');
  $(this).find('.fa').toggleClass('fa-angle-down fa-angle-up');
  if($(this).find('.fa').hasClass('fa-angle-down')){
    $(this).closest('.foldable-item').find('.foldable-list').removeClass('unfold');
    $(this).closest('.foldable-item').find('.fa').removeClass('fa-angle-up').addClass('fa-angle-down');
  }
});
//可更新欄位控制
//切換編輯狀態使用 field-collapse
$(document).on('click', '.renewable-item .btn-renew-content', function(){
  var renewableItem = $(this).closest('.renewable-item');
  if(renewableItem.find('.renew-input').val() != '') renewableItem.find('.renew-target').text(renewableItem.find('.renew-input').val());
});
$(document).on('click', '.renewable-item .btn-renew-edit', function(e){
  var _this = $(this);
  var checkTimer = setInterval(function(){
    if(_this.closest('.renewable-item').find('.renew-input').is(':visible')){
      _this.closest('.renewable-item').find('.renew-input').focus();
      clearInterval(checkTimer);
    }

  },300);
});
//新增多層表格子項
$(document).on('click', '.btn-foldable-add-child', function(){
  var maxLV = $(this).closest('.foldable-top-list').attr('data-maxlv');
  var target = $(this).closest('.foldable-item').children('.foldable-list');
  if(target.length <=0){
    $(this).closest('.foldable-item').append('<ul class="foldable-list unfold"></ul>');
    target = $(this).closest('.foldable-item').children('.foldable-list');
  }
  var subLV = $(this).parents('.foldable-list').length + 1;
  var template = $('.foldable-template .foldable-item').clone();
  template.find('.foldable-content').addClass('level-' + subLV);
  template.find('.field-collapse').addClass('collapsed');
  console.log(template)
  if(subLV == maxLV){
    template.find('.btn-foldable-add-child').remove();
  }
  target.append(template);
  template.switchFoldableRemove();
  $(this).closest('.foldable-item').switchFoldableRemove();
  template.find('input').focus();
});
$(document).on('click', '.btn-foldable-remove', function(){
  var removeItem = $(this).closest('.foldable-item');

  if(removeItem.siblings().length <= 0) removeItem = $(this).closest('.foldable-list');
  var parentItem = removeItem.parents('.foldable-item').eq(0);

  removeItem.remove();
  parentItem.switchFoldableRemove();

  //removeItem.remove();
});
$(document).switchFoldableRemove();
//表格內連動起用 disabled 輸入格控制
//data-connect-item 指定 value 變動時，同一 tr 內的輸入框將 disabled 狀態移除
//ex: B.1.2.1
$(document).on('change', '[data-connect-item]', function(){
  var connectItem = $(this).parents('tr').find($(this).attr('data-connect-item'));
  connectItem.prop('disabled', false);
});
//表格(不是選單)切換已選擇/顯示全部
//display-selected-wrap 內 display-selected-toggle 為 toggle, display-selected-items 為所有項目父層(li or table)
$(document).on('change', '.display-selected-wrap .display-selected-item input', function() {
  var $this = $(this);
  var $outterContainer = $this.closest('.display-selected-item');
  $outterContainer.toggleClass('active', $this.prop('checked'));
});
$(document).on('change', '.display-selected-wrap .display-selected-toggle', function() {
  var $this = $(this);
  var $outterContainer = $this.closest('.display-selected-wrap');
  if($this.prop('checked')) {
    $outterContainer.toggleClass('hide-non-selected', $this.val() == 1);
  }
});

});
