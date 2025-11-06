(function($){
	"use strict";

    //MEAN MENU
    $('.mean-menu').meanmenu({
        meanScreenWidth: "991"
    });

    //Navbar Sticky
    $(window).on('scroll',function() {
        if ($(this).scrollTop()>120){  
            $('.navbar-area').addClass("is-sticky");
        }
        else{
            $('.navbar-area').removeClass("is-sticky");
        }
    });

    //SEARCH JS
    $('.search-option button').on('click',function(){
        $('.search-input').toggle(200)
    })

    //HOME SLIDER JS
    $('.home-slider-area').owlCarousel({
        loop:true,
        margin:0,
        nav:true,
        navText:[
            "<i class='icofont-rounded-double-left'></i>",
            "<i class='icofont-rounded-double-right'></i>"
        ],
        items:1,
        smartSpeed:2000,
        dots:true,
        autoHeight:true
    })

    //BLOG SLIDER JS
    $('.blog-slider').owlCarousel({
        loop:true,
        margin:30,
        nav:false,
        smartSpeed:2000,
        dots:true,
        items:1,
        autoplayHoverPause:true,
        stagePadding:10,
        responsive:{
            0:{
                items:1
            },
            768:{
                items:2
            },
            1000:{
                items:3
            }
        }
    })

    //TESTIMONIAL
    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        draggable: false,
        fade: true,
        autoplay: true,
        autoplaySpeed:1500,
        asNavFor: '.slider-nav'
    });
    
    $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots:false,
        arrows: true,
        centerMode: true,
        autoplay: true,
        focusOnSelect: true,
        centerPadding: '10px',
        responsive: [
            {
              breakpoint: 450,
              settings: {
                dots: false,
                slidesToShow: 3,  
                centerPadding: '0px',
                }
            },
            {
              breakpoint: 420,
              settings: {
                autoplay: true,
                dots: false,
                slidesToShow: 1,
                centerMode: false,
                }
            }
        ]
    });

    //HOME SLIDER JS
    $('.recent-work-slider').owlCarousel({
        loop:true,
        margin:20,
        nav:false,
        smartSpeed:2000,
        autoplayHoverPause:true,
        dots:true,
        responsive:{
            0:{
                items:1
            },
            500:{
                items:2
            },
            992:{
                items:3
            },
            1199:{
                items:5
            }
        }
    })
    document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent default submission for custom handling

    // Show alert message
    alert("Thank you! Your message has been sent successfully.");

    // Optionally, you can still reset the form
    this.reset();

    // Redirect to thankyou.html after a short delay
    setTimeout(() => {
        window.location.href = "thankyou.html";
    }, 200); // 200ms delay
});

    //SERVICE SLIDER
    $('.service-slider').owlCarousel({
        loop:true,
        margin:20,
        nav:true,
        navText:[
            "<i class='icofont-rounded-double-left'></i>",
            "<i class='icofont-rounded-double-right'></i>"
        ],
        smartSpeed:3000,
        dots:false,
        autoplay:true,
        autoplayHoverPause:true,
        autoplayTimeout:2000,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:3
            }
        }
    })

    //service-slider-wrapper
    $('.service-slider-wrapper').owlCarousel({
        loop:true,
        margin:30,
        nav:true,
        navText:[
            "<i class='icofont-rounded-double-left'></i>",
            "<i class='icofont-rounded-double-right'></i>"
        ],
        items:1,
        smartSpeed:2000,
        dots:false,
    })

    //PROJECT POPUP 
    $('.popup-gallery').magnificPopup({
        type: 'image',
    });

    //PROJECT SLIDER
   $('.recent-project-slider').owlCarousel({
    loop: true,
    margin: 20,
    nav: true,
    navText: [
        "<i class='icofont-rounded-double-left'></i>",
        "<i class='icofont-rounded-double-right'></i>"
    ],
    smartSpeed: 1000,
    dots: false,
    autoplay: true,          // <-- enable autoplay
    autoplayTimeout: 3000,   // <-- optional, time between slides in ms
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1
        },
        500: {
            items: 2
        },
        768: {
            items: 3
        },
        1024: {
            items: 4
        },
        1200: {
            items: 5
        }
    }
});


    //Back To Top
    $(window).on('load',function(){
        $('.top-btn').fadeOut();
    });
    
    $(window).scroll(function () {
        if ($(this).scrollTop() != 0) {
                $('.top-btn').fadeIn();
            }
        else {
            $('.top-btn').fadeOut();
        }
    });

    $('.top-btn').on('click',function(){
        $("html, body").animate({ scrollTop: 0 }, 1000);
        return false;
    });

    //PRE LOADER
    $(window).on('load',function(){
        $(".loader-content").fadeOut(1000);
    }) 

    // Subscribe form
    $(".newsletter-form").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
        // handle the invalid form...
            formErrorSub();
            submitMSGSub(false, "Please enter your email correctly.");
        } 
        else {
            // everything looks good!
            event.preventDefault();
        }
    });
    function callbackFunction (resp) {
        if (resp.result === "success") {
            formSuccessSub();
        }
        else {
            formErrorSub();
        }
    }
    function formSuccessSub(){
        $(".newsletter-form")[0].reset();
        submitMSGSub(true, "Thank you for subscribing!");
        setTimeout(function() {
            $("#validator-newsletter").addClass('hide');
        }, 4000)
    }
    function formErrorSub(){
        $(".newsletter-form").addClass("animated shake");
        setTimeout(function() {
            $(".newsletter-form").removeClass("animated shake");
        }, 1000)
    }
    function submitMSGSub(valid, msg){
        if(valid){
            var msgClasses = "validation-success";
        } 
        else {
            var msgClasses = "validation-danger";
        }
        $("#validator-newsletter").removeClass().addClass(msgClasses).text(msg);
    }
    
    // AJAX MailChimp
    $(".newsletter-form").ajaxChimp({
        url: "https://HiBootstrap.us20.list-manage.com/subscribe/post?u=60e1ffe2e8a68ce1204cd39a5&amp;id=42d6d188d9", // Your url MailChimp
        callback: callbackFunction
    });

    // Buy Now Btn
    $('body').append("<a href='https://themeforest.net/checkout/from_item/26055429?license=regular&support=bundle_6month&_ga=2.151831097.1464546313.1649253347-1356931366.1645330919&_gac=1.154672714.1649351773.Cj0KCQjwl7qSBhD-ARIsACvV1X34Yvc4XKSYFq60iQ6auDlKjNhJLJW5j_1joCsZJCKQ-4m75Uw8RNcaArtlEALw_wcB' target='_blank' class='buy-now-btn'><img src='assets/img/envato.png' alt='envato'/>Buy Now</a>");

    // Switch Btn
	$('body').append("<div class='switch-box'><label id='switch' class='switch'><input type='checkbox' onchange='toggleTheme()' id='slider'><span class='slider round'></span></label></div>");

}(jQuery));

// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('viscous_theme', themeName);
    document.documentElement.className = themeName;
}
// function to toggle between light and dark theme
function toggleTheme() {
    if (localStorage.getItem('viscous_theme') === 'theme-dark') {
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }
}
// Immediately invoked function to set the theme on initial load
(function () {
    if (localStorage.getItem('viscous_theme') === 'theme-dark') {
        setTheme('theme-dark');
        document.getElementById('slider').checked = false;
    } else {
        setTheme('theme-light');
    document.getElementById('slider').checked = true;
    }
})();