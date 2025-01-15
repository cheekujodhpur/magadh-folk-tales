import * as React from "react"
import { graphql } from "gatsby"

export default function StoryTemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <div>
      <div className="container mx-auto my-10 px-4">
        <h2 className="text-2xl font-bold">{frontmatter.title}</h2>
        <h3 className="text-xl">{frontmatter.section}</h3>
        <p><i>Based on {frontmatter.source} by {frontmatter.author}</i>
        <br></br><i> Tags: {frontmatter.tags}</i></p>
        <div className="container mx-auto my-4"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}

export const query = graphql`
  query StoryContentQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        slug
        source
        author
        section
        title
        tags
      }
    }
  }
`

