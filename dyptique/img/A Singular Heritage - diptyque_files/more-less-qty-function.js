define([
  'jquery'
], function ($) {
  'use strict';

  var moreLess = {};
  moreLess.execute = function()
  {
      if( ($('input.qty').length > 0) && ($('button.update').length > 0) ) {

        $('input.qty').each(function() {

          $(this).before('<span class="less-block"><a href="#" class="less">-</a></span>');
          $(this).after('<span class="more-block"><a href="#" class="more">+</a></span>');

        });

        $('.more').on('click', function(event) {
          event.preventDefault();
          var obj = $(this).parent();
          var currentQty = obj.siblings('input.qty').val();
          var newAdd = parseInt(currentQty)+1;
          obj.siblings('input.qty').val(newAdd);
          obj.siblings('input.qty').trigger('keyup');
          obj.siblings('input.qty').change();
        });

        $('.less').on('click', function(event) {
          event.preventDefault();
          var obj = $(this).parent();
          var currentQty = obj.siblings('input.qty').val();
          var newAdd = parseInt(currentQty)-1;
          if(newAdd < 0) newAdd = 0;
          obj.siblings('input.qty').val(newAdd);
          obj.siblings('input.qty').trigger('keyup');
          obj.siblings('input.qty').change();
        });

      }
  };
  return moreLess;
});
