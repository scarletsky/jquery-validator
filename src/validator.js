
;(function ($) {
    var utils = {
        getValidators: function (object) {
            return {
                validators: object['validators'].split(' ')
            }
        }
    }

    $.extend($.fn, {
        validate: function () {
            var data = $(this).data();
            var options = utils.getValidators(data);

            // window just for test
            window.validator = new $.validator(options);
            
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
                require: function () {console.log(1)},
                length: function () {console.log(2)},
                range: function () {},
                number: function () {},
                telphone: function () {},
                equalTo: function () {},
            }
        }
    });

})(jQuery);
