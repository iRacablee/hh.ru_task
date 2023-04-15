const express = require('express');
const app = express();
const router = express.Router();

const axios = require('axios');
const db = require('./db.js');



app.use('/',router);
router.get('/',async (req,res) => {
    const apiResponse = await axios.get("https://randomuser.me/api");

    let json = apiResponse.data.results[0]; 


    db.insertJson(
        json['gender'],
        json['name']['title'],
        json['name'].first,
        json['name'].last,
        json['location'].street.number,
        json['location'].street.name,
        json['location'].city,
        json['location'].state,
        json['location'].country,
        json['location'].postcode,
        json['location'].coordinates.latitude,
        json['location'].coordinates.longitude,
        json['location'].timezone.offset,
        json['location'].timezone.description,
        json['email'],
        json['login'].uuid,
        json['login'].username,
        json['login'].password,
        json['login'].salt,
        json['login'].md5,
        json['login'].sha1,
        json['login'].sha256,
        json['dob'].date,
        json['dob'].age,
        json['registered'].date,
        json['registered'].age,
        json['phone'],
        json['cell'],
        json['id'].name,
        json['id'].value,
        json['picture'].large,
        json['picture'].medium,
        json['picture'].thumbnail,
        json['nat']
        ).then(result => {
        if (result) {
            res.status(200).send("Успешно добавлено в таблицу 'isi_data'.");
        }
        else
        {
            res.status(500).send("Что-то пошло не так :)");
        }
    });
    
});


app.listen(80,() => console.log("NodeJS server started!"));