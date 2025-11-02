import * as React from "react"
import { graphql } from "gatsby"
import Header from '../header'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export default function CommonTemplate({data}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  const image = getImage(frontmatter.image)
  return (
    <div className="container p-10">
      <Header></Header>
      <div className="mt-10">
        <h2 className="text-2xl font-bold">{frontmatter.title}</h2>
        {frontmatter.section && (
          <h3 className="text-xl">{frontmatter.section}</h3>
        )}

        {frontmatter.source && (
          <p><i>Based on {frontmatter.source} by {frontmatter.author}</i></p>
        )}
        
        {frontmatter.tags && (
          <p><i> Tags: {frontmatter.tags}</i></p>
        )}

        {/* Only render image if one exists */}
        {frontmatter.image && (
            <GatsbyImage image={image} alt={frontmatter.title}
                style={{ width: "100%", borderRadius: "8px", marginBottom: "1.5rem" }}
            />
        )}

        <div className="container mx-auto my-4"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}

// Gatsby always queries for id
export const query = graphql`
  query CommonContentQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        slug
        source
        author
        section
        title
        tags
        image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      parent {
        ... on File {
          relativeDirectory
        }
      }
    }
  }
`

