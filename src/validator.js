;(function ($) {
    // parse data-*
    var parser = (function () {
        return {
            validators: function (fieldData) {
                return fieldData.validators.split(' ');
            },

            // return params where checker will used
            params: function (fieldData) {
                var params = {};
                var paramsMap = [
                    'length',
                    'lengthMin',
                    'lengthMax',
                    'rangeMin',
                    'rangeMax'
                ];

                $.each(paramsMap, function (i, key) {
                    params[key] = fieldData[key];
                });

                return params;
            },

            // return messages where the input tips will used
            messages: function (fieldData) {
                var msg = {};
                var msgMap = [
                    'msgRequire',
                    'msgLength',
                    'msgLengthMin',
                    'msgLengthMax',
                    'msgRange',
                ];

                $.each(msgMap, function (i, key) {
                    var keyAlias = key.substring(3).replace(/\b\w+/g, function (word) {
                        return word.substring(0, 1).toLowerCase() + word.substring(1);
                    });

                    msg[keyAlias] = fieldData[key];
                });

                return msg;
            },
            error: function (fieldData) {
                var err = {};
                var errMap = [
                    'errRequire',
                    'errLength',
                    'errLengthMin',
                    'errLengthMax',
                    'errRange',
                ];

                $.each(errMap, function (i, key) {
                    var keyAlias = key.substring(3).replace(/\b\w+/g, function (word) {
                        return word.substring(0, 1).toLowerCase() + word.substring(1);
                    });

                    err[keyAlias] = fieldData[key];
                });

                return err;
            }
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
            options.messages = parser.messages(fieldData);
            options.error = parser.error(fieldData);

            // init validator
            var validator = new $.validator(options);


            // validate
            $.each(validator.settings.validators, function (i, value) {
                var result = validator.checker[value].call(this, fieldValue, validator.settings.params);
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
