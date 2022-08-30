/**
* Instructions Of Use
*/
(function(){

    require([
        'jquery',
        'jquery/ui'
    ], function($){

        var VIEW_LANGUAGE = 1,
            VIEW_CHOICE = 2,
            VIEW_INSTRUCTION = 3,
            VIEW_FORM_EMAIL = 4,
            VIEW_FORM_DATA = 5,
            VIEW_THANKS = 6;

        var STEP_LANGUAGES = 1,
            STEP_COUNTRIES = 2;

        var state = {
            lang: null,
            hasStore: null
        };

        var setCurrentView = function(view) {
            $('.ifu__content.active').removeClass('active');
            $('.ifu__content[data-view=' + view + ']').addClass('active');

            // Scroll to section top if page is scrolled beyond content
            // scroll to page top for instructions page
            var sectionOffset = (view == VIEW_INSTRUCTION) ? 0 : $('#maincontent').offset().top - 20;
            if(sectionOffset < $('html,body').scrollTop()) {
                $('html, body').animate({
                    scrollTop: sectionOffset + 'px'
                }, 500);
            }
        };

        var setDropdownStep = function(step) {
            $('.ifu_language-selector__content.visible').removeClass('visible');
            $('.ifu_language-selector__content[data-step='+step+']').addClass('visible');
        };

        var validateEmail = function(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        };

        $('#ifu__birthday').datepicker({
            yearRange: "-100:+0",
            dateFormat: 'yy-mm-dd',
            changeMonth: true,
            changeYear: true,
        });
        $('#ifu__birthday-block .ui-datepicker-trigger').click(function(e){
            e.preventDefault();
            $('#ifu__birthday').focus();
        });

        /**
         * Global actions
         */
        $('body').on('click', '[data-back-to-choice]', function(e){
            setCurrentView(VIEW_CHOICE);
        });
        $('body').on('click', '[data-open-ifu-content]', function(e){
            setCurrentView(VIEW_INSTRUCTION);
        });

        /**
         * 1st step : Select language
         */
        $('body').on('click', '[data-step=1] [data-language]', function(e){
            var lang = $(this).data('language');
            var hasStore = $(this).data('has-store');
            var hasCountries = $(this).data('has-countries');
            state.lang = lang;
            state.hasStore = hasStore;

            if(!hasStore) {
                $('.ifu__main-content.active').removeClass('active');
                $('.ifu__main-content[data-language='+lang+']').addClass('active');
                setCurrentView(VIEW_INSTRUCTION);
            } else if(hasCountries) {
                setDropdownStep(STEP_COUNTRIES);
                $('.ifu_language-selector__content-country.visible').removeClass('visible');
                $('.ifu_language-selector__content-country[data-language="'+lang+'"]').addClass('visible');
            }
        });
        $('body').on('click', '.ifu_language-selector__back', function(e){
            e.preventDefault();
            setDropdownStep(STEP_LANGUAGES);
        });
        $('body').on('click', '#ifu_language-selector__button', function(e){
            e.preventDefault();
            $('#ifu_language-selector').toggleClass('visible');
        });

        /**
         * 2nd step : Choice
         */
        $('body').on('click', '[data-choice]', function(e){
            if($(this).data('choice') == 2) {
                setCurrentView(VIEW_FORM_EMAIL);
            } else {
                setCurrentView(VIEW_INSTRUCTION);
            }
        });

        /**
         * 1st form (Email) behavior
         */
        $('#ifu__submit-email').click(function(){
            var email = $('#ifu__email').val();

            if(validateEmail(email)) {
                $.post('/fr_eu/ifu-api/datacatch/checkemail', 'email='+email, function(data){
                    if(data && data.status == 'success') {
                        if(!data.payload.account_exists) {
                            var storeCode = document.location.pathname.split('/')[1];
                            window.open('/'+storeCode+'/customer/account/create/?email='+email, '_blank');
                        } else if( !data.payload.has_birthday || !data.payload.has_optin_sms || !data.payload.has_optin_mail || !data.payload.has_optin_newsletter) {

                            if(data.payload.has_birthday) {
                                $('#ifu__birthday-block').hide();
                                $('#ifu__birthday').val(data.payload.has_birthday);
                            } else {
                                $('#ifu__birthday-block').show();
                                $('#ifu__birthday').val('');
                            }

                            var hasAllOptins = data.payload.has_optin_sms && data.payload.has_optin_newsletter && data.payload.has_optin_mail;

                            if(hasAllOptins) {
                                $('#ifu__optins-block').hide();
                            }
                            $('#ifu__optin-sms-yes').prop( 'checked', data.payload.has_optin_sms );
                            $('#ifu__optin-newsletter-yes').prop( 'checked', data.payload.has_optin_newsletter );
                            $('#ifu__optin-mail-yes').prop( 'checked', data.payload.has_optin_mail );
                            $('#ifu__optin-all-yes').prop( 'checked', hasAllOptins );

                            $('#ifu__optin-sms-no').prop( 'checked', !data.payload.has_optin_sms );
                            $('#ifu__optin-newsletter-no').prop( 'checked', !data.payload.has_optin_newsletter );
                            $('#ifu__optin-mail-no').prop( 'checked', !data.payload.has_optin_mail );
                            $('#ifu__optin-all-no').prop( 'checked', !hasAllOptins );

                            setCurrentView(VIEW_FORM_DATA);
                        } else {
                            setCurrentView(VIEW_THANKS);
                        }

                        state.email = email;

                    } else if( data && data.status == 'error' ) {
                        alert('Une erreur est survenue : ' + data.message);
                    } else {
                        alert('Une erreur est survenue');
                    }
                });

            } else {
                $('#ifu__email').addClass('is-error').on('keyup', function(e){
                    if(validateEmail($(this).val())) {
                        $(this).removeClass('is-error');
                        $(this).off(e);
                    }
                })
            }
        });

        /**
         * 2nd form (UserData) behaviors
         */
        $('#ifu__optin-all-yes').change(function(e){
            var isChecked = $(this).prop('checked');
            $('#ifu__optin-sms-yes, #ifu__optin-mail-yes, #ifu__optin-newsletter-yes').prop( 'checked', isChecked );
        });
        $('#ifu__optin-all-no').change(function(e){
            var isChecked = $(this).prop('checked');
            $('#ifu__optin-sms-no, #ifu__optin-mail-no, #ifu__optin-newsletter-no').prop( 'checked', isChecked );
        });
        $('#ifu__data-form').submit(function(e){
            e.preventDefault();
            return false;
        });
        $('#ifu__submit-data').click(function(){
            var email = state.email;

            var data = $('#ifu__data-form').serialize();
            data = data.concat('&email=').concat(email);

            $.post('/fr_eu/ifu-api/datacatch/postdata', data, function(data){
                if(data && data.status == 'success') {
                    setCurrentView(VIEW_THANKS);
                } else if( data && data.status == 'error' ) {
                    alert('Une erreur est survenue : ' + data.message);
                } else {
                    alert('Une erreur est survenue');
                }
            });
        });
    });
})();
