Repo Original: https://github.com/danhawkins/go-vite-react-example

# Go Vite React - Example

Embed your vite application into golang, with hot module reloading and live reload for css / tsx changes!

I recently tried to embed a vite react-ts application into a golang binary to have a single binary fullstack application. I stumbled across [this great video](https://www.youtube.com/watch?v=w_Rv_3-FF0g) which helped me to get it working. But I was not 100% satisfied. One of the most valuable things about using vite, is the dev server and it's hot reloading capability. I really like that if I make a change to context in tsx files, or css files the changes are instantly available on in browser and my state does not automatically refresh.

## Project Setup

We start with a basic go application using the Echo framework where we a single API endpoint to return some text. We also have a vite application created using `yarn create vite` in the frontend folder.

The frontend calls the API endpoint to return the text.

We have a [frontend.go](frontend/frontend.go) file which uses embed and echo to serve the content from the dist folder.

## Run in development mode

Start using `yarn dev`, will run vite build in watch mode, as well as the golang server using [air](https://github.com/cosmtrek/air) concurrently using [concurrently](https://www.npmjs.com/package/concurrently)

This version uses **POLLING** as a way to watch for file changes as this is the default for WSL environments. This is known to have higher CPU/IO usage so feel free to change this behavior if not on Windows.

### Build a binary

Using `yarn build`, will build frontend assets and then compile the golang binary embedding the frontend/dist folder

### Build a dockerfile

Using `docker build -t go-vite .`, will use a multistage dockerfile to build the vite frontend code using a node image, then the golang using a golang image, the put the single binary into an alpine image.

## Hot Reloading

Instead of serving static assets from go when we running in dev mode, we will setup a proxy from echo that will route the requests to a running vite dev server, unless the path is prefixed with `/api`, this will allow for the HMR and live reloading to happen just as if you were running `vite dev` but it will also allow for api paths to be served.

All the changes required to take the initial project and support hot module reloading can be found in the [pull request](https://github.com/danhawkins/go-vite-react-example/pull/1)


**IMPORTANT: The go build will fail if frontend/dist/index.html is not available, so even if you are running in dev mode, make sure to run `yarn install` initially to populate the folder**
