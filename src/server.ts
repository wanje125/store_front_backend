import express,{ Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import UserRoutes  from './handlers/users '
import  ProductRoutes  from './handlers/products'
import  OrderRoutes  from './handlers/orders'
const app: express.Application = express()
const address: string = "0.0.0.0:3000"

const corsOptions = {
    // origin: 'http://someotherdomain.com',
    optionSuccessStatus:200
}

// app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})



app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

UserRoutes(app)
ProductRoutes(app)
OrderRoutes(app)

export default app