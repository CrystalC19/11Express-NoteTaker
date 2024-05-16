/// Importing , require , creating paths

const express = require ('express');
const fs = require(`fs`);
const path = require (`path`);
const uniqid = require (`uniqid`);
//port
const PORT  = process.env.port || 3001;


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
       var jsonData = JSON.parse(data);
       console.log(jsonData);
       res.json(jsonData);
        });

});

const readThenAppendJson = (content , file) => {
    fs.readFile(file, `utf8`, (err, data) =>{
    if (err) {
        console.error(err);
    } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeNewNoteToJson (file, parsedData);
    }
    });
};
// add a third parameter for spacing on json
const writeNewNoteToJson = (destinaton, content) =>
    fs.writeFile (destinaton, JSON.stringify(content, null,),(err) =>
        err ? console.error(err): console.info (`\nData ${destinaton}`)
    );


    // POST

    app.post(`/api/notes`, (req, res) =>{
        const {title , text} = req.body;
        if (title && text){
            const newNote = {
                title: title,
                text : text,
                // add id third parameter
            };
            readThenAppendJson(newNote, `Develop/db/db.json`);
            const response = {
                status: 'Note Posted',
                body: newNote,
            };
            res.json(response);
        } else{ 
            res.json(`Error posting note`);
        }
    }
);
//Uses the uniqueid to create the json

app.delete (`/api/notes/:id`,(req,res) =>{
    let id = req.params.id;
    let parsedData;
    fs.readFile(`Develop/db/db.json`, `utf8`, (err,data) =>
        {
            if (err){
                console.log(err)

            } else {
                parsedData = JSON.parse(data);
                const filterData = paresedData.filter((note)=> note.id !== id);
                writeNewNoteToJson(`Develop/db/db.json`, filterData);

            }
        }
    );
    res.send (`Delete note with ${req.params.id}`);
}
);



//App listen for local server

app.listen(PORT, ()=>
console.log(`App listening http://localhost;${PORT}`));
    


