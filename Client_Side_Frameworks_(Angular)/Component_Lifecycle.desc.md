## Objectives

- Explain what the component lifecycle is.
- Explain why the component lifecycle is important.
- Use the component lifecycle to manage the state of a React component.

## Introduction

As we build larger React applications that contain multiple components, there will be times where we want to change props, state or any other information depending on the component lifecycle. For example, You might want to per­form cer­tain actions when a new com­po­nent instance is ini­tial­ized or destroyed. You can read all about the various methods [here](https://facebook.github.io/react/docs/component-specs.html), but here are some methods we will discuss in more detail:

### componentWillMount
this method runs before the component mounts

### componentDidMount
this method runs after the component is mounted

Here is an example that will focus on the input of a component when mounted:

```js
    var App = React.createClass({
      getInitialState: function() {
        return {
          txt: ""
        };
      },
      componentDidMount: function(){
        ReactDOM.findDOMNode(this.refs.nameInput).focus();
      },
      update: function(e){
        this.setState({txt: e.target.value})
      },
      render:function(){
        return (
          <div>
            <input name="one" ref="nameInput" onChange={this.update} />
            <h1>{this.state.txt}</h1>
          </div>
          );
      }
    });

    ReactDOM.render(<App/>, document.getElementById('container'));

```

### componentWillUnmount
this method runs before the component will unmount

You can see these methods in action with this example:
```js
    var App = React.createClass({
      getInitialState: function(){
        return {
          text: ""
        }
      },

      componentWillMount: function(){
        console.log('WILL MOUNT JUST RAN!')
      },

      componentDidMount: function(){
        console.log('DID MOUNT JUST RAN!')
      },

      componentWillUnmount: function(){
        console.log('WILL UNMOUNT JUST RAN!')
      },

      handleChange: function(e) {
        this.setState({text: e.target.value});
      },

      remove: function(){
        ReactDOM.unmountComponentAtNode(document.getElementById('container'))
      },

      render: function() {
        return (
          <div>
            <h1>Hello world!</h1>
            <input onChange={this.handleChange} value={this.state.text} />
            <button onClick={this.remove}>Remove</button>
          </div>
        );
      }
    });

    ReactDOM.render(<App/>, document.getElementById('container'))
```

### getDefaultProps

Similar to `getInitialState`, this is another way to set initial properties on a component. This method is invoked once, before any components are created.

### componentWillReceiveProps

This method is invoked when a component is receiving new props. Useful if you need to set the state on a component based on some transition in the properties, as this method has access to both the new properties and the old ones.

### propTypes

This is an object that allows you to validate the types for your props when they are passed to your components. Useful for ensuring that the data types you expect are actually the ones you're getting.

**Exercise**

Modify the previous mounting/unmounting example in the following ways:

1. Use `getDefaultProps` to set a default property of `foo` in your component. Set it's value to be any string.

2. Determine the order in which the following methods are invoked: `componentDidMount`, `componentWillMount`, `getDefaultProps`, `getInitialState`.

3. Use `propTypes` to ensure that the `foo` property is a string. What happens if you try to set it equal to a number inside of `getDefaultProps`?

4. Add a child component called `Summary` to your application. It should have a length property which is equal to the lengh of the text in the `App` input. It should also indicate whether the last keypress by the user caused the length to decrease or not. (How could you use `componentWillReceiveProps` to accomplish this?)

## Questions

* Describe 5 methods in the component lifecycle
* What kinds of things would we do in the componentWillMount method?
* What kinds of things would we do in the componentDidMount method?
* What kinds of things would we do in the componentWillUnmount method?
* In [this](https://facebook.github.io/react/tips/initial-ajax.html) example, inside the `componentDidMount` method, we are using `.bind(this)`. What does this do? What happens if we omit the `bind` method?

## Assignment

- [Camera Shop - Part 4](https://github.com/gSchool/react-camera-view#part-4)

#### Bonus:

* Read [this](http://javascript.tutorialhorizon.com/2014/09/13/execution-sequence-of-a-react-components-lifecycle-methods/) article on the react component lifecycle
* Github Assignment
    - Create a component called GithubProfile
    - After your component mounts, make an ajax called `http://api.github.com/users/` + your github username.
    - Your user name should be injected utilizing props for the component: (`this.props.children`).
    - Your component should render the username and an image of the user  
    - You should use `componentDidMount` to make your AJAX call.
* OMDB Assignment
    - Create two components, MovieSearchForm and Movie
    - MovieSearchForm should render a form and the Movie component (which should have no information at first)
    - A user should be able to search for a title of the movie, and when they submit the form, an ajax call should be made to `http://omdbapi.com?t=` + the value of what the user searched.
    - The Movie component should then be updated with the title of the movie, the year and the image poster.
    - You do not **need** to use any component lifecycle methods, but you absolutely can.

    Here is what it the OMDB Assignment should look like:

    [![Gyazo](https://i.gyazo.com/cbf99774cb8a8bc7507ebad5e651dffc.gif)](https://gyazo.com/cbf99774cb8a8bc7507ebad5e651dffc)

## Resources

[https://gist.github.com/fay-jai/fc8a5093c0b5124d4b2d#file-react-lifecycle-parent-child-jsx](https://gist.github.com/fay-jai/fc8a5093c0b5124d4b2d#file-react-lifecycle-parent-child-jsx)
[http://tylermcginnis.com/an-introduction-to-life-cycle-events-in-react-js/](http://tylermcginnis.com/an-introduction-to-life-cycle-events-in-react-js/)
