$(function() {

    $(document).scroll(function(e) {

        var scrollTop = $(document).scrollTop();

        if (scrollTop > 693) {
            $('.navbar').removeClass('navbar-static-top').addClass('navbar-fixed-top');
        } else {
            $('.navbar').removeClass('navbar-fixed-top').addClass('navbar-static-top');
        }
    });

    $('body').scrollspy({
        target: '#navbar-example'
    });

    var $draw = $('.img-drawings');
    var $render = $('.img-renders');
    var $animation = $('.img-animations');
    var $btnAnimations = $('.app-btn-animations');
    var $btnRender = $('.app-btn-renders');
    var $btnDraw = $('.app-btn-drawings');

    var $video = $('.video');

    $btnRender.on('click', function() {

        $(this).addClass('active-btn-portfolio');
        $btnDraw.removeClass('active-btn-portfolio');
        $btnAnimations.removeClass('active-btn-portfolio');

        $draw.addClass('hide');
        $animation.addClass('hide');
        $render.removeClass('hide');

    });

    $btnDraw.on('click', function() {

        $(this).addClass('active-btn-portfolio');
        $btnRender.removeClass('active-btn-portfolio');
        $btnAnimations.removeClass('active-btn-portfolio');

        $render.addClass('hide');
        $animation.addClass('hide');
        $draw.removeClass('hide');

    });

    $btnAnimations.on('click', function() {

        $(this).addClass('active-btn-portfolio');
        $btnDraw.removeClass('active-btn-portfolio');
        $btnRender.removeClass('active-btn-portfolio');

        $render.addClass('hide');
        $draw.addClass('hide');
        $animation.removeClass('hide')

    });

    $('.app-btn-contact').on('click', function() {

        $.ajax({
            url: "/app/data/contact.json",
            dataType: "JSON",
            method: "GET",
            success: function(response) {
                $('.app-email').text(response.email);
                $('.app-phone').text(response.phone);
            }
        });

    });

    $('#myTabs a').click(function(e) {
        e.preventDefault();
        $(this).tab('show');
    });

    $('.pie_progress').asPieProgress({
        namespace: 'pie_progress'
    });
    // Example with grater loading time - loads longer
    $('.pie_progress--slow').asPieProgress({
        namespace: 'pie_progress',
        goal: 1000,
        min: 0,
        max: 1000,
        speed: 200,
        easing: 'linear'
    });
    // Example with grater loading time - loads longer
    $('.pie_progress--countdown').asPieProgress({
        namespace: 'pie_progress',
        easing: 'linear',
        first: 120,
        max: 120,
        goal: 0,
        speed: 1200, // 120 s * 1000 ms per s / 100
        numberCallback: function(n) {
            var minutes = Math.floor(this.now / 60);
            var seconds = this.now % 60;
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            return minutes + ': ' + seconds;
        }
    });

    var $animation_elements = $('.skill');
    var $window = $(window);

    function check_if_in_view() {
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);

        $.each($animation_elements, function() {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);

            //check to see if this current container is within viewport
            if ((element_bottom_position >= window_top_position) &&
                (element_top_position <= window_bottom_position)) {

                setTimeout(function() {
                    $('.pie_progress').asPieProgress('start');
                }, 1000);

            } else {
                $('.pie_progress').asPieProgress('stop');
            }
        });
    }

    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');

    $('.icon').on('click', function() {
        $(this).parent('.overlay').addClass('hide');
        $(this).parent('.overlay').parent('.wrapper').find('.overlay-title').addClass('hide');
        var $autoplay = $(this).parent('.overlay').prev().find('video');
        $autoplay.attr('controls', 'controls');
        $autoplay.get(0).play();
    });
});