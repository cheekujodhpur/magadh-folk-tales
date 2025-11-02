import React, { useState } from "react"
import Header, { NAV_ITEMS } from "./header"

export default function EditorPage() {
  // derive default section from the first meaningful nav item (skip "/" home)
  const defaultSection = (() => {
    const first = NAV_ITEMS.find((i) => i.to !== "/")
    if (!first) return "home"
    return first.to.replace(/^\/|\/$/g, "") || "home"
  })()

  const [section, setSection] = useState(defaultSection)
  const [customSection, setCustomSection] = useState("")
  const [useCustom, setUseCustom] = useState(false)
  const [title, setTitle] = useState("")
  const [subsection, setSubSection] = useState("")
  const [slug, setSlug] = useState("")
  const [body, setBody] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState(null)

  function slugify(text) {
    return (text || "")
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/\-+/g, "-")
      .replace(/^\-|\-$/g, "")
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus("Uploading...")

    const finalSection = useCustom ? customSection : section
    const finalSlug = slug || slugify(title)
    const payload = {
      section: finalSection,
      subsection,
      title,
      slug: finalSlug,
      body,
      password, // sent to server for validation (v2 flow)
    }

    if (imageFile) {
      const reader = new FileReader()
      reader.onload = async (event) => {
        const dataUrl = event.target.result // data:<mime>;base64,AAAA...
        payload.image = {
          filename: imageFile.name,
          dataUrl,
        }
        await sendPayload(payload)
      }
      reader.readAsDataURL(imageFile)
    } else {
      await sendPayload(payload)
    }
  }

  async function sendPayload(payload) {
    try {
      //"/.netlify/functions/save-page"
      const resp = await fetch("/api/save-page", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload),
      })
      const json = await resp.json()
      if (!resp.ok) {
        setStatus(`Error: ${json.message || resp.statusText}`)
      } else {
        setStatus("Success: " + (json.commitUrl || "Committed"))
      }
    } catch (err) {
      setStatus("Network error: " + err.message)
    }
  }

  // helper to turn nav to section value
  const navToSectionValue = (to) => {
    const s = to.replace(/^\/|\/$/g, "")
    return s || "home"
  }

  return (
    <main className="editor-page">
      {/* include the header so editor and main site share the same nav */}
      <Header />

      <div className="container mx-auto px-4 mt-6">
        <h1 className="editor-title">Content Editor</h1>

        <form className="editor-form" onSubmit={handleSubmit}>
          <div className="form-row">
          <div className="form-group">

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <label className="form-label">Section
              <select className="form-input" value={section}
                onChange={(e) => {
                  setSection(e.target.value)
                  setUseCustom(false)
                }}
                disabled={useCustom}
              >
                {NAV_ITEMS.map((item) => (
                  <option key={item.to} value={navToSectionValue(item.to)}>
                    {item.label}
                  </option>
                ))}
              </select></label>

              <label style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: 8 }}>
                <input type="checkbox" checked={useCustom}
                  onChange={(e) => {
                    setUseCustom(e.target.checked)
                    if (!e.target.checked) setCustomSection("")
                  }}/>
                Add new
              </label>
            </div>

            {useCustom && (
              <div style={{ marginTop: 8 }}>
                <input className="form-input" value={customSection}
                  placeholder="Custom section (e.g. 'special-features')"
                  onChange={(e) => setCustomSection(e.target.value)}
                />
              </div>
            )}
          </div>
          <div className="form-group">
            <label className="form-label">Subsection
            <input className="form-input" value={subsection}
              onChange={(e) => setSubSection(e.target.value)}/>
            </label>
          </div>
          </div>

          <div className="form-row">
          <div className="form-group">
            <label className="form-label">Title
            <input className="form-input" value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            /></label>
          </div>

          <div className="form-group">
            <label className="form-label">Slug
            <input className="form-input" value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="auto-generated from title if empty"
            /></label>
          </div>
          </div>
          <div className="form-group">
            <label className="form-label">Markdown content
            <textarea className="form-textarea" value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={12}/></label>
          </div>

          <div className="form-group">
            <label className="form-label">Image
            <input className="form-file" type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0] || null)}
            /></label>
          </div>

          <div className="form-group">
            <label className="form-label">Editor Password
            <input className="form-input" type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter editor password"
            /></label>
          </div>

          <div className="form-actions">
            <button className="submit-btn" type="submit">
              Save page
            </button>
          </div>
        </form>

        {status && (
          <div className="status" role="status">
            <strong>{status}</strong>
          </div>
        )}
      </div>
    </main>
  )
}