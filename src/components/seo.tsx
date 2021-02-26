import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

import { SeoQuery } from "../../graphql-types"

export type MetaOgpProps = {
  title?: string
  description?: string
  type?: string
}

export type MetaTwitterProps = {
  card?: string
  creator?: string
  title?: string
  description?: string
}

export type SeoComponentProps = {
  title?: string
  description?: string
  og?: MetaOgpProps
  twitter?: MetaTwitterProps
  children?: React.ReactNode
}

const SEO = ({
  title,
  description,
  og,
  twitter,
  children,
}: SeoComponentProps) => {
  const { site } = useStaticQuery<SeoQuery>(
    graphql`
      query Seo {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaTitle = title ?? site?.siteMetadata?.title ?? undefined
  const metaDescription =
    description ?? site?.siteMetadata?.description ?? undefined

  return (
    <Helmet
      title={metaTitle}
      titleTemplate={`%s | ${site?.siteMetadata?.title}`}
    >
      <meta name="description" content={metaDescription ?? undefined} />
      <meta name="og:title" content={og?.title} />
      <meta name="og:description" content={og?.description} />
      <meta name="og:type" content={og?.type} />
      <meta name="twitter:card" content={twitter?.card} />
      <meta name="twitter:creator" content={twitter?.creator} />
      <meta name="twitter:title" content={twitter?.title} />
      <meta name="twitter:description" content={twitter?.description} />
      {children}
    </Helmet>
  )
}

export default SEO
