import * as React from 'react'
import { Link } from "gatsby"

const Header = () => {
  return (
  <nav>
    <div className="flex flex-wrap items-center justify-left">
      <span className="font-semibold text-xl tracking-tight mr-4">Magadh Folk Tales</span>
      <ul className="flex flex-wrap space-x-2">
      <li>
        <Link className="underline" to="/">Home</Link>
      </li>
      <li>
        <Link className="underline" to="/stories/">Stories</Link>
      </li>
      <li>
        <Link className="underline" to="/gallery/">Gallery</Link>
      </li>
      </ul>
    </div>
  </nav>
  )
}

export default Header
