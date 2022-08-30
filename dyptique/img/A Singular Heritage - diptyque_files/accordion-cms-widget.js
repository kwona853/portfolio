/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery'
], function ($) {
    'use strict';

    $(function () {

      if($('.widget.tc-paragraph').length > 0) {

        var $paragraph = $('.widget.tc-paragraph');
        // $paragraph.attr('role','tablist');

        $paragraph.each(function(index, paragraph) {

          var $paragraphButton = $('<button type="button" aria-expanded="false" aria-controls="tab-'+index+'"></button>');
          $(paragraph).find('.title').first().wrap($paragraphButton);
          $($paragraph[index]).find('.block-cms-text').attr('id','tab-'+index);

          $(paragraph).find('.block-title').first().find('button').on('click', function(event) {
            event.preventDefault();

            $(paragraph).toggleClass('active');

            if($(this).attr('aria-expanded') == 'true') {
              $(this).attr('aria-expanded', false);
            } else {
              $(this).attr('aria-expanded', true);
            }

          });

        });
      }

    });
});
