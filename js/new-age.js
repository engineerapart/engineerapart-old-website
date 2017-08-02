(function ($) {
  'use strict'; // Start of use strict

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
  $('#mainNav').on('affix.bs.affix', function () {
    // Occurs *after* the affix has been applied. Swap out the image for the colored one.
    $('#header-logo').addClass('in');
    $('#header-logo-mono').removeClass('in');
  });
  $('#mainNav').on('affix-top.bs.affix', function () {
    // Occurs *after* the affix has been removed. Swap out the image for the monochrome one.
    $('#header-logo').removeClass('in');
    $('#header-logo-mono').addClass('in');
  });

  // Form button handler
  var isDetailedForm = false;
  emailjs.init('user_58tWRHJDNJaH4a2Av20ih');

  var handleToggle = function (target, other, showDetailed) {
    target.removeClass('btn-default');
    target.addClass('btn-primary');

    other.addClass('btn-default');
    other.removeClass('btn-primary');

    if (showDetailed) {
      $('.detailed').css('display', 'inherit');
      isDetailedForm = true;
    } else {
      $('.detailed').css('display', 'none');
      isDetailedForm = false;
    }
  }

  $('#simple-form').click(function (event) {
    event.preventDefault();
    handleToggle($(this), $('#detailed-form'), false);
    $('#project-type').prop('selectedIndex', 0);
    $('#budget').prop('selectedIndex', 0);
  });

  $('#detailed-form').click(function (event) {
    event.preventDefault();
    handleToggle($(this), $('#simple-form'), true);
    $('#project-type').prop('selectedIndex', 1);
    $('#budget').prop('selectedIndex', 1);
  });

  $('form#contact-us').submit(function (event) {
    event.preventDefault();
    var contactUsForm = $(this);

    // Prevent double-clicking
    contactUsForm.find('button.submit').prop('disabled', true);
    contactUsForm.find('button.submit').text('Submitting...');

    var service_id = 'default_service';
    var template_id = 'new_customer_request';
    
    emailjs.sendForm(service_id, template_id, 'contact-us')
      .then(function () {
        $.notify('Thank you for your message!\n We will get back to you shortly.', 'success');
        contactUsForm.find('button.submit').prop('disabled', false);
        contactUsForm.find('button.submit').text('Submit');
        contactUsForm.trigger('reset');
      }, function (err) {
        console.log(err);
        $.notify('Oops, something went wrong, this is probably our bad.\n Please email us directly at info@engineerapart.com.', 'error');
        contactUsForm.find('button.submit').prop('disabled', false);
        contactUsForm.find('button.submit').text('Submit');
      });
  });
})(jQuery); // End of use strict
