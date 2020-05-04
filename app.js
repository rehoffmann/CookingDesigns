const mongoose = require ('mongoose');
const express = require ('express');
const path = require('path');
const bodyParser= require('body-parser');
const home = require ('./routes/home');
const app = express();
app.locals.moment = require('moment');

//store MongoDB cluster connection string, also set which database to use
const dbConnectionUrl = "mongodb+srv://rhoffmann:meme6149TOO@cluster0-ah1ec.mongodb.net/CookingDesigns?retryWrites=true&w=majority";

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



mongoose.connect(dbConnectionUrl,  { useNewUrlParser: true, useUnifiedTopology: true  })
    .then(() => {
        console.log('youre in')
    })
    .catch( err => console.error('failed to enter', err))

//define new Schema Class

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));