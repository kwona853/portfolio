define([
    'jquery',
    'domReady!'
], function ($) {
    'use strict';

    return function (config) {
        $(document).on('click', '.products-slider a', function() {
            var section = $(this).parents(".block-products-list").find(".block-title span");
            $.ajax({
                type: 'POST',
                data: {section: $.trim(section.text())},
                url: config.ajaxUrl,
                success: (result) => {
                },
                dataType: 'json'
            });
        });
    };
});


