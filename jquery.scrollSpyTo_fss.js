(function ($,window, document, undefined) {
    $.fn.extend({
        scrollSpyTo_fss: function (options) {
            var defaults = {
                selectorItem: 'li a',
				parentItem: 0,
				mode: 'vertical',
                container: window,
				buffer: 0,
                itemClass: 'active',
				scrollTo: false,
				delayTime: 1000
            };
            var settings = $.extend({}, defaults, options);
			var o = settings;
			var animateScroll = 'html,body';
			if(o.container != window){
				animateScroll = o.container;
			}
			var items=$(o.selectorItem);
			var inside = 0;
			$(o.container).scroll(function(){
				for (var i = 0; i < items.length; i++) {
					if(o.mode =='vertical'){
						current_item = $('#'+$(items[i]).data('fss')).offset().top;
						limitMin = $(o.container).offset().top + o.buffer;
						limitMax = $(o.container).offset().top + $(o.container).outerHeight();
					} else {
						current_item = $('#'+$(items[i]).data('fss')).offset().left;
						limitMin = $(o.container).offset().left + o.buffer;
						limitMax = $(o.container).offset().left + $(o.container).innerWidth();
					}
					if(limitMin > current_item && current_item < limitMax){
						if(inside != i){
							inside = i;
							if(o.parentItem > 0){
								items.each(function(k){
									var f_it = $(items[k]);
									for(var j=0; j < o.parentItem; j++){
										f_it = f_it.parent();
									}
									f_it.removeClass(o.itemClass);
								});
								var f_it = $(items[inside]);
								for(var j=0; j < o.parentItem; j++){
									f_it = f_it.parent();
								}
								f_it.addClass(o.itemClass);
							} else {
								$(items).removeClass(o.itemClass);
								$(items[inside]).addClass(o.itemClass);
							}
						}
					}
                }
			});
			if (o.scrollTo) {
                items.each(function (e) {
                    $(this).click(function (event) {
                        event.preventDefault();
                        hash = $(this).data("fss");
						if(o.mode =='vertical'){
							$(animateScroll).animate({scrollTop: $("#"+hash).offset().top - $(animateScroll).offset().top + $(animateScroll).scrollTop() - o.buffer + 1}, o.delayTime);
						} else {
							$(animateScroll).animate({scrollLeft: $("#"+hash).offset().left - $(animateScroll).offset().left + $(animateScroll).scrollLeft() - o.buffer + 1}, o.delayTime);
						}
                    });
                });
            }
        }});
})(jQuery,window,document,undefined)
