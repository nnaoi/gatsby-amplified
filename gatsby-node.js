/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// https://github.com/gatsbyjs/themes/issues/43#issuecomment-673373037
exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions

  if (page.context.locale === "en") {
    createPage({
      ...page,
      path: `/en${page.path}`,
    })
  }
}

// https://github.com/gatsbyjs/gatsby/issues/11934#issuecomment-646966955
exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage.startsWith("develop")) {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          "react-dom": "@hot-loader/react-dom",
        },
      },
    })
  }
}
