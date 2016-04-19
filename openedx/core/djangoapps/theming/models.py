"""
Django models supporting the Comprehensive Theming subsystem
"""
from django.db import models
from django.conf import settings
from django.contrib.sites.models import Site


class SiteTheme(models.Model):
    """
    This is where the information about the site's theme gets stored to the db.

    `site` field is foreignkey to django Site model
    `theme_dir_name` contains directory name having Site's theme
    """
    site = models.ForeignKey(Site, related_name='themes')
    theme_dir_name = models.CharField(max_length=255)

    def __unicode__(self):
        return self.theme_dir_name

    @staticmethod
    def get_theme(site):
        """
        Get SiteTheme object for given site, returns default site theme if it can not
        find a theme for the given site and `DEFAULT_SITE_THEME` setting has a proper value.

        Args:
            site (django.contrib.sites.models.Site): site object related to the current site.

        Returns:
            SiteTheme object for given site or a default site set by `DEFAULT_SITE_THEME`
        """

        theme = site.themes.first()

        # import is placed here to avoid circular import
        from openedx.core.djangoapps.theming.helpers import is_request_in_themed_site

        # Check if request is in microsite
        is_request_microsite = is_request_in_themed_site()
        if is_request_microsite:
            # if request is in microsite, we do not want to apply any default theme
            return theme

        if (not theme) and settings.DEFAULT_SITE_THEME:
            theme = SiteTheme(site=site, theme_dir_name=settings.DEFAULT_SITE_THEME)
        return theme
