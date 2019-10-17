(function (global, $) {
    var ooxxselectmenu = function (options) {
        this.options = options;
        // modal trigger btn
        this.trigger = options.trigger;
        // nowill select menu config
        this.initinfo = options.config;
        // modal block
        this.$el = undefined;
        // selected item
        this.selecteditem = undefined;
        this.init();
    };

    ooxxselectmenu.prototype.init = function () {
        //console.log('ooxxselectmenu init:-------');
        var that = this;
        that.$trigger = $(that.trigger).eq(0);
        var $modal = $(that.$trigger.attr('data-target'));
        var $content = $modal.find('.def-modal-content');
        var $comfirm = $modal.find('.def-modal-comfirm');

        // init nowill select menu
        $content.multiLevelMenu(that.initinfo);
        // menu list
        that.$menulist = $content.find('.multi-level-menu-group .menu-list-container');
        // btn comfirm clicked
        $comfirm.on('click', function () {
            selecteditem = that.$menulist.find('.menu-item.active .item-text').map(function (i, el) {
                return el.innerText;
            }).get();

            that.$trigger.html(selecteditem.length ? selecteditem.join(' ') : '全部');
            that.$trigger.siblings('input').each(function (i, el) {
                el.value = selecteditem[i] ? selecteditem[i] : '-1';
            });
        });
    };

    ooxxselectmenu.prototype.reset = function () {
        console.log('reset');
        this.$menulist.each(function (i, el) {
            var $items = $(el).find('.menu-item');
            $items.filter('.active').removeClass('active');
            $items.eq(0).addClass('active');
        });
        this.$trigger.html('全部');
    };

    global.NowillSelectMenu = ooxxselectmenu;
}(window, jQuery));