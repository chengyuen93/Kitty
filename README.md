# Kitty - README

## Third Party Libraries
1. Semantic UI React
	- https://react.semantic-ui.com/usage/
	- This library provides some pre-existing components such as Rating and Label which I can use directly in my webpage without having to create the components myself
	
2. Redux Toolkit + RTK Query
	- https://redux-toolki.js.org
	- This library simplifies the logic writing for redux state management and data fetching from the server.
	- RTK Query also helps with data caching such that redundant queries can be reduced when there are multiple places that require the same data

## Setup

### Start the server
1. Go to the `server` folder
2. run `npm install` to install the node_modules
3. run `npm start` to start the server on `http://localhost:4000`

### Build and start the web app
1. Go to the `catto` folder
2. run `npm install` to install the node_modules
3. run `npm run build` to build the app
4. run `npm run start-build` to start the app