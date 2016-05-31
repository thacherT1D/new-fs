## Objectives

- Explain what logging vs debugging is.
- Explain when you use logging vs debugging.
- Use Chrome's debugger to visualize your code.
- Debug a JavaScript program that throws an error.

## What's logging vs debugging?

There are many ways to find and resolve bugs in a computer program, but the two most common techniques are logging and debugging.

**Logging** is the act of recording events or computed values that occur within a program. In the browser, these records can be displayed in the console using the `console.log()` function.

**Debugging** is the act of using a dedicated tool, called a debugger, to pause and step through a running program and inspect its behavior. A debugger is a powerful tool that helps developers visualize how a running program executes. For example, create an `lunch.html` file and add the following code to it.

```html
<script>
  var food = 'sandwich';

  alert("I'm having a " + food + " for lunch.");
</script>
```

And then step through the following instructions to see Chrome's [built-in debugger](https://developer.chrome.com/devtools/docs/javascript-debugging) in action.

1. Open the `lunch.html` file in Chrome.
1. Open the Chrome Developer Tools by pressing `Command + Option + I`.
1. Click on the Sources tab.
1. Select the `lunch.html` file from the file tree on the left.
1. Add a breakpoint to line 1 by clicking on the line number in the gutter.
1. Refresh the page the engage the debugger.

A **breakpoint** tells the JavaScript interpreter to pause a running JavaScript program at that line number. Once a program is paused, you can inspect the variables inside the program's scope at that moment in time. You can also step through the program and watch how the variables change when each line is executed.

**NOTE:** When paused, you can hover over a variable to see what it contains.

## When do you use logging vs debugging?

So far, you've probably used logging way more than debugging for your own programs. Logging is great tool for finding and fixing bugs in smaller programs. But once your programs become larger and more complex, you may want to reach for debugging as it'll help you visualize how scope changes over time.

## How do you use Chrome's debugger to visualize your code?

Inside the Chrome Developer Tools, the Sources tab has six clickable icons that represent the different actions the debugger can take.

| Action      | Description                                                    |
|-------------|----------------------------------------------------------------|
| Resume      | Resume execution until the next breakpoint.                    |
| Step over   | Execute the current line and then pause on next line.          |
| Step into   | Jump into the function about to be invoked.                    |
| Step out    | Execute the current function and pause where it was invoked.   |
| Breakpoints | Disable or enable all set breakpoints.                         |
| Exceptions  | Toggle engaging the debugger when the program throws an error. |

Using these debugger actions, we'll solve a few common JavaScript technical interview questions.

### The `reverse()` function

Write a function called `reverse` that accepts a string as an argument and returns a new string with all characters reversed. For example:

```javascript
reverse('abcdef'); // 'fedcba'
```

Start off by creating an `reverse.html` file with the following code template.

```html
<script>
  var reverse = function(input) {
    // Solution here
  };

  reverse('a');
</script>
```

### The `isPalindrome()` function

Write a function called `isPalindrome` that accepts a string as an argument and returns `true` if the string is a palindrome otherwise `false`. For example:

```javascript
isPalindrome('tacocat');  // true
isPalindrome('abcdef');   // false
```

Start off by creating an `is_palindrome.html` file with the following code template.

```html
<script>
  var isPalindrome = function(input) {
    // Solution here
  };

  isPalindrome('a');
</script>
```

### The `uniq()` function

Write a function called `uniq` that accepts an array as an argument and returns a new array with all duplicate elements removed. For example:

```javascript
uniq(['a', 'b', 'c', 'a']);  // ['a', 'b', 'c']
```

Start off by creating an `uniq.html` file with the following code template.

```html
<script>
  var uniq = function(input) {
    // Solution here
  };

  uniq(['a']);
</script>
```

## How do you debug a JavaScript program that throws an error?

When a JavaScript throws an error, the browser will display information about it in the Console tab. The most important thing to do to start addressing it is **read it**. Look at the type of error, the error message, and the line number where the error occurred. Then take a step back and think about what might have caused the error. The more thinking you can do before jumping in and trying to debug the error, the faster you'll be able to fix it.

Here are the kinds of errors you'll likely encounter and why they happen.

### `TypeError`

Thrown when a variable or parameter is not of a valid type. For example:

```javascript
var person;
person.name;
```

### `SyntaxError`

Thrown when the JavaScript syntax is wrong. For example:

```javascript
var greet = function {
  console.log('Hello world');
};
```

### `ReferenceError`

Thrown when attempting to access something that has not been declared. For example:

```javascript
wishfulThinking();
```

### `RangeError`

Thrown when a recursive function—a function that calls itself—call itself too many times without returning. For example:

```javascript
var factorial = function(n) {
  n * factorial(n - 1);
}

factorial(9999999);
```

**NOTE:** This is often referred to as a stack overflow.

Check out all the [error types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) on the Mozilla Developer Network.

## Resources

- https://developer.chrome.com/devtools/docs/javascript-debugging
- http://discover-devtools.codeschool.com/
- http://commandlinefanatic.com/cgi-bin/showarticle.cgi?article=art035
- https://developer.chrome.com/devtools/docs/shortcuts