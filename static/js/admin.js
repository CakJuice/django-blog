String.prototype.slugify = function() {
  return this.trim().replace(/[\W_]+/g, '-').toLowerCase();
}

function getPaginationItem(url, text, isActive, isAjax) {
  var classA = "page-link";
  if (isAjax)
    classA += " is-ajax";

  var classLi = "page-item"
  var item = '';
  if (isActive) {
    classLi += " active";
    item = '<span class="page-link">' +
      text + ' <span class="sr-only">(current)</span>' +
    '</span>';
  } else {
    item = '<a class="' + classA + '" href="' + url + '">' + text + '</a>';
  }

  return '<li class="' + classLi + '">' + item + '</li>'
}

function getPagination(pagination, baseUrl, isAjax) {
  isAjax = isAjax || false;

  var pageItem = '<li class="page-item disabled">' +
    '<span class="page-link">Page ' + pagination.current + ' Of ' + pagination.num_pages + '</span>' +
  '</li>';

  if (pagination.has_prev) {
    pageItem += getPaginationItem(baseUrl + '?page=1', '&laquo;', false, isAjax);
  }

  for (var i=pagination.start;i<=pagination.end;i++) {
    pageItem += getPaginationItem(baseUrl + '?page=' + i, i, pagination.current == i, isAjax);
  }

  if (pagination.has_next) {
    pageItem += getPaginationItem(baseUrl + '?page=' + pagination.num_pages, '&raquo;', false, isAjax);
  }

  return '<nav class="mt-3" aria-label="Pagination">' +
    '<ul class="pagination justify-content-center">' +
      pageItem
    '</ul>' +
  '</nav>'
}
