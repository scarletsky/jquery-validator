jquery-validator
================

## Quick Start

1.Load the javascript file in the html.

```html
<script src="src/jquery"></script>
<script src="src/validator.js"></script>
```

2.Add the `data-validators` and other `data-*` in the input / textarea tag

```html
<input type="text"
       data-validators="require lengthMin lengthMax"
       data-length-min="5"
       data-length-max="11"
       data-err-require="This field is require"
       data-err-length-min="It MUST greater than 5"
       data-err-length-max="It MUST less than 11">
```

3.After that, you can run :

```javascript
/* basic usage */
$('input').validate();  // return true if the value is valid else false

/* validate all input */
$.each($('input'), function () {
    $(this).validate();
});

/* bind events if you need */
$.each($('input'), function () {
    $(this).eventBind();  // the input field will invoke `$(this).validate()` when the event occur
});

```

You can also use `$.validator.verifyGroup('.verify-group')` to verify all the field in the `.verify-group`

```html
/* verify all input fields */
<div class="verify-group">
    <input type="text"
           data-validators="require lengthMin lengthMax"
           data-length-min="5"
           data-length-max="11"
           data-ev-validate="click blur"/>

    <input type="text"
           data-validators="require range"
           data-range-min="10"
           data-range-max="20"/>

    <textarea name="test-textarea"
              rows="8"
              cols="40"
              data-validators="require lengthMin"
              data-length-min="4"
              data-ev-validate="keyup"></textarea>
</div>
```

```javascript
$('#verify-group').click(function () {
    var result = $.validator.verifyGroup('.verify-group'); // it will return true when all fields are valid
    if (result) {
        $('form').submit();
    }
});
```

## Document

#### require

##### data-validators
The input field will be validate by these validators.

e.g. `data-validators="require length lengthMin lengthMax"`

#### options

##### data-`<validator>`
The rule will be used by validator.

e.g. `data-length="5"`

e.g. `data-length-min="3"`

e.g. `data-length-max="5"`

##### data-err-`<validator>`
The error message will show when the input value is invalid.

e.g. `data-err-require="Username is require!"`

e.g. `data-err-length="Please input 5 characters!"`

e.g. `data-err-length-min="hello world!"`

##### data-ev-validate
The input field will be validate when these events occur.

e.g. `data-ev-validate="click blur keyup"`

#### customize your bubble

```javascript
/* You can easily customize your bubble by override the default bubble function.*/
$.validator.bubble = function (errMsg) {
    var html = [
        '<div class="validate-tips">',
            '<div class="bubble-body">',
                errMsg,
            '</div>'
        '</div>'
    ];

    return $(html.join(''));
};
```
The **ONLY** thing you should know is that the bubble should wrapper by `class="validate-tips"`;

