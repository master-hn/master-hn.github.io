(function($) {
	"use strict";

		//Preloader
		Royal_Preloader.config({
			mode: 'progress',
			background: '#FFFFFF',
			showProgress: true,
			showPercentage: false
		});

	function Selector_Cache() {
		var collection = {};

		function get_from_cache(selector) {
			if (undefined === collection[
					selector]) {
				collection[selector] = $(selector);
			}

			return collection[selector];
		}

		return {
			get: get_from_cache
		};
	}

	var selectors = new Selector_Cache();

	$(document).on('ready', function() {


		$("body").fitVids({
			customSelector: "iframe[src^='https://w.soundcloud.com'], iframe[src^='https://www.google.com/maps']"
		});

		// animate it
		$.doTimeout(2500, function() {
			$('.repeat.go').removeClass(
				'go');

			return true;
		});
		$.doTimeout(2520, function() {
			$('.repeat').addClass('go');
			return true;
		});


		/*
		 * CSS Ajax Loader
		 */
		$(document).ajaxStart(function() {
			$("#ajax-loader").addClass(
				'is-active');
		}).ajaxStop(function() {
			$("#ajax-loader").removeClass(
				'is-active');
		});

		//one page scrollspy
		$('.hedone-menu').scrollspy({
			offset: 20,
			activeClass: 'current-menu-item',
			animate: 600
		});

		//isMobile
		var isMobile = false;

		isMobile = isDeviceMobile();
		//console.log(isMobile);

		//window resize event
		$(window).on('resize', function() {
			isMobile = isDeviceMobile();
			//console.log(isMobile);
		})

		//check is counter element visible on scroll
		.on('scroll load',
			function() {
				$(".counter").each(function() {
					var isOnView =
						isElementVisible($(this));
					if (isOnView && !$(this).hasClass(
							'counter-end') && !
						isMobile) {
						$(this).addClass(
							'counter-end');
						animateCounter($(this));
					}
				});
			})
	
		//<editor-fold defaultstate="collapsed" desc="MASONRY">
		//masonry
		.on('load', function() {
			var startSrollPositionY = $(
				this).scrollTop();
			// isotope Masonry
			var container = $(
				'.portfolio-container');
			container.imagesLoaded(function() {
				container.isotope({
					itemSelector: '.grid-item', //'.masonry-item',
					layoutMode: 'masonry',
					percentPosition: true,
					resizesContainer: false,
					masonry: {
						columnWidth: '.grid-sizer', //'.work-portfolio',
						gutterWidth: 10
					}
				});
			});
			// bind event listener just once to fix page scrollY position
			container.one('arrangeComplete',
				function() {
					//console.log('fired='+startSrollPositionY);
					$('html, body').animate({
						scrollTop: startSrollPositionY
					}, 1000);
				});

			// filter items on button click
			$('ul.portfolio-filter li a').on(
				'click',
				function(e) {
					e.preventDefault();
					var filterValue = $(this).attr(
						'data-filter');
					$(this).parent().parent().find(
						'a').removeClass('current');
					$(this).addClass('current');
					container.isotope({
						filter: filterValue
					});

					return false;
				});

			/*
			 * isotope project gallery
			 */
			var projectGallery = $(
				".project-gallery").imagesLoaded(
				function() {

					projectGallery.isotope({
						itemSelector: '.project-gallery-item',
						layoutMode: 'masonry',
						resizesContainer: false,
						percentPosition: true,
						masonry: {
							columnWidth: '.work-gallery',
							gutter: 6
						}
					});

				});



		});
		//end masonry
		//</editor-fold>	


		
		//remove nav-back animation class
		setTimeout(function() {
			$('.nav-back').removeClass(
				'animated fadeInDown');
		}, 2400);

		//scroll to top
		$('.scroll-to-top-arrow-button').scrollToTop(
			800);



		//equal heights
		$('.service-wrap').equalHeights();

		//scroll 
		$('a[href*="#"]:not([href="#"])').on(
			'click',
			function() {
				if (location.pathname.replace(
						/^\//, '') === this.pathname.replace(
						/^\//, '') && location.hostname ===
					this.hostname) {
					var target = $(this.hash);
					target = target.length ?
						target : $('[name=' + this.hash
							.slice(1) + ']');
					if (target.length) {
						$('html, body').animate({
							scrollTop: target.offset()
								.top
						}, 1000, 'swing');
						return false;
					}
				}
			});

		//video
		$("a.popup-video").YouTubePopUp({
			autoplay: 0
		}); // Disable autoplay	
		$("a.popup-video-autoplay").YouTubePopUp({
			autoplay: 1
		}); // Enable autoplay

		//<editor-fold defaultstate="collapsed" desc="OWL CAROUSEL">
		//owl slider
		var projectSlider = $(
			'.project-slider');
		projectSlider.owlCarousel({
			loop: false,
			margin: 0,
			nav: true,
			navText: [
				'<i class="fa fa-angle-left"></i>',
				'<i class="fa fa-angle-right"></i>'
			],
			navRewind: true,
			autoplay: true,
			autoplayTimeout: 4000,
			autoplayHoverPause: true,
			rewind: true,
			callbacks: true,
			//animation duration default: 1500ms
			animateOut: 'fadeOut',
			items: 1
		});
		projectSlider.on('hover', 
			function() {
				projectSlider.trigger(
					'stop.owl.autoplay');
			},
			function() {
				projectSlider.trigger(
					'play.owl.autoplay', [400]);
			}
		);
		//owl carousel
		$(".brand-slider").owlCarousel({
			loop: false,
			margin: 10,
			responsiveClass: true,
			nav: false,
			autoplay: true,
			autoplayTimeout: 4000,
			autoplayHoverPause: true,
			smartSpeed: 1000,
			callbacks: true,
			animateOut: 'fadeOut',
			responsive: {
				//0 and up
				0: {
					items: 1,
					loop: true
				},
				// breakpoint from 768 up
				768: {
					items: 3,
					//nav:true,
					loop: true
				}
			}
		});

		//owl hero slider fade
		var heroSlider = $(
			".owl-hero-slider");
		heroSlider.owlCarousel({
			loop: false,
			margin: 0,
			nav: true,
			navText: [
				'<i class="fa fa-angle-left"></i>',
				'<i class="fa fa-angle-right"></i>'
			],
			navRewind: true,
			autoplay: true,
			autoplayTimeout: 4000,
			autoplayHoverPause: true,
			rewind: true,
			callbacks: true,
			//animation duration default: 1500ms
			animateOut: 'fadeOut',
			items: 1
		});
		//listen owl events
		$(".owl-hero-slider").on(
			'translate.owl.carousel',
			function() {
				$('.owl-hero-slider').find(
						'.owl-item.active .animated')
					.addClass('go');
				//console.log('translate start');
			});
		$(".owl-hero-slider").on(
			'translated.owl.carousel',
			function() {
				//find all hero slider go class and remove
				$('.owl-hero-slider .go').removeClass(
					'go');
				//console.log('translate end');
			});
		//custo start/stop autoplay
		heroSlider.on('hover', 
			function() {
				console.log('stop autoplay');
				heroSlider.trigger(
					'stop.owl.autoplay');
			},
			function() {
				console.log('start autoplay');
				heroSlider.trigger(
					'play.owl.autoplay', [400]);
			}
		);
		//owl hero slider slide
		var heroSliderSlide = $(
			".owl-hero-slider-slide");
		heroSliderSlide.owlCarousel({
			loop: false,
			margin: 0,
			nav: true,
			navText: [
				'<i class="fa fa-angle-left"></i>',
				'<i class="fa fa-angle-right"></i>'
			],
			navRewind: true,
			autoplay: false,
			autoplayTimeout: 4000,
			autoplayHoverPause: true,
			rewind: true,
			callbacks: true,
			smartSpeed: 1200,
			items: 1
		});
		//listen owl events
		$(".owl-hero-slider-slide").on(
			'translate.owl.carousel',
			function() {
				$('.owl-hero-slider-slide').find(
						'.owl-item.active .animated')
					.addClass('go');
				console.log('translate start');
			});
		$(".owl-hero-slider-slide").on(
			'translated.owl.carousel',
			function() {
				//find all hero slider go class and remove
				$('.owl-hero-slider-slide .go')
					.removeClass('go');
				console.log('translate end');
			});
		//custo start/stop autoplay
		heroSliderSlide.on('hover', 
			function() {
				console.log('stop autoplay');
				heroSliderSlide.trigger(
					'stop.owl.autoplay');
			},
			function() {
				console.log('start autoplay');
				heroSliderSlide.trigger(
					'play.owl.autoplay', [400])
			}
		);
		//</editor-fold>


		/*
		 * VIDEO BACKGROUND
		 */
		//<editor-fold defaultstate="collapsed" desc="VIDEO BACKGROUND">
		//my bg video
		$('.my-background-video').bgVideo({
			showPausePlay: false
		});

		//hero video
		$('.hero-background-video').bgVideo({
			fullScreen: false, // Sets the video to be fixed to the full window - your <video> and it's container should be direct descendents of the <body> tag
			fadeIn: 0, // Milliseconds to fade video in/out (0 for no fade)
			pauseAfter: 0, // Seconds to play before pausing (0 for forever)
			fadeOnPause: true, // For all (including manual) pauses
			fadeOnEnd: true, // When we've reached the pauseAfter time
			showPausePlay: false, // Show pause/play button
			pausePlayXPos: 'right', // left|right|center
			pausePlayYPos: 'bottom', // top|bottom|center
			pausePlayXOffset: '25px', // pixels or percent from side - ignored if positioned center
			pausePlayYOffset: '25px' // pixels or percent from top/bottom - ignored if positioned center
		});
		//</editor-fold>

		//skillbars
		$('.progress-back').each(function() {
			$(this).find(
				'.progress-full-line-over').css({
				'width': $(this).attr(
					'data-percent')
			});
		});

		/*
		 * primary menu
		 */
		//click outside menu
		$("html").on('click', function(
			event) {
			if ($(event.target).closest(
					'.hedone-menu-container, .sub-menu'
				).length === 0) {
				//close all zero level sub-meu class
				$(
					'ul.hedone-menu > li.menu-item-has-children > ul.sub-menu'
				).removeClass('open');
				//reset all zero level caret
				$(
					'ul.hedone-menu > li.menu-item-has-children > a > i'
				).removeClass('fa-caret-up');
			}
		});
		//nav-button
		$('.nav-button').on('click',
			function(e) {
				e.preventDefault();
				$(this).toggleClass('open');
				$('.hedone-menu-container').toggleClass(
					'open');
			});

		function initMainNavigation(
			container) {
			var screenReaderText = {
				expand: "expand child menu"
			};
			// Add dropdown toggle that displays child menu items.
			var dropdownToggle = $(' <i />', {
				'class': 'fa fa-caret-down',
				'aria-expanded': false,
				'title': 'expand child menu'
			}).append($('<span />', {
				'class': 'screen-reader-text',
				text: screenReaderText.expand
			}));

			container.find(
				'ul.hedone-menu .menu-item-has-children > a'
			).append(dropdownToggle);

			// Toggle buttons and submenu items with active children menu items.

			// Add menu items with submenus to aria-haspopup="true".
			container.find(
				'.menu-item-has-children').attr(
				'aria-haspopup', 'true');

			container.find('.dropdown-toggle')
				.on('click', function(e) {
					var _this = $(this),
						screenReaderSpan = _this.find(
							'.screen-reader-text');

					e.preventDefault();
					_this.toggleClass('toggled-on');
					_this.next(
						'.children, .sub-menu').toggleClass(
						'toggled-on');

					// jscs:disable
					_this.attr('aria-expanded',
						_this.attr('aria-expanded') ===
						'false' ? 'true' : 'false');
					// jscs:enable
					screenReaderSpan.text(
						screenReaderSpan.text() ===
						screenReaderText.expand ?
						screenReaderText.collapse :
						screenReaderText.expand);
				});

			//parent li caret element event
			$(
				'ul.hedone-menu > li.menu-item-has-children > a > i'
			).on('click', function(e) {
				e.preventDefault();

				//active submenu
				var activeSubMenu = $(this).parent()
					.next('.sub-menu');

				//close all zero level submenu except active & reset caret
				$(
					'ul.hedone-menu > li.menu-item-has-children > ul.sub-menu'
				).not(activeSubMenu).removeClass(
					'open');
				$(
					'ul.hedone-menu > li.menu-item-has-children > a > i'
				).not(this).removeClass(
					'fa-caret-up');

				//toggle caret & active submenu
				$(this).toggleClass(
					'fa-caret-up');
				$(activeSubMenu).toggleClass(
					'open');

			});
			//sub-menu caret event
			$(
				'ul.hedone-menu ul.sub-menu li a i'
			).on('click', function(e) {
				e.preventDefault();
				//console.log('fired greater then zero level caret');
				//toggle caret
				$(this).toggleClass(
					'fa-caret-up');
				//toggle next sub-menu
				$(this).parent().next(
					'.sub-menu').toggleClass(
					'open');
			});

		}
		initMainNavigation($('#Hedone'));
		//end primary menu
		//</editor-fold>

		//initialize pills
		$(
			".nav-pills li a, .nav-pills li.active a"
		).on('click', function(e) {
			e.preventDefault();
			$(this).tab('show');
		});
		//initialize popover
		$('[data-toggle="popover"]').popover({
			placement: 'top',
			html: true,
			trigger: 'hover'
		});
		$('.html-false').popover({
			placement: 'top',
			html: false,
			trigger: 'hover'
		});

		//<editor-fold defaultstate="collapsed" desc="CONTACT & SUBSCRIBE FORM">
		//contact form
		$('#submit-contact-form').on(
			'click',
			function() {
				$(
					'.contact-form-fail, .contact-form-done, .contact-form-required'
				).hide();
				var contact = {
					firstName: $('#contact-name')
						.val(),
					lastName: $(
						'#contact-last-name').val(),
					email: $('#contact-email').val(),
					message: $('#contact-message')
						.val(),
					notBot: $('#contact-bot').is(
						":checked")
				};
				$.ajax({
					url: 'ajax/contact-form.php',
					type: 'POST',
					data: {
						contact: contact
					},
					success: function() {
						$('#contact-form').hide();
						$('.contact-form-done').show();
					},
					error: function(xhr) {
						if (xhr.status === '404') {
							console.log(xhr.responseText);
							$('.contact-form-fail').show();
						} else {
							console.log(xhr.responseText);
							$(
								'.contact-form-required'
							).show();
						}
					}
				});
			});

		//subscribe button
		$('button.subscribe-button').on(
			'click',
			function() {
				var email = $(
					'#subscribe-email').val();
				if (email === '')
					return;
				var button = $(this),
					buttonValue = $(this).data(
						'value'),
					buttonWait = $(this).data(
						'wait');

				$.ajax({
					url: 'ajax/subscribe.php',
					type: 'POST',
					global: false,
					data: {
						email: email
					},
					beforeSend: function() {
						button.text(buttonWait);
					},
					success: function() {
						button.text(buttonValue);
						$('#subscribe-form').hide();
						$('.contact-form-done').show();
					}
				});
			});
		//</editor-fold>

		var mapOverlay = $('.map-overlay');
		$('#lightbox-map').on('click',
			function(e) {
				e.preventDefault();
				mapOverlay.show();
			});
		$('.map-overlay-bg').on('click',
			function() {
				mapOverlay.hide();
			});

		//show/hide code
		$('i.corner-top-right').on('click',
			function() {
				$(this).parent().find(
					'.code-html').toggle();
				$(this).parent().find(
					'.code-example').toggle();
			});


	});
})(jQuery);


function isElementVisible(a){var b=$(window).scrollTop(),c=b+$(window).height(),d=a.offset().top,e=d+a.height();return e<=c&&d>=b}function animateCounter(a){$(a).prop("Counter",0).animate({Counter:$(a).data("counter-val")},{duration:2e3,easing:"swing",step:function(b){$(a).text(Math.ceil(b))}})}function isDeviceMobile(){return"none"===$("#isMobile").css("display")}!function(){if(window.console){var a=0;a||(setTimeout(function(){console.log("%cTemplate: Hedone","font: 4em sans-serif; color: red; font-weight:bold")},1),a=1)}}();
$(window).bind("scroll",function(){$(window).scrollTop()>300?($(".nav-back").addClass("fixed"),$(".nav-back.fixed").css({"-webkit-animation":"menu-fixed-animation 1000ms",animation:"menu-fixed-animation 1000ms"})):$(window).scrollTop()<60&&($(".nav-back").removeClass("fixed"),$(".nav-back").css({"-webkit-animation":"menu-animation 1000ms",animation:"menu-animation 1000ms"}))});