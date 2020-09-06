const path=require('path')

exports.createPages=async ({graphql,actions})=>{
    const {createPage}=actions
    const result=await graphql(`
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
    result.data.allFile.edges.forEach(({node})=>{
        const slug=node.name.replace(/-/g,"/")
        createPage({
            path:slug,
            component:path.resolve('./src/templates/produse.js'),
            context:{
                slug:slug
            }
        })
    })
}