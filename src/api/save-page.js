// Netlify serverless function to save/update a page and optional image in the repo
// Authorization: accepts a password and compares it to a bcrypt hash stored in EDITOR_PASSWORD_HASH
//
// Environment variables expected:
// GITHUB_TOKEN - personal/bot token with repo contents access
// GITHUB_OWNER - repo owner (user or org)
// GITHUB_REPO - repo name
// GITHUB_BRANCH - branch to commit to (default "main")
// EDITOR_PASSWORD_HASH - bcrypt hash of the allowed password (required)

import fs from "fs";
import path from "path";

const process = require("process");
const fetch = global.fetch || require("node-fetch");
const bcrypt = require("bcryptjs");
//console.log(require("bcryptjs").hashSync('<yourpassword>', 10))

//exports.handler = async function (event) {
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed"});
    return;
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
  const GITHUB_OWNER = process.env.GITHUB_OWNER || "";
  const GITHUB_REPO = process.env.GITHUB_REPO || "";
  const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";
  const EDITOR_PASSWORD_HASH = process.env.EDITOR_PASSWORD_HASH || "$2b$10$D37jeWr39d1IkD5SXtZma.57qSP2OB3gt70Zy215FoGAVmLOeHDnC";

  /*
  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO || !EDITOR_PASSWORD_HASH) {
    res.status(500).json({ message: "Missing environment variables. Set GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO and EDITOR_PASSWORD_HASH."});
    return;
  }
  */
  const { section, subsection, title, slug, body, image, password } = req.body;

  // Simple auth: require password and verify using bcrypt
  if (!password) {
    res.status(403).json({ message: "Unauthorized: password required"});
    return;
  }

  try {
    const match = await bcrypt.compare(password, EDITOR_PASSWORD_HASH);
    if (!match) {
      res.status(403).json({ message: "Unauthorized: invalid password"});
      return;
    }
  } catch (err) {
    console.error("bcrypt error:", err);
    res.status(500).json({ message: "Server error validating password"});
    return;
  }

  if (!section || !title || !slug) {
    res.status(400).json({ message: "section, title, slug are required"});
    return;
  }

  const safeSection = section.replace(/[^a-zA-Z0-9_\-]/g, "-");
  const pagePath = `src/markdown/${safeSection}/${slug}.md`;
  let imagePath = null;
  console.log("Saving page to:", pagePath);

  try {

    // If image provided, upload it first
    if (image && image.filename && image.dataUrl) {
      const match = image.dataUrl.match(/^data:(.*?);base64,(.*)$/);
      if (!match) {
        res.status(400).json({ message: "Invalid image dataUrl"});
      }
      const base64 = match[2];
      const sanitizedFilename = image.filename.replace(/[^a-zA-Z0-9_\-\.]/g, "-");
      imagePath = `../../images/${safeSection}_${slug}`;
      /*
      await putFileToGitHub({
        path: imagePath,
        contentBase64: base64,
        message: `Add image ${sanitizedFilename} for ${slug}`,
        branch: GITHUB_BRANCH,
        token: GITHUB_TOKEN,
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
      });
      */
    }
    

    // Build markdown with frontmatter
    // `date: "${new Date().toISOString()}"`
    const frontmatterLines = ["---",`slug: "${escapeYaml(slug)}"`]; 
    if (section === 'stories') {
      frontmatterLines.push(`source: "मगध की लोक कथाएं : अनुशाीलन एवं संचयन"`,`author: "डॉ. राम प्रसाद सिंह"`);
    }
    if (subsection) {
      frontmatterLines.push(`section: "${escapeYaml(subsection)}"`);
    }
    if (imagePath) {
      const publicPath = imagePath.replace(/^static\//, "/");
      frontmatterLines.push(`image: "${imagePath}"`);
    }
    frontmatterLines.push(`title: "${escapeYaml(title)}"`, "---", "");
    const markdown = frontmatterLines.join("\n") + body + "\n";

    /*const commitResult = await putFileToGitHub({
      path: pagePath,
      contentBase64: Buffer.from(markdown, "utf8").toString("base64"),
      message: `Create/Update page ${section}/${slug}`,
      branch: GITHUB_BRANCH,
      token: GITHUB_TOKEN,
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
    });
    */
 
    // Ensure the "generated" folder exists
    fs.mkdirSync(path.dirname(pagePath), { recursive: true });
    fs.writeFileSync(pagePath, markdown, "utf8");

    res.status(200).json({ success: true, message: "File created!", path: pagePath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Helpers

async function putFileToGitHub({ path, contentBase64, message, branch, token, owner, repo }) {
  const apiBase = "https://api.github.com";
  const headers = {
    Authorization: `token ${token}`,
    "User-Agent": "gatsby-editor",
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
  };

  // Check if file exists to get sha (for update)
  const getUrl = `${apiBase}/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(branch)}`;
  const getResp = await fetch(getUrl, { method: "GET", headers });
  let sha = null;
  if (getResp.status === 200) {
    const getJson = await getResp.json();
    sha = getJson.sha;
  } else if (getResp.status !== 404) {
    const text = await getResp.text();
    throw new Error(`GitHub GET contents failed: ${getResp.status} ${text}`);
  }

  const putUrl = `${apiBase}/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`;
  const body = {
    message,
    content: contentBase64,
    branch,
  };
  if (sha) body.sha = sha;

  const putResp = await fetch(putUrl, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  });

  const putJson = await putResp.json();
  if (!putResp.ok) {
    throw new Error(`GitHub PUT failed: ${putResp.status} ${JSON.stringify(putJson)}`);
  }
  return putJson;
}

// Simple YAML escaper for double-quoted strings
function escapeYaml(s) {
  if (typeof s !== "string") return s;
  return s.replace(/"/g, '\\"');
}