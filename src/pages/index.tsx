import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Link, graphql } from "gatsby"

const IndexPage: React.FC<PageProps> = (props) => {
  const allStories = props.data.allMarkdownRemark.group;
  return (
    <div className="container mx-auto my-10">
      {allStories.map(section => (
        <div className="mx-2 grid grid-cols-1 md:grid-cols-3 gap-2">
        <h3 className="text-2xl font-bold col-span-3">{section.fieldValue}</h3>
          {section.edges.map(edge => (
            <div>
              <Link to={`/stories${edge.node.frontmatter.slug}`}
                    className="block border rounded shadow-md my-2 p-4">
                {edge.node.frontmatter.title}
              </Link>
            </div>
          ))}
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
