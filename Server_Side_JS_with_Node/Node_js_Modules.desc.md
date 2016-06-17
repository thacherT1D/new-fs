## Objectives

- Explain what a Node.js module is.
- Split existing code into two modules.
- Export and require a function.
- Export and require an object.
- Explain what the three kinds of modules are.
- Explain what an Express router is.
- Explain why an Express router is useful.

## What's a Node.js module?

As far as the Node.js is concerned, you could write all of your JavaScript code in one file. But to humans, it's really hard to manage thousands of lines of code in a single file. For example, imagine you wanted to reuse a piece of code in another project, but it was buried on line 25,436 of some file. Your only recourse would be to copy that code and paste it into the other project's file. Modules are an elegant solution to this problem.

In Node.js, a **module** is just a file that contains JavaScript code. And the module system in Node.js allows you to take pieces of code, split them out into separate files, and easily reuse them in different places. For example, imagine you have a `main.js` module and an `arithmetic.js` module. In this example, the `main.js` module will require some functionality from the `arithmetic.js` module.

```javascript
'use strict';

var add = require('./arithmetic');
var result = add(1, 2);

console.log(result);
```

And the `arithmetic.js` module will export some functionality back to the `main.js` module.

**NOTE:** In Node.js, `module` is a global variable with a `exports` property that references an empty object by default.

```javascript
'use strict';

module.exports = function(a, b) {
	return a + b;
};
```

The function that's exported effectively replaces the `require()` function. Another way to think of this is that the `add` variable is assigned the value of the `module.exports` object.

### Exercise

Turn to a partner and, in your own words, explain what a Node.js module is. Explain to each other how the `module.exports` object works and how the `require()` function works.

## How do you split existing code into two modules?

Here are the steps to split existing code into two modules.

1. Identify which piece of code to export.
1. Create a new module.
1. Move that code to the new module.
1. Assign that code to the `module.exports` object.
1. Require the new module in the original module using the `require()` function.

Modules can export any value such as a function, an object, a string, a number, a boolean—anything.

### Export a function

To export a function, you simply assign the function to the `module.exports` object. This is exactly what you did in the first example.

Because the `require()` function just returns a value, and the `arithmetic.js` module exports a function, you could immediately invoke that function in the `main.js` module like this.

**NOTE:** Sometimes this is handy and sometimes this makes the code hard to read.

```javascript
'use strict';

var result = require('./arithmetic')(1, 2);

console.log(result);
```

### Export an object

To export an object, you simply assign the object to the `module.exports` object. Here's an updated `arithmetic.js` module that exports an object that contains an `add()` method.

```javascript
'use strict';

module.exports = {
	add: function(a, b) {
		return a + b;
	}
};
```

When requiring the module, you assign the required object to a variable and then access its properties. Here's an updated `main.js` module that requires the above `arithmetic.js` module.

```javascript
'use strict';

var arithmetic = require('./arithmetic');
var result = arithmetic.add(1, 2);

console.log(result);
```

Here, the `arithmetic` variable references the entire object that's being exported. And so the `add()` method references the function that's part of the object being exported.

When you're exporting objects, there are three ways you can go about it. The first way is to assign a new object to the `module.exports` property.

```javascript
'use strict';

// version 1
module.exports = {
	add: function(a, b) {
		return a + b;
	}
};
```

Because `module.exports` is an object by default, the second way is to assign a value directly to one of its properties.

```javascript
'use strict';

// version 2
module.exports.add = function(a, b) {
	return a + b;
};
```

And because `exports` as a shorthand for `module.exports`, the third way is to assign a value directly to one of its properties.

**NOTE:** In Node.js, `export` is a global variable that references the `module.export` object by default.

```javascript
'use strict';

// version 3
exports.add = function(a, b) {
	return a + b;
};
```

Each of the above versions of `arithmetic.js` are equivalent.

## What are the three kinds of modules?

There are three kinds of modules in the Node.js.

1. Core modules
1. NPM modules
1. File modules

### Core modules

These are the built-in modules in Node.js like `fs`, `http`, and `path`. You require these modules by their name only.

```javascript
var fs = require('fs');
var http = require('http');
var path = require('path');
```

### NPM modules

These are modules inside packages that can be downloaded from the [NPM registry](https://npmjs.org) using the `npm install` command. To see where NPM modules are installed, run the following commands in the Terminal.

```shell
npm -g root
npm root
```

NPM modules are required just like core modules.

```javascript
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
```

Remember, the above `require()` expressions won't work unless you've installed these NPM modules globally with `npm install -g` or locally with `npm install`.

### File modules

These are modules that you've created on your own, such as the `arithmetic.js` module. When creating a file module, you add values to a `module.exports` object using one of the above mentioned techniques.

When requiring a file module, you provide a path to the module, minus the `.js` extension. These paths must start with `/`, `./`, or `../` to indicate where on the filesystem Node.js can find the file module.

```javascript
var myModule1 = require('/myModule1');   // absolute path
var myModule2 = require('./myModule2');  // same path as the current module
var myModule3 = require('../myModule3'); // parent path of the current module
```

## What's an Express `router`?

An **Express router** is a proxy that you can use for attaching groups of middleware. Once middleware has been attached to the router, it can be attached to an Express application itself.

To get see an Express router in action, create a new `hello_router` project.

```shell
mkdir hello_router
cd hello_router
```

Then, create a `greet.js` module and `server.js` module.

```shell
touch greet.js
touch server.js
```

Next, use NPM to initialize a `package.json` file.

```shell
npm init
```

Then, use NPM to install the `express` module locally and save it as dependency in the `package.json` file.

```shell
npm install --save express
```

Next, open the project in your text editor.

```shell
atom .
```

In the `greet.js` module, use an Express router to attach a group of greeting middleware. After the middleware has been attached, export the Express router.

```javascript
'use strict';

var express = require('express');
var router = express.Router();

router.get('/english', function(req, res) {
  res.send('Hello world');
});

router.get('/spanish', function(req, res) {
  res.send('Hola mundo');
});

module.exports = router;
```

Inside the `server.js` module, require the `greet.js` module and attach the router to an Express application. An Express router behaves like middleware itself, so you can use it as an argument to the `app.use()` method.

```javascript
'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

var greet = require('./greet');

app.use(greet);

app.listen(port, function() {
  console.log('Listening on port', port);
});
```

Save both modules and run the server with the `nodemon` command.

```shell
nodemon server.js
```

And you should see something like this.

![](https://i.imgur.com/6WPuMIc.png)

In a separate Terminal tab, send an HTTP request to the server.

```shell
http GET localhost:8000/english
```

And you should see something like this.

![](https://i.imgur.com/lZ3a5ei.png)

Then, send another HTTP request to the server.

```shell
http GET localhost:8000/spanish
```

And you should see something like this.

![](https://i.imgur.com/K2k51I2.png)

## Why is an Express router useful?

An Express router is useful because it allows you to organize a project's RESTful routes into separate, resource-specific file modules. For example, imagine your boss wants you to expand the `party` project to manage the following resources.

- Activities
- Drinks
- Foods
- Guests
- Prizes

Now, Node.js doesn't care if all the RESTful routes live in the same file. But it might be hard for you, as the developer, to build and maintain thousands of lines of code in a single file.

However, by using an Express router, you can split the RESTful routes for each resource into separate file modules. For example, it's common for an Express project to have a `routes` directory where all the route-related file modules can be stored.

```text
├── routes
│   ├── activities.js
│   ├── drinks.js
│   ├── foods.js
│   ├── guests.js
│   └── prizes.js
└── server.js
```

Each route-based file module would define the RESTful routes for their respective resource.

| RESTful Routes | File Modules           |
|----------------|------------------------|
| `/activities`  | `routes/activities.js` |
| `/drinks`      | `routes/drinks.js`     |
| `/foods`       | `routes/foods.js`      |
| `/guests`      | `routes/guests.js`     |
| `/prizes`      | `routes/prizes.js`     |

And a `server.js` module would require and attach all the resource-specific routers as well as any project-wide middleware.

```javascript
'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

var morgan = require('morgan');
var bodyParser = require('body-parser');

app.use(morgan('short'));
app.use(bodyParser.json());

var activities = require('./routes/activities');
var drinks = require('./routes/drinks');
var foods = require('./routes/foods');
var guests = require('./routes/guests');
var prizes = require('./routes/prizes');

app.use(activities);
app.use(drinks);
app.use(foods);
app.use(guests);
app.use(prizess);

app.use(function(req, res) {
  res.sendStatus(404);
});

app.use(function(err, req, res, next) {
	console.error(err);
	res.sendStatus(500);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
```

This kind of project structure can help developers understand and maintain a correct middleware chain while reducing the risk for accidental bugs and duplicate code.

## How do you use the Express router?

```javascript
'use strict';

var fs = require('fs');
var path = require('path');
var guestsPath = path.join(__dirname, '../guests.json');

var express = require('express');
var router = express.Router();

router.get('/guests', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(err, guestsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var guests = JSON.parse(guestsJSON);

    res.send(guests);
  });
});

router.get('/guests/:id', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(err, newGuestsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var id = Number.parseInt(req.params.id);
    var guests = JSON.parse(newGuestsJSON);

    if (id < 0 || id >= guests.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    res.set('Content-Type', 'text/plain');
    res.send(guests[id]);
  });
});

router.post('/guests', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(readErr, guestsJSON) {
    if (readErr) {
      console.error(readErr.stack);
      return res.sendStatus(500);
    }

    var guests = JSON.parse(guestsJSON);
    var guest = req.body.name;

    if (!guest) {
      return res.sendStatus(400);
    }

    guests.push(guest);

    var newGuestsJSON = JSON.stringify(guests);

    fs.writeFile(guestsPath, newGuestsJSON, function(writeErr) {
      if (writeErr) {
        console.error(writeErr.stack);
        return res.sendStatus(500);
      }

      res.set('Content-Type', 'text/plain');
      res.send(guest);
    });
  });
});

router.put('/guests/:id', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(readErr, guestsJSON) {
    if (readErr) {
      console.error(readErr.stack);
      return res.sendStatus(500);
    }

    var id = Number.parseInt(req.params.id);
    var guests = JSON.parse(guestsJSON);

    if (id < 0 || id >= guests.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    var guest = req.body.name;

    if (!guest) {
      return res.sendStatus(400);
    }

    guests[id] = guest;

    var newGuestsJSON = JSON.stringify(guests);

    fs.writeFile(guestsPath, newGuestsJSON, function(writeErr) {
      if (writeErr) {
        console.error(writeErr.stack);
        return res.sendStatus(500);
      }

      res.set('Content-Type', 'text/plain');
      res.send(guest);
    });
  });
});

router.delete('/guests/:id', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(readErr, guestsJSON) {
    if (readErr) {
      console.error(readErr.stack);
      return res.sendStatus(500);
    }

    var id = Number.parseInt(req.params.id);
    var guests = JSON.parse(guestsJSON);

    if (id < 0 || id >= guests.length || Number.isNaN(id) ) {
      return res.sendStatus(404);
    }

    var guest = guests.splice(id, 1)[0];
    var newGuestsJSON = JSON.stringify(guests);

    fs.writeFile(guestsPath, newGuestsJSON, function(writeErr) {
      if (writeErr) {
        console.error(writeErr.stack);
        return res.sendStatus(500);
      }

      res.set('Content-Type', 'text/plain');
      res.send(guest);
    });
  });
});

module.exports = router;
```

```javascript
'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

var morgan = require('morgan');
var bodyParser = require('body-parser');

var guests = require('./routes/guests');

app.disable('x-powered-by');
app.use(morgan('short'));
app.use(bodyParser.json());

app.use(guests);

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
```

## Resources

### Node.js Modules Part 1

<iframe src="https://player.vimeo.com/video/142099942?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

### Node.js Modules Part 2

<iframe src="https://player.vimeo.com/video/142102383?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>