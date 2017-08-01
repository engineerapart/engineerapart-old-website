(function ($) {
  "use strict"; // Start of use strict

  // jQuery for page scrolling feature - requires jQuery Easing plugin
  $('a.page-scroll').bind('click', function (event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top - 50)
    }, 600, 'easeInOutExpo');
    event.preventDefault();
  });

  // Highlight the top nav as scrolling occurs
  $('body').scrollspy({
    target: '.navbar-fixed-top',
    offset: 100
  });

  // Closes the Responsive Menu on Menu Item Click
  $('.navbar-collapse ul li a').click(function () {
    $('.navbar-toggle:visible').click();
  });

  // Offset for Main Navigation
  $('#mainNav').affix({ offset: { top: 50 } });
  $('#mainNav').on('affix.bs.affix', function(){
    // Occurs *after* the affix has been applied. Swap out the image for the colored one.
    $('#header-logo').addClass('in');
    $('#header-logo-mono').removeClass('in');
  });
  $('#mainNav').on('affix-top.bs.affix', function(){
    // Occurs *after* the affix has been removed. Swap out the image for the monochrome one.
    $('#header-logo').removeClass('in');
    $('#header-logo-mono').addClass('in');
  });

  var handleToggle = function(target, other) {
    target.removeClass('btn-default');
    target.addClass('btn-primary');

    other.addClass('btn-default');
    other.removeClass('btn-primary');
  }

  // Form button handler
  $('#simple-form').click(function() {
    handleToggle($(this), $('#detailed-form'));
    $('.detailed').css('display', 'none');
  });
  
  $('#detailed-form').click(function () {
    handleToggle($(this), $('#simple-form'));
    $('.detailed').css('display', 'initial');

    // Prevent double clicking
    // var subscribeBtn = $(this);
    // subscribeBtn.attr('disabled', true);

    // $.ajax({
    //   type: 'POST',
    //   url: '/subscribe',
    //   data: JSON.stringify(body),
    //   complete: function(data) {
    //     subscribeBtn.removeAttr('disabled');
    //     var msg = (data.status === 200 || data.status === 500) ? data.responseText :
    //       'Oops, something went wrong; please try again later!';
    //     $.notify(msg);
    //   },
    //   contentType: 'application/json',
    //   dataType: 'json'
    // });
  });
})(jQuery); // End of use strict
