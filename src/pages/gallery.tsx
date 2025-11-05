import * as React from 'react'
import type { HeadFC, PageProps } from "gatsby"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Header from "./header"

const Gallery = () => {
  return (
    <div className="container p-10">
      <Header></Header>
      <div className="grid px-4 mt-10 gap-2 md:grid-cols-4 md:gap-12">
        <StaticImage src="../images/field.jpg" alt="field" />
        <StaticImage src="../images/bird.jpg" alt="bird" />
        <StaticImage src="../images/grinder.jpg" alt="grinder" />
        <StaticImage src="../images/hay.jpg" alt="hay" />
        <StaticImage src="../images/paddy.jpg" alt="paddy" />
        <StaticImage src="../images/paddyhut.jpg" alt="paddy hut" />
        <StaticImage src="../images/parrot.jpg" alt="parrot" />
        <StaticImage src="../images/road.jpg" alt="road" />
        <StaticImage src="../images/scarecrow.jpg" alt="scarecrow" />
        <StaticImage src="../images/shed.jpg" alt="shed" />
        <StaticImage src="../images/sweet.jpg" alt="sweet" />
        <StaticImage src="../images/yellow.jpg" alt="yellow" />
      </div>
    </div>
  )
}

export default Gallery

export const Head: HeadFC = () => <title>Magadh Folk Tales - Gallery</title>
