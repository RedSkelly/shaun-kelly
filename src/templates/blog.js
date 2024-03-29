import React from 'react'
import { graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import Layout from '../components/layout'
import Head from '../components/head'
import blogStyles from './blog.module.scss'

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishedDate(formatString: "MMMM Do, YYYY")
      body {
        json
      }
    }
  }
`

const Blog = props => {
  const options = {
    displayName: `test`,
    renderNode: {
      'embedded-asset-block': node => {
        const alt = node.data.target.fields.title[`en-US`]
        const { url } = node.data.target.fields.file[`en-US`]
        return <img alt={alt} src={url} />
      }
    }
  }
  return (
    <Layout>
      <Head title={props.data.contentfulBlogPost.title} />
      <h1 className={blogStyles.title}>{props.data.contentfulBlogPost.title}</h1>

      <p className={blogStyles.date}>{props.data.contentfulBlogPost.publishedDate}</p>
      {documentToReactComponents(props.data.contentfulBlogPost.body.json, options)}
    </Layout>
  )
}

export default Blog
