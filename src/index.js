import express from 'express' //Servidor que ejecuta la aplicación en el entorno de ejecucion
import morgan from 'morgan' //<-- Muestra las consultas de los clientes en consola
import { router } from './routes.js'

const app = express();

app.set('port', 3000);

app.use(morgan('dev'));
app.use(express.json())
app.use(router);

app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`)
})
