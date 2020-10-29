function info() {
    return `This is the API`;
}

async function feed(parent, args, context, info){
    const where = args.filter ? {
        OR: [
            { description: { contains: args.filter }},
            { url: { contains: args.filter }},
        ],
    } : {}
    const links = await context.prisma.link.findMany({
        where,
        skip: args.skip,
        take: args.take,
        orderBy: args.orderBy,
    })

    const count = await context.prisma.link.count({where})

    return {links, count}
}
        
function link(parent, args, context, info){
    return context.prisma.link.findOne({
        where:{id:parseInt(args.id)}
    })
}


module.exports = {
    info,feed,link
}