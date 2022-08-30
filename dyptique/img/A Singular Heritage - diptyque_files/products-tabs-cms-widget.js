define([
    'jquery',
    'matchMedia'
], function ($,mediaCheck) {
    'use strict';

    $(function () {

      if($('.tabs-page-products-tabs').length > 0) {

        // init for bouncing arrow display on mobile devices
        $( window ).on('scroll', function() {
          $(document.body).addClass('page-hasscrolled');
        });

        $(document.body).addClass('page-products-tabs');

        // get tabs
        var $tabs = $('.tabs-page-products-tabs').find('.block-title');

        // add desktop tabs container for tabs clones
        $('.tabs-page-products-tabs').prepend('<div class="desktop-tabs"></div>');
        var clones = [];
        var currentIndex = -1;

        $tabs.each(function(index, tab) {

          $(tab).attr({
            'tabindex' : 0,
            'id': 'tab-o-' + index
          });

          //$('.desktop-tabs').prepend('<span id="tab-'+index+'"></span>');

          // insert clone into tabs container desktop
          var $clone = $(tab).clone().attr('id','tab-d-'+index).addClass('cloned');
          $('.desktop-tabs').append($clone);
          clones.push($clone);

          // init done
          $('.tabs-page-products-tabs').addClass('tabs-ready');

          // init subtitle
          $($('.tabs-page-subtitles').find('li').get(0)).addClass('show-block');

          // on click, close all tabs, open current tab (or close if opened)
          $(tab).on('click', function() {

            document.location.hash = '#tab-' + index;

            if($(tab).hasClass('active')) {
              $(tab).removeClass('active');
              $(clones[index]).removeClass('active');
              currentIndex = -1;

              // hide the bouncing arrow
              $(document.body).addClass('page-hasscrolled');

            } else {
              $tabs.removeClass('active');
              $(clones).each(function(i, clone) {
                $(clone).removeClass('active');
              });
              $(tab).addClass('active');
              $(clones[index]).addClass('active');
              currentIndex = index;

              // show bouncing arrow
              $(document.body).removeClass('page-hasscrolled');

            }

            // other items to hide / show
            if(currentIndex >= 0) {
              // hide all products block / show current
              $('.block-products-list').removeClass('show-block');
              $($('.block-products-list').get(currentIndex)).addClass('show-block');

              // hide all title images / show current
              if( ($('.tabs-images').length > 0) && ($('.tabs-images').find('li').length > 0) ) {
                $('.tabs-images').find('li').removeClass('show-block');
                $('.tabs-images').removeClass('toright');
                $('.tabs-images').removeClass('toleft');

                $($('.tabs-images').find('li').get(currentIndex)).addClass('show-block');
                $('.tabs-images').addClass($($('.tabs-images').find('li').get(currentIndex)).attr('class'));
              }

              // hide all subtitle texts / show current
              if( ($('.tabs-page-subtitles').length > 0) && ($('.tabs-page-subtitles').find('li').length > 0) ) {
                $('.tabs-page-subtitles').find('li').removeClass('show-block');
                $($('.tabs-page-subtitles').find('li').get(currentIndex+1)).addClass('show-block');
              }

            } else {
              // hide all products blocks
              $('.block-products-list').removeClass('show-block');

              // hide all title images
              if( ($('.tabs-images').length > 0) && ($('.tabs-images').find('li').length > 0) ) {
                $('.tabs-images').find('li').removeClass('show-block');
              }

              // hide all subtitle texts
              if( ($('.tabs-page-subtitles').length > 0) && ($('.tabs-page-subtitles').find('li').length > 0) ) {
                $('.tabs-page-subtitles').find('li').removeClass('show-block');
                  $($('.tabs-page-subtitles').find('li').get(0)).addClass('show-block');
              }
            }

          });

          // on desktop
          $(clones[index]).on('click', function() {
            $(tab).trigger('click');
          });

        });

        // Init last one opened for mobile, nothing opened for desktop (default) or get tabindex param
        var desktopTabIndex = -1;
        var mobileTabIndex = -1;

        if($('.tabs-page-products-tabs').attr('data-tab-opened-desktop')) {
          desktopTabIndex = parseInt(eval($('.tabs-page-products-tabs').attr('data-tab-opened-desktop')) - 1);
        }

        if($('.tabs-page-products-tabs').attr('data-tab-opened-mobile')) {
          mobileTabIndex = parseInt(eval($('.tabs-page-products-tabs').attr('data-tab-opened-mobile')) - 1);
        }

        mediaCheck({
          media: '(max-width: 768px)',
          entry: function () {

            if(document.location.hash == '') {

              if(mobileTabIndex >= 0) {
                // set tab from param
                if(!$($tabs[mobileTabIndex]).hasClass('active')) {
                  $($tabs[mobileTabIndex]).trigger('click');
                }

              } else {
                // get last one position
                var lastOne = $tabs.length - 1;
                if(!$($tabs[lastOne]).hasClass('active')) {
                  $($tabs[lastOne]).trigger('click');
                }
              }

            } else {

              // set tab from hash
              var hashindex = document.location.hash.split('-')[1];
              if(!$($tabs[hashindex]).hasClass('active')) {
                $($tabs[hashindex]).trigger('click');
              }
            }

          }.bind(this),
          exit: function () {

            if(document.location.hash == '') {
              // set tab from param
              if(desktopTabIndex >= 0) {
                if(!$($tabs[desktopTabIndex]).hasClass('active')) {
                  $($tabs[desktopTabIndex]).trigger('click');
                }
              }

            } else {

              // set tab from hash
              var hashindex = document.location.hash.split('-')[1];
              if(!$($tabs[hashindex]).hasClass('active')) {
                $($tabs[hashindex]).trigger('click');
              }
            }

          }.bind(this)
        });

      }

    });
});
