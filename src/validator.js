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
            },

            // events that will invoke validate function
            validateEvents: function (fieldData) {
                return fieldData.evValidate;
            }
        };
    })();

    $.extend($.fn, {
        validate: function () {
            // init private variables
            var bubble,
                errorMsg = '',
                options = {},
                validateFlag = true,
                field = $(this),
                fieldValue = field.val(),
                fieldData = field.data();

            // if no validators, it means the field should not be validated, so it should return true;
            if (!fieldData.validators) {
                return true;
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
                        errorMsg = validator.settings.error[value];

                        return false;
                    }
                }
            });

            validator.errorHandler.removeError(field, validator.settings.errorClass);

            // error handler
            if (!validateFlag) {
                if ($.type(($.validator.bubble)) === 'function') {
                    bubble = $.validator.bubble(errorMsg);
                } else {
                    bubble = validator.bubble(errorMsg);
                }

                validator.errorHandler.addError(field, validator.settings.errorClass, bubble);
            } else {
                validator.errorHandler.removeError(field, validator.settings.errorClass);
            }

            return validateFlag;
        },
        eventBind: function () {
            var field = $(this),
                fieldData = field.data();
                ev = parser.validateEvents(fieldData);

            if (ev) {
                return field.bind(ev, field.validate);
            } else {
                return;
            }
        }
    });

    // Constructor
    $.validator = function (options) {
        this.settings = $.extend(true, {}, $.validator.defaults, options);
    };

    $.extend($.validator, {
        // defaults -> settings
        defaults: {
            validators: [],
            messages: {},
            error: {
                require: 'This field is required',
                length: 'String Length Error',
                lengthMin: 'String Length Error',
                lengthMax: 'String Length Error',
                range: 'Range Error'
            },
            errorClass: 'error'
        },

        verifyGroup: function (selector) {
            var verifyFlag = true;
            $(selector).find('input, textarea').each(function () {
                var field = $(this);
                if (!field.validate()) {
                    verifyFlag = false;
                }
            });
            return verifyFlag;
        },

        // the validator instance can invoke the following function
        prototype: {
            bubble: function (errorMsg) {
                var html = '<p class="validate-tips">' + errorMsg + '</p>';

                return $(html);
            },
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
                    return fieldValue.length >= params.lengthMin;
                },

                lengthMax: function (fieldValue, params) {
                    if ($.type(params.lengthMax) === 'undefined') {
                        throw 'You should set `data-length-max` in the tag attr';
                    }
                    return fieldValue.length <= params.lengthMax;
                },

                range: function (fieldValue, params) {
                    if ($.type(params.rangeMin) === 'undefined' && $.type(params.rangeMax) === 'undefined') {
                        throw 'You should set `data-range-min` and `data-range-max` in the tag attr';
                    }
                    return fieldValue >= params.rangeMin && fieldValue <= params.rangeMax;
                },
            },
            errorHandler: {
                addError: function (field, errorClass, bubble) {
                    bubble.insertAfter(field);
                    field.addClass(errorClass);
                },
                removeError: function (field, errorClass) {
                    field.removeClass(errorClass);
                    field.next('.validate-tips').remove();
                }
            }
        }
    });

})(jQuery);
