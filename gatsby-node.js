exports.onCreatePage = async ({ page, actions: { deletePage } }) => {
  // Remove sandbox in production.
  if (process.env.NODE_ENV === 'production') {
    if (page.path.match(/^\/sandbox/)) {
      deletePage(page);
    }
  }
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        stream: require.resolve('stream-browserify')
      }
    }
  });
};
