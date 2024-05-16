/// Importing , require , creating paths

const express = require ('express');
const fs = require(`fs`);
const path = require (`path`);
const uniqid = require (`uniqid`);
//port
const port  = process.env.port || 3001;


// Create New App

const app = express();


/// Middelware

app.use(express.json());
app.use(express.urlencoded({ exteneded: true}));

app.use(express.static(`Develop/public`));

// Get route that send back the index

app.get (`/`, (req, res) =>
    res.sendFile(path.join( __dirname, `Develop/public/index.html`  ))
);

// Get route that sends back the notes.html

app.get(`/notes`,(req ,res)=>
res.sendFile(path.join(__dirname, `Develop/public/notes.html`))
);

// Get route that reads db.json anf sends parsed Json

app.get(`/api/notes`,function (req,res){
    fs.readFile(`Develop/db/db.json`,`utf8`, (err , data) =>{
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeNewNoteToJson (file, parsedData);
        }
    });
});
// add a third parameter for spacing on json
const writeNewNoteToJson = (destinaton, content) =>
    fs.writeFile (destinaton, JSON.stringify(content, null,),(err) =>
        err ? console.error(err): console.info (`\nData ${destinaton}`)
    );

    


