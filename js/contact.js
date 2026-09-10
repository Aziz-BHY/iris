(function ($) {
  'use strict';

  var form = $('#contact-form, .contact__form');
  var messageBox = $('.contact__msg');

  if (form.length) {
    form.on('submit', function (e) {
      e.preventDefault();

      var name = $('#name').val() || '';
      var email = $('#email').val() || '';
      var subject = $('#subject').val() || 'Demande de renseignement - IRIS';
      var phone = $('#phone').val() || '';
      var message = $('#message').val() || '';

      if (!name || !email || !message) {
        messageBox
          .removeClass('alert-success')
          .addClass('alert-warning')
          .text('Veuillez renseigner tous les champs obligatoires.')
          .fadeIn();
        return;
      }

      // Try sending via AJAX if action exists, or fallback smoothly to mailto
      var formAction = form.attr('action');

      if (formAction && formAction !== 'mail.php' && formAction.indexOf('#') === -1) {
        $.ajax({
          type: 'POST',
          url: formAction,
          data: form.serialize()
        })
          .done(function () {
            messageBox
              .removeClass('alert-warning alert-danger')
              .addClass('alert-success')
              .text('Merci ! Votre message a été envoyé avec succès.')
              .fadeIn();
            form[0].reset();
          })
          .fail(function () {
            triggerMailtoFallback(name, email, subject, phone, message);
          });
      } else {
        // Direct reliable mailto trigger for static site
        triggerMailtoFallback(name, email, subject, phone, message);
      }
    });
  }

  function triggerMailtoFallback(name, email, subject, phone, message) {
    var mailtoBody =
      'Nom: ' + name + '\n' +
      'Email: ' + email + '\n' +
      'Téléphone: ' + phone + '\n\n' +
      'Message:\n' + message;

    var mailtoUrl =
      'mailto:cpsanitaire@gmail.com?subject=' +
      encodeURIComponent(subject + ' - ' + name) +
      '&body=' +
      encodeURIComponent(mailtoBody);

    window.location.href = mailtoUrl;

    messageBox
      .removeClass('alert-warning alert-danger')
      .addClass('alert-success')
      .html('Votre client de messagerie a été ouvert avec votre message pré-rempli. <br>Vous pouvez également nous joindre directement au <strong>(+216) 71 434 399</strong>.')
      .fadeIn();

    setTimeout(function () {
      if (form.length) form[0].reset();
    }, 1500);
  }
})(jQuery);