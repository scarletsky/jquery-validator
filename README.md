jquery-validator
================

#NOTE: In fact, this plugin is being developed.

#NOTE: In fact, this plugin is being developed.

#Because this is very important, I MUST say twice.


## Basic Usage

1.Load the javascript file in the html.

```
<script src="src/validator.js"></script>
```

2.Add the `data-validators` and other `data-*` in the input / textarea tag

```
<input type="text"
       data-validators="require lengthMin lengthMax"
       data-length-min="5"
       data-length-max="11"
       data-msg-require="Please input your username"
       data-msg-length-min="Please input a num greater than 5"
       data-msg-length-max="Please input a num less than 11"
       data-err-require="Username should not be null"
       data-err-length-min="It MUST greater than 5"
       data-err-length-max="It MUST less than 11">
```

3.After that, you can run :

```
$('input').validate();
```

4.No more thing! That's ALL!

## Pull Requests and Issues are welcome.