import express from "express";
import mongoose from 'mongoose';
import Cors from 'cors';

import Videos from './dbModel.js';

// app config
const app = express();
const port = process.env.PORT || 9000;

// midlewares
app.use(express.json());
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow_Origin", "*"),
//         res.setHeader("Access-Control-Allow-Headers", "*"),
//         next();
// });
app.use(Cors());

// DB config
const connection_url = 'mongodb+srv://admin:OykJ2vWeq5lkfYcy@cluster0.duyfm.mongodb.net/tiktokDB?retryWrites=true&w=majority';

mongoose.connect(connection_url);
// api endpoints
app.get('/', (req, res) => res.status(200).send('Hello World'));

app.get('/v2/posts', (req, res) => {
    
    Videos.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
});

app.post('/v2/posts', (req, res) => {
    const dbVideos = req.body;
    
    Videos.create(dbVideos, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
});
// listeners
app.listen(port, () => console.log(`listening on localhost: ${port}`));
