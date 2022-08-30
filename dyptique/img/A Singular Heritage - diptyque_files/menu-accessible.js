/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery',
    'enquire',
    'accessibleMegaMenu'
], function ($, enquire) {
    'use strict';

    $(function () {

        var switchState = function switchState(options) {
            var self            = this;
            var defaultOptions  = {
                switchRoot:             $('html'),          // Get the class to change state
                switchTrigger:          $('.js-trigger'),   // Trigger element to change state
                switchState_active:     false,              // State status
                switchState_class:      'is-open',          // Class name to display state change
                switchTrigger_active:   'is-active',        // Class name to display that element has been triggered
                switchState_events:     'click',
                onSwitchOpen:           function() { return true; }, // Callback on state change
                onSwitchClose:          function() { return true; } // Callback on state going back to normal
            };

            self.config = $.extend({}, defaultOptions, options);

            // Allow click event on the trigger element
            // You can add this class manually in the HTML code, but let's be cautious
            self.config.switchTrigger.addClass('js-no-close');

        };

        switchState.prototype = {
            switchToClose: function switchToClose(options) {
                this.config.switchRoot.removeClass(this.config.switchState_class);
                this.config.switchTrigger.removeClass(this.config.switchTrigger_active);

                this.config.switchState_active = false;

                // Callback
                this.config.onSwitchClose.call(this, this.config.switchRoot, this.config.switchTrigger);
            },
            switchToOpen: function switchToOpen(options) {
                if (this.config.switchState_active) {
                    return;
                }
                this.config.switchRoot.addClass(this.config.switchState_class);
                this.config.switchTrigger.addClass(this.config.switchTrigger_active);

                this.config.switchState_active = true;

                // Callback
                this.config.onSwitchOpen.call(this, this.config.switchRoot, this.config.switchTrigger);
            },
            /* Switch between open and close state  */
            switchToToggle: function switchToToggle(options) {
                if (this.config.switchState_active && this.config.switchRoot.hasClass(this.config.switchState_class)) {
                    this.switchToClose();
                } else {
                    this.switchToOpen();
                }
            },
            /**
             * Activate change of state
             * You can trigger it when you need it
             */
            toSwitch: function toSwitch(options) {
                var self = this;
                self.config.switchTrigger.on("click", function(e) {
                    e.preventDefault();
                    self.switchToToggle();
                });

                // Allow to change state back to normal by clicking anywhere
                $(document).on(self.config.switchState_events, function(e) {
                    var el = $(e.target);

                    // Elements with class `.js-no-close` and their children stay clickable (ie: links, buttons, cta) when a change of state is occuring
                    // You have to add this class on the trigger and of course and the elements which are supposed to appear
                    if (self.config.switchState_active && !el.hasClass('js-no-close') && !el.parents().hasClass('js-no-close')) {
                        e.preventDefault();
                        self.switchToClose();
                    }

                });
            },
            /**
             * Delete
             * Can be useful in responsive mode
             */
            switchToDestroy: function switchToDestroy(options) {
                this.config.switchTrigger.off("click");
                this.switchToClose();
            }
        };

        $(".js-navigation").accessibleMegaMenu({
            /* prefix for generated unique id attributes, which are required
               to indicate aria-owns, aria-controls and aria-labelledby */
            uuidPrefix: "a11y-megamenu",

            /* css class used to define the megamenu styling */
            menuClass: "navigation-menu",

            /* css class for a top-level navigation item in the megamenu */
            topNavItemClass: "navigation-menu-parent",

            /* css class for a megamenu panel */
            panelClass: "navigation-menu-submenu",

            /* css class for the hover state */
            hoverClass: "is-hover",

            /* css class for the focus state */
            focusClass: "is-focus",

            /* css class for the open state */
            openClass: "is-open"
        });

        var mobileNav;

        enquire.register("screen and (max-width:767px)", {
            match : function() {

                $('.level1.parent > a').on('click', function(e) {
                    e.preventDefault();
                    var $this = $(this);
                    $this.toggleClass('is-open');
                    $this.next('.submenu').toggleClass('is-open');
                });

                mobileNav = new switchState({
                    switchTrigger: $('.js-toggle-nav'),
                    switchState_class: 'js-nav-open',
                    onSwitchOpen: function() {
                        this.config.switchRoot.addClass('nav-before-open');
                        setTimeout(function () {
                            $('html').addClass('nav-open');
                        }, 42);

                        $('.js-navigation a:first').focus();
                        $('.js-navigation').addClass('js-no-close');

                        // when a certain category is chosen, the menu reopens in this current category
                        if($('.js-navigation').find('.current').length > 0)  {

                            $('.js-navigation').find('.current').trigger('click');
                            $('.js-navigation').find('.current').parents('li.parent').first().find('ul.submenu').not('ul.level1').trigger('click');

                            if ($('.level2').find('.current').length > 0) {
                                $('.level2').find('.current').parents('li.parent').first().find('a').trigger('click');

                                if ($('.level1').find('.current').length > 0){
                                    $('.level2').find('.current').parent().parents('li.parent').first().find('a').trigger('click');
                                }
                            }
                        }
                    },
                    onSwitchClose: function() {
                        this.config.switchRoot.removeClass('nav-open');
                        setTimeout(function () {
                            $('html').removeClass('nav-before-open');
                        }, 300);

                        this.config.switchTrigger.focus();
                        $('.js-navigation').removeClass('js-no-close');
                    }
                });

                mobileNav.toSwitch();
            },
            unmatch : function() {
                $('.level1.parent > a').off('click');
                mobileNav.switchToDestroy();
            }
        });
    });
});
