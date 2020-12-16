const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const result = await graphql(`
        query{
            allFile(filter:{relativeDirectory:{eq:"produse/slugs"}}){
                edges{
                  node{
                    name
                  }
                }
              }
        }
    `)

    let isFirst = true

    result.data.allFile.edges.forEach(({ node }) => {
        const slug = node.name.replace(/-/g, "/")
        const slug2 = slug.replace(/'/g, '-')

        if (slug2.includes('baterii') && isFirst) {
            isFirst = false
            createPage({
                path: slug2,
                component: path.resolve('./src/templates/produse-subcategorii.js'),
                context: {
                    slug: 'produse/obiecte-sanitare/baterii',
                    hero: 'produse/obiecte-sanitare/baterii/hero',
                    categories: ['Baterii baie', 'Baterii bucătărie'],
                    images1: 'produse/obiecte-sanitare/baterii/images/baterii-baie',
                    images2: 'produse/obiecte-sanitare/baterii/images/baterii-bucatarie'
                }
            })
        } else {
            createPage({
                path: slug2,
                component: path.resolve('./src/templates/produse.js'),
                context: {
                    slug: slug2,
                    hero: slug2 + '/hero',
                    images: slug2 + '/images'
                }
            })
        }
    })
}