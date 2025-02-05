import * as React from 'react'
import type { HeadFC, PageProps } from "gatsby"
import { Link, graphql } from "gatsby"
import Header from "./header"

const Stories:React.FC<PageProps> = (props) => {
  const allStories = props.data.allMarkdownRemark.group;
  return (
    <div className="container p-10">
      <Header></Header>
      <div className="grid mt-10 gap-2 md:grid-cols-4 md:gap-x-12">
        {allStories.map(section => (
          <div className="my-2">
            <h3 className="text-xl font-bold">{section.fieldValue}</h3>
              <ul className="list-decimal">
                {section.edges.map(edge => (
                  <li>
                    <Link to={`/stories/${edge.node.frontmatter.slug}`}
                          className="hover:underline my-2">
                      {edge.node.frontmatter.title}
                    </Link>
                  </li>
                ))}
              </ul>
          </div>
        ))}
      </div>
    </div>
  )
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

export default Stories

export const Head: HeadFC = () => <title>Magadh Folk Tales - Stories</title>
