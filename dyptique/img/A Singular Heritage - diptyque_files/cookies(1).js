define(
  [
    'jquery'
  ],
  function ($) {
    'use strict';

    return {
      Defaults: {
        sessionOnly: false
      },

      /**
       * Create a new Cookie
       *
       * @param name
       * @param value
       * @param days
       */
      set: function(name, value, days) {
        var expires;
        if (!days) {
          days = 365;
        }

        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();

        // If no expires is set it is a Session Only Cookie
        if (this.Defaults.sessionOnly) {
          expires = "";
        }

        document.cookie = name + "=" + value + expires + "; path=/";
      },

      /**
       * Get Cookie
       *
       * @param name
       * @returns {*}
       */
      get: function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
          }

          if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
          }
        }

        return null;
      },

      /**
       * Clear specified cookie
       *
       * @param name
       */
      clear: function(name) {
        document.cookie = name + "=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/";
      }
    }
  }
);
