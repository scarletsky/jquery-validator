jquery-validator
================

## Basic Usage

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
$('button#validate').click(function (e) {
    $.each($('input'), function () {
        $(this).validate();  
    })
});

/* bind events if you need */
$('button#validate').click(function (e) {
    $.each($('input'), function () {
        $(this).eventBind();  
    })
});
```

