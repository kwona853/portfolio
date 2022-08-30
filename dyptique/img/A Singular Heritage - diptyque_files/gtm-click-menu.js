define([
    'jquery',
    'domReady!'
], function ($) {
    'use strict';

    return function (params) {
        $(document).on('click', '.navigation-menu-submenu > li', function (e) {
            window.dataLayer = window.dataLayer || [];
            var threeBlocks = $(e.target).parents('.column3').hasClass('column3');
            var mainLevel = $(e.target).parents()[4].childNodes[0].innerText;
            var subLevel = e.target.innerText;

            if (subLevel === '') {
                mainLevel = $(e.target).parents()[6].childNodes[0].innerText;
                subLevel = $(e.target).closest('p').next()[0].innerText;
                if(!threeBlocks) {
                    mainLevel = $(e.target).parents()[15].childNodes[0].innerText;
                }
            }

            var dlNavigation = {
                'event': 'clickNav',
                'mainLevel': mainLevel,
                'subLevel': subLevel
            };
            window.dataLayer.push(dlNavigation);
        });
    };
});
