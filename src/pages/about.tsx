// Step 1: Import React
import * as React from 'react'
import type { HeadFC } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

// Step 2: Define your component
const AboutPage = () => {
  return (
    <main>
      <div>
      <h3 className="text-2xl font-bold col-span-3">About</h3>
      <p>Folk tales are a genre of traditional storytelling that have been passed down orally from one generation to the next. These stories are typically rooted in the cultural and social values of a particular community, and they often serve to entertain, educate, and preserve the history of a people. The common traits seen across this genre are a simple narrative, broad universal theme like courage or good vrs evil, and supernatural elements like gods. </p>
      <p>The stories in our collection also are similar and capture cultural aspects like prayers and arranged marriages. For the reader's benefit, we have added English translations using OpenAI's gpt-4o-mini model. The stories still leave us baffled and we imagine it would have even confused the AI model!</p>
      <p>The stories are sourced from an old book and were transcribed for the online repository by Anil to preserve. He is from a small village near Patna, Bihar and shares his understanding as a Maghi speaker in the footnotes. Images were also taken and shared by him.</p>
      
      <h3 className="text-2xl font-bold col-span-3">Magadh</h3>
      <p>This is present day Bihar and so so. </p>
      <StaticImage src="../images/road.jpg" height="15em" width="auto"/>
      <StaticImage src="../images/paddy.jpg" height="20em" width="auto"/>
      <p>Maghi is the language used in the Magadh region. Similarly the Mithila region spoke Mythili and whatnot </p>
      </div>
    </main>
  )
}

// Step 3: Export your component
export default AboutPage

export const Head: HeadFC = () => <title>About</title>
