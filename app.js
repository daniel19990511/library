let express = require('express');
let firebase = require('firebase')
var firebaseConfig = {
    apiKey: "AIzaSyDa-wza5N7azOMS4_CY-vG1464BheWM8aM",
    authDomain: "myproject-7c265.firebaseapp.com",
    databaseURL: "https://myproject-7c265.firebaseio.com",
    projectId: "myproject-7c265",
    storageBucket: "myproject-7c265.appspot.com",
    messagingSenderId: "976323657471",
    appId: "1:976323657471:web:3859037a31265a4a57d6ca",
    measurementId: "G-GXLHDJ6WQM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let app = express();
app.use(express.static('./public'));
app.set('view engine', 'ejs');  
app.get('/', async (req, res) => {  
    let data = await db.collection('library').get();
    let userArr = []
    data.forEach((doc) => {
        console.log(doc.data().name)
        userArr.push(doc.data().name);
    })
    res.render('default', {  
        title: '首頁',  
        //users: ['Fisheep', 'Fiona', 'Alice', 'Bob']
        users: userArr
    });  
});

app.get("/Daniel",(req,res) => {
    res.send("<h1>Daniel</h1>");
})

app.get("/firebase-test", async (req, res) => {
    let html = '';
    let data = await db.collection('library').get();
    data.forEach(doc => {
        console.log(doc.data());
        html += `<div>${doc.id}: name = ${doc.data().name} author = ${doc.data().author}</div>`;
    });
    res.send(html)
})

app.get("/classA_backend", async (req, res) => {
    let data = await db.collection('classA').get();
    userArr = []
    data.forEach((doc) => {
        userArr.push({
            id: doc.id,
            name: doc.data().name,
            author: doc.data().author,
            ISBN: doc.data().ISBN
        })
    })
    res.render('classA', {
        users: userArr
    })
})

app.get("/add_book", (req, res) => {
    let options = {
        root:  __dirname+"/public",
        dotfiles: 'ignore'
    }
    console.log(__dirname+"/public");
    res.sendFile("/classA.html", options);
})

app.get('/who/:name', (req, res) => {  
    var name = req.params.name;  
    res.send(`This is ${name}`);  
});

app.get('/API/deleteMember', (req, res) => {
    db.collection('library').doc(req.query.id).delete();
    console.log(req.query.id);
    res.send(`delete Member id = ${req.query.id}!`)
})

app.get('/API/addMember', (req, res) => {
    db.collection('library').add({
        name: req.query.name,
        gender: req.query.age,
        age: req.query.gender
    });
    console.log("Add member !!");
    res.send("Add member success!");
})

app.get('*', (req, res) => {  
    res.send('No Content');  
});

let port = process.env.PORT || 3000;

app.listen(port, () => {  
    console.log('Listening on port 3000');  
}); 