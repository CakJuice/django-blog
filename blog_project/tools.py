from math import ceil, floor


def _get_pagination(current_page, num_pages, limit=10):
    """To get pagination number.
    :param current_page: position of current page
    :param num_pages: count of total pagination page
    :param limit: length of pagination page
    :return: Tuple of start & end value of pagination
    """
    start_index = current_page - ceil(limit / 2) + 1
    diff_start = 0
    if start_index < 1:
        diff_start = 1 - start_index

    end_index = current_page + floor(limit / 2) + diff_start
    if end_index > num_pages:
        diff_end = end_index - num_pages
        end_index = num_pages
        start_index -= diff_end

    start = int(start_index) if start_index >= 1 else 1
    end = int(end_index)
    return start, end


def range_pagination(current_page, num_pages, limit=10):
    """To get pagination range number, used for iteration in template.
    :param current_page: position of current page
    :param num_pages: count of total pagination page
    :param limit: length of pagination page
    :return: Range of start & end value of pagination
    """
    start, end = _get_pagination(current_page, num_pages, limit)
    return range(start, end + 1)


def dict_pagination(current_page, num_pages, limit=10):
    """To get pagination dictionary number, used for JSON data.
    :param current_page: position of current page
    :param num_pages: count of total pagination page
    :param limit: length of pagination page
    :return: Range of start & end value of pagination
    """
    start, end = _get_pagination(current_page, num_pages, limit)
    return {
        'start': start,
        'current': current_page,
        'end': end,
    }


def create_update_instance(instance, data, exclude=['id']):
    for key, val in data.items():
        if key not in exclude:
            setattr(instance, key, val)
    instance.save()
    return instance
