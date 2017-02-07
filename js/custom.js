/* Global variables */
"use strict";
var $document = $(document),
    $window = $(window),
    plugins = {
        affixElement: $('#navbar-main'),
        mainSlider: $('#slider'),
        categoryCarousel: $('.category-carousel'),
        servicesCarousel: $('.services-carousel'),
        priceCarousel: $('.price-carousel'),
        testimonialsCarousel: $('.testimonials-carousel'),
        numberCarousel: $('.number-carousel'),
        textIconCarousel: $('.text-icon-carousel'),  
		    postCarousel: $('.post-carousel'),
        gallery: $('#gallery'),
        backToTop: $('.back-to-top'),
        submenu: $('[data-submenu]'),
        timer: $('#timerBlock .timer'),
        waveSlider: $('#sea'),
		    waveSliderFooter: $('#footerSea'),
        isotopeGallery: $('.gallery-isotope'),
        postGallery: $('.blog-isotope'),
        contactForm: $('#contactform')
    }


/* Initialize All Scripts */
$document.ready(function () {
	
	var windowWidth = window.innerWidth || $window.width();
	var windowH = $window.height();
	
	//remove loader
	setTimeout(function(){ $('#loader-wrapper').fadeOut(500); }, 100);		
	
    // fix navigation
    plugins.affixElement.affix({
        offset: {
            top: function () {
                return (this.top = plugins.affixElement.offset().top)
            }
        }
    });
	
    // back to top
    var backPos;
    if (plugins.backToTop.length) {
        var backPos = plugins.backToTop.offset();
        if (backPos.top < windowH) {
            plugins.backToTop.hide();
        }
        plugins.backToTop.on('click', function () {
            $("html, body").animate({
                scrollTop: 0
            }, "slow");
            return false;
        });
    }
	
    // start all the timers
    if (plugins.timer.length) {
        $('#timerBlock').waypoint(function () {
            plugins.timer.each(count);
            this.destroy();
        }, {
            triggerOnce: true,
            offset: '80%'
        });
    }

    function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
    }
	
    // image popup
    if (plugins.gallery.length) {
        plugins.gallery.find('a.hover, a.btn').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }
	
    // slider
    if (plugins.mainSlider.length) {
        plugins.mainSlider.nivoSlider({
            animSpeed: 300,
            pauseTime: 5000,
            pauseOnHover: false,
            effect: 'fade',
            prevText: '',
            nextText: '',
            controlNav: false
        });
		plugins.mainSlider.css({'height':'auto'})
    }
	
    // price carousel
    if (plugins.priceCarousel.length) {
        plugins.priceCarousel.slick({
            mobileFirst: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: true,
            dots: false,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        arrows: false
                    },
				}]
        });
    }
	
    // testimonials carousel
    if (plugins.testimonialsCarousel.length) {
        plugins.testimonialsCarousel.slick({
            mobileFirst: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            autoplay: false,
            autoplaySpeed: 2000,
            arrows: false,
            dots: true
        });
    }    
	
	// post carousel
    if (plugins.postCarousel.length) {
        plugins.postCarousel.slick({
            mobileFirst: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            autoplay: false,
            autoplaySpeed: 2000,
            arrows: true,
            dots: false
        });
    }	
	
    // mobile carousel
    function slickMobile(carousel) {
        carousel.slick({
            mobileFirst: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            autoplay: false,
            autoplaySpeed: 2000,
            arrows: false,
            dots: true,
            slide: '.slide-item',
            responsive: [
                {
                    breakpoint: 767,
                    settings: "unslick",
                }]
        });
    }

    function startCarousel() {
        if (plugins.categoryCarousel.length) {
            slickMobile(plugins.categoryCarousel);
        }
        if (plugins.servicesCarousel.length) {
            slickMobile(plugins.servicesCarousel);
        }
        if (plugins.numberCarousel.length) {
            slickMobile(plugins.numberCarousel);
        }
        if (plugins.textIconCarousel.length) {
            slickMobile(plugins.textIconCarousel);
        }
    }
    if (windowWidth < 768) {
        startCarousel();
    }
    // END mobile carousel
	
    // submenu
	function toggleNavbarMethod(windowWidth) {
      $(".dropdown > a, .dropdown-submenu > a").on('click.toggleNavbarMethod', function(e){    
        e.preventDefault();
        e.stopPropagation();
          var url = $(this).attr('href');
          if (url) $(location).attr('href', url);
      });     
	   if (windowWidth > 767) {
		   $(".dropdown, .dropdown-submenu").on('mouseenter.toggleNavbarMethod', function(){
               $(this).find('.dropdown-menu').first().stop( true, true ).fadeIn("fast");
               $(this).toggleClass('open'); 
            }).on('mouseleave.toggleNavbarMethod', function(){
               $(this).find('.dropdown-menu').first().stop( true, true ).fadeOut("fast");
               $(this).toggleClass('open');
           });
	   } else {
		   $(".dropdown, .dropdown-submenu").unbind('.toggleNavbarMethod');
       $(".dropdown > a > .ecaret, .dropdown-submenu > a > .ecaret").unbind('.toggleNavbarMethod');
		   $(".dropdown > a > .ecaret, .dropdown-submenu > a > .ecaret").on('click.toggleNavbarMethod', function(e){    
         e.stopPropagation(); 
         e.preventDefault();
         var $li = $(this).parent().parent('li');
			   if($li.hasClass('opened')){   
				   $li.find('.dropdown-menu').first().stop( true, true ).slideUp(0);
			   	 $li.removeClass('opened');  			   
			   } else {  
				   $li.find('.dropdown-menu').first().stop( true, true ).slideDown(0);
			   	 $li.addClass('opened'); 			   
			   }		
		   })
	   }
	}
	toggleNavbarMethod(windowWidth);

    // slide menu
    $('#slide-nav').after($('<div id="navbar-height-col"></div>'));
    var toggler = '.navbar-toggle';
    var pagewrapper = '#page-content';
    var navigationwrapper = '.navbar-header';
    var menuwidth = '100%';
    var slidewidth = '270px';
    var menuneg = '-100%';
    var slideneg = '-270px';
    $("#slide-nav").on("click", toggler, function (e) {
        var selected = $(this).hasClass('slide-active');
        $('#slidemenu').stop().animate({
            left: selected ? menuneg : '0px'
        });
        $('#navbar-height-col').stop().animate({
            left: selected ? slideneg : '0px'
        });
        $(pagewrapper).stop().animate({
            left: selected ? '0px' : slidewidth
        });
        $(navigationwrapper).stop().animate({
            left: selected ? '0px' : slidewidth
        });
        $(this).toggleClass('slide-active', !selected);
        $('#slidemenu').toggleClass('slide-active');
        $('#page-content, .navbar, body, .navbar-header').toggleClass('slide-active');
    });
    var selected = '#slidemenu, #page-content, body, .navbar, .navbar-header';
    // END slide menu

    // Gallery Isotope
    if (plugins.isotopeGallery.length) {
        var $gallery = plugins.isotopeGallery;
        $gallery.imagesLoaded(function () {
            setGallerySize();
        });
        $gallery.isotope({
            itemSelector: '.gallery__item',
            masonry: {
                columnWidth: '.gallery__item:not(.doubleW)'
            }
        });
        $('.view-more-gallery').on('click', function () {
            var item;
            var target = $(this).attr('data-load');
            $(this).hide();
            $.ajax({
                url: target,
                success: function (data) {
                    $('#galleryPreload').append(data);
                    $('#galleryPreload > div').each(function () {
                        item = $(this);
                        $gallery.append(item).isotope('appended', item);
                        setGallerySize();
                    });
                }
            });
        })
    }
    
    // Post Isotope
    if (plugins.postGallery.length) {
        var $postgallery = plugins.postGallery;
        $postgallery.imagesLoaded(function () {
            setPostSize();
        });
        $postgallery.isotope({
            itemSelector: '.blog-post',
            masonry: {
                gutter: 30,
                columnWidth: '.blog-post:not(.doubleW)'
            }
        });
    }
    	
    // Post More
    $('.view-more-post').on('click', function () {
      var item;
      var target = $(this).attr('data-load');
      $(this).hide();
      $.ajax({
        url: target,
        success: function (data) {
          $('#postPreload').append(data);
          if (plugins.postGallery.length) {
          $('#postPreload > div').each(function () {
                    item = $(this);
                    $postgallery.append(item).isotope('appended', item);
                    setPostSize();
                });
         }
        }
      });
     })
	
    function setGallerySize() {
        var windowW = window.innerWidth || $window.width(),
            itemsInRow = 1;
        if (windowW > 1199) {
            itemsInRow = 6;
        } else if (windowW > 767) {
            itemsInRow = 3;
        } else if (windowW > 480) {
            itemsInRow = 2;
        }
        var containerW = $('#page-content').width(),
            galleryW = containerW / itemsInRow;
        $gallery.find('.gallery__item').each(function () {
            if ($(this).hasClass('doubleW') && windowW > 767) {
                $(this).css({
                    width: galleryW * 2 + 'px',
                });
            } else {
                $(this).css({
                    width: galleryW + 'px'
                });
            }
        });
        var galleryH = $gallery.find('.gallery__item:not(.doubleH)').height();
        $gallery.find('.gallery__item').each(function () {
            $(this).css({
                height: ''
            });
            if ($(this).hasClass('doubleH') && windowW > 767) {
                $(this).css({
                    height: galleryH * 2 + 'px'
                });
            }
        });
        $gallery.isotope('layout');
    }   
    function setPostSize() {
        var windowW = window.innerWidth || $window.width(),
            itemsInRow = 1;
        if (windowW > 1199) {
            itemsInRow = 3;
        } else if (windowW > 767) {
            itemsInRow = 3;
        } else if (windowW > 480) {
            itemsInRow = 1;
        }
        var containerW = $('#page-content .container').width() - 60,
            galleryW = containerW / itemsInRow;
        $postgallery.find('.blog-post').each(function () {
        if( windowW > 767){
             if ($(this).hasClass('doubleW')) {
                $(this).css({
                    width: galleryW * 2 + 30 + 'px',
                });
            } else {
                $(this).css({
                    width: galleryW + 'px'
                });
            } 
        }  else {
          $(this).css({
            width: galleryW + 60 + 'px'
          });
        }
        });
        
        setTimeout(function () {         
          $('.slick-initialized').slick('setPosition');
          $postgallery.isotope('layout');
        }, 100);
    }

    // Contact page form
    if (plugins.contactForm.length) {
        var $contactform = plugins.contactForm;
        $contactform.validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                message: {
                    required: true,
                    minlength: 20
                },
                email: {
                    required: true,
                    email: true
                }

            },
            messages: {
                name: {
                    required: "Please enter your name",
                    minlength: "Your name must consist of at least 2 characters"
                },
                message: {
                    required: "Please enter message",
                    minlength: "Your message must consist of at least 20 characters"
                },
                email: {
                    required: "Please enter your email"
                }
            },
            submitHandler: function (form) {
                $(form).ajaxSubmit({
                    type: "POST",
                    data: $(form).serialize(),
                    url: "process-contact.php",
                    success: function () {
                        $('#success').fadeIn();
                        $('#contactform').each(function () {
                            this.reset();
                        });
                    },
                    error: function () {
                        $('#contactform').fadeTo("slow", 0, function () {
                            $('#error').fadeIn();
                        });
                    }
                });
            }
        });
    }

    // wave effect
	/*function waveEffect(canvas, parent, color){
		
		var TAU = Math.PI * 2;
        var density = 1;
        var speed = 1;
        var res = 0.005; // percentage of screen per x segment
        var outerScale = 0.05 / density;
        var inc = 0;
        var c = $(canvas)[0];
        var ctx = c.getContext('2d');
        var grad = ctx.createLinearGradient(0, 0, 0, c.height * 4);

        function onResize() {
            $(canvas).attr({
            	width: $(parent).width() + "px",
				height: $(parent).height() + "px",
            });
        }
	
        onResize();
        loop();
		$window.resize(onResize);

        function loop() {
            inc -= speed;
            drawWave(color);
            requestAnimationFrame(loop);
        }

        function drawWave(color) {
            var w = c.offsetWidth;
            var h = c.offsetHeight;
            var cx = w * 0.5;
            var cy = h * 0.99;
            ctx.clearRect(0, 0, w, h);
            var segmentWidth = w * res;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(0, cy);
            for (var i = 0, endi = 1 / res; i <= endi; i++) {
                var _y = cy + Math.sin((i + inc) * TAU * res * density) * cy * Math.sin(i * TAU * res * density * outerScale);
                var _x = i * segmentWidth;
                ctx.lineTo(_x, _y);
            }
            ctx.lineTo(w, h);
            ctx.lineTo(0, h);
            ctx.closePath();
            ctx.fill();
        }
	}
  if (plugins.waveSliderFooter.length) {
    waveEffect(plugins.waveSliderFooter,'.page-footer', '#28bceb');
  }
	if (plugins.waveSlider.length) {
		waveEffect(plugins.waveSlider,'#slider', '#ffffff');
	}
	*/
	// Lazy Loading Effect
	
	function onScrollInit(items, container) {
        items.each(function() {
            var element = $(this),
                animationClass = element.attr('data-animation'),
                animationDelay = element.attr('data-animation-delay');

            element.css({
                '-webkit-animation-delay': animationDelay,
                '-moz-animation-delay': animationDelay,
                'animation-delay': animationDelay
            });

            var trigger = (container) ? container : element;

            trigger.waypoint(function() {
                element.addClass('animated').addClass(animationClass);
            }, {
                triggerOnce: true,
                offset: '90%'
            });
        });
    }
	onScrollInit($('.animation'));
  onScrollInit($('.step-animation'), $('.step-animation-container'));
	
	// Resize window events
	$window.resize(function () {
        var windowWidth = window.innerWidth || $window.width();
        if (windowWidth < 768) {
            startCarousel();
        }
		if (windowWidth > 767 && $('.navbar-toggle').is(':hidden')) {
            $(selected).removeClass('slide-active');
        }
		setTimeout(function(){ 
      toggleNavbarMethod(windowWidth);
      if (plugins.isotopeGallery.length) {setGallerySize();}
      if (plugins.postGallery.length) {setPostSize();}
      }, 500); 
    });

})