;(function ($) {
    var utils = {
        validators: function (validators) {
            return validators.split(' ');
        }
    };

    $.extend($.fn, {
        validate: function () {
            var value = $(this).val();
            var data = $(this).data();
            var options = {};

            $.each(data, function (key, val) {
                if (utils[key]) {
                    options[key] = utils[key](val);
                }
            });

            // window just for test
            window.validator = new $.validator(options);

            $.each(validator.settings.validators, function (i, val) {
                validator.checker[val](value);
            });
        }
    });

    // Constructor
    $.validator = function (options) {
        this.settings = $.extend(true, {}, $.validator.defaults, options);
        this.init();
    };

    $.extend($.validator, {
        defaults: {
            messages: {},
            error: {},
            validators: [],
        },

        prototype: {
            init: function () {},
            checker: {
                require: function (value) {
                    return $.trim(value).length > 0 ? true : false;
                },
                length: function (value, length) {
                    if (value.length !== length) {
                        console.log('false');
                        return false;
                    }
                    console.log('true');
                    return true;
                },
                range: function () {},
                number: function () {},
                telphone: function () {},
                equalTo: function () {},
            }
        }
    });

})(jQuery);
