"""
This file contains middleware definitions used by theming app.
"""

from openedx.core.djangoapps.theming.models import SiteTheme


class SiteThemeMiddleware(object):
    """
    Middleware class which will bind site with its corresponding site theme.
    This middleware is dependant on
    "django_sites_extensions.middleware.CurrentSiteWithDefaultMiddleware" and
    "microsite_configuration.middleware.MicrositeMiddleware" and must be place
    after these two in the settings file.
    """

    def process_request(self, request):
        """
        Middleware entry point on every request processing. This will associate a request's site with its
        corresponding site theme.
        """
        site_theme = None
        site = getattr(request, 'site', None)
        if site:
            site_theme = SiteTheme.get_theme(site)

        setattr(request, "site_theme", site_theme)  # pylint: disable=literal-used-as-attribute

        return None

    def process_response(self, request, response):
        """
        Middleware entry point for request completion.
        """
        setattr(request, "site_theme", None)  # pylint: disable=literal-used-as-attribute
        return response
