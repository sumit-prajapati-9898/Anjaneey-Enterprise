/*--------------------------
    Project Name: Medcity
    Version: 1.3
    Author: 7oorof
    Relase Date: April 2021
    Last Date: March 2023
---------------------------*/
/*---------------------------
      Table of Contents
    --------------------
    01- Pre Loading
    02- Mobile Menu
    03- Sticky Navbar
    04- Scroll Top Button
    05- Close Topbar
    06- Set Background-img to section 
    07- Add active class to accordions
    08- Contact Form validation
    09- Slick Carousel
    10- Popup Video
    11- Progress bars
    12- NiceSelect Plugin
    13- Range Slider
     
 ----------------------------*/

$(function () {

    "use strict";

    // Global variables
    var $win = $(window);

    /*==========  Pre Loading   ==========*/
    setTimeout(function () {
        $(".preloader").remove();
    }, 2000);

    /*==========   Mobile Menu   ==========*/
    $('.navbar-toggler').on('click', function () {
        $('.navbar-collapse').addClass('menu-opened');
    })

    $('.close-mobile-menu').on('click', function (e) {
        $('.navbar-collapse').removeClass('menu-opened');
    });

    /*==========   Sticky Navbar   ==========*/
    $win.on('scroll', function () {
        if ($win.width() >= 992) {
            var $stickyNavbar = $('.sticky-navbar'),
                $secondaryNavbar = $('.secondary-nav');
            if ($win.scrollTop() > 150) {
                $stickyNavbar.addClass('is-sticky');
            } else {
                $stickyNavbar.removeClass('is-sticky');
            }
            if ($secondaryNavbar.length) {
                if ($win.scrollTop() > $secondaryNavbar.offset().top - 100) {
                    $secondaryNavbar.addClass('secondary-nav-sticky');
                } else {
                    $secondaryNavbar.removeClass('secondary-nav-sticky');
                }
            }
        }
    });
    // Scroll To Section when Clicking on The Link
    $('.secondary-nav-internal-navigation .nav__link').on("click", function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $('#' + $(this).data('scroll')).offset().top - 140
        }, 1000);
    });

    // Add  active class when The Scroll Reaching the Section
    $(window).on("scroll", function () {
        $('section').each(function () {
            if ($(window).scrollTop() > $(this).offset().top - 141) {
                var sectionID = $(this).attr('id');
                $('.secondary-nav-internal-navigation .nav__link').removeClass('active');
                $('.secondary-nav-internal-navigation .nav__link[data-scroll="' + sectionID + '"]').addClass('active');
            }
        });
    });

    /*==========   Scroll Top Button   ==========*/
    var $scrollTopBtn = $('#scrollTopBtn');
    // Show Scroll Top Button
    $win.on('scroll', function () {
        if ($(this).scrollTop() > 700) {
            $scrollTopBtn.addClass('actived');
        } else {
            $scrollTopBtn.removeClass('actived');
        }
    });
    // Animate Body after Clicking on Scroll Top Button
    $scrollTopBtn.on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    /*==========   Close Topbar   ==========*/
    $('.topbar__close').on("click", function (e) {
        e.preventDefault();
        $(this).closest('.topbar').fadeOut()
    });

    /*==========   Set Background-img to section   ==========*/
    // $('.bg-img').each(function () {
    //     var imgSrc = $(this).children('img').attr('src');
    //     $(this).parent().css({
    //         'background-image': 'url(' + imgSrc + ')',
    //         'background-size': 'cover',
    //         'background-position': 'center',
    //     });
    //     $(this).parent().addClass('bg-img');
    //     if ($(this).hasClass('background-size-auto')) {
    //         $(this).parent().addClass('background-size-auto');
    //     }
    //     $(this).remove();
    // });

    /*==========   Add active class to accordions   ==========*/
    $('.accordion__header').on('click', function () {
        $(this).parent('.accordion-item').toggleClass('opened');
        $(this).parent('.accordion-item').siblings().removeClass('opened');
    })
    $('.accordion__title').on('click', function (e) {
        e.preventDefault()
    });

    /*==========  Open and Close Popup   ==========*/
    // open Mini Popup
    function openMiniPopup(popupTriggerBtn, popup, cssClass) {
        $(popupTriggerBtn).on('click', function (e) {
            e.preventDefault();
            $(this).toggleClass(cssClass);
            $(popup).toggleClass(cssClass);
        });
    }
    // open Popup
    function openPopup(popupTriggerBtn, popup, addedClass, removedClass) {
        $(popupTriggerBtn).on('click', function (e) {
            e.preventDefault();
            $(popup).toggleClass(addedClass, removedClass).removeClass(removedClass);
        });
    }
    // Close Popup
    function closePopup(closeBtn, popup, addedClass, removedClass) {
        $(closeBtn).on('click', function () {
            $(popup).removeClass(addedClass).addClass(removedClass);
        });
    }
    // close popup when clicking on an other place on the Document
    function closePopupFromOutside(popup, stopPropogationElement, popupTriggerBtn, removedClass, addedClass) {
        $(document).on('mouseup', function (e) {
            if (!$(stopPropogationElement).is(e.target) && !$(popupTriggerBtn).is(e.target) && $(stopPropogationElement).has(e.target).length === 0 && $(popup).has(e.target).length === 0) {
                $(popup).removeClass(removedClass).addClass(addedClass);
            }
        });
    }
    openMiniPopup('.miniPopup-emergency-trigger', '#miniPopup-emergency', 'active') // Open miniPopup-emergency
    openMiniPopup('#miniPopup-departments-trigger-icon', '#miniPopup-departments', 'active') // Open miniPopup-emergency

    openPopup('.action__btn-search', '.search-popup', 'active', 'inActive') // Open sidenav popup
    closePopup('.search-popup__close', '.search-popup', 'active', 'inActive') // Close sidenav popup
    openPopup('.action__btn-burgerMenu', '.burger-menu', 'active', 'inActive') // Open sidenav popup
    closePopup('.burger-menu__close', '.burger-menu', 'active', 'inActive') // Close sidenav popup
    openPopup('.action__btn-cart', '.cart-popup', 'active', 'inActive') // Open Search popup
    closePopupFromOutside('.burger-menu', '.burger-menu__content', '.action__btn-burgerMenu', 'active', 'inActive');  // close popup when clicking on an other place on the Document

    openPopup('.open-login-popup', '#login-popup', 'active', 'inActive') // Open sidenav popup
    closePopupFromOutside('#login-popup', '.login-popup-wrapper', '.open-login-popup', 'active', 'inActive');  // close popup when clicking on an other place on the Document

    openPopup('.open-register-popup', '#register-popup', 'active', 'inActive') // Open sidenav popup
    closePopupFromOutside('#register-popup', '.login-popup-wrapper', '.open-register-popup', 'active', 'inActive');  // close popup when clicking on an other place on the Document

    // Close topbar
    $('#close-topbar').on('click', function () {
        $('#header-topbar').fadeOut();
    });

    /*==========   Increase and Decrease Input Value   ==========*/
    // Increase Value
    $('.increase-qty').on('click', function () {
        var $qty = $(this).parent().find('.qty-input');
        var currentVal = parseInt($qty.val());
        if (!isNaN(currentVal)) {
            $qty.val(currentVal + 1);
        }
    });
    // Decrease Value
    $('.decrease-qty').on('click', function () {
        var $qty = $(this).parent().find('.qty-input');
        var currentVal = parseInt($qty.val());
        if (!isNaN(currentVal) && currentVal > 1) {
            $qty.val(currentVal - 1);
        }
    });

    /*==========   Progress bars  ==========*/
    if ($(".animated-Progressbars").length > 0) {
        $(window).on('scroll', function () {
            var skillsOffset = $(".animated-Progressbars").offset().top - 160,
                skillsHight = $(this).outerHeight(),
                winScrollTop = $(window).scrollTop();
            if (winScrollTop > skillsOffset - 1 && winScrollTop < skillsOffset + skillsHight - 1) {
                $('.progress-bar').each(function () {
                    $(this).width($(this).attr('aria-valuenow') + '%');
                });
                $('.progress__percentage').each(function () {
                    $(this).text($(this).parent('.progress-bar').attr('aria-valuenow') + '%')
                });
            }
        });
    }

    /*==========  Contact Form validation  ==========*/
    var contactForm = $("#contactForm"),
        contactResult = $('.contact-result');
    contactForm.validate({
        debug: false,
        submitHandler: function (contactForm) {
            $(contactResult, contactForm).html('Please Wait...');
            $.ajax({
                type: "POST",
                url: "assets/php/contact.php",
                data: $(contactForm).serialize(),
                timeout: 20000,
                success: function (msg) {
                    $(contactResult, contactForm).html('<div class="alert alert-success" role="alert"><strong>Thank you. We will contact you shortly.</strong></div>').delay(3000).fadeOut(2000);
                },
                error: $('.thanks').show()
            });
            return false;
        }
    });

    /*==========   Slick Carousel ==========*/
    $('.slick-carousel').slick();





    $('.slider-with-navs').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
        dots: true,
        asNavFor: '.slider-nav'
    });

    $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-with-navs',
        dots: false,
        arrows: false,
        centerMode: false,
        focusOnSelect: true,
        infinite: false
    });

    /*==========  Popup Video  ==========*/
    $('.popup-video').magnificPopup({
        mainClass: 'mfp-fade',
        removalDelay: 0,
        preloader: false,
        fixedContentPos: false,
        type: 'iframe',
        iframe: {
            markup: '<div class="mfp-iframe-scaler">' +
                '<div class="mfp-close"></div>' +
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                '</div>',
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: 'v=',
                    src: '//www.youtube.com/embed/%id%?autoplay=1'
                }
            },
            srcAction: 'iframe_src',
        }
    });
    $('.popup-gallery-item').magnificPopup({
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        }
    });

    /*==========  NiceSelect Plugin  ==========*/
    $('select').niceSelect();

    /*==========   Range Slider  ==========*/
    var $rangeSlider = $("#rangeSlider"),
        $rangeSliderResult = $("#rangeSliderResult");
    $rangeSlider.slider({
        range: true,
        min: 0,
        max: 300,
        values: [50, 200],
        slide: function (event, ui) {
            $rangeSliderResult.val("$" + ui.values[0] + " - $" + ui.values[1]);
        }
    });
    $rangeSliderResult.val("$" + $rangeSlider.slider("values", 0) + " - $" + $rangeSlider.slider("values", 1));

    /*==========  image zoomsl Plugin  ==========*/
    // [Zoom Effect on Hovering] Find it in shop-single-product.html
    $(".zoomin").imagezoomsl();
});

$(document).ready(function () {

    $('#mainNavigation li.has-dropdown a').removeAttr('data-toggle');
    // sipwer slider 
    const progressCircle = document.querySelector(".autoplay-progress svg");
    const progressContent = document.querySelector(".autoplay-progress span");
    var swiper = new Swiper(".home-swiper-1", {
        loop: true,
        spaceBetween: 30,
        grabCursor: true,
           // Navigation arrows
     
         direction:'horizontal',
         keyboard:true,
         autoplay: {
             delay: 5000,
             disableOnInteraction: false
           },
           speed: 2000,
           effect: 'fade',
          
          navigation: {
            nextEl: ".fa-solid fa-angles-right",
            prevEl: ".fa-solid fa-angles-left",
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          on: {
            autoplayTimeLeft(s, time, progress) {
              progressCircle.style.setProperty("--progress", 1 - progress);
              progressContent.textContent = `${Math.ceil(time / 1000)}s`;
            }
          }
          
    });
    


    // var swiper = new Swiper(".swiper-2", {
    //     effect: "coverflow",
    //     slidesPerView: 3,
    //     spaceBetween: 30,

    //     pagination: {
    //       el: ".swiper-pagination",
    //       clickable: true,
    //       dynamicBullets: true,
    //     },
    //     mousewheel: true,
    //     keyboard: true,
    //   });

var swiper = new Swiper(".swiper-2", {
    effect: "coverflow",
    loop: true,
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
        nextEl: ".fa-solid fa-angles-right",
        prevEl: ".fa-solid fa-angles-left",
        clickable: true,
      },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    mousewheel: {
        enabled: true,
        invert: true,
        sensitivity: 2,
        releaseOnEdges: true
      },
    keyboard: true,
  });

    $(".swiper-slide>div").addClass("post-item");


    $(".nav-item button").addClass("bn632-hover bn26");
    $('.Slick-SLiderForProducts,.impurity-tab-sliders').slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]

    });
});

// var cursor = document.querySelector(".cursor");
// var cursor2 = document.querySelector(".cursor2");
// document.addEventListener("mousemove",function(e){
//     cursor.style.cssText = cursor2.style.cssText = "left: " + e.clientX + "px; top: " + e.clientY + "px;"; 
// });


const swiper = new Swiper('.nested-swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesToShow: 1,
  
    // If we need pagination
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    mousewheel: {
        enabled: true,
        invert: true,
        sensitivity: 2,
        releaseOnEdges: true
      },
    keyboard: true,
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });

  var button = document.getElementById('redirect-btn-category-product');

  // Add click event listener to the button
  button.addEventListener('click', function() {
      // Redirect to the desired page
      window.location.href = 'impurity-products.html'; // Replace 'https://www.example.com' with the URL you want to redirect to
  });

  var button = document.getElementById('coming-soon-page1');

  // Add click event listener to the button
  button.addEventListener('click', function() {
      // Redirect to the desired page
      window.location.href = 'coming-soon.html'; // Replace 'https://www.example.com' with the URL you want to redirect to
  });
  var button = document.getElementById('coming-soon-page2');

  // Add click event listener to the button
  button.addEventListener('click', function() {
      // Redirect to the desired page
      window.location.href = 'coming-soon.html'; // Replace 'https://www.example.com' with the URL you want to redirect to
  });


