<p align="center">
  <a href="https://satsummit.io">
    <img alt="Satsummit satellite icon" src="./static/meta/icon-192.png" width="60" />
  </a>
</p>
<h1 align="center">
  Development
</h1>

The Satsummit website is built using [Gatsby](https://www.gatsbyjs.org/).


- [🚀 Start developing](#-start-developing)
- [🎓 Learning Gatsby](#-learning-gatsby)
- [💫 Deploy](#-deploy)

## 🚀 Start developing

0. **Install Project Dependencies**


    To set up the development environment for this website, you'll need to install the following on your system:

    - [Node](http://nodejs.org/) v18 (To manage multiple node versions we recommend [nvm](https://github.com/creationix/nvm))
    - [Yarn](https://yarnpkg.com/) Package manager

1.  **Make sure to use the correct node version.**

    Assuming you already have `nvm` installed on your machine, this is installing the node version specified in `.nvmrc`.

    ```shell
    nvm install
    ```

    💡You can [configure your shell](https://github.com/nvm-sh/nvm#deeper-shell-integration) to automatically call `nvm use` when entering a directory with a `.nvmrc` file. That way you don't have to remember this step.

2.  **Install the dependencies.**

    This assumes that you already cloned the repository and have yarn installed globally on your machine.

    ```shell
    yarn install --ignore-engines
    ```

    **Note**: On Apple Silicon M1, you need to [install libvips first](https://github.com/lovell/sharp/issues/2460#issuecomment-751491241). 

3.  **Start developing.**

    ```shell
    yarn start
    ```

4.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:9000`!

    _Note: You'll also see a second link: _`http://localhost:9000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.com/docs/tutorial/getting-started/part-4/)._

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.com/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.com/docs/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.com/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.

## 💫 Deploy

Deployment is being done to `gh-pages` via Github Actions.
