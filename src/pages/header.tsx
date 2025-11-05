import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

/**
 * Keep a single source of truth for nav items so other pages (editor) can reuse them.
 */
export const NAV_ITEMS = [
  { to: "/stories/", label: "लोककथा" },
  { to: "/gallery/", label: "दीर्घा" },
  // { to: "/folksong/", label: "लोकगीत" },
  // { to: "/sanskargeet/", label: "संस्कार-गीत" },
  // { to: "/kahavat/", label: "कहावत" },
  // { to: "/partuk/", label: "परतूक" },
  // { to: "/bujhoniya/", label: "बुझौनियां" },
  // { to: "/daskootak/", label: "दसकूटक" },
  // { to: "/muhabare/", label: "मुहावरे" },
  // { to: "/vyakaran/", label: "व्याकरण" },
  // { to: "/shabdkosh/", label: "शब्‍दकोश" },
  // { to: "/ghaghbhaddri/", label: "घाघ-भड्डरी" },
  // { to: "/others/", label: "विविध" },
]

const Header = () => {
  return (
    <nav className="bg-white py-4">
      <div className="container mx-auto px-4">
        
        {/* Title on its own line */}
        <div className="mb-3">
          <Link className="font-semibold text-xl tracking-tight" to="/">Magadh Folk Tales</Link>
        </div>

        {/* Nav items on the line below the title; will wrap to multiple lines if needed */}
        <ul className="flex flex-wrap gap-3 items-center">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <Link className="text-blue-600 hover:text-blue-800" to={item.to}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Banner Image */}
        <div className="py-4">
          <StaticImage src="../images/neelgaay.jpg" alt="banner" className="banner" />
        </div>

      </div>
    </nav>
  )
}

export default Header