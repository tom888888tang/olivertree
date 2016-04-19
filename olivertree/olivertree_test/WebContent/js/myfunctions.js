$(window).load(intro_sub);
function intro_sub() {
	var int_del = 500;
	$('.loader-container').animate({opacity: 1}, 300, function() {
		$(this).remove();
		$('.background').css('display', 'block').animate({opacity: 1}, int_del, function() {});
		$('#header').css('opacity', 0);
		$('#header').css('display', 'block');
		$('#sub-nav').css('opacity', 0);
		$('#sub-nav').css('display', 'block');
		$('.text').css('opacity', 0);
		$('.text').css('display', 'block');
		$('.logo').css('opacity', 0);
		$('.logo').css('display', 'block');
		$('.award_new_york').css('opacity', 0);
		$('.award_new_york').css('display', 'block');
		$('.award_japan').css('opacity', 0);
		$('.award_japan').css('display', 'block');
		$('.award').css('opacity', 0);
		$('.award').css('display', 'block');
		$('.next-num').css('opacity', 0);
		$('.next-num').css('display', 'block');
		$('.next-num').delay(int_del).animate({opacity: 1}, 800);
		$('.logo').delay(int_del).animate({opacity: 1}, 800);
		$('.award_new_york').delay(int_del).animate({opacity: 1}, 800);
		$('.award_japan').delay(int_del).animate({opacity: 1}, 800);
		$('.award').delay(int_del).animate({opacity: 1}, 800);
		$('.text').delay(int_del).animate({opacity: 1}, 800);
		$('#header').delay(int_del).animate({opacity: 1}, 800);
		$('.footer').delay(int_del).animate({opacity: 0.7}, 800);
		$('#sub-nav').delay(int_del).animate({opacity: 0.7}, 800);
	});
}
$(window).load(function() {
	windowHeight = $(window).height();
	if (windowHeight > 800) {
		$('#content').addClass("large");
		$('#content').css("height", windowHeight);
	}
	if (windowHeight < 600) {
		$('#content').addClass("small");
		$('#content').css("height", windowHeight);
	}
	if (windowHeight > 920) {
		$('#content').addClass("big");
		$('#content').css("height", windowHeight);
	}
	//alert(windowHeight);
});
$(window).resize(function() {
	windowHeight = $(window).height();
	if (windowHeight > 800) {
		$('#content').addClass("large");
		$('#content').css("height", windowHeight);
	}
	if (windowHeight < 600) {
		$('#content').addClass("small");
		$('#content').css("height", windowHeight);
	}
	if (windowHeight > 920) {
		$('#content').addClass("big");
		$('#content').css("height", windowHeight);
	}
});
$(document).ready(function() {
	$('.menu-item3').click(function(event) {
		$('.sub-menu div').css('display', 'block');
		$('.sub-menu').stop(true, true).animate({height: 40}, 500);
		$('.sub-menu div').stop().delay(800).animate({opacity: 1}, 500);
	});
	$('.sub-menu .olives').click(function(event) {
		$('.oil').removeClass('active');
		$(this).addClass('active');
		$('#olives').css('display', 'block');
		$('#olives').stop().delay(800).animate({opacity: 1}, 500);
		$('#oil').stop().delay(800).animate({opacity: 0}, 500);
		$('#oil').css('display', 'none');
	});
	$('.sub-menu .oil').click(function(event) {
		$('.olives').removeClass('active');
		$(this).addClass('active');
		$('#oil').css('display', 'block');
		$('#oil').stop().delay(800).animate({opacity: 1}, 500);
		$('#olives').stop().delay(800).animate({opacity: 0}, 500);
		$('#olives').css('display', 'none');
	});
	$("#oil .cross a").click(function(event) {
		event.preventDefault();
		$("#oil #big-gallery").fadeIn("slow");
	});
	$("#oil .minus a").click(function(event) {
		event.preventDefault();
		$("#oil #big-gallery").fadeOut("slow");
	});
	$("#olives .cross a").click(function(event) {
		event.preventDefault();
		$("#olives #big-gallery").fadeIn("slow");
	});
	$("#olives .minus a").click(function(event) {
		event.preventDefault();
		$("#olives #big-gallery").fadeOut("slow");
	});
	$('.menu-item1').click(function(event) {
		$('.sub-menu div').css('display', 'none');
		$('.sub-menu').stop(true, true).animate({height: 0}, 200);
		$('.sub-menu div').stop().delay(100).animate({opacity: 0}, 200);
	});
	$('.menu-item2').click(function(event) {
		$('.sub-menu div').css('display', 'none');
		$('.sub-menu').stop(true, true).animate({height: 0}, 200);
		$('.sub-menu div').stop().delay(100).animate({opacity: 0}, 200);
	});
	$('.menu-item4').click(function(event) {
		$('.sub-menu div').css('display', 'none');
		$('.sub-menu').stop(true, true).animate({height: 0}, 200);
		$('.sub-menu div').stop().delay(100).animate({opacity: 0}, 200);
	});
	$('.menu-item5').click(function(event) {
		$('.sub-menu div').css('display', 'none');
		$('.sub-menu').stop(true, true).animate({height: 0}, 200);
		$('.sub-menu div').stop().delay(100).animate({opacity: 0}, 200);
	});
});