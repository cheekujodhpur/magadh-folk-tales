import * as React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Header from '../header'

//export default function FolderIndexPage({ data, location, params }: PageProps<FolderIndexData>) {
export default function FolderIndexPage({ data, location, params }) {
    const folder = location.pathname.split("/").filter(Boolean)[0] 
    console.log(folder);
    console.log(params.parent__relativeDirectory);
    //const posts = data.allMarkdownRemark.group;
    const posts = data.allMarkdownRemark.nodes.filter(
        node => node.parent?.relativeDirectory === folder
    );
    if (folder === 'stories') {
        // layout with listing in sections

        // Group posts by section
        const sections = posts.reduce((acc, node) => {
            const category = node.frontmatter.section || "More";
            if (!acc[category]) acc[category] = [];
            acc[category].push(node);
            return acc;
            }, {});

        return (
        <div className="container p-10">
        <Header></Header>
        <div className="grid mt-10 gap-2 md:grid-cols-4 md:gap-x-12">
            {
            Object.entries(sections).map(([sectionName, posts]) => 
            
            <section key={sectionName}>
                <h3 className="text-xl font-bold">{sectionName}</h3>
                <ul className="list-decimal">
                {posts.map(post => (
                    <li key={post.id}>
                    <Link to={`/${folder}/${post.frontmatter.slug}/`} 
                        className="hover:underline my-2">
                        {post.frontmatter.title}
                    </Link>
                    </li>
                ))}
                </ul>
            </section>
            )}
        </div>
        </div>
        )
    }
    else if (folder === 'kahavat') {
        // layout with image and titles

        return (
            <div className="container p-10">
            <Header></Header>
            <div className="mt-10">
                <h3 className="font-bold">{folder}</h3>
            </div>
            <div className="grid mt-10 gap-2 md:grid-cols-4 md:gap-x-12">
                <ul>
                    {posts.map((node) => (
                    <li key={node.id} className="mb-4">
                  
                        <div className="border p-2 hover:shadow-lg">
                            <GatsbyImage image={getImage(node.frontmatter.image)} alt={node.frontmatter.title}/>
                        </div>
                        <Link to={`/${node.parent.relativeDirectory}/${node.frontmatter.slug}/`}>{node.frontmatter.title} </Link>
                    </li>
                    ))}
                </ul>    
            </div>
            </div>
        )
    }
    else {
        // generic listing with only titles

        return (
            <div className="container p-10">
            <Header></Header>
            <div className="mt-10">
                <h2 className="font-bold">{folder}</h2>
            </div>
                
            <ul>
                {posts.map((node) => (
                <li key={node.id}>
                    <Link to={`/${node.parent.relativeDirectory}/${node.frontmatter.slug}/`}>
                    {node.frontmatter.title}
                    </Link>
                </li>
                ))}
            </ul>
            </div>
        )
    }
    
}
  

export const query = graphql`
  query FolderIndexQuery {
    allMarkdownRemark(
      sort: { frontmatter: { title: ASC } }
    ) {
      nodes {
        id
        frontmatter {
          title
          slug
          section
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
  }`

 /*
  export const query = graphql`
  query FolderIndexQuery ($parent__relativeDirectory: String!) {
    allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: $parent__relativeDirectory}}
      sort: { frontmatter: { title: ASC } }
    ) {
      group(field: {frontmatter: {section: SELECT}}) {
      fieldValue
      edges {
        node {
        id
        frontmatter {
          title
          slug
        }
        parent {
          ... on File {
            relativeDirectory
          }
        }
      }
      }
    }
    }
  }`*/