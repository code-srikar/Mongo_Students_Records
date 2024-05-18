
function fetchAndRender() {
    fetch('http://localhost:3000/api/students')
        .then(response => response.json()
            .then(data => {
                console.log(data)
                // var students = data.students;
                // console.log(students);
                for (var student of data) {
                    console.log(student.rollno)
                    let s = document.getElementById('studentsList');
                    var row = `<tr>
                        <td>${student._id}</td>
                        <td>${student.name}</td>
                        <td>${student.email}</td>
                        <td>${student.mobile}</td>
                        <td><button onclick="editData(${student._id})">Edit</button>&nbsp&nbsp<button onclick="deleteData(${student._id})">Delete</button></td>
                    </tr>`
                    s.innerHTML += row
                }
                // students.forEach(student => {
                //     console.log(student.rollno)
                //     let s = document.getElementById('studentsList');
                //     var row = `<tr>
                //         <td>${student.rollno}</td>
                //         <td>${student.name}</td>
                //         <td>${student.course}</td>
                //         <td><button>Edit</button>&nbsp&nbsp<button>Delete</button></td>
                //     </tr>`
                //     s.innerHTML += row
                // })
            }
            ))
}
// console.log("index.js")
document.getElementById('addStd').addEventListener("click", (e) => {
    e.preventDefault()
    var _id = document.getElementById('id').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var mobile = document.getElementById('mobile').value;

    var data = {
        _id, name, email, mobile
    }
    // fetch('http://localhost:3000/students')
    //     .then(response => response.json()
    //         .then(data => {
    //             var students = data;
    //             console.log(students);
    //         }
    //         )
    //     )

    fetch('http://localhost:3000/api/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    window.location.reload();

})

function editData(id1) {
    var _id = document.getElementById('id').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var mobile = document.getElementById('mobile').value;

    var data1 = {
        _id, name, email, mobile
    }
    // console.log(data);
    fetch("http://localhost:3000/api/students/" + id1, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data1)
    })
    window.location.reload()
}

function deleteData(id1) {
    fetch("http://localhost:3000/api/students/" + id1, { method: 'DELETE' })
    // console.log(id1)
    window.location.reload()
}

window.onload = fetchAndRender;
