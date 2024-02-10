import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Link, graphql } from "gatsby"

const IndexPage: React.FC<PageProps> = (props) => {
  const allStories = props.data.allMarkdownRemark.nodes
  return (
    <div className="container mx-auto my-10">
      <div className="gap-8 md:columns-3">
        {
          allStories.map(story => (
            <div>
              <Link to={`/stories${story.frontmatter.slug}`}
                    className="block border rounded shadow-lg my-2 p-4">
                {story.frontmatter.title}
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  )
}


export const query = graphql`
  query StoryQuery {
    allMarkdownRemark(sort: {frontmatter: {slug: ASC}}) {
      nodes {
        frontmatter {
          title
          slug
        }
      }
    }
  }
`

export default IndexPage

export const Head: HeadFC = () => <title>Magadh Folk Tales</title>
