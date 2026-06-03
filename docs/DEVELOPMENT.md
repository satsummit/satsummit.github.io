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

- [Node](http://nodejs.org/) v24 (To manage multiple node versions we recommend [nvm](https://github.com/creationix/nvm))
- [npm](https://www.npmjs.com/) Package manager (bundled with Node)

1.  **Make sure to use the correct node version.**

Assuming you already have `nvm` installed on your machine, this is installing the node version specified in `.nvmrc`.

```shell
nvm install
```
> [!TIP]
> You can [configure your shell](https://github.com/nvm-sh/nvm#deeper-shell-integration) to automatically call `nvm use` when entering a directory with a `.nvmrc` file. That way you don't have to remember this step.

2.  **Install the dependencies.**

This assumes that you already cloned the repository.

```shell
npm install
```

> [!WARNING]
> If the installation fails due to peer dependency errors, use `npm install --force` to bypass the peer dependency check. This happens because some dependencies do not accept React 19, even though they work without issues.

> [!IMPORTANT]
> On Apple Silicon M1, you need to [install libvips first](https://github.com/lovell/sharp/issues/2460#issuecomment-751491241). 

3.  **Start developing.**

```shell
npm develop
```

4.  **Open the source code and start editing!**

Your site is now running at `http://localhost:9000`!

> [!TIP]
> You'll also see a second link: _`http://localhost:9000/___graphql`_. This is a tool you can use to experiment with querying your data.

## Available scripts

| Script | Description |
| --- | --- |
| `npm develop` | Start the development server. |
| `npm run build` | Build the site for production. |
| `npm run serve` | Serve the production build locally. |
| `npm run clean` | Clear Gatsby's cache. |
| `npm run lint` | Run the linter. |
| `npm run ts-check` | Run the TypeScript type checker. |
| `npm run theme` | Regenerate Chakra UI theme typings from `src/theme/index.ts`. Run after modifying the theme. |

## 💫 Deploy

Deployment is being done to `gh-pages` via Github Actions.

