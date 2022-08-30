define ([
    'jquery',
    'domReady!'
], function (params) {
    'use strict';
    return function (params) {

        /* Dynamically load zendesk chat based on department availability ------------------------------------------ */
        /* NOTE: Be sure to not to load the widget using the out-of-the-box jesnippet Zendesk provides, that will be done below */

        // Create function to dynamically load correct brand widget
        var loadScript = function(key) {
            var node = document.createElement('script');
            node.id = "ze-snippet";
            node.src = '//static.zdassets.com/ekr/snippet.js?key=' + key;
            node.type = 'text/javascript';
            node.async = true;
            node.charset = 'utf-8';
            document.getElementsByTagName('body')[0].appendChild(node);
        }

        // Main function that checks for proper department online, if not hides chat option, hides all depts
        var configureWidgetDept = function(deptNum, deptName, tag) {
            // Make sure chat is loaded first
            $zopim(function() {
                $zopim.livechat.setOnConnected(function() {
                    // Get all departments
                    var depts = $zopim.livechat.departments.getAllDepartments();

                    // Check for this department by ID, if there, select it, otherwise hide chat option
                    // Counts how many depts are online and match the ID
                    var hasDeptOnline = 0;

                    // Cycle through each department
                    depts.forEach(function(el, index, array) {
                        // If appropriate department is also set to online
                        if (el.id == deptNum && el.status == "online") {
                            // Select department
                            zE('webWidget', 'updateSettings', {
                                webWidget: {
                                    chat: {
                                        departments: {
                                            enabled: [deptNum],
                                            select: deptNum
                                        }
                                    }
                                }
                            });

                            zE('webWidget', 'chat:addTags', tag);
                            hasDeptOnline++;
                        }
                    });


                    // If no depts are online and match, disable chat feature
                    if (hasDeptOnline < 1) {
                        zE('webWidget', 'updateSettings', {
                            webWidget: {
                                chat: {
                                    suppress: true
                                },
                            }
                        });

                        // Clear the chat session for any other brand to prevent lingering sessions
                        if ($zopim.livechat.isChatting() == true) {
                            $zopim.livechat.clearAll();
                        }
                    }

                    // Remove departments dropdown from chat widget
                    zE('webWidget', 'updateSettings', {
                        webWidget: {
                            chat: {
                                departments: {
                                    enabled: [],
                                }
                            }
                        }
                    });
                });
            });
        }

        // Load widget based on key
        if (params.storeKey) {
            loadScript(params.storeKey);
        }

        // Wait for chat to load
        var jpInterval = setInterval(function(i) {
            if (
                window.$zopim === undefined ||
                window.$zopim.livechat === undefined ||
                window.$zopim.livechat.departments === undefined
            ) {
                return;
            }

            // Run the main function with department ID and stop interval
            /* params deptNum, deptName, tag */
            if (params.storeKey && params.depCode && params.brandCode) {
                configureWidgetDept(params.depCode, '', params.brandCode);
            }

            clearInterval(jpInterval);
        }, 100);

        /* END Dynamically load zendesk chat -------------------------------------------------------- */

        // Changes to zESettings
        window.zESettings = {
            webWidget: {
                contactOptions: {
                    enabled: true,
                }
            }
        };
    };
});
