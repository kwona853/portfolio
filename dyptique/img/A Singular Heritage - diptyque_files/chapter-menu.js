define([
    'jquery'
], function ($) {
    'use strict';

    $(function () {
        if($('.widget-chapter-menu').length > 0) {
            var menu = $('.widget-chapter-menu').find('.menu-header');
            var menuContent = $('.widget-chapter-menu').find('.frame > .menu-collapse');
            var menuItems = menuContent.find('.menu-item');

            if(menuItems.length > 0) {
                menu.click(function() {
                    if (menuContent.hasClass('closed')) {
                        menuContent.removeClass('closed').addClass('open');
                    }
                    else {
                        menuContent.removeClass('open').addClass('closed');
                    }

                    menu.toggleClass('active');
                });

                if($('.widget-chapter-menu').hasClass('display_opened')) {
                    menu.trigger('click');
                }

                menuItems.each(function(index, menuItem) {
                    if($(menuItem).find('.pages').length > 0) {
                        $(menuItem).addClass('chap-haschildren');
                        // add active class if url same as href
                        $(menuItem).find('.item-link').each(function(index, itemlink) {
                            if($(itemlink).attr('href') == document.location.href) {
                                $(itemlink).addClass('active');
                            }
                        });

                        $(menuItem).find('.parent-link').click(function(event) {
                            event.preventDefault();

                            var subMenu = $(menuItem).find('.pages');

                            if (subMenu.length > 0) {

                                //toggle "+" or"-" on the menu items
                                if ($(menuItem).hasClass('minus')) {
                                    $(menuItem).removeClass('minus');
                                }
                                else {
                                    $(menuItem).addClass('minus');
                                }

                                //expand/collapse submenu
                                if (subMenu.hasClass('closed')) {
                                    subMenu.removeClass('closed').addClass('open');
                                }
                                else {
                                    subMenu.removeClass('open').addClass('closed');
                                }
                            }
                        });
                    }
                });
            }
        }
    });
});
