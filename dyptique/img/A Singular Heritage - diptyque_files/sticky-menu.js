/**
 * Copyright © Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */

define([
    'jquery'
], function ($) {
'use strict';

    $(function () {
        let header = $(".header.content"),
            body = $('body'),
            placeholder = $('.sticky-header-placeholder'),
            headerHeight = header.height(),
            sticky = header.offset().top + headerHeight,
            stickySearchToggle = $('.sticky-search-toogle'),
            stickySearchBlock = $(".header.content .block-search"),
            navBlock = $(".nav-sections"),
            headerPreviewHeight = header.outerHeight() + $(".nav-sections").outerHeight();

        const headerGap = $('#preheader').outerHeight() + $(".page-header").outerHeight();

        $(window).on('scroll resize', function() {
            if ($(window).width() <= 767) {
                setSticky();
            } else {
                setDescktopSticky();
            }
        });

        stickySearchToggle.on('click', function() {
            if ($(window).width() <= 767) {
                toggleSearch();
            }
        });

        function setSticky() {
            if ($(window).scrollTop() > sticky) {
                body.addClass('has-sticky-header');
                placeholder.css({display: "block", height: headerHeight});
                header.addClass("sticky");
            }
            else {
                stickySearchToggle.removeClass('open');
                stickySearchBlock.removeAttr("style");
                body.removeClass('has-sticky-header');
                header.removeClass("sticky");
                placeholder.css({display: "none", height: 0});
            }
        }

        function toggleSearch() {
            stickySearchToggle.toggleClass('open');
            stickySearchBlock.toggle( 0, function() {});
            $('#klevuClose').trigger('click');
        }

        function setDescktopSticky() {
            placeholder.css({display: "none", height: 0});

            if ($(window).scrollTop() > sticky) {
                body.addClass('has-sticky-menu');
                header.css({height: navBlock.outerHeight()});
                $('.page-wrapper').css("padding-top", headerGap);
            } else {
                body.removeClass('has-sticky-menu');
                header.removeAttr("style");
                $('.page-wrapper').css("padding-top", 0);
            }
        }
    });
});
