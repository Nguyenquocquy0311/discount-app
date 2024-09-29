
import Head from 'next/head'
import React from 'react'


interface Props {
  meta: {
    title: string
    description: string
  }
  customMeta?: JSX.Element
  children?: React.ReactNode
  noindex?: boolean
}

const Layout = ({ children, meta, noindex = false }: Props) => {

  return (
    <>
      <Head>
        <meta
          name="robots"
          content={
            noindex ? 'noindex, nofollow' : 'index, follow'
          }
        />
        <meta charSet="UTF-8" />
        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <meta itemProp="name" content={meta?.title} />
        <meta name="author" content="SmartDocs" />
        <meta itemProp="image" content="/preview.webp" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={meta?.title} />
        <meta name="twitter:description" content={meta?.description} />
        <meta name="twitter:image:src" content="/preview.webp" />
        <meta property="og:title" content={meta?.title} />
        <meta property="og:description" content={meta?.description} />
        <meta property="og:site_name" content={meta?.title} />
        <link rel="shortcut icon" href="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
    </Head>
    <div>{children}</div>
    </>
  )
}

export default Layout
