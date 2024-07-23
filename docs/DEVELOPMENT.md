<p align="center">
  <a href="https://satsummit.io">
    <img alt="Satsummit satellite icon" src="../static/meta/icon-192.png" width="60" />
  </a>
</p>
<h1 align="center">
  Development
</h1>

- [🚀 Start developing](#-start-developing)
- [💫 Deploy](#-deploy)

## 🚀 Start developing

0. **Install Project Dependencies**

To set up the development environment for this website, you'll need to install the following on your system:

- [Node](http://nodejs.org/) v20 LTS (To manage multiple node versions we recommend [nvm](https://github.com/creationix/nvm))
- [Yarn](https://yarnpkg.com/) Package manager

1.  **Make sure to use the correct node version.**

Assuming you already have `nvm` installed on your machine, this is installing the node version specified in `.nvmrc`.

```shell
nvm install
```
> [!TIP]
> You can [configure your shell](https://github.com/nvm-sh/nvm#deeper-shell-integration) to automatically call `nvm use` when entering a directory with a `.nvmrc` file. That way you don't have to remember this step.

2.  **Install the dependencies.**

This assumes that you already cloned the repository and have yarn installed globally on your machine.

```shell
yarn install --ignore-engines
```

> [!IMPORTANT]
> On Apple Silicon M1, you need to [install libvips first](https://github.com/lovell/sharp/issues/2460#issuecomment-751491241). 

3.  **Start developing.**

```shell
yarn develop
```

4.  **Open the source code and start editing!**

Your site is now running at `http://localhost:9000`!

> [!TIP]
> You'll also see a second link: _`http://localhost:9000/___graphql`_. This is a tool you can use to experiment with querying your data.

## 💫 Deploy

Deployment is being done to `gh-pages` via Github Actions.

