(function($) {

	$.scrolldeck = function(options) {

	currentslide_id = 0;
	// VARS
	var currIndex = 0, buttons, slides, scrollpoints = [], sections = [], windowHeight = $(window).height(), top = $(document).scrollTop(), i;

	var defaults = {
		buttons : '.menu a',
		slides : '.article',
		duration : 600,
		easing : 'easeInOutExpo',
		offset : 0
	};
	// INIT
	var innerbuttons = $(".button");
	var buttontop = $(".top");
	var linkLocation;
	var scrolldeck = this;
	var dnd = false;
	var outer_check = true;
	var scrollcountr = 0;
	scrolldeck.settings = {};

	var $current = $('.active-section');

	function myscrolldeck() {
		scrolldeck.controller = $.scrollorama({
		blocks : slides,
		offset : 0
		});
	}

	var init = function() {
		var backurl = window.history;

		$(window).on('hashchange', function() {
			var newhash = window.location.hash.replace('#','');
			for (var i = 0; i < $('#sub-nav>ul>li').length; i++) {

				if($('#sub-nav li').eq(i).find('a').attr('data-article-url') == newhash){
					$('#sub-nav li').eq(i).find('a').addClass('active');
				}else{
					$('#sub-nav li').eq(i).find('a').removeClass('active');
				}
			}
		});

		wrapresize();

		var dau_tmp = '';
		
		for (var i = 0; i < $('#sub-nav>ul>li').length; i++) {
			dau_tmp = $('#sub-nav li').eq(i).find('a').attr('data-article-url');
			dau_tmp = dau_tmp.toLowerCase().split(' ').join('-');
			$('#sub-nav>ul>li').eq(i).find('a').attr('data-article-url', dau_tmp);
			$('.article').eq(i).attr('data-article-url', dau_tmp);
		}

		scrolldeck.settings = $.extend({}, defaults, options);
		buttons = $(scrolldeck.settings.buttons);
		slides = $(scrolldeck.settings.slides);

		myscrolldeck();

		// set slide and animation scrollpoints
		scrollpoints = scrolldeck.controller.getScrollpoints();

		for ( i = 0; i < buttons.length; i++)
		sections.push(slides.index($('#' + $(buttons[i]).attr('href').split('#')[1])));

		// event handler for updating current slide index and current nav button
		scrolldeck.controller.onBlockChange(function() {
		currIndex = scrolldeck.controller.blockIndex;
		updateNav();

		});

	// Nav button click event
	buttons.click(function(e) {
		button_func(e, $(this));
	});

	innerbuttons.click(function(e) {
		button_func(e, $(this));
	});


	buttontop.click(function(e) {
		buttontop_func(e, $(this));
	});

	//gototop
	function buttontop_func(e, obj_) {
		e.preventDefault();
		slide = $('#article1');
		currIndex = slide.index();
		scrollToSlide(slide.offset().top);
	}


      //HERE
      //check to find current position and enable/disable scrollinks
      function button_func(e, obj_) {
		e.preventDefault();
		slide = $('.article[data-article-url="' + obj_.attr('data-article-url') + '"]');
		currIndex = slide.index();
		scrollToSlide(slide.offset().top);
		}
		

        $('.mybutton').click(function(e) {
        e.preventDefault();
        if (currIndex != slides.length - 1) {
          e.preventDefault();
          scrollToSlide(getNextScrollpoint());
        }
      });

      // scroll event

      // Keyboard events
      $(document).keydown(function(e) {
        if ((e.keyCode == 38) && currIndex !== 0) {
          e.preventDefault();
          scrollToSlide(getPrevScrollpoint());
        } else if ((e.keyCode == 40 || e.keyCode == 32) && currIndex != slides.length - 1) {
          e.preventDefault();
          scrollToSlide(getNextScrollpoint());
        }
        if ((e.keyCode == 33) && currIndex !== 0) {
          e.preventDefault();
          scrollToSlide(getPrevScrollpoint());
        }
        if ((e.keyCode == 34) && currIndex !== slides.length - 1) {
          e.preventDefault();
          scrollToSlide(getNextScrollpoint());
        }
      });

      // if slides are images, assign height to auto for proportional scaling
      for ( i = 0; i < slides.length; i++) {
        var el = slides.eq(i);
        if (el.prop('tagName').toUpperCase() === 'IMG') {
          el.css('height', 'auto');
        }
      }

      // if last slide is shorter than height of window, increase height
      var lastSlide = slides.eq(slides.length - 1);
      if (lastSlide.outerHeight() < $(window).height()) {
        lastSlide.height(lastSlide.height() + $(window).height() - lastSlide.outerHeight());
      }

    };
    //end init

    // PRIVATE FUNCTIONS

    function updateNav() {
      if (buttons) {
        buttons.removeClass('active');
        var currSection = -1;
        for ( i = 0; i < sections.length; i++) {
          if (currIndex >= sections[i]) {
            currSection = i;
          }
        }
        if (currSection != -1) {
          buttons.eq(currSection).addClass('active');
        }
      }

    }


    function scrollToSlide(slide) {
      if (slide >= 0) {
        //alert('scrolls')
        if (currentslide_id > slide) {
          window.location.hash = $('.article[data-top-id=' + slide + ']').attr('data-article-url');
        } else {
          window.location.hash = $('.article[data-top-id=' + slide + ']').attr('data-article-url');
        }
        currentslide_id = slide;
        $('html, body').stop().animate({
          scrollTop : slide
        }, scrolldeck.settings.duration, scrolldeck.settings.easing, function() {

        });
        // }
      }

    }

    function getNextScrollpoint() {
      return getScrollpoint(2);
    }

    function getPrevScrollpoint() {
      if ($(document).scrollTop() > scrollpoints[scrollpoints.length - 1]) {
        return getScrollpoint(-2);
      } else {
        return getScrollpoint(-1);
      }
    }

    function getScrollpoint(n) {
      var scrollTop = $(window).scrollTop();
      var points = scrollpoints.slice(0);
      points.push(scrollTop);
      points.sort(function(a, b) {
        return a - b;
      });
      return points[points.indexOf(scrollTop) + n];
    }



    var timeOut = null;
    var scroll_dir = false;


	$('html').bind('mousewheel', wheelMove);


    function wheelMove(event, deltaY) {

      event.preventDefault();
      $('html').unbind('mousewheel', wheelMove);
      if (deltaY > 0) {
      } else {
      }
      if (deltaY > 0) {
      } else {
      }
      interval = setTimeout(function() {
        $('html').bind('mousewheel', wheelMove);
      }, scrolldeck.settings.duration);

    }


        $('#page').swipe({
          swipe : function(event, direction, distance, duration, fingerCount) {

            $("#page").swipe("disable");

            switch (direction) {
              case 'up':
                scrollToSlide(getNextScrollpoint());
                break;
              case 'down':
                scrollToSlide(getPrevScrollpoint());
                break;
            }
            interval_swipe = setTimeout(function() {
              $('#page').swipe("enable");

            }, scrolldeck.settings.duration);

          }
        });


    function wrapresize() {
      if (document.body && document.body.offsetWidth) {
        winW = $(window).width();
        winH = $(window).height();

        if (!($('body').hasClass('ios-device'))) {

          if (parseInt($(window).width()) <= 1024) {
            winW = 1024;
            $('body').css('overflow', 'visible');
          } else {
            $('body').css('overflow', 'hidden');
          }

        }

        if ($('body').hasClass('ios-device-ls')) {
          if ($('body').hasClass('ios-device-ipad')) {
            winH = 768;
            winW = 1024;
          }else if($('body').hasClass('ios-device-iphone')){
            winH = 768;
            winW = 1024;
          }
        }else if ($('body').hasClass('ios-device-p') || $('body').hasClass('android-device-p')) {//HERE
          if ($('body').hasClass('ios-device-ipad')) {
            winH = 1365;
            winW = 1024;
          }else if($('body').hasClass('ios-device-iphone'  || $('body').hasClass('android-device-p') )){
            winH = 1365;
            winW = 1024;
            // winH = 480;
            // winW = 320;
          }
        }
      }

      if (navigator.userAgent.match(/msie/i)) {
        winW += 17;
      }

      for (var i = 0; i < $('.article').length; i++) {
        $('.article').eq(i).css('width', winW);
        $('.article').eq(i).css('height', winH);
      }

      // }else{}

    }

    function redirectPage() {
      window.location = linkLocation;
    }


	$(window).resize(function() {
		myscrolldeck();
		clearTimeout(test);
		var test = setTimeout(function() {
		wrapresize();
	}, 500);

    });

		init_b_d();
		init();
  };


function init_b_d(){

if (!($('#page').hasClass('ie8'))) {

  var viewport = $("meta[name=viewport]");
  var nu_ag = navigator.userAgent;
  if (navigator.userAgent.match(/iPhone/i)) {
    $('body').addClass('ios-device-iphone');
    //$('html').css('width','1024px').css('height','768px');
  }

  if (navigator.userAgent.match(/iPad/i)) {
    $('body').addClass('ios-device-ipad');
  }

  if (navigator.userAgent.match(/iPhone/i)) {
    $('body').addClass('ios-device-iphone');
  }

  if (nu_ag.indexOf("iPhone") >= 0 || nu_ag.indexOf("iPad") >= 0) {
    $('body').addClass('ios-device');
    document.ontouchmove = function(e) {
        e.preventDefault();
    };
    
    var checkOrientation = function() {

      if (window.orientation === 90 || window.orientation === -90) {
        if ($('body').hasClass('ios-device-p')) {
          	$('body').removeClass('ios-device-p');
        }
        $('body').addClass('ios-device-ls');
        viewport.remove();
        //viewport.attr("content", "width:device-width, height:device-height, initial-scale=1, user-scalable=1");
      } else {
        if ($('body').hasClass('ios-device-ls')) {
          $('body').removeClass('ios-device-ls');
        }
        $('body').addClass('ios-device-p');
        viewport.remove();
        //viewport.attr("content", "width:device-width, height:device-height, initial-scale=1, user-scalable=1");
      }
    };

    window.onorientationchange = function() {
      location.reload();
    };

    checkOrientation();
  } else {
    $('body').addClass('d-tp');
  }
  

  if (nu_ag.indexOf("Android") > -1) {
    $('body').addClass('ios-device');
      document.ontouchmove = function(e) {
      e.preventDefault();
    };
    // viewport.attr("content", "width:device-width,height:device-height, initial-scale=1, maximum-scale=1");

    var checkOrientationAn = function() {

      if (window.orientation === 90 || window.orientation === -90) {
        if ($('body').hasClass('android-device-p')) {
          $('body').removeClass('android-device-p');
        }
        $('body').addClass('android-device-ls');
        viewport.remove();
        //viewport.attr("content", "width:device-width, height:device-height, initial-scale=1, user-scalable=1");
      } else {
        if ($('body').hasClass('android-device-ls')) {
          $('body').removeClass('android-device-ls');
        }
        $('body').addClass('android-device-p');
        viewport.remove();
        //viewport.attr("content", "width:device-width, height:device-height, initial-scale=1, user-scalable=1");
      }
    };
		window.onorientationchange = function() {
      location.reload();

      //return checkOrientationAn();
    };
    checkOrientationAn();
  }

}

}})(jQuery);