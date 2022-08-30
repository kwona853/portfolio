/**
 * Copyright © Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */

define([
    'jquery',
    'mage/translate',
    'mage/smart-keyboard-handler',
    'enquire',
    'imageResizer',
    'mage/ie-class-fixer',
    'domReady!',
    'jquery-ui-modules/draggable'
], function ($, $t, keyboardHandler, enquire) {
    'use strict';

    $(function () {
        // Footer Accordion
        if (($('.footer-columns').length > 0) && ($('.footer-columns').find('.column').length > 0)) {
            $('.footer-columns').find('strong').each(function () {
                var $content = $(this).parent().next('ul');
                var $mainLink = $(this).find('a');
                var $handle = $('<span class="handle"><a href="#handle"><span class="text">' + $mainLink.text() + '</span></a></span>');
                $mainLink.after($handle);
                enquire.register("screen and (min-width:768px)", {
                    match: function () {
                        $handle.find('a').attr('aria-hidden', true);
                        $mainLink.attr('aria-hidden', false);
                    }
                }).register("screen and (max-width:767px)", {
                    match: function () {
                        $handle.find('a').attr('aria-hidden', false);
                        $mainLink.attr('aria-hidden', true);
                    }
                });

                $handle.addClass('open');
                $content.addClass('hidden');

                $handle.on('click', function (event) {
                    event.preventDefault();
                    $content.toggleClass('hidden');
                    $handle.toggleClass('open');
                });
            });
        }

        // "To Top" Button
        if($('.page-up').length > 0) {
            $(window).on('scroll', function() {
                $('.page-up').addClass('on');
                if($(window).scrollTop() == 0) {
                    $('.page-up').removeClass('on');
                }
            });

            $('.page-up').on('click', function(event) {
                event.preventDefault();
                $('html,body').animate({scrollTop: 0},400);
            });
        }

        // Accessible simple tooltip via ARIA
        function accessibleSimpleTooltipAria(options) {
            var element = $(this);
            options = options || element.data();
            var text = options.simpletooltipText || '';
            var prefix_class = typeof options.simpletooltipPrefixClass !== 'undefined' ? options.simpletooltipPrefixClass + '-' : '';
            var content_id = typeof options.simpletooltipContentId !== 'undefined' ? '#' + options.simpletooltipContentId : '';

            var index_lisible = Math.random().toString(32).slice(2, 12);
            var aria_describedby = element.attr('aria-describedby') || '';

            element.attr({
                'aria-describedby': ('label_simpletooltip_' + index_lisible + ' ' + aria_describedby).trim()
            });

            element.wrap('<span class="' + prefix_class + 'simpletooltip_container"></span>');

            var html = '<span class="js-simpletooltip ' + prefix_class + 'simpletooltip" id="label_simpletooltip_' + index_lisible + '" role="tooltip" aria-hidden="true" style="display: none">';

            if (text !== '') {
                html += '' + text + '';
            } else {
                var $contentId = $(content_id);
                if (content_id !== '' && $contentId.length) {
                    html += $contentId.html();
                }
            }
            html += '</span>';

            $(html).insertAfter(element);
        }

        // Bind Accessible simple tooltip as a jQuery plugin
        $.fn.accessibleSimpleTooltipAria = accessibleSimpleTooltipAria;

        // Events for Accessible simple tooltip
        $('.js-simple-tooltip').each(function () {
            accessibleSimpleTooltipAria.apply(this);
        });
        $(document.body).on('focusin', '.js-simple-tooltip', function () {
            var $this = $(this);
            var aria_describedby = $this.attr('aria-describedby');
            var $tooltip_to_show = $('#' + aria_describedby);
            $tooltip_to_show.attr('aria-hidden', 'false');
        }).on('focusout', '.js-simple-tooltip', function () {
            var $this = $(this);
            var aria_describedby = $this.attr('aria-describedby');
            var $tooltip_to_show = $('#' + aria_describedby);
            $tooltip_to_show.attr('aria-hidden', 'true');
        }).on('keydown', '.js-simple-tooltip', function (event) {
            var $this = $(this);
            var aria_describedby = $this.attr('aria-describedby');
            var $tooltip_to_show = $('#' + aria_describedby);

            if (event.keyCode == 27) { // esc
                $tooltip_to_show.attr('aria-hidden', 'true');
            }
        });

        // Form password view (requires accessibleSimpleTooltipAria)
        // inject handlers (only for mobile view)
        if( $('.field.password-watch').length > 0) {
            var iconLabel = $t('View');
            var $watcheye = $('<a href="#" class="password-eye js-simple-tooltip"><span class="text">' + iconLabel + '</span></a>');
            $('.password-watch').find('.control').append($watcheye);
            $('.password-watch').on('click', 'a', function(event) {
                event.preventDefault();
                var passwordField = $(this).parent().parent().find('input');
                if($(this).hasClass('watch-mode')) {
                    passwordField.attr('type','password');
                    $(this).removeClass('watch-mode');
                } else {
                    passwordField.attr('type','text');
                    $(this).addClass('watch-mode');
                }
            });

            // tooltip
            $watcheye.accessibleSimpleTooltipAria({
                simpletooltipText: iconLabel
            });
        }

        // @TODO: Check if used anywheer in content, maybe remove + remove jquery.ui from define then
        //CIRCLES WITH BACKGROUND IMAGES
        if( $( ".glass1" ).length > 0 && $( ".glass2" ).length > 0 && $( ".glass3" ).length > 0){
            $( ".glass1, .glass2 , .glass3" ).draggable({
                containment: ".widget-image-block",
                scroll: false,
                iframeFix:true,
                drag: function(){
                    $(this).css("background-position-x", "-"+$(this).css("left")+"");
                    $(this).css("background-position-y", "-"+$(this).css("top")+"");
                }
            });
        }

        //DRAGGABLE ITEMS
        if( $( ".item1" ).length > 0 && $( ".item2" ).length > 0 && $( ".item3" ).length > 0 && $( ".item4" ).length > 0  && $( ".item5" ).length > 0 && $( ".item6" ).length > 0 && $( ".item7" ).length > 0) {
            $( ".item1,.item2,.item3,.item4,.item5,.item6,.item7" ).draggable({
                containment: ".widget-image-block",
                scroll: false
            });
        }

        //CLICKABLE BUTTON WITH VIDEO PLACEHOLDER
        if( $( ".btn-play").length > 0){
            $( ".btn-play").each(function(index, btn) {
                $(btn).click(function(event){
                    event.preventDefault();
                    $(btn).css('display', 'none');
                    $(btn).parent().find('.video-placeholder').css('display','none');

                    // if only one video in the page (hesperides)
                    if( $( "#iframe-vid" ).length > 0){
                        $("#iframe-vid" ).css('display', 'block');
                    }

                    // if several videos
                    if( $(btn).parent().find('.iframe-vid').length > 0){
                        $(btn).parent().find('.iframe-vid').css('display', 'block');
                    }
                });
            });
        }

        //@TODO: Check if thre are any image maps on the website, if no - remove the following 3 lines and a respected library
        if( ($("map").length > 0) ) {
            $("map").imageMapResize();
        }

        // Find polyfill - used for IE support of Array.prototype.find(): @TODO - ask about ie support
        if (!Array.prototype.find) {
            Object.defineProperty(Array.prototype, 'find', {
                value: function(predicate) {
                    if (this == null) {
                        throw new TypeError('"this" is null or not defined');
                    }
                    var o = Object(this);
                    var len = o.length >>> 0;
                    if (typeof predicate !== 'function') {
                        throw new TypeError('predicate must be a function');
                    }
                    var thisArg = arguments[1];
                    var k = 0;
                    while (k < len) {
                        var kValue = o[k];
                        if (predicate.call(thisArg, kValue, k, o)) {
                            return kValue;
                        }
                        k++;
                    }
                    return undefined;
                },
                configurable: true,
                writable: true
            });
        }
    });

    // default/leftovers (from Magento_Blank)
    keyboardHandler.apply();
});
