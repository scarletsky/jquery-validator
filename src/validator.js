;(function ($) {
    // parse data-*
    var parser = (function () {
        return {
            validators: function (fieldData) {
                return fieldData.validators.split(' ');
            },
            params: function (fieldData) {
                var params = {};
                var paramsList = [
                    'length',
                    'lengthMin',
                    'lengthMax',
                    'rangeMin',
                    'rangeMax'
                ];

                $.each(paramsList, function (i, key) {
                    params[key] = fieldData[key];
                });

                return params;
            },
        };
    })();

    $.extend($.fn, {
        validate: function () {
            // init private variables
            var validateFlag = true;
            var options = {};
            var field = $(this);
            var fieldValue = field.val();
            var fieldData = field.data();

            // set the options object
            options.validators = parser.validators(fieldData);
            options.params = parser.params(fieldData);

            // init validator
            var validator = new $.validator(options);

            // validate
            $.each(validator.settings.validators, function (i, value) {
                var result = validator.checker[value].call(this, fieldValue, validator.settings.params);
                console.log(result);
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
                require: function (fieldValue) {
                    return $.trim(fieldValue).length > 0;
                },

                length: function (fieldValue, params) {
                    if ($.type(params.length) === 'undefined') {
                        throw 'You should set `data-length` in the tag attr.';
                        return false;
                    }
                    return fieldValue.length === params.length;
                },

                lengthMin: function (fieldValue, params) {
                    if ($.type(params.lengthMin) === 'undefined') {
                        throw 'You should set `data-length-min` in the tag attr';
                        return false;
                    }
                    return fieldValue.length > params.lengthMin;
                },

                lengthMax: function (fieldValue, params) {
                    if ($.type(params.lengthMax) === 'undefined') {
                        throw 'You should set `data-length-max` in the tag attr';
                        return false;
                    }
                    return fieldValue.length < params.lengthMax;
                },

                range: function (fieldValue, params) {
                    if ($.type(params.rangeMin) === 'undefined' && $.type(params.rangeMax) === 'undefined') {
                        throw 'You should set `data-range-min` and `data-range-max` in the tag attr';
                        return false;
                    }
                },

                number: function (fieldValue) {

                },

                telphone: function (fieldValue) {

                },

                equalTo: function (fieldValue, params) {

                },
            }
        }
    });

})(jQuery);
