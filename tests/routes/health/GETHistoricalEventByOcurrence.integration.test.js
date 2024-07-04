import request from 'supertest'
import app from '../../../src/index'
import Sinon from 'sinon'
import historialEventsRepository from '../../../src/domain/historical_events/repository/historicalEventsRepository'


describe ('GET /api/history/:ocurrence', () => {
    beforeEach(()=>{
        Sinon.restore()
    })
/*
Dado: Una consulta al servicio
Cuando: realice una solicitud a /api/history/:ocurrence, tomando en cuenta que :ocurrence es
un string de largo = 2 e igual a 'ac', con caracteres compuestos por solo letras y encuentre
resultados, independiente del case de :ocurrence
Entonces: debe devolver un status 200 y en el body, un arreglo con los eventos históricos que
hayan resultado de la búsqueda ordenados desde el más antiguo al más nuevo, en donde 'date' 
siempre es <= 0
*/
    test('debería responder con un arreglo de eventos historicos ocurridos antes del año 0', async () => {
        Sinon.stub(historialEventsRepository, 'getHistoricalEvents').returns(getMockEvents())
        const ocurrence = 'ac'
        const response = await request(app.callback()).get(`/api/history/:ocurrence`).send(ocurrence)
        expect(response.status).toBe(200)
        expect(response.body).toEqual(getMockEvents())
    })

/*
Dado: Una consulta al servicio
Cuando: realice una solicitud a /api/history/:ocurrence, tomando en cuenta que :ocurrence es
un string de largo = 2 e igual a 'dc', con caracteres compuestos por solo letras y encuentre
resultados, independiente del case de :ocurrence
Entonces: debe devolver un status 200 y en el body, un arreglo con los eventos históricos que
hayan resultado de la búsqueda ordenados desde el más antiguo al más nuevo, en donde 'date'
siempre es > 0
*/
//    test('debería responder con un arreglo de eventos historicos ocurridos después del año 0', async () => {
//        Sinon.stub(historialEventsRepository, 'getHistoricalEvents').returns(getMockUsers())
//        const response = await request(app.callback()).get('/api/history/:ocurrence')
//        expect(response.status).toBe(200)
//        expect(response.body).toEqual(getMockUsers())
//    })

/*
Dado: Una consulta al servicio
Cuando: realice una solicitud a /api/history/:ocurrence, tomando en cuenta que :ocurrence es
un string de largo = 2, con caracteres alfanuméricos o solo númericos, independiente del case
de :country
Entonces: debe devolver un status 400 y en el body, un objeto con el siguiente formato:
{
    "message": "Solo se aceptan caracteres no numéricos"
}
*/
    test('debería responder con un arreglo de eventos historicos ocurridos después del año 0', async () => {
        Sinon.stub(historialEventsRepository, 'getHistoricalEvents').returns()
        const response = await request(app.callback()).get('/api/history/:ocurrence')
        //expect(response.status).toBe(400)
        expect(response.body).toEqual({"message": "Solo se aceptan caracteres no numéricos"})
    })

/*
Dado: Una consulta al servicio
Cuando: realice una solicitud a /api/history/:ocurrence y el largo sea != 2
Entonces: debe devolver un status 400 y en el body, un objeto con el siguiente formato:
{
    "message": "El input debe ser ac o dc"
}
*/
    test('debería responder con un arreglo de eventos historicos ocurridos después del año 0', async () => {
        Sinon.stub(historialEventsRepository, 'getHistoricalEvents').returns()
        const response = await request(app.callback()).get('/api/history/:ocurrence')
        //expect(response.status).toBe(400)
        expect(response.body).toEqual({"message": "El input debe ser ac o dc"})
    })

})

function getMockEvents () {
    return (
    {    "result": {
            "count": "20330",
            "events": [
                {
                    "date": "-299",
                    "description": "Los Samnitas, inician los preparativos de la Tercera guerra Samnita contra los romanos, reclutando tropas mercenarias de Galos y Sabinos y estableciendo alianzas con Etruscos y otros pueblos it\u00e1licos.",
                    "lang": "es",
                    "granularity": "year"
                },
                {
                    "date": "-298",
                    "description": "Inicio de la Tercera Guerra Samnita entre la Rep\u00fablica romana y una coalici\u00f3n de samnitas, etruscos, celtas, sabinos, lucanos y umbros.",
                    "lang": "es",
                    "granularity": "year"
                },
                {
                    "date": "-297",
                    "description": "Roma conquista Rodas, anexion\u00e1ndola al Imperio romano",
                    "lang": "es",
                    "granularity": "year"
                }
            ]
        }
    }
    )
}
