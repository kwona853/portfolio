define([
    'jquery',
    'ko'
], function ($, ko) {
    var model = {
        unchanged: true,
        nightVisionEnabled: ko.observable('dummy value'),
        action: ko.observable('dummy value'),
        productId: ko.observable('dummy value')
    };

    model.productId.subscribe(function(newValue){
        this.unchanged = false;
    }.bind(model));

    model.nightVisionEnabled.subscribe(function(newValue){
        this.unchanged = false;
    }.bind(model));

    model.action.subscribe(function(newValue){
        this.unchanged = false;
    }.bind(model));

    return model;
});