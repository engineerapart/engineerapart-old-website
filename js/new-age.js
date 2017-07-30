(function ($) {
  "use strict"; // Start of use strict

  // jQuery for page scrolling feature - requires jQuery Easing plugin
  $('a.page-scroll').bind('click', function (event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top - 50)
    }, 1250, 'easeInOutExpo');
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
  $('#mainNav').affix({
    offset: {
      top: 50
    }
  });

  // Button handler
  $('#btn-subscribe').click(function () {
    var body = {
      name: $('#mce-NAME').val(),
      email: $('#mce-EMAIL').val()
    };

    // Prevent double clicking
    var subscribeBtn = $(this);
    subscribeBtn.attr('disabled', true);

    $.ajax({
      type: 'POST',
      url: '/subscribe',
      data: JSON.stringify(body),
      complete: function(data) {
        subscribeBtn.removeAttr('disabled');
        var msg = (data.status === 200 || data.status === 500) ? data.responseText :
          'Oops, something went wrong; please try again later!';
        $.notify(msg);
      },
      contentType: 'application/json',
      dataType: 'json'
    });
  });
})(jQuery); // End of use strict
