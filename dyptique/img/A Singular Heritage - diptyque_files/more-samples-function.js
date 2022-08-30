define([
    'jquery'
], function ($) {
    'use strict';

    return function () {

        // show hide more sampless
        if (($('.product-samples').length > 0) && ($('.product-samples').find('.product-item').length > 0)) {

            $('.samples').data('extended', false);

            if ($('.samples').find('.see-more-less').length > 0) {

                var $samples = $('.product-samples');
                var $moreless = $('.samples').find('.see-more-less');

                $moreless.find('.see-more').on('click', function (event) {
                    event.preventDefault();
                    $samples.find('.hide').addClass('show');
                    $moreless.find('.see-more').addClass('hide');
                    $moreless.find('.see-less').removeClass('hide');
                    $('.samples').data('extended', true);
                });

                $moreless.find('.see-less').on('click', function (event) {
                    event.preventDefault();
                    $samples.find('.hide').removeClass('show');
                    $moreless.find('.see-less').addClass('hide');
                    $moreless.find('.see-more').removeClass('hide');
                    $('.samples').data('extended', false);
                });

            }

        }
        ;
    }
});
