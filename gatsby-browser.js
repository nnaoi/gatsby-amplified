/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
const Amplify = require("aws-amplify").default
const awsExports = require("./src/aws-exports").default
console.log(awsExports)

// initialize amplify
Amplify.configure(awsExports)

// i18n
require("./src/css/index.css")
const i18nConfig = require("./i18n/config.json")
const defaultLang = "en"

// https://github.com/angeloocana/gatsby-plugin-i18n/issues/92#issuecomment-580912666
exports.onClientEntry = () => {
  const langs = i18nConfig.map((c) => c.code)
  const userLang = navigator.language.substr(0, 2)
  const { pathname } = window.location
  if (
    langs.includes(userLang) &&
    !langs.some(
      (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
    ) &&
    !pathname.startsWith(`/${userLang}/`) &&
    pathname !== `/${userLang}`
  ) {
    window.location.pathname = `/${userLang}${pathname}`
  } else if (
    !langs.some(
      (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
    )
  ) {
    window.location.pathname = `/${defaultLang}${pathname}`
  }
}
