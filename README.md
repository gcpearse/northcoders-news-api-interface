# Northcoders News API Interface

## Overview

Northcoders News mimics a real-world forum on which users are able to browse articles, post or delete comments, and vote on other users' content.

The live site can be visited [here](https://northcoders-news-api-interface.netlify.app/).

When users interact with the site, requests are made to my **Northcoders News API**. The back-end repository and a link to that API can be found [here](https://github.com/gcpearse/northcoders-news-api).

The API is hosted with a free plan and spins down with inactivity, so please allow some time for it to load.

### Site Navigation

Users can easily navigate the site using links in the nav bar and on individual pages.

On the News page, users may filter and order results using the search bar at the top of the page.

### Mock Login

Certain actions on the site, such as posting comments and voting, are only available to logged in users.

Authentication is not in place, so for now users may simply select a username from the drop-down menu on the top right of the page, click 'log in', and act as the chosen user.

## Optimisation

The app was built with a mobile-first approach, but is also optimised for desktop displays.

## Local Setup Instructions

### Cloning the Repository

Begin by clicking on the **CODE** button above and copying the URL. Then, navigate to the directory into which you would like to clone the repository, and run this command:

```
git clone <URL>
```

To push changes from your cloned local version to a personal repository on GitHub, you will first need to create a new GitHub repository. 

Initialise the repository <u>without</u> a `README`, `gitignore`, or `licence`.

Then, copy the URL of your new repository and run the following commands:

```
git remote set-url origin <NEW_URL>
git branch -M main
git push -u origin main
```

### Prerequisites

Please ensure you have installed Node.js. If you encounter any issues when running the project locally, you may need to use a different version of Node. For example, at the time of writing `v18.17.1` is working well, but `v20.6.0` is not.

You can check your Node version by running `node --version`. 

Consider using Node Version Manager (nvm) to install, remove, and switch between different Node versions on your local machine.

### Installing Packages and Running the Project

Once you have cloned the repository on your local machine, please ensure you are in the root directory.

You may then run the following commands:

```
npm install
```

This will install all required NPM packages.

```
npm run dev
```

This will run the app locally, typically on port 5173. Please check your terminal log for confirmation.