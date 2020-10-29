function info() {
    return `This is the API`;
}

function feed(parent, args, context, info){
    return context.prisma.link.findMany()
}
        
function link(parent, args, context, info){
    return context.prisma.link.findOne({
        where:{id:parseInt(args.id)}
    })
}


module.exports = {
    info,feed,link
}