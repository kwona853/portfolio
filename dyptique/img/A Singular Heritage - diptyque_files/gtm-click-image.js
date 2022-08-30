define([
    'jquery',
    'domReady!'
], function ($) {
    'use strict';

    return function (config) {
        $(document).on('click', '.images-src-mode img', function() {
            $.ajax({
                type: 'POST',
                url: config.ajaxUrl,
                success: (result) => {
                },
                dataType: 'json'
            });
        });
    };
});


