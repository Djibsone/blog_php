import express from 'express';
import {createConnection} from "mysql";
const app = express();
const PORT = process.env.PORT || 3000;
import {categoriesRouter} from './routes/categories.js';

import methodOverride from 'method-override';

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

app.get("/", (request, response) => {
    response.send('Accueil')
})

app.use('/categories', categoriesRouter);
app.listen(PORT, () => console.log(`Serveur tournant http://localhost:${PORT}`) )

