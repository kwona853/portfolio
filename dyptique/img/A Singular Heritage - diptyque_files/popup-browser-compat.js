/*jshint browser:true jquery:true expr:true*/
define([
  'jquery',
  'Magento_Theme/js/cookies'
], function($, Cookies) {
  'use strict';

  $.widget('popup.store', {
    options: {
      container: '.popup-browser-compat',
      cookieName: 'popupBrowserCompat',
      blockClass: '.content-popup-browser-compat',
      maxMozilla: 62,
      maxChrome: 56,
      maxSafari: 601 // 9 = 601
    },

    _create: function() {

      this._checkBrowserCompatibility();

      // if compatible nothing happens next
      if(this._checkBrowserCompatibility()) return;

      if (this._hasAccepted()) {
        $(this.options.container).remove();
        $(document.body).removeClass('_has-modal');
      } else {
        $(this.options.container).show();
        $(document.body).addClass('_has-modal');
        this.element.find('.close').on('click', $.proxy(function() {
          this._closeConsent();
        }, this));
      }
    },

    /**
     * Close consent window, place cookie
     * @private
     */
    _closeConsent: function() {
      $(this.options.container).remove();
      Cookies.set(this.options.cookieName, true, 365);
      $(document.body).removeClass('_has-modal');
    },

    /**
     * Policy container has already accepted
     *
     * @returns boolean
     * @private
     */
    _hasAccepted: function() {
      var cookie = Cookies.get(this.options.cookieName);

      return cookie ? cookie : false;
    },

    /**
     * Check if browser is obsolete
     *
     * @returns boolean
     * @private
     */
    _checkBrowserCompatibility: function() {

      // Checks if browser is NOT
      // Chrome 62 or more
      // Firefox 56 or more
      // Safari 9 or more
      // Edge

      var browserCompatibility = false;

      if(window.navigator.userAgent.indexOf("Edge") > -1) {
        browserCompatibility = true;
      } else if($.browser.safari == true) {
        if(parseInt($.browser.version) >= this.options.maxSafari) {
          browserCompatibility = true;
        }
      } else if($.browser.msie == true) {
        browserCompatibility = false;
      } else if($.browser.mozilla == true) {
        if(parseInt($.browser.version) >= this.options.maxMozilla) {
          browserCompatibility = true;
        }
      } else if(($.browser.chrome == true) && ($.browser.webkit == true)) {
        if(parseInt($.browser.version) >= this.options.maxChrome) {
          browserCompatibility = true;
        }
      }

      return browserCompatibility;
    }

  });

  return $.popup.store;
});

