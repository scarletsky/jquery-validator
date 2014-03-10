;(function ($) {
    // parse data-*
    var parser = (function () {
        return {
            // return validators where detector will used
            validators: function (fieldData) {
                return fieldData.validators.split(' ');
            },

            // return params where detector will used
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

                // slice the item of  msgMap: e.g msgLengthMin -> lengthMin
                $.each(msgMap, function (i, key) {
                    var keyAlias = key.substring(3).replace(/\b\w+/g, function (word) {
                        return word.substring(0, 1).toLowerCase() + word.substring(1);
                    });

                    msg[keyAlias] = fieldData[key];
                });

                return msg;
            },

            // return error where the input tips will used
            error: function (fieldData) {
                var err = {};
                var errMap = [
                    'errRequire',
                    'errLength',
                    'errLengthMin',
                    'errLengthMax',
                    'errRange',
                ];

                // slice the item of  errMap: e.g errLengthMin -> lengthMin
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

            if (!fieldData.validators) {
                return;
            }

            // set the options object
            options.validators = parser.validators(fieldData);
            options.params = parser.params(fieldData);
            options.messages = parser.messages(fieldData);
            options.error = parser.error(fieldData);

            // init validator
            var validator = new $.validator(options);

            // validate
            $.each(validator.settings.validators, function (i, value) {
                if (validateFlag) {
                    var result = validator.detectors[value].call(this, fieldValue, validator.settings.params);

                    if (!result) {
                        validateFlag = false;
                        validator.handlers[value].call(this, validator.settings.error);
                        return false;
                    }
                }
            });

            return validateFlag;
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
            error: {
                require: 'This field is required',
                length: 'Length should be 10',
                lengthMin: 'Length Min shoubd be 5',
                lengthMax: 'Length Max should be 10',
                range: 'Range should between 5 an 10'
            },
            validators: [],
        },

        prototype: {
            init: function () {},
            detectors: {
                require: function (fieldValue) {
                    return $.trim(fieldValue).length > 0;
                },

                length: function (fieldValue, params) {
                    if ($.type(params.length) === 'undefined') {
                        throw 'You should set `data-length` in the tag attr.';
                    }
                    return fieldValue.length === params.length;
                },

                lengthMin: function (fieldValue, params) {
                    if ($.type(params.lengthMin) === 'undefined') {
                        throw 'You should set `data-length-min` in the tag attr';
                    }
                    return fieldValue.length > params.lengthMin;
                },

                lengthMax: function (fieldValue, params) {
                    if ($.type(params.lengthMax) === 'undefined') {
                        throw 'You should set `data-length-max` in the tag attr';
                    }
                    return fieldValue.length < params.lengthMax;
                },

                range: function (fieldValue, params) {
                    if ($.type(params.rangeMin) === 'undefined' && $.type(params.rangeMax) === 'undefined') {
                        throw 'You should set `data-range-min` and `data-range-max` in the tag attr';
                    }
                },
            },
            handlers: {
                require: function (error) {
                    console.log(error.require);
                },

                length: function (error) {
                    console.log(error.length);
                },

                lengthMin: function (error) {
                    console.log(error.lengthMin);
                },

                lengthMax: function (error) {
                    console.log(error.lengthMax);
                },

                range: function (error) {
                    console.log(error.range);
                }
            }
        }
    });

})(jQuery);
