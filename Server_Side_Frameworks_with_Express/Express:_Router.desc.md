# Express Router

### Objectives

* Describe RESTful principles
* List the seven conventional RESTful routes for a resource
* Use method-override to implement put and delete routes
* Use Express routers to effectively organize code

### Key Terms

* REST - REpresentational State Transfer
* Routes - The path / pattern from the HTTP Request
* CRUD - Create, Read, Update, Delete


### The Express Router

The express router allows us break up the routes into separate modules.  Every express app has a router built into it.  For example, the following code is using the router:

```
var express = require("express"),
    app = express();

app.get('/', function(req, res) {
  res.send("Hello World");
});
```

The main problem with this above style of creating `app.js` is that the amount of code in one file quickly grows very large.  Instead, we can use `express.Router` to create a separate "mini-app" that our main express app can use.

To illustrate how the express router is used, let's create an application:

### Setup Your App

```
mkdir animals
cd animals
npm init --yes
echo node_modules > .gitignore
git init
git add .
git commit -m "Initial commit"
```

Now, let's add the dependencies we need to create an express app:

```
npm install --save express ejs pg body-parser morgan method-override
```

Before we start writing the application logic, let's setup our database. First create a seed.sql file with the following statements:

```
CREATE TABLE puppies (id serial, name varchar(255));
INSERT INTO puppies (name) VALUES ('george'), ('max'), ('bob');
```

Now create an animals db and import the seed data:

```
createdb animals
psql animals < seed.sql
```

Next, change the `package.json` to use `app.js` as the `main` entry point to the application.

Now, create a simple puppies express app.  Our `app.js` looks like this:

```
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    pg = require('pg'),
    db_url = process.env.DATABASE_URL || 'postgres://localhost:5432/animals';



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(methodOverride('_method'));

app.get('/puppies', function(req, res) {
  pg.connect(db_url, function(err, client, done){
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM puppies', function(err, data){
      if(err) {
        return console.error('error querying database', err);
      }
      res.render('puppies/index', {puppies: data.rows});
    });
  });
});

app.get('/puppies/new', function(req, res) {
  res.render('puppies/new');
});

app.get('/puppies/:id', function(req, res) {
  pg.connect(db_url, function(err, client, done){
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM puppies WHERE id = $1', [req.params.id], function(err, data){
      if(err) {
        return console.error('error querying database', err);
      }
      var puppy = data.rows[0];
      if (!puppy) {
        res.redirect("/puppies");
      }
      res.render('puppies/show',  {puppy: puppy});
    });
  });
});

app.get('/puppies/:id/edit', function(req, res) {
  pg.connect(db_url, function(err, client, done){
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM puppies WHERE id = $1', [req.params.id], function(err, data){
      if(err) {
        return console.error('error querying database', err);
      }
      var puppy = data.rows[0];
      if (!puppy) {
        res.redirect("/puppies");
      }
      res.render('puppies/edit',  {puppy: puppy});
    });
  });
});

app.put('/puppies/:id', function(req, res) {
  pg.connect(db_url, function(err, client, done){
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('UPDATE puppies SET name = $1 WHERE id = $2', [req.body.puppy.name, req.params.id], function(err, data){
      if(err) {
        return console.error('error querying database', err);
      }
      res.redirect('/puppies');
    });
  });
});

app.post('/puppies', function(req, res) {
  pg.connect(db_url, function(err, client, done){
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('INSERT INTO puppies (name) VALUES ($1)', [req.body.puppy.name], function(err, data){
      if(err) {
        return console.error('error querying database', err);
      }
      res.redirect('/puppies');
    });
  });
});

app.delete('/puppies/:id', function(req, res){
  pg.connect(db_url, function(err, client, done){
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('DELETE FROM puppies WHERE id = $1', [req.params.id], function(err, data){
      if(err) {
        return console.error('error querying database', err);
      }
      res.redirect('/puppies');
    });
  });
});

app.listen(3000, function() {
  console.log("Listening on port 3000");
});
```

We also want to add the views for the puppies index and the puppies new page.  In the root of the application directory create the following folders: `views/puppies`.  Inside the puppies directory, create `index.ejs`, `show.ejs`, `new.ejs`, and `edit.ejs`.

Here is the contents of `index.ejs`:

```
<!DOCTYPE html>
<html lang="en">
  <head>
  </head>
  <body>
    <h1>All the Puppies</h1>
    <ul>
    <% puppies.forEach(function(pup) { %>
      <li>
        <a href="/puppies/<%= pup.id %>">
          <%= pup.name %>
        </a>
      </li>
    <% }); %>
    </ul>

    <a href="/puppies/new">Add a Puppy</a>
  </body>
</html>
```
Here is the contents of `show.ejs`:

```
<!DOCTYPE html>
<html lang="en">
  <head>
  </head>
  <body>
    <h1>View a Puppy</h1>

    <p>
      <%= puppy.name %> is <%= puppy.name %>
    </p>
    <p>
      <a href="/puppies/<%= puppy.id %>/edit">Edit Puppy</a>
    </p>

    <a href="/puppies">Home</a>
  </body>
</html>

```

Here is the contents of `new.ejs`

```
<!DOCTYPE html>
<html lang="en">
  <head>
  </head>
  <body>
    <h1>Add a Puppy</h1>

    <form method="POST" action="/puppies">
      <div>
        <label>Puppy Name
          <input name="puppy[name]" type="text">
        </label>
      </div>

      <div>
        <button type="submit">Add Puppy</button>
      </div>
    </form>

    <a href="/puppies">Home</a>
  </body>
</html>
```

Here is the contents of `edit.ejs`

```
<!DOCTYPE html>
<html lang="en">
  <head>
  </head>
  <body>
    <h1>Edit a Puppy</h1>

    <form method="POST" action="/puppies/<%= puppy.id %>?_method=put">
      <div>
        <label>Puppy Name
          <input name="puppy[name]" type="text" value="<%= puppy.name %>">
        </label>
      </div>

      <div>
        <button type="submit">Update Puppy</button>
      </div>
    </form>
    <form method="POST" action="/puppies/<%= puppy.id %>?_method=delete">
      <div>
        <button type="submit">Delete Puppy</button>
      </div>
    </form>

    <a href="/puppies">Home</a>
  </body>
</html>
```

### REST

It is important to note that the app we are creating uses RESTful routes.  [This article has a great definition of how to design a RESTful API](http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api#restful).

The take away for all of those points are the following:

* The HTTP spec should be used as it was intended when designing your app.
* Always use the verb GET only for getting data.  GET requests should never change state on the server. ([Idempotence](https://en.wikipedia.org/wiki/Idempotence) is a property meaning that the result of an operations is the same whether it's run once or 500 times.)
* HTTP is always stateless, so a request to the server should fully encapsulate what to do.  A request should not depend on any previous or subsequent request.
* The RESTful routes should be nouns, not verbs.  For example, the request to get a puppy with id=2 should be `GET /puppies/2`, not `GET /getpuppies?id=2`
* Caching should be used correctly to make your application more performant.

Here is a list of conventions for REST on a resource puppies:

| HTTP Verb | Route             | Template File Name |
|-----------|-------------------|--------------------|
| GET       | /puppies          | index.ejs          |
| POST      | /puppies          | N/A                |
| GET       | /puppies/new      | new.ejs            |
| GET       | /puppies/:id/edit | edit.ejs           |
| GET       | /puppies/:id      | show.ejs           |
| PUT       | /puppies/:id      | N/A                |
| PATCH     | /puppies/:id      | N/A                |
| DELETE    | /puppies/:id      | N/A                |

__EXERCISE__

* Notice that our app is using REST to define the routes for puppies.  What makes the routes RESTful?
* Find examples of other apps or APIs online that use RESTful routing.
* Diagram the HTTP request/response flow of the puppies app.  Diagram the following path: create a puppy, see the new puppy in the list of puppies, update the newly created puppy, see the update in the list of puppies.

## Router

Now that we have a working puppies app, our `app.js` file is starting to get large.  In a bigger application, it would quickly get out of hand having all of the code in one file.  Separating out your routes is one way to rewrite your code to make it more modular.  Let's start by integrating the router into `app.js`

First, create a variable for the router:

```
var router = express.Router();
```

__EXERCISE__

Take a look at the [express guide for routing](http://expressjs.com/en/guide/routing.html) and the [express docs on the router](http://expressjs.com/en/api.html#router).

* What type is the `router` variable we created above?
* What is router useful for?
* Name at least 3 functions available to the router variable.
* Fill in the blank, a router is a mini _____________.

![](http://www.pawderosa.com/images/puppies.jpg)

__SOLUTION__

A call to `express.Router()` returns a new instance of a router.  It is a function.  It is useful for creating a set of middleware and routes separate from the app itself.  That is why an intance of a router is like a "mini-applicaiton".  It has functions just like an express app. For example:  `use`, `get`, `post`, `put`, `patch`, `delete`, etc.

To rewrite our app, we need to replace the app variable with the router that was created.  Notice that the code removes the resource we are making a get request for:

```
router.get('/', function(req, res) {
  res.render('puppies/index', {puppies: puppies});
});
```

In other words, `app.get('/puppies', ...` becomes `router.get('/', ...`.

__EXERCISE__

What should the following routes be changed to in order to use the router?

* `app.get('/puppies', ...`
* `app.get('/puppies/new',  ...`
* `app.get('/puppies/:id/edit', ...`
* `app.put('/puppies/:id', ...`
* `app.post('/puppies', ...`

![](http://theprojectheal.org/wp-content/uploads/2016/01/Aaaaaawwwwwwwwww-Sweet-puppies-9415255-1600-1200.jpg?b57298)

__SOLUTION__

* `app.get('/puppies', ...`  => `router.get('/' ...`
* `app.get('/puppies/new',  ...` => `router.get('/new', ...`
* `app.get('/puppies/:id/edit', ...` => `router.get('/:id/edit', ...`
* `app.put('/puppies/:id', ...` => `router.put('/:id', ...`
* `app.post('/puppies', ...` => `router.post('/', ...`

Now that we have replaced the `app` with the router, the app does not know anything about the routes we just create. We need to tell the app to use the router and mount those routes to a specific path.  To mount the path, use `app.use`:

```
app.use('/puppies', router);
```

Now that the application knows about a route for `/puppies` it will forward all requests to `/puppies` to the router.  So, `/puppies` will go to the router, `/puppies/5/edit` will go to the router, and `/puppies/path/unhandled` will go to the router.  Here is the entire `app.js` file with the change:

```javascript
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    pg = require('pg'),
    db_url = process.env.DATABASE_URL || 'postgres://localhost:5432/animals';

var router = express.Router();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(methodOverride('_method'));


router.get('/puppies', function(req, res) {
  pg.connect(db_url, function(err, client, done){
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM puppies', function(err, data){
      if(err) {
        return console.error('error querying database', err);
      }
      res.render('puppies/index', {puppies: data.rows});
    });
  });
});

router.get('/puppies/new', function(req, res) {
  res.render('puppies/new');
});

router.get('/puppies/:id', function(req, res) {
  pg.connect(db_url, function(err, client, done){
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM puppies WHERE id = $1', [req.params.id], function(err, data){
      if(err) {
        return console.error('error querying database', err);
      }
      var puppy = data.rows[0];
      if (!puppy) {
        res.redirect("/puppies");
      }
      res.render('puppies/show',  {puppy: puppy});
    });
  });
});

router.get('/puppies/:id/edit', function(req, res) {
  pg.connect(db_url, function(err, client, done){
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM puppies WHERE id = $1', [req.params.id], function(err, data){
      if(err) {
        return console.error('error querying database', err);
      }
      var puppy = data.rows[0];
      if (!puppy) {
        res.redirect("/puppies");
      }
      res.render('puppies/edit',  {puppy: puppy});
    });
  });
});

router.put('/puppies/:id', function(req, res) {
  pg.connect(db_url, function(err, client, done){
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('UPDATE puppies SET name = $1 WHERE id = $2', [req.body.puppy.name, req.params.id], function(err, data){
      if(err) {
        return console.error('error querying database', err);
      }
      res.redirect('/puppies');
    });
  });
});

router.post('/puppies', function(req, res) {
  pg.connect(db_url, function(err, client, done){
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('INSERT INTO puppies (name) VALUES ($1)', [req.body.puppy.name], function(err, data){
      if(err) {
        return console.error('error querying database', err);
      }
      res.redirect('/puppies');
    });
  });
});

router.delete('/puppies/:id', function(req, res){
  pg.connect(db_url, function(err, client, done){
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('DELETE FROM puppies WHERE id = $1', [req.params.id], function(err, data){
      if(err) {
        return console.error('error querying database', err);
      }
      res.redirect('/puppies');
    });
  });
});

app.listen(3000, function() {
  console.log("Listening on port 3000");
});
```

### Separating Routes, Creating your Own Module

You may have noticed in the router solution, that all of the router code for puppies is now independent of the `app`.  The only line of code were the app interacts with the router is `app.use('/puppies', router);`.  Let's make our own module that we can require.

First, create a new directory in the route of your project called `routes`.

Next, create a file in routes directory called `puppies.js`.  Move all of the code associated with the puppies routes into the `puppies.js` file.  Now we need to add a few things to this file.  First, we need to require express and create a new router.  Then, at the bottom of the file we need to use module.exports to export the router we just created.  Your code should look like this for `puppies.js`:

```javascript
var express = require('express'),
    router = express.Router(),
    pg = require('pg'),
    db_url = process.env.DATABASE_URL || 'postgres://localhost:5432/animals';

router.get('/', function(req, res) {
  pg.connect(db_url, function(err, client, done){
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM puppies', function(err, data){
      if(err) {
        return console.error('error querying database', err);
      }
      res.render('puppies/index', {puppies: data.rows});
    });
  });
});

router.get('/new', function(req, res) {
  res.render('puppies/new');
});

router.get('/:id', function(req, res) {
  pg.connect(db_url, function(err, client, done){
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM puppies WHERE id = $1', [req.params.id], function(err, data){
      if(err) {
        return console.error('error querying database', err);
      }
      var puppy = data.rows[0];
      if (!puppy) {
        res.redirect("");
      }
      res.render('puppies/show',  {puppy: puppy});
    });
  });
});

router.get('/:id/edit', function(req, res) {
  pg.connect(db_url, function(err, client, done){
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM puppies WHERE id = $1', [req.params.id], function(err, data){
      if(err) {
        return console.error('error querying database', err);
      }
      var puppy = data.rows[0];
      if (!puppy) {
        res.redirect("/puppies");
      }
      res.render('puppies/edit',  {puppy: puppy});
    });
  });
});

router.put('/:id', function(req, res) {
  pg.connect(db_url, function(err, client, done){
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('UPDATE puppies SET name = $1 WHERE id = $2', [req.body.puppy.name, req.params.id], function(err, data){
      if(err) {
        return console.error('error querying database', err);
      }
      res.redirect('/puppies');
    });
  });
});

router.post('/', function(req, res) {
  pg.connect(db_url, function(err, client, done){
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('INSERT INTO puppies (name) VALUES ($1)', [req.body.puppy.name], function(err, data){
      if(err) {
        return console.error('error querying database', err);
      }
      res.redirect('/puppies');
    });
  });
});

router.delete('/:id', function(req, res){
  pg.connect(db_url, function(err, client, done){
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('DELETE FROM puppies WHERE id = $1', [req.params.id], function(err, data){
      if(err) {
        return console.error('error querying database', err);
      }
      res.redirect('/puppies');
    });
  });
});

module.exports = router;
```

Now that all of the logic for the route is in `puppies.js`, we need to update `app.js` to require the routes:

```javascript
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    methodOverride = require('method-override');

var puppies = require('./routes/puppies');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(methodOverride('_method'));

app.use('/puppies', puppies);

app.listen(3000, function() {
  console.log("Listening on port 3000");
});
```

__EXERCISE__

* Add another router module for kittens.  Give the kittens a kitten specific property, like indoor or outdoor.  Add the cat routes to your animal app.  Make to create a separate module for kittens.
* Use partials to remove the duplicated html from the views
* Remove the database specific code in the routes to simplify how you make queries