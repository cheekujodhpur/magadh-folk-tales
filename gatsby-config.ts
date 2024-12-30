import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Magadh Folk Tales`,
    siteUrl: `https://magahilokvarta.in`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-postcss", "gatsby-plugin-image", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.png"
    }
  }, "gatsby-plugin-mdx", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images"
    },
    __key: "images"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages"
    },
    __key: "pages"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "stories",
      "path": "./src/stories"
    },
    __key: "stories"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "translation",
      "path": "./src/translation"
    },
    __key: "translation"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "summary",
      "path": "./src/summary"
    },
    __key: "summary"
  },
  {
    "resolve": `gatsby-transformer-remark`,
    "options": {
      "excerpt_separator": `<!-- end -->`
    }
  }
  ]
};

export default config;
