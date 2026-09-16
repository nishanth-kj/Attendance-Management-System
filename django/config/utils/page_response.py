from django.core.paginator import Paginator


class PageResponse:
    """
    Pagination built on Django's Paginator matching CareerSync API.

    Usage (service layer):
        return PageResponse.of(queryset, page, size, mapper=lambda obj: obj.to_dict()).to_dict()
    """

    def __init__(self, page_obj, results):
        self.page_obj = page_obj
        self.results = results

    @classmethod
    def of(cls, queryset, page=1, size=20, mapper=None):
        paginator = Paginator(queryset, size)
        page_obj = paginator.get_page(page)
        results = list(page_obj.object_list)
        if mapper:
            results = [mapper(item) for item in results]
        return cls(page_obj, results)

    def to_dict(self):
        page = self.page_obj
        return {
            "results": self.results,
            "count": page.paginator.count,
            "num_pages": page.paginator.num_pages,
            "page": page.number,
            "page_size": page.paginator.per_page,
            "has_next": page.has_next(),
            "has_previous": page.has_previous(),
            "next_page_number": page.next_page_number() if page.has_next() else None,
            "previous_page_number": page.previous_page_number() if page.has_previous() else None,
            "start_index": page.start_index() if page.paginator.count else 0,
            "end_index": page.end_index() if page.paginator.count else 0,
        }

