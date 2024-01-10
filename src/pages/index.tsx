import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Link, graphql } from "gatsby"

const IndexPage: React.FC<PageProps> = (props) => {
  const allStories = props.data.allMarkdownRemark.nodes
  console.log(allStories)
  return (
    <div>
      <ul>
        {
          allStories.map(story => (
            <li><Link to={`/stories${story.frontmatter.slug}`}>
              {story.frontmatter.title}
            </Link></li>
          ))
        }
      </ul>
    </div>
  )
}


export const query = graphql`
  query StoryQuery {
    allMarkdownRemark {
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
