import historicalEventsRepository from '../repository/historicalEventsRepository'

exports.getHistoricalEventsByOcurrence = (ctx) => {
    const ocurrence = ctx.params.ocurrence
    if (typeof ocurrence === "number"){
        ctx.body = {message: "Solo se aceptan caracteres no numéricos"}
    } else if(ocurrence.lenght !== 2){
        ctx.body = {message: "El input debe ser ac o dc"}
    }
    ctx.body = historicalEventsRepository.getHistoricalEvents(ctx.params.ocurrence)
    return ctx
}