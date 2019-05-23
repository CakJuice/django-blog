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
  return [
    '<div class="col col-lg-2 col-md-4 col-6">',
    '<img src="' + file.thumbnail + '" class="img-fluid img-media-modal rounded mx-auto d-block" alt="' + file.alt + '" loading="lazy" data-media="' + file.media + '">',
    '</div>'
  ].join('')
}

var showMedia = function() {
  $('#mediaModal .modal-body').empty();

  $.get('/ajax/media/').done(function(response) {
    if (response.success && response.files.length > 0) {
      elem = '';
      for (var i=0;i<response.files.length;i++) {
        var file = response.files[i];
        elem += getMediaThumbnail(file);
      }

      $('#mediaModal .modal-body').html('<div class="row">' + elem + '</div>');

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
    }
  });

  $('#mediaModal').modal('show');

  $('.btn-choose').click(function() {
    var mediaActive = $('.img-media-modal.media-active');
    if (mediaActive.length > 0) {
      var src = mediaActive.first().attr('data-media');
      insertImageSummernote('id_body', src);
      $('#mediaModal').modal('hide');
      resetModal();
    }
  });
}

function resetModal() {
  $('#mediaModal .modal-body').empty();
  $('#mediaModal .btn-choose').prop('disabled', true);
}

function insertImageSummernote(id, src) {
  $('#'+id).summernote('editor.saveRange');
  $('#'+id).summernote('editor.restoreRange');
  $('#'+id).summernote('editor.focus');
  $('#'+id).summernote('editor.pasteHTML', '<img src="' + src + '" class="img-fluid" loading="lazy">');
}
