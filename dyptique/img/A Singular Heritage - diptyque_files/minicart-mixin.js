define([
   'jquery',
   'mage/utils/wrapper',
   'Magento_Customer/js/customer-data'
], function ($, wrapper, customerData) {
    'use strict';

    return function (initialize) {
        return wrapper.wrap(initialize, function (originalInitialize) {
            console.log('minicart initialisation');

            let miniCart = $('[data-block=\'minicart\']');
            let body = $('body');
            let search = $('.sticky-search-toogle');
            let header = $('header.page-header');
            miniCart.on('dropdowndialogopen', function () {
                $('.header-right-links').append('<div class="minicart-sidebar-background"></div>');
                header.css('z-index', 105);
                search.css('z-index', 0);
            });

            miniCart.on('dropdowndialogclose', function () {
                $('.minicart-sidebar-background').remove();
                search.css('z-index', 991);
                header.css('z-index', '');
            });

            body.on('click', '.nosto-item .action.tocart', function() {
                miniCart.find('.showcart').trigger('click');
                miniCart.trigger('processStart');

                setTimeout(() => {
                    miniCart.trigger('processStop');
                }, 2500);
            });

            return originalInitialize();
        })
    }
});
