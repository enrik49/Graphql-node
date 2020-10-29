function info() {
    return `This is the API`;
}

function feed(parent, args, context, info){
    const where = args.filter ? {
        OR: [
            { description: { contains: args.filter }},
            { url: { contains: args.filter }},
        ],
    } : {}
    return context.prisma.link.findMany(where,)
}
        
function link(parent, args, context, info){
    return context.prisma.link.findOne({
        where:{id:parseInt(args.id)}
    })
}


module.exports = {
    info,feed,link
}