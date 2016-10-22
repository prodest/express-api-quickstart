import { UserRouter } from './UserRouter'
import { VehicleRouter } from './VehicleRouter'
import { VehicleTypeRouter } from './VehicleTypeRouter'
import { CargoTypeRouter } from './CargoTypeRouter'
import { OptionalRouter } from './OptionalRouter'
import { OrderRouter } from './OrderRouter'
import * as express from 'express'
import { Model } from '../models'
import { IRethinkDBConfig } from '../config/rethinkdb'

export namespace main {
    export const callRoutes = (app: express.Application, rethinkdbconfig: IRethinkDBConfig): express.Application => {
        let models = new Model(rethinkdbconfig)
        app.use('/users', new UserRouter(models).getRouter())
        app.use('/vehicles', new VehicleRouter(models).getRouter())
        app.use('/vehicletypes', new VehicleTypeRouter(models).getRouter())
        app.use('/cargotypes', new CargoTypeRouter(models).getRouter())
        app.use('/optionals', new OptionalRouter(models).getRouter())
        app.use('/orders', new OrderRouter(models).getRouter())
        app.use('/', (req,res,nex) => res.json('ok'))
        return app
    }
}