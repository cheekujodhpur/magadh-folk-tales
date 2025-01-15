import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const IndexPage: React.FC<PageProps> = (props) => {
  const allStories = props.data.allMarkdownRemark.group;
  return (
    <div className="container mx-auto my-10">
      <div>
        <Link to="/about/">About</Link>
      </div>
      {allStories.map(section => (
        <div className="mx-2">
          <h3 className="text-2xl font-bold">{section.fieldValue}</h3>
        
        <div className="mx-2 grid md:grid-cols-4 gap-2">
        
          {section.edges.map(edge => (
            <div>
              <Link to={`/stories/${edge.node.frontmatter.slug}`}
                    className="block border rounded shadow-md my-2 p-4">
                {edge.node.frontmatter.title}
              </Link>
            </div>
          ))}
        </div>
        </div>
      ))}
    </div>
  );
}


export const query = graphql`
  query StoryQuery {
    allMarkdownRemark(sort: {frontmatter: {slug: ASC}}) {
      group(field: {frontmatter: {section: SELECT}}) {
        fieldValue
        edges {
          node {
            frontmatter {
              title
              slug
            }
          }
        }
      }
    }
  }
`

export default IndexPage

export const Head: HeadFC = () => <title>Magadh Folk Tales</title>
