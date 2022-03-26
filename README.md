This is my first project utlizing the React framework, and the first project in my GitHub repository in years. Below is the copy I've forked from Udacity's repository. I can't wait to get started on this!

9/18/19 To those who are reviewing, you can simply install and run the apps by running the command in this order:

- npm install
- npm start

However, even if this project passes, although the project is small, I will appreciate any suggestion or comment on how I can improve my practices as a developer. Any link to an external resource will be appreciated as well.

9/19/19 I've received the project review consisting suggestions and a bug to correct. When a query for search is invalid using 'android123' as an example, the result should be cleared out. The bug has bee squished away, and should work as expected.

The suggestions are wonderful. Seperating the constants from the file and convert them into a reusable package is a favorite; it's great for declustering the interal logisitics of components. Another suggestion points out one stateless functional component. (As an aside, the reviewer is clearly a savvy when it comes to ES6, whereas I'm just a learning toddler playing with it.) Converting the ordianry 'props' parameter into the destructing of the 'props' object has blown my mind away. Such a clever idea!

Lastly but not the least, I was encouraged to share my thought process behind this project I work on. I'm not quite sure how I express this in a technical manner. If you can share what you are interested in, or rather, what an audience of developers may be interested in reading my thought process, this can be help me to create some engagement.

While I regret for not recording my thought process throughout this project, I can remember some major struggles, which turn out to be time consuming.

One struggle was the passing the name of a shelf to the ShelfChanger component and set the value of the select HTML component. This was quite a piece of work. I was trying to build a logisitic that determine the name of a shelf inside the same React component by utilizing the BooksAPI's getAll method. Invoking two API calls in a sequence undermine the performance of the search and took too long for the final result to be produced. Then, I tried setting the 'selected' attribute of option that matches the book's shelf. Later, I discovered that I could simply set the value attribute of 'select' component. Later on, I came to realize that ListBook component already had the 'getAll' method in place, so why did I need to invoke it twice in two different places? To reduce the duplication of the API calls, I'd refactored the codes of ListBook component to pass the state of shelved books to the SearchBook component via a Link. This struggle took me days, which should be done in hours. I'd been comtemplating on a better approach. Now, I'm yet to find one...

Another struggle was to refactor the ListBook component to elimate the redundency in shelves and books. This required a nested logistic. At this point, shelves as the constants were implemented internally, which later was refactored into a seperated file for reusability. Then, as the apps ran, it first iterated the shelves. In each shelf, it iterated the books. Along the way, object as a concept itself was difficult to be understood, and I'd been mistreating it as an Array. Too many errors were thrown when I attempted to use 'map' and 'filter' methods. Boy, was I slow to realize the difference. Upon the realization, I switched over to 'Object.keys' and 'Object.values'. 

Lifecycles were the most difficult to be understood. I'd ended up not using it, seeing that how ineffective it was in applications. (If there is an external resource that demostrates its diverse applications, it can be helpful for me; I'm a visual learner. I learn best by watching. Monkey sees, and monkey does.)

Going off the topic, I saw in one suggestion exhibiting a gif demostrating the behavior of the said bug above. I drooled over this tool that records and generates a clip. Can you share the name of it? This will be wonderful for communicating my struggles on my future bugs. 

# MyReads Project

This is the starter template for the final assessment project for Udacity's React Fundamentals course. The goal of this template is to save you time by providing a static example of the CSS and HTML markup that may be used, but without any of the React code that is needed to complete the project. If you choose to start with this template, your job will be to add interactivity to the app by refactoring the static code in this template.

Of course, you are free to start this project from scratch if you wish! Just be sure to use [Create React App](https://github.com/facebookincubator/create-react-app) to bootstrap the project.

## TL;DR

To get started developing right away:

- install all project dependencies with `npm install`
- start the development server with `npm start`

## What You're Getting

```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

Remember that good React design practice is to create new JS files for each component and use import/require statements to include them where they are needed.

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

- [`getAll`](#getall)
- [`update`](#update)
- [`search`](#search)

### `getAll`

Method Signature:

```js
getAll();
```

- Returns a Promise which resolves to a JSON object containing a collection of book objects.
- This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf);
```

- book: `<Object>` containing at minimum an `id` attribute
- shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
- Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query);
```

- query: `<String>`
- Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
- These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
