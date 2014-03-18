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
$('input').validate();

/* validate all input */
$.each($('input'), function () {
    $(this).validate();  
});

/* bind events if you need */
$.each($('input'), function () {
    $(this).eventBind();  
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

