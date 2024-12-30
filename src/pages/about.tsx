// Step 1: Import React
import * as React from 'react'
import type { HeadFC } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

// Step 2: Define your component
const AboutPage = () => {
  return (
    <main>
      <h1>About Me</h1>
      <p>Hi there! I'm the proud creator of this site, which I built with Gatsby.</p>
      <h3 className="text-2xl font-bold col-span-3">Magadh</h3>
      <p>This is present day Bihar and so so. </p>
      <StaticImage src="../images/road.jpg" height="15em" width="auto"/>
      <StaticImage src="../images/paddy.jpg" height="20em" width="auto"/>
      <p>Maghi is the language used in the Magadh region. Similarly the Mithila region spoke Mythili and whatnot </p>
    </main>
  )
}

// Step 3: Export your component
export default AboutPage

export const Head: HeadFC = () => <title>About</title>
