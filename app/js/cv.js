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
    var $svg = $('.img-svg');
    var $btnAnimations = $('.app-btn-animations');
    var $btnRender = $('.app-btn-renders');
    var $btnDraw = $('.app-btn-drawings');
    var $btnSVG = $('.app-btn-svg');
    var $scriptList = $('.script-list');
    var $video = $('.video');
    var $li = $('<li class="show-more">Show more...</li>');

    $scriptList.append($li);

    $scriptList.on('click', '.show-more', function() {

        var $this = $(this);

        $this.prevAll().removeClass('hide');
        $this.remove();

    });

    $btnRender.on('click', function() {

        $(this).addClass('active-btn-portfolio');
        $btnDraw.removeClass('active-btn-portfolio');
        $btnAnimations.removeClass('active-btn-portfolio');
        $btnSVG.removeClass('active-btn-portfolio');

        $draw.addClass('hide');
        $animation.addClass('hide');
        $svg.addClass('hide');
        $render.removeClass('hide');

    });

    $btnDraw.on('click', function() {

        $(this).addClass('active-btn-portfolio');
        $btnRender.removeClass('active-btn-portfolio');
        $btnAnimations.removeClass('active-btn-portfolio');
        $btnSVG.removeClass('active-btn-portfolio');

        $render.addClass('hide');
        $animation.addClass('hide');
        $svg.addClass('hide');
        $draw.removeClass('hide');

    });

    $btnAnimations.on('click', function() {

        $(this).addClass('active-btn-portfolio');
        $btnDraw.removeClass('active-btn-portfolio');
        $btnRender.removeClass('active-btn-portfolio');
        $btnSVG.removeClass('active-btn-portfolio');

        $render.addClass('hide');
        $draw.addClass('hide');
        $svg.addClass('hide');
        $animation.removeClass('hide');

    });

    $btnSVG.on('click', function() {

        $(this).addClass('active-btn-portfolio');
        $btnDraw.removeClass('active-btn-portfolio');
        $btnRender.removeClass('active-btn-portfolio');
        $btnAnimations.removeClass('active-btn-portfolio');

        $render.addClass('hide');
        $draw.addClass('hide');
        $animation.addClass('hide');
        $svg.removeClass('hide');

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

    var $animationElements = $('.skill');
    var $window = $(window);

    function checkIfInView() {
        var windowHeight = $window.height();
        var windowTopPosition = $window.scrollTop();
        var windowBottomPosition = (windowTopPosition + windowHeight);

        $.each($animationElements, function() {
            var $element = $(this);
            var elementHeight = $element.outerHeight();
            var elementTopPosition = $element.offset().top;
            var elementBottomPosition = (elementTopPosition + elementHeight);

            //check to see if this current container is within viewport
            if ((elementBottomPosition >= windowTopPosition) &&
                (elementTopPosition <= windowBottomPosition)) {

                setTimeout(function() {
                    $('.pie_progress').asPieProgress('start');
                }, 1000);

            } else {
                $('.pie_progress').asPieProgress('stop');
            }
        });
    }

    $window.on('scroll resize', checkIfInView);
    $window.trigger('scroll');

    $('.icon').on('click', function() {

        var $overlay = $(this).parent('.overlay');

        $overlay.addClass('hide');
        $overlay.parent('.wrapper').find('.overlay-title').addClass('hide');
        var $autoplay = $overlay.prev().find('video');
        $autoplay.attr('controls', 'controls');
        $autoplay.get(0).play();
    });
});