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

var showMedia = function() {
  $('#mediaModal').modal();
}
