/*===================*/
/* Custom Javascript */
/*===================*/

$(document).ready(function() {

	// Force page to top on reload
	// $(window).on('beforeunload', function() {
	//     $(window).scrollTop(0);
	// });

	/*=============*/
	/* Page Scroll */
	/*=============*/

	// Scroll Animations for Nav buttons and uses the easing script for a delayed scroll
	$('.page_scroll a, .navbar-header > a').on('click', function() {
		scrollPage($(this));   
	 });

	function scrollPage(thisObj) {
		var anchor = $(thisObj)
		
		// Change scroll offset if in mobile
		if ($(window).width() >= 768) {
			var navbar_height = $('.navbar_main_styles').height();
		} else {
			var navbar_height = 0;
		}

		var scrollTo = $(anchor.attr('href')).offset().top;

	    $('html, body').animate({
	        scrollTop: (scrollTo - navbar_height)
	    }, 2500, 'easeInOutExpo');

	  	event.preventDefault();
	}

	/*=========*/
	/* Nav Bar */
	/*=========*/

	// Closes the Responsive Menu on Menu Item Click
	$('.navbar-collapse ul li a').on('click', function() { 
		$('.navbar-toggle:visible').click();
	});

	$('.navbar .navbar-header a').on('click', function() {
		if ($('.navbar-collapse').hasClass('in')) {
			$('.navbar-toggle:visible').click();
		}
	})

	$(window).on('scroll', function() {
		// Don't run if in mobile
		//if ($(window).width() <= 768) { return }

	 	var header_bottom = $('.main_header_wrapper').offset().top + $('.main_header_wrapper').height();
	 	var main_halfway = ($('.main_image').offset().top + $('.main_image').height()) / 1.5;

	 	// Fix the nabar to the top
		if ($(window).scrollTop() >= header_bottom) {
			$('#navbar_main').css('position', 'fixed');
		} else {
			$('#navbar_main').css('position', 'relative');
		}

		// Fade in and out navbar
		if ($(window).scrollTop() >= main_halfway) {
			$('#navbar_main').addClass('fade_in');
			$('.navbar_logo').addClass('fade_in_logo');
		} else {
			$('#navbar_main').removeClass('fade_in');
			$('.navbar_logo').removeClass('fade_in_logo');
		}

		// Underline nav sections when scrolling, highlight section names in mobile
		var about_top = $('#about').offset().top - $('#navbar_main').height() - 2;
		var about_bottom = about_top + $('#about').height();
		var gallery_top = $('#gallery').offset().top - $('#navbar_main').height() - 2;
		var gallery_bottom = gallery_top + $('#gallery').height();
		var contact_top = $('#contact').offset().top - $('#navbar_main').height() - 2;
		var contact_bottom = contact_top + $('#contact').height();
		var window_pos = $(window).scrollTop();

		if (window_pos >= about_top && window_pos <= about_bottom) {
			$('.navbar ul #nav_about').addClass('current');
			// Overlay highlighting in mobile
			$('.nav_overlay ul #nav_overlay_about').addClass('current');
		} else {
			$('.navbar ul #nav_about').removeClass('current');
			$('.nav_overlay ul #nav_overlay_about').removeClass('current');
		}

		if (window_pos >= gallery_top && window_pos <= gallery_bottom) {
			$('.navbar ul #nav_gallery').addClass('current');
			// Overlay highlighting in mobile
			$('.nav_overlay ul #nav_overlay_gallery').addClass('current');
		} else {
			$('.navbar ul #nav_gallery').removeClass('current');
			$('.nav_overlay ul #nav_overlay_gallery').removeClass('current');

		}

		if (window_pos >= contact_top && window_pos <= contact_bottom) {
			$('.navbar ul #nav_contact').addClass('current');
			// Overlay highlighting in mobile
			$('.nav_overlay ul #nav_overlay_contact').addClass('current');
		} else {
			$('.navbar ul #nav_contact').removeClass('current');
			$('.nav_overlay ul #nav_overlay_contact').removeClass('current');
		}
	})

	/*====================*/
	/* Nav Overlay Mobile */
	/*====================*/

	$('.nav_button_open').on('click', function() {
		$('.nav_overlay').fadeToggle(200);
		$(this).toggleClass('nav_button_open').toggleClass('nav_button_close');
	})

	$('.nav_overlay').on('click', function() {
		$('.nav_overlay').fadeToggle(200);
		$('.nav_button a').toggleClass('nav_button_open').toggleClass('nav_button_close');
	})

	// Hide Nav Hamburger if after timeout, show when scrolling
	$(window).on('scroll', function() {
		$('.nav_button').show();
		clearTimeout($.data(this, "scrollCheck"));
    	$.data(this, "scrollCheck", setTimeout(function() {
    		// If it is not the close button and overlay is open, then hide
    		if (!$('.nav_button a').hasClass('nav_button_close')) {
				$('.nav_button').hide();
			}
		}, 2000));
	})

	/*===============*/
	/* Scroll Reveal */
	/*===============*/

	// Scroll Reveal Animations for sections
	window.sr = ScrollReveal();
	sr.reveal('.scrollReveal', { duration: 1000, reset: true, viewOffset: { top: 100 }, mobile: false });
	sr.reveal('#about_us_text', { duration: 1000, reset: true, mobile: false })
	sr.reveal('#our_story_section', { duration: 1750, reset: true, mobile: false })

	// Add classes once content has loaded (Loader overlay)
	$('body').addClass('loaded');
	$('nav').addClass('navbar-fixed-top');
})

/*====================*/
/* YouTube API Player */
/*====================*/

var player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('video_player', {
		videoId: 'UwKMWDJbq1E',
		playerVars: {
			'rel': '0',
			'controls': '0',
			'showinfo': '0',
		},
		events: {
    		'onReady': onPlayerReady,
    		'onStateChange': onPlayerStateChange
    	}
    });
}

// The API will call this function when the video player is ready.
function onPlayerReady() {

	// Close the overflow when scrolling down the page
	$(window).on('scroll', function() {
		var video_top = $('#video_player').offset().top;
	  	var video_bottom = video_top + $('#video_player').height();
	  	var video_close_pos = (video_top + video_bottom) / 1.5;
		var doc_top = $(window).scrollTop();

		if (doc_top >= video_close_pos) {
			// Close Video Overlay
			$(".overlay").css('height', "0%");
			player.stopVideo();
		}
	});

	// Open Video Overlay
	$('#check_us_out_btn').on('click', function() {
		
	    $('html, body').animate({
	    	scrollTop: 0});
		
		$(".overlay").css('height', "100%");
		player.playVideo();
		player.mute();
	})

	// Close Video Overlay on click
	$('#closebtn').on('click', function() {
		$(".overlay").css('height', "0%");
		player.stopVideo();
	})
}

// The API calls this function when the player's state changes.
function onPlayerStateChange(event) {       
	// play video as soon as it ends
	if (event.data === YT.PlayerState.ENDED) {
		player.playVideo(); 
	}
}

