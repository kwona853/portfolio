define([
           'jquery',
           'Magento_Customer/js/customer-data',
           'Magento_GoogleTagManager/js/google-tag-manager',
           'domReady!'
       ], function ($, customerData) {
    'use strict';

    return function (params) {
        var customerCustomerData;

        function updateUserDL() {
            var data = customerCustomerData();
            var gtmData;
            var dlUpdate;

            if (window.dataLayer && data && data.gtmData) {
                gtmData = data.gtmData;

                var customerStatus = data.gtmData.clientStatus

                if (params.number_of_customer_order > 0) {
                    customerStatus = 'Already client'
                }

                if (gtmData.id) {
                    dlUpdate = {
                        'user': {
                            'id': data.gtmData.id,
                            'loginStatus': 'Login',
                            'clientStatus': customerStatus
                        }
                    };

                    if (window.gtmData) {
                        let pageData = window.gtmData.page;
                        if (pageData) {
                            dlUpdate.event = 'userDefined_' + pageData.page_type;
                        }
                    }
                }
            }

            if(dlUpdate){
                dataLayer.push(dlUpdate);
            }
        }

        customerCustomerData = customerData.get('customer');

        customerCustomerData.subscribe(function (newCustomerData) {
            updateUserDL();
        });
    };
});
