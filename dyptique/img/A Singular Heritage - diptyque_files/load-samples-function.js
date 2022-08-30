define([
    'jquery',
    'domReady!'
], function ($) {
    "use strict";

    return function() {
        $.widget('sample.loadcart', {
            /*
             * Variables
             */
            options: {
                ajaxUrl: null,
                sampleElement: ".sample-checkbox",
                sampleDiv: ".samples"
            },
            selectedSamples: [],

            /*
             * Main Functions
             */
            _create: function () {
                var self = this;
                if (self.options.ajaxUrl != null) {
                    self._getSamplesInPage();
                }
            },
            _getSamplesInPage: function () {
                var self = this;
                if (self.selectedSamples.length > 0) {
                    self.selectedSamples.length = 0;
                }
                $(self.options.sampleElement).each(function () {
                    var sampleid = $(this).attr('id').split('sampleid-')[1];
                    self.selectedSamples.push(sampleid);
                });
                if (self.selectedSamples.length > 0) {
                    self._getSamplesInCart();
                }
            },
            _getSamplesInCart: function () {
                var self = this;
                $.ajax({
                    showLoader: true,
                    url: self.options.ajaxUrl,
                    data: {
                        'selected': self.selectedSamples
                    },
                    type: "POST",
                    dataType: 'json',
                    success: function (sampleIds) {
                        self._checkSamples(sampleIds);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        $(self.options.sampleDiv).hide();
                        console.log('jqXHR:');
                        console.log(jqXHR);
                        console.log('textStatus:');
                        console.log(textStatus);
                        console.log('errorThrown:');
                        console.log(errorThrown);
                    }
                });
            },
            _checkSamples: function (sampleIds) {
                for (var i = 0; i < sampleIds.length; i++) {
                    $('#sampleid-' + sampleIds[i]).prop('checked', true);
                }
            },
            _destroy: function ()
            {
                // empty - needs to exist
            }
        });

        return $.sample.loadcart;
    };
});
