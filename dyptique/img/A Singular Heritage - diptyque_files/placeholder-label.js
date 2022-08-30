/*
 * Copyright (c) Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */

define([
    'jquery',
    'domReady!'
], function ($) {
    'use strict';
    $.widget('vaimo.placeholderLabel', {

        options: {
            activeClass: 'active',
            isEmpty: true
        },

        elements: {},

        /** @inheritdoc */
        _create: function () {
            setTimeout(function () {
                this.options.isSelect = this.element.has('select').length;
                this.element.addClass(this.options.isSelect ? 'field__select' : 'field__input');

                this._initElements();
                this._initEventsHandling();
            }.bind(this), this.options.delay || 0);
        },

        /**
         * Init elements
         * @private
         */
        _initElements: function () {
            if (this.options.isSelect) {
                this.elements = {
                    $label: $('label', this.element).first(),
                    $select: $('select', this.element).first()
                };
            } else {
                this.elements = {
                    $label: $('label', this.element).first(),
                    $input: $('input', this.element).first()
                };
            }
        },

        /**
         * Init widget events
         * @private
         */
        _initEventsHandling: function () {
            if (this.options.isSelect) {
                if (!this.elements.$select.length && !this.elements.$select.is(":visible")) {
                    return;
                }

                let self = this;

                this._isSelectEmpty();

                this.elements.$select.on('change', function () {
                    self._changeSelectHandler();
                });
            } else {
                if (!this.elements.$input.length && !this.elements.$input.is(":visible")) {
                    return;
                }

                let elementInput = this.elements.$input[0],
                    elementInputName = elementInput.getAttribute('name');

                this.options.isEmpty = this.elements.$input.val().length === 0;

                this._on(this.elements.$label, {
                    'click': '_clickHandler',
                });

                this._on(this.elements.$input, {
                    'focus': '_focusHandler',
                    'blur': '_blurHandler',
                    'change': '_changeHandler'
                });

                this.elements.$input.change();

                if (['username', 'password'].includes(elementInputName)) {
                    setTimeout(() => {
                        if (this._detectAutofill(elementInput)) {
                            elementInput.classList.add('filled');
                            this.elements.$label[0].classList.add('filled');
                        }
                        ;
                    }, 600);
                }
            }
        },

        /**
         * Click label handler
         * @private
         */
        _clickHandler: function () {
            this.elements.$input.focus();
        },

        /**
         * Focus input handler
         * @private
         */
        _focusHandler: function () {
            this.options.isEmpty && this.elements.$label.addClass(this.options.activeClass);
        },

        /**
         * Blur input handler
         * @private
         */
        _blurHandler: function () {
            this.options.isEmpty && this.elements.$label.removeClass(this.options.activeClass);
        },

        /**
         * Change input handler
         * @param e {object} - target event
         * @private
         */
        _changeHandler: function (e) {
            this.options.isEmpty = !e.target.value;
            this.elements.$label.toggleClass('active filled', !this.options.isEmpty);
            this.elements.$input.toggleClass('active', !this.options.isEmpty);
        },

        _changeSelectHandler: function () {
            this._isSelectEmpty();
        },

        _isSelectEmpty: function () {
            if (this.elements.$select.val() !== ''
                || (this.elements.$select[0][0].innerText !== '' && this.elements.$select[0][0].innerText !== ' ')
                || this.elements.$select[0].selectedIndex != 0) {
                this.elements.$label.addClass('filled');
                this.options.isEmpty = false;
            } else {
                this.elements.$label.removeClass('filled');
                this.options.isEmpty = true;
            }
            ;
        },

        _detectAutofill: (element) => {
            return window.getComputedStyle(element, null).getPropertyValue('appearance') === 'menulist-button';
        }
    });

    return $.vaimo.placeholderLabel;
});
