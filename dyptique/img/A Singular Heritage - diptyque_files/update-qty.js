define([
    'jquery',
    'Diptyque_Cart/js/update-qty-function'
], function ($, updateFunction) {
    'use strict';

    $(function () {
        updateFunction.execute();
    });
});
