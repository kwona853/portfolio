define([
    'jquery',
    'domReady!'
], function ($) {
    'use strict';

    return function (config) {
        function updateSearch() {
            window.dataLayer = window.dataLayer || []; // init

            var dlClickSearchSuggestion = {
                'event': 'clickSearch',
                'searchType': config.searchType,
                'searchQuery': config.searchQuery
            };

            if (window.dataLayer) {
                dataLayer.push(dlClickSearchSuggestion);

            }
        }

        $('#search').on('click', function() {
            updateSearch();
        });

        $('#search').on('keyup', function() {
            setTimeout(function() {
                var suggestionProductElement = $('.autocomplete-list-title.title-product').siblings('dd');
                $(suggestionProductElement).on('click', function() {

                    window.dataLayer = window.dataLayer || [ ]; // init
                    var searchType = "products";
                    var searchQuery = $("#search" ).val();

                    var dlClickSearchSuggestion = {
                        'event': 'clickSearch',
                        'searchType': searchType,
                        'searchQuery': searchQuery
                    };

                    if (window.dataLayer) {
                        dataLayer.push(dlClickSearchSuggestion);
                    }
                });

                var suggestionElement = $('dt.autocomplete-list-title.title-term').siblings('dd');
                $(suggestionElement).on('click', function() {

                    window.dataLayer = window.dataLayer || [ ]; // init
                    var searchType = "suggestion";
                    var searchQuery = $("#search" ).val();

                    var dlClickSearchSuggestion = {
                        'event': 'clickSearch',
                        'searchType': searchType,
                        'searchQuery': searchQuery
                    };

                    if (window.dataLayer) {
                        dataLayer.push(dlClickSearchSuggestion);
                    }
                });
            }, 4000);
        });

    };

});


