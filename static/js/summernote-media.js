var MediaButton = function(context) {
  var ui = $.summernote.ui;

  var button = ui.button({
    contents: '<i class="far fa-image"/> Media',
    tooltip: "Insert Media",
    click: function() {
      showMedia();
    },
  });

  return button.render();
}

var getMediaThumbnail = function(file) {
  var alt = '';
  if (file.alt != null ) {
    alt = file.alt;
  }

  return [
    '<div class="col col-lg-2 col-md-4 col-6 my-2">',
    '<img src="' + file.thumbnail + '" class="img-fluid img-media-modal rounded mx-auto d-block" alt="' + alt + '" loading="lazy" data-media="' + file.media + '">',
    '</div>'
  ].join('');
}

var showMedia = function() {
  $('#mediaModal').modal('show');
  $('#media-list-content').html(getSpinner());

  ajaxMedia('/ajax/media/');
}

$(function() {
  $('.btn-choose').click(function() {
    var mediaActive = $('.img-media-modal.media-active');
    if (mediaActive.length > 0) {
      var src = mediaActive.first().attr('data-media');
      var alt = mediaActive.first().attr('alt');
      insertImageSummernote('id_body', src, alt);
      $('#mediaModal').modal('hide');
      resetModal();
    }
  });

  $('#form-media').submit(function(event) {
    event.preventDefault();
    submitMediaAjax(this);
  });

  $('#mediaModal').on('hide.bs.modal', function(event) {
    document.getElementById('form-media').reset();
    $('#img-container').empty();
    var $file = document.getElementById('id_media');
    resetFileInputLabel($file);
  });
});

function ajaxMedia(url) {
  var baseUrl = url.split(/[?#]/)[0];

  $.get(url).done(function(response) {
    if (!response.success || response.files.length <= 0)
      return;

    elem = '';
    for (var i=0;i<response.files.length;i++) {
      var file = response.files[i];
      elem += getMediaThumbnail(file);
    }

    $('#media-list-content').html('<div class="row">' + elem + '</div>');

    $('#media-list-content').append(getPagination(response.pagination, baseUrl, true));
    $('.page-link.is-ajax').click(function(event) {
      event.preventDefault();
      resetModal();
      ajaxMedia($(this).attr('href'));
    });

    $('.img-media-modal').click(function() {
      var $self = $(this);
      $('.img-media-modal').each(function() {
        if (!$self.is($(this))) {
          this.classList.remove('media-active');
        }
      });
      this.classList.toggle('media-active');

      $('#mediaModal .btn-choose').removeAttr('disabled');
    });
  });
}

function resetModal() {
  $('#media-list-content').html(getSpinner());
  $('#mediaModal .btn-choose').prop('disabled', true);
}

function insertImageSummernote(id, src, alt) {
  alt = alt || '';
  $('#'+id).summernote('editor.saveRange');
  $('#'+id).summernote('editor.restoreRange');
  $('#'+id).summernote('editor.focus');
  $('#'+id).summernote('editor.pasteHTML', '<img src="' + src + '" class="img-fluid" loading="lazy" alt="' + alt + '">');
}

function getSpinner() {
  return [
    '<div class="d-flex justify-content-center">',
    '<div class="spinner-border text-primary" role="status">',
    '<span class="sr-only">Loading...</span>',
    '</div>',
    '</div>',
  ].join('');
}

function mediaUploadSuccess(response) {
  insertImageSummernote('id_body', response.media.url, response.media.alt);
  $('#mediaModal').modal('hide');
  resetModal();
}

function submitMediaAjax($form) {
  /* Submit form via ajax.
   * param $form: DOM of form element.
  */
  var urlTarget = $form.getAttribute('action');
  if (!urlTarget) {
    urlTarget = window.location.href;
  }

  ajaxPostData(urlTarget, $form, mediaUploadSuccess);
}
