// Importaciones
import express from 'express';
import morgan from 'morgan';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import personasRoutes from './routes/personasRoutes.js'; // Ajusta esta ruta si es necesario

// Inicialización
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
    res.render('index');
});

app.use(personasRoutes);

// Archivos públicos
app.use(express.static(join(__dirname, 'public')));

// Iniciar servidor
app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'));
});
