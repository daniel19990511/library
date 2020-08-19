let express = require('express')
let app = express();
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
app.set('view engine', 'ejs');
app.get('/', async (req, res) => {
    let data  = await db.collection("library").get();
    let userArr = [];
    data.docs.forEach((doc) => {
        userArr.push(doc.data().name);
    })
    res.render("default", {
        users: userArr,
        //users: ["Alice", "Bob", "Fisheep", "Fiona"],
        title: "這是首頁"
    })
})

app.get('/addBook', async (req, res) => {
    let data  = await db.collection("library").get();
    let userArr = [];
    data.docs.forEach((doc) => {
        userArr.push(doc.data().name);
    })
    res.render("./classA.html", {
        users: userArr,
        //users: ["Alice", "Bob", "Fisheep", "Fiona"],
        title: "增加書籍"
    })
})
app.listen(3000, () => {
    console.log("render_test server is running at http://127.0.0.1:3000")
})