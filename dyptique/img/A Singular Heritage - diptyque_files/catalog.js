/**
 * Copyright © Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */
define([
    "jquery"
], function ($) {
    'use strict';

    // Product grid overlay
    function productGridOverlay() {
        $('.product-item-info').each(function(index, iteminfo) {
            if($(iteminfo).find('.product-item-overlay').length > 0) {
                // open
                $(iteminfo).find('.product-item-overlay-open').find('a').on('click', function(event) {
                    event.preventDefault();
                    $(iteminfo).addClass('overlay-show');
                    $(iteminfo).find('.product-item-overlay-close > a').focus();
                });
                // close
                $(iteminfo).find('.product-item-overlay-close').find('a').on('click', function(event) {
                    event.preventDefault();
                    $(iteminfo).removeClass('overlay-show');
                    $(iteminfo).find('.product-item-overlay-open > a').focus();
                });
            }
        });

        // rename prices id in overlay block for w3c compliance
        $('.product-item-overlay').each(function(index, itemoverlay) {
            $(itemoverlay).find('.price-wrapper').attr('id',$(itemoverlay).find('.price-wrapper').attr('id')+'-2');
        });
    }

    // Aside tab widget
    function asideTabWidget() {
        var $tabs = $("div[class*='tab-']");
        var $tabhandles = $('<ul class="tabs-handles" id="tab-handles" role="tablist"></ul>');
        $tabs.first().before($tabhandles);

        $tabs.each(function (index, tab) {
            var $tablink = $('<li><a href="#tab-handles" role="tab" aria-expanded="false" aria-controls="tab-' + index + '">' + $(tab).find('h2').html() + '</a></li>');
            $tabhandles.append($tablink);
            $($tabs[index]).attr('id', 'tab-' + index);

            if (index === 0) {
                $(tab).addClass('tab-show');
                $tablink.addClass('active');
                $tablink.find('a').attr('aria-expanded', true);
            }

            $tablink.find('a').on('click', function (event) {
                event.preventDefault();
                $tabs.removeClass('tab-show');
                $(tab).addClass('tab-show');
                $tabhandles.find('a').attr('aria-expanded', false);

                $(this).parent('li').siblings().removeClass('active');
                $(this).parent('li').addClass('active');
                $(this).attr('aria-expanded', true);
            });

        });
    }

    // Product description more
    function productDescriptionMore() {
        // top zone
        if (($('.product-info-main').length > 0) && ($('.overview-more').length > 0)) {

            var $productInfoMain = $('.product-info-main');

            // more
            $productInfoMain.find('.more-button').find('a').on('click', function (event) {
                event.preventDefault();
                $productInfoMain.find('.more-button').addClass('hide-button');
                $productInfoMain.find('.less-button').removeClass('hide-button');

                $productInfoMain.find('.overview').addClass('hide-overview');
                $productInfoMain.find('.overview-more').removeClass('hide-overview');
            });

            // less
            $productInfoMain.find('.less-button').find('a').on('click', function (event) {
                event.preventDefault();
                $productInfoMain.find('.less-button').addClass('hide-button');
                $productInfoMain.find('.more-button').removeClass('hide-button');

                $productInfoMain.find('.overview-more').addClass('hide-overview');
                $productInfoMain.find('.overview').removeClass('hide-overview');
            });

        }

        $('.product-details .detailed-label a').on('click', function (event) {
            event.preventDefault();
            $(this).parent().parent().toggleClass('active');
        });

        $('.collapsible-attribute-container').each(function (index, attribute) {

            $(attribute).find('.collapsible-attribute').on('click', function () {
                $(attribute).toggleClass('active');
            });
        });

        var $productItem = $('.product-details-item');

        $productItem.each(function() {
            if ($(this).find('div.attribute-no-display').length > 0) {
                $(this).addClass('no-visible');
            }
        });

        if ($('.product-details .product-details-item.no-visible').length === $('.product-details .product-details-item').length) {
            $('.attribute-ingredients').addClass('product-detailed-info-novisible');
        }

        if ($('.attribute-allergens').length > 0) {
            $('.attribute-ingredients').css('padding-bottom','1.7rem');
        }
    }

    $(function () {
        // Product grid overlay
        if($('.product-item-overlay').length > 0) {
            productGridOverlay()
        }

        // Aside tab widget
        if($("div[class*='tab-']").length > 0) {
            asideTabWidget()
        }

        // Product description more
        productDescriptionMore();

        // Editorial Labels
        if ($('#editorial-labels').length > 0) {
            $(document.body).addClass('haseditoriallabel');
        }

        // Filter responsive
        if ($('.filter-options-title').length > 0) {
            $('.filter-options-title').each(function(index, filterTitle) {
                $(filterTitle).find('button').on('click', function() {

                    if($(filterTitle).parent().hasClass('active')) {
                        $(filterTitle).parent().removeClass('active');
                        $(filterTitle).parent().attr('aria-expanded','false');
                    }
                    else {
                        $('.filter-options-item').removeClass('active');
                        $('.filter-options-item').attr('aria-expanded','false');
                        $(filterTitle).parent().addClass('active');
                        $(filterTitle).parent().attr('aria-expanded','true');
                    }
                });
            });
        }
    });
});
