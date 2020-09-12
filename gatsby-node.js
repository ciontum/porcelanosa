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
        const slug2=slug.replace(/'/g,'-')
        createPage({
            path:slug2,
            component:path.resolve('./src/templates/produse.js'),
            context:{
                slug:slug2,
                hero:slug2+'/hero',
                cataloage:slug2+'/cataloage',
                images:slug2+'/images'
            }
        })
    })
}