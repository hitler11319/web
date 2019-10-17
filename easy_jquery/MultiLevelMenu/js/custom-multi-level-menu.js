(function($) {

  $.fn.multiLevelMenu = function(customOptions, param, j, k) {

    switch(customOptions) {

      // 給使用者取值用
      case 'get-selected':
        var $this = $(this);
        var $outterContainer = $('.multi-level-menu-container', $this);
        return $outterContainer.data('selected-items');
        break;

      // 給使用者手動設值用
      case 'set-selected':
        return this.each(function() {
          var $this = $(this);
          var $outterContainer = $('.multi-level-menu-container', $this);
          var options = $outterContainer.data().options;
          if(typeof param === 'undefined') {
            console.warn('multiLevelMenu: 使用 set-selected 方法，但沒有提供要選取的值。');
            return false;
          }
          else if(typeof param !== 'number' && typeof param !== 'string') {
            console.warn('multiLevelMenu: 使用 set-selected 方法，提供的值必須是字串或數值。');
            return false;
          }

          // 單選選單:
          // 將輸入值 selected: true, 其餘項目全部 selected: false

          // 複選選單:
          // 將輸入值 selected: true, 其餘項目非底層者 selected: false
          // 如輸入值本身非底層, 底層項目也全部 selected: false

          // 共有規則:
          // 如輸入值本身非底層, 但 cross: false, 回傳 console.warn() 警告
          // 如輸入值在 data 陣列裡出現不只一次, 回傳 console.warn() 警告

          var returnParam = $(options.data).multiLevelMenu('_walkListSetSelectedItem', {
            selectedValue: param,
            multipleSelectable: options.multiple,
            crossSelectable: options.cross,
            totalLevel: options.depth
          });
          if(returnParam.warningMsg !== null) {
            console.warn(returnParam.warningMsg);
            return false;
          }

          if(returnParam.selectedDeepestLevel && returnParam.multipleSelectable && returnParam.selectedLevel < returnParam.totalLevel - 1) {
            $(options.data).multiLevelMenu('_unselectedDeepestItem', returnParam.totalLevel);
          }

          $outterContainer.parent().empty().multiLevelMenu(options);

        });
        break;

      // 紀錄目前的選取狀態
      case 'backup-selected':
        return this.each(function() {
          var $this = $(this);
          var $outterContainer = $('.multi-level-menu-container', $this);
          $outterContainer.data('backup', {
            data: $.extend(true, {}, $outterContainer.data()),
            html: $outterContainer[0].outerHTML
          });
        });
        break;

      // 復原上次的選取狀態
      case 'recover-selected':
        return this.each(function() {
          var $this = $(this);
          var $outterContainer = $('.multi-level-menu-container', $this);
          var backup = $outterContainer.data('backup');
          $outterContainer[0].outerHTML = backup.html;
          $('.multi-level-menu-container', $this).data($.extend(true, {}, backup.data)).data('backup', backup);
        });
        break;

      // 以下為內部使用

      // 遍歷項目陣列變更 selected 屬性: 供 set-selected 方法使用
      case '_walkListSetSelectedItem':
        var arr = this;
        var curLevel = j || 0;
        param.selectedDeepestLevel = param.selectedDeepestLevel || false;
        param.selectedLevel = param.selectedLevel || null;
        param.warningMsg = param.warningMsg || null;
        if(param.warningMsg !== null) {
          return param;
        }
        for (var i = 0; i < arr.length; i++) {
          if(arr[i].value == param.selectedValue) {
            if(!param.crossSelectable && curLevel < param.totalLevel - 1) {
              param.warningMsg = 'multiLevelMenu: 使用 set-selected 方法，但指定的值與 cross: false 衝突。';
              break;
            }
            if(param.selectedLevel) {
              param.warningMsg = 'multiLevelMenu: 使用 set-selected 方法，但指定的值在 data 陣列裡出現不只一次。';
              break;
            }
            arr[i].selected = true;
            param.selectedLevel = curLevel;
          }
          else if(!param.multipleSelectable || curLevel < param.totalLevel - 1) {
            arr[i].selected = false;
          }
          else if(param.multipleSelectable && curLevel == param.totalLevel - 1 && arr[i].selected) {
            param.selectedDeepestLevel = true;
          }
          if(arr[i].hasOwnProperty('children') && Array.isArray(arr[i].children)) {
            param = $(arr[i].children).multiLevelMenu('_walkListSetSelectedItem', param, curLevel + 1);
          }
        }
        return param;
        break;

      case '_unselectedDeepestItem':
        var arr = this;
        var totalLevel = param || 1;
        var curLevel = j || 0;
        for (var i = 0; i < arr.length; i++) {
          if(curLevel == totalLevel - 1) {
            arr[i].selected = false;
          }
          if(arr[i].hasOwnProperty('children') && Array.isArray(arr[i].children)) {
            $(arr[i].children).multiLevelMenu('_unselectedDeepestItem', totalLevel, curLevel + 1);
          }
        }
        return this;
        break;

      // 遍歷項目陣列變更 selected 屬性: 將單一項目指定為已選項目，其他所有項目取消選取
      case '_walkListUpdateSingularItem':
        var arr = this;
        var curLevel = j || 0;
        var prevLevelSelected = k || false;
        var $selectedItem = $('.menu-list-container:eq(' + curLevel + ') .activable-item.active', param.outterContainer);
        var selectedIndex = $selectedItem.length > 0 ? $selectedItem.data('index') : -1;
        var isSelectedLevel = curLevel == param.selectedLevel;
        for (var i = 0; i < arr.length; i++) {
          curSelected = selectedIndex == i && (prevLevelSelected || curLevel == 0);
          arr[i].selected = isSelectedLevel && curSelected;
          if(arr[i].hasOwnProperty('children') && Array.isArray(arr[i].children)) {
            $(arr[i].children).multiLevelMenu('_walkListUpdateSingularItem', param, curLevel + 1, curSelected && curLevel < param.selectedLevel);
          }
        }
        return this;
        break;

      // 遍歷項目陣列變更 selected 屬性: 將多個項目指定為已選或未選，不影響其他已選項目 (但如果是非底層的已選項目，取消選取)
      case '_walkListUpdateMultipleItem':
        var arr = this;
        var curLevel = j || 0;
        var prevLevelSelected = k || false;
        var $curLevelItems = $('.menu-list-container:eq(' + curLevel + ') .activable-item', param.outterContainer);
        var $selectedItem = $('.menu-list-container:eq(' + curLevel + ') .activable-item.active', param.outterContainer);
        var selectedIndex = curLevel == param.selectedLevel || $selectedItem.length == 0 ? -1 : $selectedItem.data('index');
        var isSelectedLevel = curLevel == param.selectedLevel;
        for (var i = 0; i < arr.length; i++) {
          if(!isSelectedLevel) { arr[i].selected = false; }
          else if(prevLevelSelected || curLevel == 0) { arr[i].selected = $curLevelItems.eq(i).hasClass('active'); }
          if(arr[i].hasOwnProperty('children') && Array.isArray(arr[i].children)) {
            $(arr[i].children).multiLevelMenu('_walkListUpdateMultipleItem', param, curLevel + 1, selectedIndex == i && (prevLevelSelected || curLevel == 0));
          }
        }
        return this;
        break;

      // 遍歷項目陣列變更 selected 屬性: 來自不分類選單的變動
      case '_walkListUpdateUncategorizedItem':
        var arr = this
        var curLevel = j || 0;
        var prevLevelSelected = k || false;
        var isSelectedLevel = curLevel == param.updatedItem.parents.length;
        //var logTable = [];
        for (var i = 0; i < arr.length; i++) {
          //logTable.push({'項目物件': arr[i].text, '底層': isSelectedLevel, '多選': param.multipleSelect, '上層已被選': prevLevelSelected, '底層被選index': param.updatedItem.index, 'index': i});
          if(!isSelectedLevel || (!param.multipleSelect && (!prevLevelSelected || i != param.updatedItem.index))) { arr[i].selected = false; }
          else if(isSelectedLevel && prevLevelSelected && i == param.updatedItem.index) { arr[i].selected = param.newSelectedStatus; }
          if(arr[i].hasOwnProperty('children') && Array.isArray(arr[i].children)) {
            $(arr[i].children).multiLevelMenu('_walkListUpdateUncategorizedItem', param, curLevel + 1, param.updatedItem.parents[curLevel].index == i && (prevLevelSelected || curLevel == 0));
          }
        }
        //console.table(logTable);
        return this;
        break;

      // 遍歷項目陣列: 回傳已選項陣列
      case '_walkListGetSelectedItem':
        var arr = this;
        var selectedList = param || [];
        var parentList = j || [];
        for (var i = 0; i < arr.length; i++) {
          var item = arr[i];
          var label = item.hasOwnProperty('text') ? item.text : '';
          var desc = item.hasOwnProperty('desc') ? item.desc : '';
          var value = item.hasOwnProperty('value') ? item.value : label;
          var meta = item.hasOwnProperty('meta') ? item.meta : '';
          if(item.hasOwnProperty('selected') && item.selected) {
            selectedList.push({
              index: i,
              text: label,
              desc: desc,
              value: value,
              meta: meta,
              parents: parentList
            });
          }
          if(item.hasOwnProperty('children') && Array.isArray(item.children)) {
            $(item.children).multiLevelMenu('_walkListGetSelectedItem', selectedList, parentList.concat([{
              index: i,
              text: label,
              desc: desc,
              value: value,
              meta: meta,
            }]));
          }
        }
        return selectedList;
        break;

      // 介面更新: 已選項目列表
      case '_updateSelectedList':
        return this.each(function() {
          var $this = $(this);
          var $outterContainer = $('.multi-level-menu-container', $this);
          var options = $outterContainer.data().options;
          var isMultipleSelectMenu = options.multiple;
          var selectedList = $($outterContainer.data().options.data).multiLevelMenu('_walkListGetSelectedItem');
          $outterContainer.data('selected-items', isMultipleSelectMenu ? selectedList : (selectedList.length > 0 ? selectedList[0] : null));
          if(!options.selected) { return; }
          var html = '';
          for (var i = 0; i < selectedList.length; i++) {
            var item = selectedList[i];
            var label = item.text || '';
            var value = item.value || label;
            if(item.parents.length > 0){
              var parentTextList = $.map(item.parents, function(parentItem) {
                return parentItem.text;
              });
              label = '<span class="small text-muted">' + parentTextList.join('/') + '</span><br>' + label;
            }
            if(item.desc.length > 0){ label += '<br><span class="small text-muted">' + item.desc + '</span>'; }
            html += '<li data-value="' + value + '" class="menu-item' + (isMultipleSelectMenu ? ' inactivable-item checkbox-item' : '') + ' active"><label><span class="item-text">' + label + '</span></label></li>';
          }
          $('.selected-list', $outterContainer).html(html);
        });
        break;

      // 遍歷項目陣列: 回傳不分類選項陣列
      case '_walkListGetSelectableItem':
        var arr = this;
        var depth = param || 0;
        var selectableList = j || [];
        var parentList = k || [];
        for (var i = 0; i < arr.length; i++) {
          var item = arr[i];
          var label = item.hasOwnProperty('text') ? item.text : '';
          var desc = item.hasOwnProperty('desc') ? item.desc : '';
          var value = item.hasOwnProperty('value') ? item.value : label;
          var meta = item.hasOwnProperty('meta') ? item.meta : '';
          var selected = item.hasOwnProperty('selected') ? item.selected : '';
          if(parentList.length == depth - 1) {
            selectableList.push({
              index: i,
              text: label,
              desc: desc,
              value: value,
              meta: meta,
              selected: selected,
              parents: parentList
            });
          }
          if(item.hasOwnProperty('children') && Array.isArray(item.children)) {
            param.level ++;
            $(item.children).multiLevelMenu('_walkListGetSelectableItem', depth, selectableList, parentList.concat([{
              index: i,
              text: label,
              desc: desc,
              value: value,
              meta: meta,
            }]));
          }
        }
        return selectableList;
        break;

      // 介面更新: 不分類項目列表
      case '_updateSelectableList':
        return this.each(function() {
          var $this = $(this);
          var $outterContainer = $('.multi-level-menu-container', $this);
          var options = $outterContainer.data().options;
          var isMultipleSelectMenu = options.multiple;
          var selectableList = $($outterContainer.data().options.data).multiLevelMenu('_walkListGetSelectableItem', options.depth);
          $outterContainer.data('selectable-items', selectableList);
          var html = '';
          for (var i = 0; i < selectableList.length; i++) {
            var item = selectableList[i];
            var label = item.text || '';
            var value = item.value || label;
            var selected = item.selected || false;
            if(item.parents.length > 0){
              var parentTextList = $.map(item.parents, function(parentItem) {
                return parentItem.text;
              });
              label = '<span class="small text-muted">' + parentTextList.join('/') + '</span><br>' + label;
            }
            if(item.desc.length > 0){ label += '<br><span class="small text-muted">' + item.desc + '</span>'; }
            html += '<li data-value="' + value + '" class="menu-item all-activable-item ' + (isMultipleSelectMenu ? 'checkbox' : 'radio') + '-item' + (selected ? ' active' : '') + '"><label><span class="item-text">' + label + '</span></label></li>';
          }
          $('.selectable-list', $outterContainer).html(html);
        });
        break;

      // 觸發事件供使用者監聽
      case '_triggerChange':
        return this.each(function() {
          var $this = $(this);
          var $outterContainer = $('.multi-level-menu-container', $this);
          $this.trigger({
            type: 'change-selected',
            selected: $outterContainer.data('selected-items')
          });
        });
        break;

      // 介面更新: 切換項目的已選或未選，並處理因此而受影響的其他項目
      case '_toggleSelected':
        var newSelectedStatus = param;
        var $this = $(this);
        var $outterContainer = $this.closest('.multi-level-menu-container');
        var $container = $this.closest('.menu-list-container');
        var isLastContainer = $container.is(':last-child');
        var isCross = $this.hasClass('cross-item');
        var options = $outterContainer.data().options;
        var list = options.data;
        var isMultipleSelectMenu = options.multiple;
        // 切換 active 狀態
        $(this).toggleClass('active', newSelectedStatus);
        // 切換其他連動選項的 active 狀態
        var newActived = $this.hasClass('active');
        if(newActived && (!isLastContainer || !isMultipleSelectMenu || isCross)) {
          $this.siblings('.menu-item.active').removeClass('active');
        }
        else if(newActived) {
          $this.siblings('.cross-item.active').removeClass('active');
        }
        // 處理 options.data 裡的 selected 狀態
        if(newActived && (isCross || (!isMultipleSelectMenu && isLastContainer))) {
          // 把所有已選項目移除，只選起目前的 (如果是 isCross，則是把目前的父層選起)
          //console.log('selectedSingularItem');
          var $prevContainer = $container.prev();
          $(list).multiLevelMenu('_walkListUpdateSingularItem', {
            selectedLevel: $container.index() - (isCross ? 1 : 0),
            outterContainer: $outterContainer
          });
          //console.log(list);
        }
        else if(!isCross && isLastContainer && isMultipleSelectMenu) {
          // 照目前的資料選起與取消項目，並移除 "全部" 項目的選取 (也就是移除所有非最底層的選取項目)
          //console.log(newActived ? 'selectedMultipleItem' : 'unselectedMultipleItem');
          $(list).multiLevelMenu('_walkListUpdateMultipleItem', {
            selectedLevel: $container.index(),
            outterContainer: $outterContainer
          });
          //console.log(list);
        }
        if(isCross || isLastContainer) { $outterContainer.parent().multiLevelMenu('_updateSelectedList').multiLevelMenu('_triggerChange'); }
        return this;
        break;

      // 介面更新: 檢查並更新最底層是否全選
      case '_checkSelectedAll':
        return this.each(function() {
          var $container = $(this);
          var $outterContainer = $container.closest('.multi-level-menu-container');
          var isLastContainer = $container.is(':last-child');
          if(!isLastContainer || !$outterContainer.data().options.multiple) { return; }
          $('.select-all', $container).toggleClass('active', $('.menu-list .activable-item:not(.active)', $container).length == 0);
        });
        break;

      // 介面更新: 產生指定層次的項目列表
      case '_setItems':
        var level = param;
        return this.each(function() {
          var $this = $(this);
          var $outterContainer = $('.multi-level-menu-container', $this);
          var options = $outterContainer.data().options;
          var list = options.data;
          if(level >= options.depth) { return; }
          var nextLevelSelectedCross = false;
          for(i = 0; i < options.depth; i ++) {
            var $container = $('.menu-list-container', $this).eq(i);
            var selectedIndex = options.cross ? -1 : 0;
            if(i < level) {
              var $selectedItem = $('.menu-item.active', $container);
              selectedIndex = $selectedItem.length > 0 ? $selectedItem.data('index') : -1;
              if(i == level - 1 && selectedIndex > -1 && list[selectedIndex].hasOwnProperty('selected') && list[selectedIndex].selected) {
                nextLevelSelectedCross = true;
              }
            }
            else {
              var html = '';
              var isLastLevel = i == options.depth - 1;
              if(options.listAll && i == 0) {
                html += '<li class="menu-item list-all-item"><a href="javascript:;">全部項目</a></li>';
              }
              if(options.cross) {
                var rootSelected = level == 0 && i == 0 && ((!options.multiple && $outterContainer.data('selected-items') === null) || (options.multiple && $outterContainer.data('selected-items').length == 0));
                html += '<li class="menu-item cross-item' + (rootSelected || nextLevelSelectedCross ? ' active' : '') + '"><a href="javascript:;">全部</a></li>';
                nextLevelSelectedCross = false;
              }
              $.each(list, function(k, v) {
                if(!nextLevelSelectedCross) {
                  nextLevelSelectedCross = !isLastLevel && v.selected;
                  if(nextLevelSelectedCross) { selectedIndex = k; }
                }
                var label = v.hasOwnProperty('text') ? v.text : '';
                if(v.hasOwnProperty('desc') && v.desc.length > 0){ label += '<br><span class="small text-muted">' + v.desc + '</span>'; }
                label = '<span class="item-text">' + label + '</span>';
                var labelHTML = !isLastLevel ? '<a href="javascript:;">' + label + '</a>' : '<label>' + label + '</label>';
                html += '<li data-index="' + k + '"' + (isLastLevel || options.cross ? ' data-value="' + (v.hasOwnProperty('value') ? v.value : v.text) + '"' : '') + ' class="menu-item activable-item ' + (v.selected ? 'active ' : '') + (!isLastLevel ? 'normal' : (options.multiple ? 'checkbox' : 'radio')) + '-item">' + labelHTML + '</li>';
              });
              $('.menu-list', $container).html(html);
            }
            if(i >= options.depth - 1) {
              $outterContainer.data('items', list);
              $container.multiLevelMenu('_checkSelectedAll');
              return;
            }
            list = selectedIndex > -1 ? list[selectedIndex].children : [];
          }
        });
        break;

      // 清空搜尋條件並自動脫離已選項模式
      case '_resetSearch':
        return this.each(function() {
          var $this = $(this);
          var $keyword = $('.search-keyword', $this);
          var $selected = $('.search-selected[value="0"]', $this);
          if($keyword.length > 0 && $keyword.val().length > 0) {
            $keyword.val('').trigger('change');
          }
          if($selected.length > 0 && !$selected.prop('checked')) {
            //$selected.prop('checked', true).trigger('change').parent().button('toggle');
            $selected.prop('checked', true).trigger('change').parent().addClass('active').next().removeClass('active');
          }
        });
        break;

      // 處理初始化設定
      default:
        var options = $.extend(true, {
          depth:    1,     // 選單深度，最多支援到 10 層 (1 表示 1 層, 2 表示 2 層, ...)
          fields:   [],    // 欄位標題
          data:     [],    // 資料
          multiple: false, // 是否多選
          search:   false, // 是否有關鍵字搜尋
          selected: false, // 是否額外顯示已選項
          cross:    false, // 是否隨意層都可選取
          listAll:  false, // 是否在頂層顯示一個不分項的底層選項列表
          searchDesc: '',  // 搜尋框下說明文字
        }, customOptions);
        options.depth = options.depth > 10 ? 10 : (options.depth < 1 ? 1 : options.depth);
        options.listAll = options.depth >= 2 && options.listAll;
        return this.each(function() {
          var $this = $(this);
          $this.html('<div class="' + ((options.search || options.selected) ? 'field-collapse ' : '') + (options.depth == 1 ? 'current-last-level ' : '') + 'multi-level-menu-container" data-current-level="0"><div class="menu-header"><a href="javascript:;" class="back-item"><i class="nav-icon fa fa-arrow-left"></i></a>'
            + ((options.search || options.selected) ? '<a href="javascript:;" class="link btn-field-collapse"><span class="field-collapse-toggle-text-open small">展開搜尋列</span><span class="field-collapse-toggle-text-close small">隱藏搜尋列</span></a>':'') + '</div><div class="multi-level-menu-group"></div></div>')
          $('.multi-level-menu-container', $this).data('options', options);
          var html = '', searchFields = '', selectedList = '', selectableList = '';
          if(options.selected) {
            var seq = parseInt($('.multi-level-menu-container').length);
            searchFields += '<div class="form-group row btn-group-form-group"><div class="col-12 btn-group btn-group-toggle" data-toggle="buttons"><label class="btn btn-outline-secondary active"><input class="search-selected" name="mlMenuOnlyDisplaySelected-' + seq + '" type="radio" value="0" checked>顯示全部</label><label class="btn btn-outline-secondary"><input class="search-selected" name="mlMenuOnlyDisplaySelected-' + seq + '" type="radio" value="1">已選擇項目</label></div></div>';
            selectedList += '<ul class="selected-list"></ul>';
          }
          if(options.listAll) {
            selectableList += '<ul class="selectable-list"></ul>';;
          }
          if(options.search) {
            searchFields += '<div class="form-group search-keyword-form-group"><input type="text" class="form-control search-keyword">' + (options.searchDesc!='' ? '<small class="text-muted">' + options.searchDesc + '</small>' : '') + '</div>';
          }
          if(searchFields.length > 0) {
            searchFields = '<div class="col-12 bg-light menu-search field-collapse-detail">' + searchFields + '</div>';
          }
          if(options.multiple) {
            searchFields += '<li class="menu-item checkbox-item select-all"><label>全選</label></li>';
          }
          for(i = 0; i < options.depth; i ++) {
            html += '<div class="menu-list-container' + (i == 0 ? ' active' : '')
              + '"><div class="menu-title d-flex justify-content-between align-items-end"><span>' + options.fields[i] + '</span></div>' + (i == options.depth - 1 ? searchFields : '') + '<ul class="menu-list"></ul>'
              + (i == options.depth - 1 ? selectedList + selectableList : '') + '</div>'
          }
          $('.multi-level-menu-group', $this).html(html);
          $this.multiLevelMenu('_updateSelectedList').multiLevelMenu('_setItems', 0).multiLevelMenu('backup-selected');
        });

    }

  };

  $(document).on('change', '.multi-level-menu-container .search-selected', function() { // 切換顯示模式: 全部項目或已選項目
    var $this = $(this);
    var $outterContainer = $this.closest('.multi-level-menu-container');
    if($this.prop('checked')) {
      $outterContainer.toggleClass('hide-non-selected', $this.val() == 1);
    }
  }).on('change keyup', '.multi-level-menu-container .search-keyword', function() { // 觸發搜尋
    var $this = $(this);
    var $outterContainer = $this.closest('.multi-level-menu-container');
    var $container = $('.menu-list-container:last-child', $outterContainer);
    var term = $this.val().toLowerCase();
    if($this.attr('data-last-term') == term) {
      return;
    }
    $('.menu-list .menu-item.matched', $container).removeClass('matched');
    if(term.length > 0) {
      var list = $outterContainer.data().items;
      $.each(list, function(k, v) {
        if((v.text && v.text.toLowerCase().indexOf(term) > -1) || (v.desc && v.desc.toLowerCase().indexOf(term) > -1)) {
          $('.menu-list .menu-item:eq(' + k + ')', $container).addClass('matched');
        }
      });
      $outterContainer.addClass('hide-non-matched');
    }
    else {
      $('.matched', $outterContainer).removeClass('matched');
      $outterContainer.removeClass('hide-non-matched');
    }
    $this.attr('data-last-term', term);
  }).on('click', '.multi-level-menu-container .menu-list-container.active .menu-item', function() { // 點擊選項
    var $this = $(this);
    var $outterContainer = $this.closest('.multi-level-menu-container');
    var $container = $this.closest('.menu-list-container');
    var isLastContainer = $container.is(':last-child');
    var isActived = $this.hasClass('active');
    var isCheckAll = $this.hasClass('select-all');
    var isCross = $this.hasClass('cross-item');
    var isListAll = $this.hasClass('list-all-item');
    var curLevel = parseInt($outterContainer.attr('data-current-level'));
    if(isListAll) {
      $outterContainer.parent().multiLevelMenu('_updateSelectableList');
      //$('.activable-item.normal-item.active', $outterContainer).removeClass('active');
      //$this.addClass('active');
      $container.removeClass('active');
      $('.menu-list-container:last-child', $outterContainer).addClass('active');
      $outterContainer.addClass('current-list-all');
      $outterContainer.attr('data-current-level', curLevel + 1);
      $outterContainer.parent().multiLevelMenu('_resetSearch');
      return;
    }
    if(isLastContainer && isCheckAll && $outterContainer.data().options.multiple) {
      $this.toggleClass('active');
      $('.menu-list .activable-item', $container).multiLevelMenu('_toggleSelected', $this.hasClass('active'));
      return;
    }
    if($this.closest('.menu-list').length == 0) {
      return;
    }
    if(isLastContainer && $outterContainer.data().options.multiple) {
      if(isCross && isActived) { return; }
      $this.multiLevelMenu('_toggleSelected');
      $container.multiLevelMenu('_checkSelectedAll');
      return;
    }
    if(!isActived) {
      $this.multiLevelMenu('_toggleSelected', true);
    }
    if(isLastContainer) { return; }
    if(isCross) { $outterContainer.parent().multiLevelMenu('_setItems', curLevel + 1); return; }
    $container.removeClass('active').next('.menu-list-container').addClass('active');
    $outterContainer.attr('data-current-level', curLevel + 1);
    if(curLevel + 2 == $outterContainer.data().options.depth) {
      $outterContainer.addClass('current-last-level');
    }
    if(!isActived) {
      $('.select-all', $outterContainer).removeClass('active');
      $outterContainer.parent().multiLevelMenu('_setItems', curLevel + 1);
      $outterContainer.parent().multiLevelMenu('_resetSearch');
      // 2019-07-08 自動選擇 "全部"
      if($outterContainer.data().options.cross && $('.menu-list-container.active .menu-item.active', $outterContainer).length == 0) {
        $('.menu-list-container.active .cross-item', $outterContainer).trigger('click');
      }
    }
  }).on('click', '.multi-level-menu-container .back-item', function() { // 回上層
    var $outterContainer = $(this).closest('.multi-level-menu-container');
    var $container = $('.menu-list-container.active', $outterContainer);
    var curIsListAll = $outterContainer.hasClass('current-list-all');
    if($container.is(':first-child')) { return; }
    if(curIsListAll) {
      $container.removeClass('active');
      $('.menu-list-container:first-child', $outterContainer).addClass('active');
      //$('.list-all-item', $outterContainer).removeClass('active');
    }
    else {
      $container.removeClass('active').prev('.menu-list-container').addClass('active');
    }
    $outterContainer.attr('data-current-level', parseInt($outterContainer.attr('data-current-level')) - 1);
    $outterContainer.removeClass('current-last-level current-list-all');
  }).on('click', '.inactivable-item', function() { // 已選擇項目模式下的項目取消選取
    var $outterContainer = $(this).closest('.multi-level-menu-container');
    var options = $outterContainer.data().options;
    var list = options.data;
    var selectedList = $outterContainer.data('selected-items');
    var unselectedItem = selectedList[$(this).index()];
    var unselectedItemParents = unselectedItem.parents;
    var unselectedIndex = unselectedItem.index;
    var unselectedCurSelected = unselectedItemParents.length == 0;
    for(i = 0; i < unselectedItemParents.length; i ++) {
      var unselectedItemParentsIndex = unselectedItemParents[i].index;
      if(i == 0 || unselectedCurSelected) {
        var $thisLevelSelected = $('.menu-list-container:eq(' + i + ') .activable-item.active', $outterContainer);
        unselectedCurSelected = $thisLevelSelected.length > 0 && $thisLevelSelected.data('index') == unselectedItemParentsIndex;
      }
      list = list[unselectedItemParentsIndex].children;
    }
    list[unselectedIndex].selected = false;
    $outterContainer.parent().multiLevelMenu('_updateSelectedList').multiLevelMenu('_triggerChange');
    if(unselectedCurSelected) {
      var isLastContainer = unselectedItemParents.length == options.depth - 1;
      if(isLastContainer) {
        var $itemToInactive = $('.menu-list-container:eq(' + unselectedItemParents.length + ') .activable-item:eq(' + unselectedIndex + ')', $outterContainer);
      }
      else {
        var $itemToInactive = $('.menu-list-container:eq(' + (unselectedItemParents.length + 1) + ') .cross-item', $outterContainer);
      }
      $itemToInactive.removeClass('active');
      if(isLastContainer) { $('.select-all', $outterContainer).removeClass('active'); }
    }
  }).on('click', '.all-activable-item', function() { // 不分類模式下，項目的選取和取消
    var $this = $(this);
    var $outterContainer = $this.closest('.multi-level-menu-container');
    var options = $outterContainer.data().options;
    var list = options.data;
    var isMultipleSelectMenu = options.multiple;
    var isActived = $this.hasClass('active');
    var newActived = isMultipleSelectMenu ? !isActived : true;
    var selectableList = $outterContainer.data('selectable-items');
    var updatedIndex = $this.index();
    var updatedItem = selectableList[updatedIndex];
    if(isActived == newActived) { return; }
    $this.toggleClass('active', newActived);
    if(!isMultipleSelectMenu) { $this.siblings('.all-activable-item.active').removeClass('active'); }
    //console.log(selectableList, updatedItem);
    $(list).multiLevelMenu('_walkListUpdateUncategorizedItem', {
      multipleSelect: isMultipleSelectMenu,
      updatedItem: updatedItem,
      newSelectedStatus: newActived
    });
    $outterContainer.parent().multiLevelMenu('_updateSelectedList').multiLevelMenu('_triggerChange');
    /*for(i = 0; i < options.depth - 1; i ++) {
      var $thisLevelSelected = $('.menu-list-container', $outterContainer).eq(i).find('.activable-item.active, .cross-item.active');
      $thisLevelSelected.removeClass('active');
    }*/
    $outterContainer.parent().multiLevelMenu('_setItems', 0);
  });

}(jQuery));