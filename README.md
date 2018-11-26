Chatty App
=====================

A minimalistic chat application made using React library and web sockets.  This app implements web sockets to enable multiple clients to communicate with the server and other clients.

### Screenshots

!["Chat App page:"](https://raw.githubusercontent.com/jrajan20/Chatty-App/master/Screenshots/Screenshot%20from%202018-11-25%2021-47-20.png)

!['Chatting with multiple users:'](https://raw.githubusercontent.com/jrajan20/Chatty-App/master/Screenshots/Screenshot%20from%202018-11-25%2021-37-07.png)

### Usage

Install the dependencies and start the server.

```
npm install
npm start
open http://localhost:3000
```

### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

### Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint
```

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
