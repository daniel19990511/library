const studentsTable = document.querySelector('#stu-table');
const form = document.querySelector("#add-students-form");
// create element & render 
function renderStudents(doc){
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let tr = document.createElement("tr");
    tr.setAttribute('data-id', doc.id);
    td1.textContent = doc.data().name;
    td2.textContent = doc.data().author;
    td3.textContent = doc.data().ISBN;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    
    // delete 
    let cross = document.createElement('div');
    cross.textContent = 'x';
    tr.appendChild(cross);
    cross.addEventListener('click', (test) => {
        test.stopPropagation();
        let id = test.target.parentElement.getAttribute('data-id');
        console.log(id);
        db.collection('library').doc(id).delete();
    });
    //

    studentsTable.appendChild(tr);
}

// getting data 
db.collection('library').get().then(data => {
    data.docs.forEach(doc => {
        renderStudents(doc);
    });
});
// 

// add data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('library').add({
        name: form.name.value,
        ISBN: form.ISBN.value,
        author: form.author.value
    });
    form.name.value = '';
    form.ISBN.value = '';
    form.author.value = '';
});