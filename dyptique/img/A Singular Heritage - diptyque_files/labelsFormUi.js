/**
 * @author aferraz
 */

require([
    'jquery'
], function ($) {
    'use strict';

    $('.form-create-account').on('focus change', '.field .input-text, .field ._has-datepicker', function(){
        $(this).parent().parent().find('label').addClass('hide');
    });
    $('.form-create-account').on('blur', '.field .input-text, .field ._has-datepicker', function(){
        if(!$(this).val().trim().length) {
            $(this).parent().parent().find('label').removeClass('hide');
        }
    });
    
    var urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results==null) {
           return null;
        }
        return decodeURI(results[1]) || 0;
    };

    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var email = urlParam('email');
    if(email && mailFormat.test(email)) {
      $(document).ready(function(){
        $('input[name=email]').val(email);
        $('label[for=email_address]').addClass('hide');
      });
    }
});
