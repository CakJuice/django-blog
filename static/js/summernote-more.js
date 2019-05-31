var MoreButton = function(context) {
  var ui = $.summernote.ui;

  var button = ui.button({
    contents: 'Read More',
    tooltip: 'Read More Preview',
    click: function() {
      $('#id_body').summernote('editor.saveRange');
      $('#id_body').summernote('editor.restoreRange');
      $('#id_body').summernote('editor.focus');
      $('#id_body').summernote('editor.pasteHTML', '<p><!--MORE--></p>');
    },
  });

  return button.render();
}