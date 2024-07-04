import {getHistoricalEvents} from '../../../src/domain/historical_events/repository/historicalEventsRepository'
import eventosJSON from '../../../dataset/historical_data.json'

test ('debería retornar una lista de eventos ocurridos antes del año 0, al ingresar ac', () => {
    expect(getHistoricalEvents('ac')).toEqual(eventosJSON.result.events.filter((evn) => evn.date < 0))
})

test ('debería retornar una lista de eventos ocurridos después del año 0, al ingresar dc', () => {
    expect(getHistoricalEvents('dc')).toEqual(eventosJSON.result.events.filter((evn) => evn.date > 0))
})

test ('debería retornar un mensaje, al ingresar 2', () => {
    expect(getHistoricalEvents(2)).toBe("Solo se aceptan caracteres no numéricos")
})

test ('debería retornar un mensaje, al ingresar la palabra antes', () => {
    expect(getHistoricalEvents('antes')).toBe("El input debe ser ac o dc")
})