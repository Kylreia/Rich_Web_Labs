# Lab 4 Overview
1. Convert your notes application from lab 1 to use a react application: notes-app folder
2. Integrate some external functionality or API into your application: API to handle requests such as POST, GET, DELETE, etc from the application
3. Extend your application with additional functions – be creative: server that lets the user store their notes in a database; any changes made in the application will reflect in the server, which can be reloaded for future use

# Answers to exercises in Lab 4
# Q.1 Explain using code examples what is meant by props and state in React JS?
Check example.js for a code example. Properties are utilised to pass data from a parent component to a child component
States are used in order to manage the current state of the component.

# Q.2 In functional programming, what does the term functor mean? Can you give an example in JavaScript?
It is an object that implements a map function which enables the application of a function to the values of that functor

# Q.3 We have looked at three kinds of asynchronous programming mechanisms, namely callbacks, promises and streams. Mention one advantage and one disadvantage of each type.
Callbacks:
Advantage - widely supporeted in Javascript; simpler than other mechanisms
Disadvantage - prone to callback issues, which makes it hard to read and maintain

Promises:
Advantage - offers solution to deal with chain asynchronous operations as well as error handling
Disadvantage - unable to cancel the mechanism once it has been initiated

Streams:
Advantage - more memory-efficient even when handling large data sets
Disadvantage - more complex than the other mechanisms

# Q.4 With the aid of a diagram and example code, describe the Cascading Style Sheets (CSS) Box Model and show how it can be used to space DOM elements
The box model attributes are as follows, in the sequential order of how they are rendered:
- Margin
- Border
- Padding
- Content

The padding is the space created between the content of an object and its border. The margin is the space created between the object itself and other objects. This can be used to space out DOM elements.

# Q.5 Detail how the browser loads and bootstraps a rich web application from an initial URL.
Once the user inputs a URL, DNS resolution is initiated to acquire the IP address. An HTTP request gets sent to the server. This request is processed until a response it received. The DOM is created, and the stylesheets are rendered. The model is then layed out and the appearance of the web application is completed. The JavaScript as well as other addition resources are loaded in. Then, the web application is fully rendered and user interaction is allowed.