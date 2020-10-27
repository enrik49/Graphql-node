function createLink(parent, args, context){
    return context.prisma.link.create({
        data:{
            url: args.url,
            description: args.description
        },
    })
}

function updateLink(parent, args, context){
    return context.prisma.link.update({
        where: { id: parseInt(args.id)},
        data: {
            description: args.description,
            url: args.url
        }
    })
}

function deleteLink(parent, args, context){
    return context.prisma.link.delete({
        where: { id: parseInt(args.id)}
    })
}

module.exports = {
    createLink, updateLink, deleteLink
}