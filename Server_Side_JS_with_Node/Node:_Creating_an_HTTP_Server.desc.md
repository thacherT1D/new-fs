# Objectives
By the end of this lesson, you should be able to...

- Describe the purpose of a web server
- Identify the parts of a Uniform Resource Locator (URL)
- Describe the parts of a URL
- Describe the HTTP protocol
- Identify the components of a request and response
- Understand that HTTP requests and responses are sent as strings
- Create an HTTP server with Node's `http` module
- Identify the two parts of a route (method and path)
- Access the parts of a URL with the url module

## What's a Web Server
Before browsers, before JavaScript, and believe it or not, before HTML, the Internet was originally designed as a file server. When a user wanted a file, they would use a terminal to submit a request, which included the location of the file--IP address and name of desired file--on a remote computer. 

The Internet that we now use is built on this foundation. The methods, however, have evolved. Instead of a terminal being the primary client, most users now use a web browser, such as the ones on their laptops and mobile devices. The request for a resource, such as a file, is submitted as a URL in a web browser and forwarded to a web server. The URL `https://www.yahoo.com/index.html`, for instance, would search for a server with the host name of `www.yahoo.com` and a file named `/index.html` would be returned if found.

## The Syntax of a Uniform Resource Locator (URL)
All resource on the Internet is associated with a global identifer: a Uniform Resource Locator (URL). Each URL, furthmore, [conforms to a particular syntax](https://en.wikipedia.org/wiki/Uniform_Resource_Locator#Syntax)

Let's explore a description of the syntax from the perspective of [how Googlers talk about parts of a URL](https://www.mattcutts.com/blog/seo-glossary-url-definitions/).

## Underlying Parts of a URL
Some parts of a URL can be understood based on an initil read, such as a query string. However, further elaboration would help with two parts: hostname (with IP address) and protocol. The latter will be discussed during the next section; the former will be discussed now.

#### IP Address
An IP address determines the location of a machine on a network. This is analogous to how a home can be found with an address. In regards to the Internet, an IP address takes the form of `XXX.XXX.XXX.XXX`, where each grouping of `XXX` (octet) is a value that is >= `0` && <= `255`. In other words, each octet can be one of 256 values. 

#### Domain Name System (DNS)
The[DNS](http://www.webopedia.com/TERM/D/DNS.html) maps domain names (e.g., `google.com`) to IP addresses (like `216.58.217.46`) for improved user experience--words are easier to remember. In very general terms, a DNS could be conceptualized as a large JavaScript object--keys are the domain names and values are the corresponding IP addresses.

## The HTTP
The most important component of a web URL is arguably the protocol: A set of rules that define the communication between a client and a server. For websites, the protocol is often [HTTP](https://en.wikipedia.org/wiki/Hypertext). Many of you may have noticed this protocol being used when you visit your favorite websites. There's a lot to learn about HTTP, but we'll focus our attention on HTTP's use of a request and response model.

#### HTTP Request
A client sends an HTTP request in many ways, including entering a URL in an address bar of a web browser, submiting a form, or clicking a hyperlink. When any of these three events occur, a browser submits a request with three components:

- request line (includes a method)
- headers
- body

#### HTTP Response
In turn, a request will return a response with three components:

- response line (includes a [status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes))
- headers
- body

## Create an HTTP server with Node.js
Node includes a module for creating an HTTP server:

```js
// requires Node's `http` module
var http = require('http');

// Declares a function that gets invoked on every request
function handleRequest(req, res) {
  res.setHeader("Content-Type", "text/plain");
  res.end("Cho, I'll take two packets of sugar.");
}

// Creates an instance of a server with our callback
var server = http.createServer(handleRequest);

// Binds our server to a port, host, and then logs a message
server.listen(8080, 'localhost', function() {
  console.log("Listening on port 8080");
});
``` 

To run our server, we need to type into a terminal `node` and the `file_name` containing our code:

```bash
node index.js
```

Now open a browser to [localhost:8080](http://localhost:8080/).

##  Describe the Benefit of Routes
At this moment, our HTTP server has one request handler that handles all incoming requests. Regardless of the URL associated with the request, every response from the server returns a string with the same content: "Cho, I'll take two packets of sugar." 

Our web server would become more useful if we could return a response that would correspond to a particular request. We would benefit, in other words, from defining routes that handle specific requests. A route is composed of many things, such as an HTTP verb (e.g., `GET`), and an optional path (`/faq`).

## Access the components of a URL with the url module
The infrastructure of the Internet handles the routing of our request from our browser to our server. However, we still need to handle how a request is routed relative to a URL's path and query string. To help us access this information, we can use our `req` (request) variable. In the code the below, you'll see that we are using `req.url` to check the url of the user request. What can you deduce about `req` based on this syntax? `req` is an object. It's a huge object with tons of information. Since we are calling the `url` property from that object, it makes sense to expect that our `req` object has a `url` property whose value is the user's requested url. Let's take a look.

__NOTICE:__ We are going to `console.log` our `req` argument. You will see that print out in the terminal window where you are running your server. Search through the object and find the property `url` whose value is our request url.

__YOU WILL NEED TO RESTART YOUR SERVER AND REFRESH YOUR PAGE EVERY TIME YOU MAKE CHANGES__ 

```javascript
var http = require('http');

function handleRequest(req, res) {
  console.log(req);
  if (req.url === '/special-message') {
    res.end("You're SPECIAL?!");
  } else if (req.url === '/non-special-message') {
    res.end("You're boring!");
  } else {
    res.end(req.url);  
  }
};

var server = http.createServer(handleRequest);

server.listen(8080, function() {
  console.log("Listening...")
});
```
Using an `if` statement works for our two routes, but it doesn't scale well if we have many routes. Instead, we can create a file named `routes.js` and use an object to define routes in a more scalable way.

```javascript
// routes.js

var routes = {
  '/special-message': function(req, res) {
    res.end("You're SPECIAL");
  },
  
  '/non-special-message': function(req, res) {
    res.end("You're boring!");
  }
};

module.exports = routes;
```

```javascript
// index.js
var http = require('http');
var routes = require('./routes');

function handleRequest(req, res) {
  if(routes[req.url] === undefined) {
    res.end("404, no such route");
 } else {
   routes[req.url](req, res);
 }
}

var server = http.createServer(handleRequest);

server.listen(8080, function() {
  console.log("Listening...");
});
```

If we submit a request to either `localhost:8080/special-message` or `localhost:8080/non-special-message`, we still receive our intended response.

### Exercises: 
- [Building a simple HTTP server](https://github.com/gSchool/node-http-server-intro).

- [Parsing query strings](https://github.com/gSchool/node-query-string-parsing).

### Reading
[The difference between the Web and Internet](http://www.webopedia.com/DidYouKnow/Internet/Web_vs_Internet.asp)

### Video
[How does the Internet work?](https://www.youtube.com/watch?v=e4S8zfLdLgQ)