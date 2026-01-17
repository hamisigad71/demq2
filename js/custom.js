jQuery(document).ready(function ($) {
    "use strict";

    /*--------------------------------------------------------------
     Counter
     --------------------------------------------------------------*/
    var runonce = true;
    $('.stronghold-counter-wrapper').waypoint(function () {
        if (runonce == true) {
            $('.counter-number-val').countTo({
                delay: 60,
                speed: 2500,
                refreshInterval: 30,
                time: 4000
            });
            runonce = false;
        }
    },
    {
        offset: '300%'
    });

    $(".stronghold-counter-wrapper").on("mouseenter", function() {

        var iconHoverColor = $(this).data('icon-hover-color');
        var iconHoverBgColor = $(this).data('icon-hover-bgcolor');


        var counterIcon = $(this).find('.stronghold-info-icon i');

        counterIcon.css({
            'color': iconHoverColor,
            'background': iconHoverBgColor,
        });


    });
    $(".stronghold-counter-wrapper").on("mouseleave", function() {

        var iconColor = $(this).data('icon-color');
        var iconBgColor = $(this).data('icon-bgcolor');

        var counterIcon = $(this).find('.stronghold-info-icon i');

        counterIcon.css({
            'color': iconColor,
            'background': iconBgColor,
        });

    });

    /*--------------------------------------------------------------
     Mobile Menu
     --------------------------------------------------------------*/
    $(".hamburger").on("click", function() {
        $(this).toggleClass('is-active');
        $(".mobile-menu-area").slideToggle();
    });

    $('.mobile-menu .sub-menu').hide();

    $('.mobile-submenu-toggle').on("click", function() {
       $(this).parent().find('.sub-menu').slideToggle();
   });


    /*--------------------------------------------------------------
     Back to top
     --------------------------------------------------------------*/
    $(window).on("scroll", function() {
        if ($(this).scrollTop() > 450) {
            $('#to-top').fadeIn();
        } else {
            $('#to-top').fadeOut();
        }
    });
    $('#to-top').on("click", function() {
        $('html, body').animate({scrollTop: 0}, 1000);
        return false;
    });


    /*--------------------------------------------------------------
     Lightboxes
     --------------------------------------------------------------*/

    $('.masonry-img, .stronghold-gallery-widget, .single-portfolio-wrapper').magnificPopup({
  delegate: 'a', // child items selector, by clicking on it popup will open
  type: 'image',
  zoom: {
     enabled: true,
           duration: 300, // duration of the effect, in milliseconds
           easing: 'ease-in-out' // CSS transition
       },
       gallery:{
        enabled:true
    }
  // other options
});


    /*--------------------------------------------------------------
     Search Toggle
     --------------------------------------------------------------*/
    $(".search-toggle").on("click", function() {
        $(".search-box-wrapper").toggle();
    });

    $(".site-content, .page-title-wrapper, .header-top").on("click", function() {
        $(".search-box-wrapper").hide();
    });

    /*--------------------------------------------------------------
     Sticky Header
     --------------------------------------------------------------*/
    $(window).scroll(function () {
        if ($(this).scrollTop() > 250) {
            var offset = $(".sticky-header-wrapper").data('offset');
            $(".sticky-header-wrapper").css({"visibility": "visible", "opacity": "1", "position": "fixed", "top": offset});
        } else {
            $(".sticky-header-wrapper").css({"visibility": "hidden", "opacity": "0", "top": "-30px"});
        }
    });

    /*--------------------------------------------------------------
     Smooth Scrolling 
     --------------------------------------------------------------*/
    $(function () {
        $('.main-navigation a[href*="#"]:not([href="#"])').on("click", function() {
            if($(this).attr('class') == ''){
                return false;
            }else
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - 100
                    }, 1000);
                  //  return false;
                }
            }
        });
    });


    /*--------------------------------------------------------------
     Cart
     --------------------------------------------------------------*/
    $('.add-cart-custom').on("mouseenter", function() {
        var n = $(this).next();
        var q = $(this).data("quantity");
        var s = $(this).data("product_sku");
        var p = $(this).data("product_id");
        var h = $(this).attr("href");

        n.attr("data-quantity", q);
        n.attr("data-product_sku", s);
        n.attr("data-product_id", p);
        n.attr("href", h);

    });

    $('.add-cart-custom, .add-cart-title').on('click', function () {
        event.preventDefault();
        var link = $(this).attr("href");
        var prod = $(this).data('product_id');
        var i = $(this);

        $.ajax({
            url: custom.ajaxurl,
            type: 'post',
            data: {
                action: 'addcart',
                product: prod
            },
            beforeSend: function () {
                if (i.attr('class') == "btn service-product-btn") {
                    $(i).parent().parent().toggleClass("product-added");
                } else {
                    $(i).parent().parent().parent().toggleClass("product-added");
                }
            },
            success: function (html) {
                $.get(link, function () {
                    $(".nav-cart-badge .cart-count").load(location.href + " .nav-cart-badge .cart-count");
                    $('.shop-content, #primary').prepend(html);

                });
                return false;
            }
        });

    });


    /*--------------------------------------------------------------
     Quickview
     --------------------------------------------------------------*/
    $('.product-quickview').on('click', function () {

        var prod = $(this).data('product_id');
        var i = $(this);
        $.ajax({
            url: custom.ajaxurl,
            type: 'post',
            data: {
                action: 'quickview',
                product: prod
            },
            beforeSend: function () {
                $(i).parent().parent().parent().append('<div class="quickview-loader">Loading...</div>');
            },
            success: function (html) {
                $('.stronghold-product-quickview').remove();
                $('.site-content').append(html);
                $('.quickview-loader').remove();
                var inst = $('[data-remodal-id=modal]').remodal({
                    hashTracking: false
                });
                inst.open();

                $(".product-slider").slick({
                  slidesToShow: 1,
                  autoplaySpeed: 5000,
                  autoplay: true,
                  dots: false,
                  arrows: true,
                  infinite: true,
                  prevArrow: prev,
                  nextArrow: next,
                  responsive: [
                  {
                      breakpoint: 800,
                      settings: {
                        slidesToShow: 1
                    }
                }
                ]
              });

            }
        });
    });



    /*--------------------------------------------------------------
     Accordion
     --------------------------------------------------------------*/
    function close_accordion_item() {
        $('.stronghold-accordion-wrapper .accordion-item-title').removeClass('active');
        $(".stronghold-accordion-wrapper .accordion-item-title-area").removeClass(
          "active"
          );
        $('.stronghold-accordion-wrapper .accordion-item-content').slideUp(500).removeClass('open');
    }

    $('.accordion-item-title,.accordion-item-title-area').on("click", function() {
        var currentAttrValue = $(this).attr('href');
        if ($(this).is('.active')) {
            close_accordion_item();
        } else {
            close_accordion_item();
            $(this).addClass('active');
            $('.stronghold-accordion-wrapper ' + currentAttrValue).slideDown(500).addClass('open');
        }

        return false;
    });

    /*--------------------------------------------------------------
     CTA
     --------------------------------------------------------------*/
    $('.call-link a').on("mouseenter", function() {

        var hcolor = $('.stronghold-call-to-action-wrapper .call-link a').data('linkhcolor');
        var hbgcolor = $('.stronghold-call-to-action-wrapper .call-link a').data('linkhbgcolor');
        var hbordercolor = $('.stronghold-call-to-action-wrapper .call-link a').data('linkhbordercolor');

        $(this).css("background", hbgcolor);
        $(this).css("border", "2px solid " + hbordercolor);
        $(this).css("color", hcolor);
    });
    $('.call-link a').on("mouseleave", function() {

        var color = $('.stronghold-call-to-action-wrapper .call-link a').data('linkcolor');
        var bgcolor = $('.stronghold-call-to-action-wrapper .call-link a').data('linkbgcolor');
        var bordercolor = $('.stronghold-call-to-action-wrapper .call-link a').data('linkbordercolor');

        $(this).css("background", bgcolor);
        $(this).css("border", "2px solid " + bordercolor);
        $(this).css("color", color);
    });

    /*--------------------------------------------------------------
     Icon Box
     --------------------------------------------------------------*/
    $(".single-icon-box-vc .stronghold-icon-box-front").on("mouseenter", function() {

        var iconColor = $(this).data('icon-color');
        var iconBgColor = $(this).data('icon-bgcolor');

        var iconHoverColor = $(this).data('icon-hover-color');
        var iconHoverBgColor = $(this).data('icon-hover-bgcolor');
        var iconboxHoverBgColor = $(this).data('iconbox-hover-bgcolor');
        var iconboxBorderHoverColor = $(this).data('iconbox-hover-bordercolor');

        var frontbgImg = $(this).data('bgimg');

        var iconboxIcon = $(this).find('.stronghold-info-icon i');

        $(this).css({
            'border-color': iconboxBorderHoverColor
        });

        if (iconboxHoverBgColor != "") {

            if (!frontbgImg) {
                frontbgImg = "";
            }

            $(this).css({
                'background': 'linear-gradient( ' + iconboxHoverBgColor + ' ,' + iconboxHoverBgColor + ' ),url(' + frontbgImg + ')  no-repeat center center',
                'background-size': 'cover',
            });
        }

        if (iconHoverColor == null) {
            iconHoverColor = iconColor;
        }

        if (iconHoverBgColor == null) {
            iconHoverBgColor = iconBgColor;
        }

        iconboxIcon.css({
            'color': iconHoverColor,
            'background': iconHoverBgColor
        });


    });
    $(".single-icon-box-vc .stronghold-icon-box-front").on("mouseleave", function() {

        var iconColor = $(this).data('icon-color');
        var iconBgColor = $(this).data('icon-bgcolor');
        var iconboxBgColor = $(this).data('iconbox-bgcolor');
        var iconboxBorderColor = $(this).data('iconbox-bordercolor');

        var frontbgImg = $(this).data('bgimg');


        var iconboxIcon = $(this).find('.stronghold-info-icon i');

        $(this).css({
            'border-color': iconboxBorderColor
        });

        if (iconboxBgColor == "" || iconboxBgColor == null) {
            iconboxBgColor = 'rgba(255,255,255,0.01)';
        }

        if (iconboxBgColor != "" || iconboxBgColor != null) {

            if (!frontbgImg) {
                frontbgImg = "";
            }

            $(this).css({
                'background': 'linear-gradient( ' + iconboxBgColor + ' ,' + iconboxBgColor + ' ),url(' + frontbgImg + ')  no-repeat center center',
                'background-size': 'cover',
                'border-color': iconboxBorderColor
            });
        }

        iconboxIcon.css({
            'color': iconColor,
            'background': iconBgColor
        });

    });

    /*--------------------------------------------------------------
     Price List
     --------------------------------------------------------------*/
    $(".financier-price-list-widget").on("mouseenter", function() {

        var pricelistHoverBgColor = $(this).data('price-list-hover-bgcolor');
        var pricelistBorderHoverColor = $(this).data('price-list-hover-bordercolor');
        var pricelisttbgImg = $(this).data('price-list-bgimg');

        if (pricelistHoverBgColor != "") {

            if (!pricelisttbgImg) {
                pricelisttbgImg = "";
            }

            $(this).css({
                'background': 'linear-gradient( ' + pricelistHoverBgColor + ' ,' + pricelistHoverBgColor + ' ),url(' + pricelisttbgImg + ')  no-repeat center center',
                'background-size': 'cover',
            });
        }

        if (pricelistBorderHoverColor != "") {
            $(this).css({
                'border-color': pricelistBorderHoverColor
            });
        }


    });
    $(".financier-price-list-widget").on("mouseleave", function() {

        var pricelistBgColor = $(this).data('price-list-bgcolor');
        var pricelistBorderColor = $(this).data('price-list-bordercolor');
        var pricelistbgImg = $(this).data('price-list-bgimg');

        if (pricelistBgColor != "") {

            if (!pricelistbgImg) {
                pricelistbgImg = "";
            }

            $(this).css({
                'background': 'linear-gradient( ' + pricelistBgColor + ' ,' + pricelistBgColor + ' ),url(' + pricelistbgImg + ')  no-repeat center center',
                'background-size': 'cover',
            });
        }

        if (pricelistBorderColor != "") {
            $(this).css({
                'border-color': pricelistBorderColor
            });
        }

    });

    /*--------------------------------------------------------------
     Company Info
     --------------------------------------------------------------*/
    $(".financier-company-info-widget").on("mouseenter", function() {

        var companyinfoHoverBgColor = $(this).data('company-info-hover-bgcolor');
        var companyinfoBorderHoverColor = $(this).data('company-info-hover-bordercolor');
        var companyinfobgImg = $(this).data('company-info-bgimg');

        if (companyinfoHoverBgColor != "") {

            if (!companyinfobgImg) {
                companyinfobgImg = "";
            }

            $(this).css({
                'background': 'linear-gradient( ' + companyinfoHoverBgColor + ' ,' + companyinfoHoverBgColor + ' ),url(' + companyinfobgImg + ')  no-repeat center center',
                'background-size': 'cover',
            });
        }

        if (companyinfoBorderHoverColor != "") {
            $(this).css({
                'border-color': companyinfoBorderHoverColor
            });
        }


    });
    $(".financier-company-info-widget").on("mouseleave", function() {

        var companyinfoBgColor = $(this).data('company-info-bgcolor');
        var companyinfoBorderColor = $(this).data('company-info-bordercolor');
        var companyinfobgImg = $(this).data('company-info-bgimg');

        if (companyinfoBgColor != "") {

            if (!companyinfobgImg) {
                companyinfobgImg = "";
            }

            $(this).css({
                'background': 'linear-gradient( ' + companyinfoBgColor + ' ,' + companyinfoBgColor + ' ),url(' + companyinfobgImg + ')  no-repeat center center',
                'background-size': 'cover',
            });
        }

        if (companyinfoBorderColor != "") {
            $(this).css({
                'border-color': companyinfoBorderColor
            });
        }

    });


    /*--------------------------------------------------------------
     Opening Hours
     --------------------------------------------------------------*/
    $(".financier-opening-hours-widget").on("mouseenter", function() {

        var openinghoursHoverBgColor = $(this).data('opening-hours-hover-bgcolor');
        var openinghoursBorderHoverColor = $(this).data('opening-hours-hover-bordercolor');
        var openinghoursbgImg = $(this).data('opening-hours-bgimg');

        if (openinghoursHoverBgColor != "") {

            if (!openinghoursbgImg) {
                openinghoursbgImg = "";
            }

            $(this).css({
                'background': 'linear-gradient( ' + openinghoursHoverBgColor + ' ,' + openinghoursHoverBgColor + ' ),url(' + openinghoursbgImg + ')  no-repeat center center',
                'background-size': 'cover',
            });
        }

        if (openinghoursBorderHoverColor != "") {
            $(this).css({
                'border-color': openinghoursBorderHoverColor
            });
        }


    });
    $(".financier-opening-hours-widget").on("mouseleave", function() {

        var openinghoursBgColor = $(this).data('opening-hours-bgcolor');
        var openinghoursBorderColor = $(this).data('opening-hours-bordercolor');
        var openinghoursbgImg = $(this).data('opening-hours-bgimg');

        if (openinghoursBgColor != "") {

            if (!openinghoursbgImg) {
                openinghoursbgImg = "";
            }

            $(this).css({
                'background': 'linear-gradient( ' + openinghoursBgColor + ' ,' + openinghoursBgColor + ' ),url(' + openinghoursbgImg + ')  no-repeat center center',
                'background-size': 'cover',
            });
        }

        if (openinghoursBorderColor != "") {
            $(this).css({
                'border-color': openinghoursBorderColor
            });
        }

    });


    /*--------------------------------------------------------------
     Feature Box
     --------------------------------------------------------------*/
    $(".feature-box-img").on("mouseenter", function() {

        var iconWrapper = $(this).find('.feature-box-icon-wrapper');

        var iHcolor = $(iconWrapper).data('hcolor');
        var iBgHcolor = $(iconWrapper).data('hbgcolor');

        var iColor = $(iconWrapper).find('i');

        if (iHcolor != "") {
            iColor.css({
                'color': iHcolor,

            });
        }

        if (iBgHcolor != "") {
            iColor.css({
                'background': iBgHcolor,

            });
        }


    });
    $(".feature-box-img").on("mouseleave", function() {

        var iconWrapper = $(this).find('.feature-box-icon-wrapper');

        var iMcolor = $(iconWrapper).data('color');
        var iBgcolor = $(iconWrapper).data('bgcolor');

        var iColor = $(iconWrapper).find('i');

        iColor.css({
            'background': iBgcolor,
            'color': iMcolor
        });
    });


    /*--------------------------------------------------------------
     Blog Carousel
     --------------------------------------------------------------*/

    var array = jQuery.makeArray(
        $("body").find(
          ".stronghold-blog-carousel"
          )
        );
    $(array).each(function() {
        var speed = $(this).data("speed");
        var items = $(this).data("items");
        var arrows = $(this).data("arrows");

        var prev = $(this).parent().find('.arrow_prev_top');
        var next = $(this).parent().find('.arrow_next_top');
        var rtl = $(this).data("rtl");

        var tablet_break = $(this).data("tabletbp");
        var tablet_slides = $(this).data("tabletsd");
        var mobile_break = $(this).data("mobilebp");
        var mobile_slides = $(this).data("mobilesd");

        if(tablet_break == ''){
          tablet_break = 1024;
      }
      if(tablet_slides == ''){
          tablet_slides = 2;
      }
      if(mobile_break == ''){
          mobile_break = 767;
      }
      if(mobile_slides == ''){
          mobile_slides = 1;
      }

      if(arrows == null){
          arrows = 'true';
      }

      if (speed == "") {
          speed = 5000;
      }

      if (items == "") {
          items = 3;
      }

      if (rtl == "") {
        rtl = false;
    }

    $(this).slick({
      slidesToShow: items,
      autoplaySpeed: speed,
      autoplay: true,
      dots: false,
      arrows: false,
      infinite: true,
      rtl: rtl,
      responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: items
      }
  },
  {
    breakpoint: tablet_break,
    settings: {
      slidesToShow: tablet_slides
  }
},
{
    breakpoint: mobile_break,
    settings: {
      slidesToShow: mobile_slides
  }
}
]
  });


    if (arrows == true) {

      $(prev).click(function () {

         var carousel = $(this).parent().parent().find('.stronghold-blog-carousel');

         $(carousel).slick("slickPrev");
     });

      $(next).click(function () {

        var carousel = $(this).parent().parent().find('.stronghold-blog-carousel');

        $(carousel).slick("slickNext");
    });
  }


});


    /*--------------------------------------------------------------
     Service Carousel
     --------------------------------------------------------------*/

    var array = jQuery.makeArray(
        $("body").find(
          ".stronghold-service-carousel"
          )
        );
    $(array).each(function() {
        var speed = $(this).data("speed");
        var items = $(this).data("items");
        var arrows = $(this).data("arrows");
        var rtl = $(this).data("rtl");

        var prev = $(this).parent().find('.arrow_prev_top');
        var next = $(this).parent().find('.arrow_next_top');

        var tablet_break = $(this).data("tabletbp");
        var tablet_slides = $(this).data("tabletsd");
        var mobile_break = $(this).data("mobilebp");
        var mobile_slides = $(this).data("mobilesd");

        if(tablet_break == ''){
          tablet_break = 1024;
      }
      if(tablet_slides == ''){
          tablet_slides = 2;
      }
      if(mobile_break == ''){
          mobile_break = 767;
      }
      if(mobile_slides == ''){
          mobile_slides = 1;
      }


      if(arrows == null){
          arrows = 'true';
      }

      if (speed == "") {
          speed = 5000;
      }

      if (items == "") {
          items = 3;
      }

      if (rtl == "") {
        rtl = false;
    }

    $(this).slick({
      slidesToShow: items,
      autoplaySpeed: speed,
      autoplay: true,
      dots: false,
      arrows: false,
      infinite: true,
      rtl: rtl,
      responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: items
      }
  },
  {
    breakpoint: tablet_break,
    settings: {
      slidesToShow: tablet_slides
  }
},
{
    breakpoint: mobile_break,
    settings: {
      slidesToShow: mobile_slides
  }
}
]
  });


    if (arrows == true) {

      $(prev).click(function () {

         var carousel = $(this).parent().parent().find('.stronghold-service-carousel');

         $(carousel).slick("slickPrev");
     });

      $(next).click(function () {

        var carousel = $(this).parent().parent().find('.stronghold-service-carousel');

        $(carousel).slick("slickNext");
    });
  }


});

    /*--------------------------------------------------------------
     Team Carousel
     --------------------------------------------------------------*/
    
    var array = jQuery.makeArray(
        $("body").find(
          ".stronghold-team-members-carousel"
          )
        );
    $(array).each(function() {
        var speed = $(this).data("speed");
        var items = $(this).data("items");
        var arrows = $(this).data("arrows");
        var rtl = $(this).data("rtl");

        var prev = $(this).parent().find('.arrow_prev_top');
        var next = $(this).parent().find('.arrow_next_top');

        var tablet_break = $(this).data("tabletbp");
        var tablet_slides = $(this).data("tabletsd");
        var mobile_break = $(this).data("mobilebp");
        var mobile_slides = $(this).data("mobilesd");

        if(tablet_break == ''){
          tablet_break = 1024;
      }
      if(tablet_slides == ''){
          tablet_slides = 2;
      }
      if(mobile_break == ''){
          mobile_break = 767;
      }
      if(mobile_slides == ''){
          mobile_slides = 1;
      }

      if(arrows == null){
          arrows = 'true';
      }

      if (speed == "") {
          speed = 5000;
      }

      if (items == "") {
          items = 3;
      }

      if (rtl == "") {
        rtl = false;
    }

    $(this).slick({
      slidesToShow: items,
      autoplaySpeed: speed,
      autoplay: true,
      dots: false,
      arrows: false,
      infinite: true,
      rtl: rtl,
      responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: items
      }
  },
  {
    breakpoint: tablet_break,
    settings: {
      slidesToShow: tablet_slides
  }
},
{
    breakpoint: mobile_break,
    settings: {
      slidesToShow: mobile_slides
  }
}
]
  });


    if (arrows == true) {

      $(prev).click(function () {

         var carousel = $(this).parent().parent().find('.stronghold-team-members-carousel');

         $(carousel).slick("slickPrev");
     });

      $(next).click(function () {

        var carousel = $(this).parent().parent().find('.stronghold-team-members-carousel');

        $(carousel).slick("slickNext");
    });
  }


});

    /*--------------------------------------------------------------
     Testimonials Carousel
     --------------------------------------------------------------*/

    var array = jQuery.makeArray(
        $("body").find(
          ".stronghold-testimonials"
          )
        );
    $(array).each(function() {
        var speed = $(this).data("speed");
        var items = $(this).data("items");
        var bullets = $(this).data("bullets");
        var rtl = $(this).data("rtl");

        var prev = $(this).parent().find('.arrow_prev_top');
        var next = $(this).parent().find('.arrow_next_top');

        var tablet_break = $(this).data("tabletbp");
        var tablet_slides = $(this).data("tabletsd");
        var mobile_break = $(this).data("mobilebp");
        var mobile_slides = $(this).data("mobilesd");

        if(tablet_break == ''){
          tablet_break = 1024;
      }
      if(tablet_slides == ''){
          tablet_slides = 2;
      }
      if(mobile_break == ''){
          mobile_break = 767;
      }
      if(mobile_slides == ''){
          mobile_slides = 1;
      }

      if (speed == "") {
          speed = 5000;
      }

      if (items == "") {
          items = 3;
      }

      if (rtl == "") {
        rtl = false;
    }

    $(this).slick({
      slidesToShow: items,
      autoplaySpeed: speed,
      autoplay: true,
      dots: bullets,
      arrows: false,
      infinite: true,
      rtl: rtl,
      responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: items
      }
  },
  {
    breakpoint: tablet_break,
    settings: {
      slidesToShow: tablet_slides
  }
},
{
    breakpoint: mobile_break,
    settings: {
      slidesToShow: mobile_slides
  }
}
]
  });


});


    


    /*--------------------------------------------------------------
     Partners Carousel
     --------------------------------------------------------------*/

    var array = jQuery.makeArray(
        $("body").find(
          ".partners-carousel"
          )
        );
    $(array).each(function() {
        var speed = $(this).data("speed");
        var items = $(this).data("items");
        var arrows = $(this).data("arrows");
        var rtl = $(this).data("rtl");


        var prev = $(this).parent().find('.arrow_prev_top');
        var next = $(this).parent().find('.arrow_next_top');

        var tablet_break = $(this).data("tabletbp");
        var tablet_slides = $(this).data("tabletsd");
        var mobile_break = $(this).data("mobilebp");
        var mobile_slides = $(this).data("mobilesd");

        if (rtl == "") {
          rtl = false;
      }

      if(tablet_break == ''){
          tablet_break = 1024;
      }
      if(tablet_slides == ''){
          tablet_slides = 2;
      }
      if(mobile_break == ''){
          mobile_break = 767;
      }
      if(mobile_slides == ''){
          mobile_slides = 1;
      }

      if(arrows == null){
          arrows = 'true';
      }

      if (speed == "") {
          speed = 5000;
      }

      if (items == "") {
          items = 3;
      }

      $(this).slick({
          slidesToShow: items,
          autoplaySpeed: speed,
          autoplay: true,
          dots: false,
          arrows: false,
          infinite: true,
          rtl: rtl,
          responsive: [
          {
            breakpoint: 1025,
            settings: {
              slidesToShow: items
          }
      },
      {
        breakpoint: tablet_break,
        settings: {
          slidesToShow: tablet_slides
      }
  },
  {
    breakpoint: mobile_break,
    settings: {
      slidesToShow: mobile_slides
  }
}
]
      });


      if (arrows == true) {

          $(prev).click(function () {

             var carousel = $(this).parent().parent().find('.partners-carousel');

             $(carousel).slick("slickPrev");
         });

          $(next).click(function () {

            var carousel = $(this).parent().parent().find('.partners-carousel');

            $(carousel).slick("slickNext");
        });
      }


  });


    /*--------------------------------------------------------------
     Product Carousel
     --------------------------------------------------------------*/

    var array = jQuery.makeArray(
        $("body").find(
          ".stronghold-products-carousel"
          )
        );
    $(array).each(function() {
        var speed = $(this).data("speed");
        var items = $(this).data("items");
        var arrows = $(this).data("arrows");

        var prev = $(this).parent().find('.arrow_prev_top');
        var next = $(this).parent().find('.arrow_next_top');
        var rtl = $(this).data("rtl");

        var tablet_break = $(this).data("tabletbp");
        var tablet_slides = $(this).data("tabletsd");
        var mobile_break = $(this).data("mobilebp");
        var mobile_slides = $(this).data("mobilesd");

        if(tablet_break == ''){
          tablet_break = 1024;
      }
      if(tablet_slides == ''){
          tablet_slides = 2;
      }
      if(mobile_break == ''){
          mobile_break = 767;
      }
      if(mobile_slides == ''){
          mobile_slides = 1;
      }

      if(arrows == null){
          arrows = 'true';
      }

      if (speed == "") {
          speed = 5000;
      }

      if (items == "") {
          items = 3;
      }

      if (rtl == "") {
          rtl = false;
      }

      $(this).slick({
          slidesToShow: items,
          autoplaySpeed: speed,
          autoplay: true,
          dots: false,
          arrows: false,
          infinite: true,
          rtl: rtl,
          responsive: [
          {
            breakpoint: 1025,
            settings: {
              slidesToShow: items
          }
      },
      {
        breakpoint: tablet_break,
        settings: {
          slidesToShow: tablet_slides
      }
  },
  {
    breakpoint: mobile_break,
    settings: {
      slidesToShow: mobile_slides
  }
}
]
      });


      if (arrows == true) {

          $(prev).click(function () {

             var carousel = $(this).parent().parent().find('.stronghold-products-carousel');

             $(carousel).slick("slickPrev");
         });

          $(next).click(function () {

            var carousel = $(this).parent().parent().find('.stronghold-products-carousel');

            $(carousel).slick("slickNext");
        });
      }


  });

/*--------------------------------------------------------------
 Project Carousel
--------------------------------------------------------------*/
    var array = jQuery.makeArray(
        $("body").find(
          ".stronghold-projects-carousel"
          )
        );
    $(array).each(function() {
        var speed = $(this).data("speed");
        var items = $(this).data("items");
        var arrows = $(this).data("arrows");

        var prev = $(this).parent().find('.arrow_prev_top');
        var next = $(this).parent().find('.arrow_next_top');
        var rtl = $(this).data("rtl");

        var tablet_break = $(this).data("tabletbp");
        var tablet_slides = $(this).data("tabletsd");
        var mobile_break = $(this).data("mobilebp");
        var mobile_slides = $(this).data("mobilesd");

        if(tablet_break == ''){
          tablet_break = 1024;
      }
      if(tablet_slides == ''){
          tablet_slides = 2;
      }
      if(mobile_break == ''){
          mobile_break = 767;
      }
      if(mobile_slides == ''){
          mobile_slides = 1;
      }

      if(arrows == null){
          arrows = 'true';
      }

      if (speed == "") {
          speed = 5000;
      }

      if (items == "") {
          items = 3;
      }

      if (rtl == "") {
        rtl = false;
    }

    $(this).slick({
      slidesToShow: items,
      autoplaySpeed: speed,
      autoplay: true,
      dots: false,
      arrows: false,
      infinite: true,
      rtl: rtl,
      responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: items
      }
  },
  {
    breakpoint: tablet_break,
    settings: {
      slidesToShow: tablet_slides
  }
},
{
    breakpoint: mobile_break,
    settings: {
      slidesToShow: mobile_slides
  }
}
]
  });


    if (arrows == true) {

      $(prev).click(function () {

         var carousel = $(this).parent().parent().find('.stronghold-projects-carousel');

         $(carousel).slick("slickPrev");
     });

      $(next).click(function () {

        var carousel = $(this).parent().parent().find('.stronghold-projects-carousel');

        $(carousel).slick("slickNext");
    });
  }


});


    /*--------------------------------------------------------------
     Carousel Arrows
     --------------------------------------------------------------*/
    $(".arrow_prev_top, .arrow_next_top").on("mouseenter", function() {

        var color = $(this).data('arrow-hcolor');
        var bgColor = $(this).data('arrow-hbgcolor');


        if (color != "") {
            $(this).css({
                'color': color,

            });
        }

        if (bgColor != "") {
            $(this).css({
                'background': bgColor,

            });
        }


    });
    $(".arrow_prev_top, .arrow_next_top").on("mouseleave", function() {

        var color = $(this).data('arrow-color');
        var bgColor = $(this).data('arrow-bgcolor');


        if (color != "") {
            $(this).css({
                'color': color,

            });
        }

        if (bgColor != "") {
            $(this).css({
                'background': bgColor,

            });
        }
    });


    /*--------------------------------------------------------------
     Hover
     --------------------------------------------------------------*/
    $('.team-member-block-img, .service-block-img, .project-grid-img, .portfolio-grid-img, .masonry-img, .feature-box-img, .blog-index-featured').hoverdir();


    /*--------------------------------------------------------------
     Filters
     --------------------------------------------------------------*/
    var $container = $('.isotope-cat-container');
    $container.imagesLoaded(function () {

        $container.fadeIn(1500).isotope({
            filter: '*',
            itemSelector: '.iso-cat-item',
            layoutMode: 'fitRows',
            transitionDuration: '0.85s',
            percentPosition: true,
            fitRows: {
                gutter: 20
            }

        });

    });


    $('.isotope-filter a').on("click", function() {
        $('.isotope-filter .current').removeClass('current');
        $(this).addClass('current');

        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
        });
        return false;

    });



    /*--------------------------------------------------------------
     Portfolio
     --------------------------------------------------------------*/
    var prev = '<div class="slider-arrow fa fa-chevron-left slider-prev"></div>';
    var next = '<div class="slider-arrow fa fa-chevron-right slider-next"></div>';


    var array = jQuery.makeArray(
        $("body").find(".portfolio-slider")
        );
    $(array).each(function() {
        var bullets = $(this).data("bullets");

        $(".portfolio-slider").slick({
          slidesToShow: 1,
          autoplaySpeed: 5000,
          autoplay: true,
          dots: false,
          arrows: true,
          infinite: true,
          prevArrow: prev,
          nextArrow: next,
          responsive: [
          {
              breakpoint: 800,
              settings: {
                slidesToShow: 1
            }
        }
        ]
      });
    });

    var array = jQuery.makeArray(
        $("body").find(".portfolio-carousel-two")
        );
    $(array).each(function() {
        var bullets = $(this).data("bullets");

        $(".portfolio-carousel-two").slick({
          slidesToShow: 2,
          autoplaySpeed: 5000,
          autoplay: true,
          dots: false,
          arrows: true,
          infinite: true,
          prevArrow: prev,
          nextArrow: next,
          responsive: [
          {
              breakpoint: 800,
              settings: {
                slidesToShow: 2
            }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1
        }
    }
    ]
      });
    });

    var array = jQuery.makeArray(
        $("body").find(".portfolio-carousel-three")
        );
    $(array).each(function() {
        var bullets = $(this).data("bullets");

        $(".portfolio-carousel-three").slick({
          slidesToShow: 3,
          autoplaySpeed: 5000,
          autoplay: true,
          dots: bullets,
          arrows: true,
          infinite: true,
          prevArrow: prev,
          nextArrow: next,
          responsive: [
          {
              breakpoint: 800,
              settings: {
                slidesToShow: 2
            }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1
        }
    }
    ]
      });
    });

    var array = jQuery.makeArray(
        $("body").find(".portfolio-carousel-four")
        );
    $(array).each(function() {
        var bullets = $(this).data("bullets");

        $(".portfolio-carousel-four").slick({
          slidesToShow: 4,
          autoplaySpeed: 5000,
          autoplay: true,
          dots: bullets,
          arrows: true,
          infinite: true,
          prevArrow: prev,
          nextArrow: next,
          responsive: [
          {
              breakpoint: 800,
              settings: {
                slidesToShow: 2
            }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1
        }
    }
    ]
      });
    });


    var $containerjust = $('.gallery-justified');

    $containerjust.imagesLoaded(function () {
        $(".gallery-justified").justifiedGallery({
            rowHeight: 200,
            margins: 4,
            lastRow: 'justify',
            randomize: false
        });
    });

    var project_Array = jQuery.makeArray($(".container").find(".stronghold-project-grid-ms"));
    $(project_Array).each(function () {

        var gutter_Size = $(this).data("gutter-size");

        if (gutter_Size == "") {
            gutter_Size = 10;
        }

        $('.stronghold-project-grid-ms').imagesLoaded(function () {
            $('.stronghold-project-grid-ms').packery({
                // options
                itemSelector: '.project-grid-ms-item',
                gutter: gutter_Size,
                percentPosition: true,
                transitionDuration: '0.65s'
            });
        });

    });

    var project_Array = jQuery.makeArray($(".container").find(".stronghold-portfolio-grid-ms"));
    $(project_Array).each(function () {

        var gutter_Size = $(this).data("gutter-size");

        if (gutter_Size == "") {
            gutter_Size = 10;
        }

        $('.stronghold-portfolio-grid-ms').imagesLoaded(function () {
            $('.stronghold-portfolio-grid-ms').packery({
                // options
                itemSelector: '.portfolio-grid-ms-item',
                gutter: gutter_Size,
                percentPosition: true,
                transitionDuration: '0.65s'
            });
        });

    });


    var masonry_Gallery_Array = jQuery.makeArray($(".container").find(".stronghold-masonry-gallery-widget"));
    $(masonry_Gallery_Array).each(function () {

        var gutter_Size = $(this).data("gutter-size");

        if (gutter_Size == "") {
            gutter_Size = 10;
        }

        $('.stronghold-masonry-gallery').imagesLoaded(function () {
            $('.stronghold-masonry-gallery').packery({
                // options
                itemSelector: '.masonry-gallery-item',
                gutter: gutter_Size,
                percentPosition: true,
                transitionDuration: '0.65s'
            });
        });

    });

    $('.vacancy-table').DataTable({
        "paging": false,
        "searching": false,
        "info": false
    });



    /*--------------------------------------------------------------
     Charts
     --------------------------------------------------------------*/
    var array = jQuery.makeArray($(".container").find(".financier-chart-widget"));

    $(array).each(function () {

        var ctx = $(this).find('.financier-chart');
        var chartType = $(this).data('chart-type');
        var legendPos = $(this).data('legend-position');

        if (chartType == "bar" || chartType == "line") {
            var xCount = $(this).data('x-count');
            var yCountOne = $(this).data('y-count-one');
            var yCountTwo = $(this).data('y-count-two');
            var datasetCount = $(this).data('dataset-count');
            ;

            var xlabelsArray = [];

            var ydataLabelOne = $(this).data('ydatalabel-one');
            var ydataLabelTwo = $(this).data('ydatalabel-two');
            var ydataColorOne = $(this).data('ydatacolor-one');
            var ydataColorTwo = $(this).data('ydatacolor-two');
            var yvaluesArrayOne = [];
            var yvaluesArrayTwo = [];

            for (var i = 0; i < xCount; i++) {
                var xlabel = $(this).data('xlabel' + i);
                xlabelsArray.push(xlabel);
            }

            if (datasetCount == "one") {
                for (var i = 0; i < yCountOne; i++) {
                    var yvalue = $(this).data('ydataset-one' + i);
                    yvaluesArrayOne.push(yvalue);
                }

                var myChart = new Chart(ctx, {
                    type: chartType,
                    data: {
                        labels: xlabelsArray,
                        datasets: [{
                            label: ydataLabelOne,
                            data: yvaluesArrayOne,
                            backgroundColor: ydataColorOne,
                            borderWidth: 1
                        },
                        ]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                        legend: {
                            position: legendPos,
                        }
                    }
                });


            } else if (datasetCount == "two") {
                for (var i = 0; i < yCountOne; i++) {
                    var yvalue = $(this).data('ydataset-one' + i);
                    yvaluesArrayOne.push(yvalue);
                }

                for (var i = 0; i < yCountTwo; i++) {
                    var yvalue = $(this).data('ydataset-two' + i);
                    yvaluesArrayTwo.push(yvalue);
                }

                var myChart = new Chart(ctx, {
                    type: chartType,
                    data: {
                        labels: xlabelsArray,
                        datasets: [{
                            label: ydataLabelOne,
                            data: yvaluesArrayOne,
                            backgroundColor: ydataColorOne,
                            borderWidth: 1
                        },
                        {
                            label: ydataLabelTwo,
                            data: yvaluesArrayTwo,
                            backgroundColor: ydataColorTwo,
                            borderWidth: 1
                        },
                        ]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                        legend: {
                            position: legendPos,
                        }
                    }
                });

            }
        } else if (chartType == "pie" || chartType == "doughnut") {

            var dataLabel = [];
            var dataColor = [];
            var dataValue = [];

            var dataCount = $(this).data('datacount');


            for (var i = 0; i < dataCount; i++) {
                var dlabel = $(this).data('datalabel' + i);
                dataLabel.push(dlabel);
            }

            for (var i = 0; i < dataCount; i++) {
                var dcolor = $(this).data('datacolor' + i);
                dataColor.push(dcolor);
            }

            for (var i = 0; i < dataCount; i++) {
                var dvalue = $(this).data('datavalue' + i);
                dataValue.push(dvalue);
            }


            var myChart = new Chart(ctx, {
                type: chartType,
                data: {
                    labels: dataLabel,
                    datasets: [{
                        backgroundColor: dataColor,
                        data: dataValue
                    }]
                },
                options: {
                    legend: {
                        position: legendPos,
                    }
                }
            });

        }

    });


    /*--------------------------------------------------------------
     Custom Menu
     --------------------------------------------------------------*/
var curLoc = window.location.href;

$('.stronghold-custom-menu li a').each(function () {
    if (this.href == curLoc)
        $(this).addClass('link-active');
});

    /*--------------------------------------------------------------
     Social Icons
     --------------------------------------------------------------*/
$(".financier-social-icons-widget .social-widget-item").on("mouseenter", function() {

    var iHcolor = $(this).data('ihcolor');
    var iBgHcolor = $(this).data('ibghcolor');
    var socialLink = $(this).find('a');


    $(socialLink).css({
        'background': iBgHcolor,
        'color': iHcolor
    });

});
$(".financier-social-icons-widget .social-widget-item").on("mouseleave", function() {

    var icolor = $(this).data('icolor');
    var iBgcolor = $(this).data('ibgcolor');
    var socialLink = $(this).find('a');

    $(socialLink).css({
        'background': iBgcolor,
        'color': icolor
    });

});


    /*--------------------------------------------------------------
     Parallax
     --------------------------------------------------------------*/
var s = skrollr.init({
    mobileCheck: function () {
        return false;
    }
});

s.refresh($('.page-title-wrapper-bg'));

if ($(window).width() > 800) {
    $('.row-scroll-parallax').parallax({
        speed: 0.5
    });
}


    /*--------------------------------------------------------------
     Info Icon
     --------------------------------------------------------------*/
$(".stronghold-info-icon-wrapper").on("mouseenter", function() {

    var iconHoverColor = $(this).data('icon-hover-color');
    var iconHoverBgColor = $(this).data('icon-hover-bgcolor');

    var iconboxIcon = $(this).find('.stronghold-info-icon i');

    iconboxIcon.css({
        'color': iconHoverColor,
        'background': iconHoverBgColor
    });


});
$(".stronghold-info-icon-wrapper").on("mouseleave", function() {

    var iconColor = $(this).data('icon-color');
    var iconBgColor = $(this).data('icon-bgcolor');

    var iconboxIcon = $(this).find('.stronghold-info-icon i');

    iconboxIcon.css({
        'color': iconColor,
        'background': iconBgColor
    });


});


    /*--------------------------------------------------------------
     Google Maps
     --------------------------------------------------------------*/
var array = jQuery.makeArray($(".container").find(".googleMap"));

$(array).each(function () {


    if ($(this).hasClass("rendered")) {
        return;
    }

    var mapId = $(this).data("mapid");

    var mapZoom = $("#" + mapId).data("mapzoom");
    var mapStyle = $("#" + mapId).data("mapstyle");

    var lat1 = $("#" + mapId).data("lat1");
    var long1 = $("#" + mapId).data("long1");
    var marker1 = $("#" + mapId).data("marker1");
    var uisettings = $("#" + mapId).data("mapui");
    var myCenter = new google.maps.LatLng(lat1, long1);

    var mapProp = {
        center: myCenter,
        zoom: mapZoom,
        scrollwheel: false,
        disableDefaultUI: uisettings,

        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: mapStyle
    };

    var map = new google.maps.Map(document.getElementById(mapId), mapProp);

    var marker = new google.maps.Marker({
        position: myCenter,
        icon: marker1
    });
    marker.setMap(map);

    var markerCount = $("#" + mapId).data("markercount");

    if (markerCount == 2) {

        var lat2 = $("#" + mapId).data("lat2");
        var long2 = $("#" + mapId).data("long2");
        var marker2 = $("#" + mapId).data("marker2");
        var myCenter2 = new google.maps.LatLng(lat2, long2);

        var marker2 = new google.maps.Marker({
            position: myCenter2,
            icon: marker2
        });

        marker2.setMap(map);
    }

    if (markerCount == 3) {
        var lat2 = $("#" + mapId).data("lat2");
        var long2 = $("#" + mapId).data("long2");
        var marker2 = $("#" + mapId).data("marker2");
        var myCenter2 = new google.maps.LatLng(lat2, long2);

        var marker2 = new google.maps.Marker({
            position: myCenter2,
            icon: marker2
        });

        marker2.setMap(map);

        var lat3 = $("#" + mapId).data("lat3");
        var long3 = $("#" + mapId).data("long3");
        var marker3 = $("#" + mapId).data("marker3");
        var myCenter3 = new google.maps.LatLng(lat3, long3);

        var marker3 = new google.maps.Marker({
            position: myCenter3,
            icon: marker3
        });

        marker3.setMap(map);
    }

    $(this).removeClass("not-rendered");
    $(this).addClass("rendered");

});


    /*--------------------------------------------------------------
      Masonry Gallery
      --------------------------------------------------------------*/

var masonry_Gallery_Array = jQuery.makeArray(
    $("body").find(".stronghold-masonry-gallery")
    );
$(masonry_Gallery_Array).each(function() {
    var gutter_Size = $(this).data("gutter-size");
    var row_Height = $(this).data("row-height");

    if (gutter_Size == "") {
      gutter_Size = 4;
  }

  if (row_Height == "") {
      row_Height = 200;
  }

  $(".stronghold-masonry-gallery").justifiedGallery({
      rowHeight: row_Height,
     // lastRow: "nojustify",
      margins: gutter_Size,
      //rowHeight: 200,
     // margins: 4,
      lastRow: 'justify',
      randomize: false,
      caption: true
  });

});



      /*--------------------------------------------------------------
      Gallery
      --------------------------------------------------------------*/
var array = jQuery.makeArray(
    $("body").find(".stronghold-slider-gallery")
    );
$(array).each(function() {
    var bullets = $(this).data("bullets");
    var rtl = $(this).data("rtl");

    if (rtl == "") {
        rtl = false;
    }

    $(".stronghold-slider-gallery").slick({
      slidesToShow: 1,
      autoplaySpeed: 5000,
      autoplay: true,
      dots: bullets,
      arrows: false,
      infinite: true,
      rtl: rtl,
      responsive: [
      {
          breakpoint: 800,
          settings: {
            slidesToShow: 1
        }
    }
    ]
  });
});

var array = jQuery.makeArray(
    $("body").find(".stronghold-two-col-gallery")
    );
$(array).each(function() {
    var bullets = $(this).data("bullets");
    var rtl = $(this).data("rtl");

    if (rtl == "") {
        rtl = false;
    }

    $(".stronghold-two-col-gallery").slick({
      slidesToShow: 2,
      autoplaySpeed: 5000,
      autoplay: true,
      dots: bullets,
      arrows: false,
      infinite: true,
      rtl: rtl,
      responsive: [
      {
          breakpoint: 800,
          settings: {
            slidesToShow: 2
        }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1
    }
}
]
  });
});

var array = jQuery.makeArray(
    $("body").find(".stronghold-three-col-gallery")
    );
$(array).each(function() {
    var bullets = $(this).data("bullets");
    var rtl = $(this).data("rtl");

    if (rtl == "") {
        rtl = false;
    }

    $(".stronghold-three-col-gallery").slick({
      slidesToShow: 3,
      autoplaySpeed: 5000,
      autoplay: true,
      dots: bullets,
      arrows: false,
      infinite: true,
      rtl: rtl,
      responsive: [
      {
          breakpoint: 800,
          settings: {
            slidesToShow: 2
        }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1
    }
}
]
  });
});

var array = jQuery.makeArray(
    $("body").find(".stronghold-four-col-gallery")
    );
$(array).each(function() {
    var bullets = $(this).data("bullets");
    var rtl = $(this).data("rtl");

    if (rtl == "") {
        rtl = false;
    }

    $(".stronghold-four-col-gallery").slick({
      slidesToShow: 4,
      autoplaySpeed: 5000,
      autoplay: true,
      dots: bullets,
      arrows: false,
      infinite: true,
      rtl: rtl,
      responsive: [
      {
          breakpoint: 800,
          settings: {
            slidesToShow: 2
        }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1
    }
}
]
  });
});




});


