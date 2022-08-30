define([
    'uiComponent',
    'ko',
    'jquery'
], function (Component, ko, $) {
    return Component.extend({
        productName: ko.observable(""),
        productImg: ko.observable(""),
        productPrice: ko.observable(""),
        productCapacity: ko.observable(""),
        productQty: ko.observable(1),
        initialize: function () {
            this._super();
            let self = this;

            $('.page-wrapper').on('click mousedown touch', function(e) {
                if (!$(e.target).hasClass('added-tocart-modal') && !$(e.target).closest('#added-tocart-modal').length) {
                    self.closeModal();
                }
            });
        },
        setProductData: function (data = '') {
            let self = this;
            let qtyInt = parseInt(data.qty);
            this.productName(data.name ? data.name : '')
            this.productImg(data.img ? data.img : '');
            this.productPrice(data.price ? data.price : '');
            this.productCapacity(data.capacity ? data.capacity : '');
            this.productQty(qtyInt ? qtyInt : 1);

            if (Object.keys(data).length > 0) {
                $('#added-tocart-modal').addClass('active');
                setTimeout(function() {
                    self.closeModal();
                }, 5000);
            } else {
                console.log('something went wrong');
            }
        },
        getName: function () {
            return this.productName;
        },
        getImg: function () {
            return this.productImg;
        },
        getPrice: function () {
            return this.productPrice;
        },
        getCapacity: function () {
            return this.productCapacity;
        },
        getQty: function () {
            return this.productQty();
        },
        closeModal: function () {
            $('#added-tocart-modal').removeClass('active');
            this.cleanData();
        },
        cleanData: function () {
            this.productName('');
            this.productImg('');
            this.productPrice('');
            this.productCapacity('');
            this.productQty(1);
        }
    });
});
