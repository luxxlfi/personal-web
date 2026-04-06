let projets = JSON.parse(localStorage.getItem("projects")) || [];

function renderProjects() {
    const container = document.getElementById("projectList");
    let projectHtml = "";

    // loping mengunakan for

    // for (let i = 0; i < projets.length; i++) {
    //     const project = projets[i];

    //     projectHtml += `
    //          <div class="card-Projects">
    //                 <img src="${project.image}" alt="">
    //                 <h3>${project.nama}</h3>
    //                 <div class="des-container">
    //                     <p>${project.deskripsi}</p>
    //                 </div>
    //                 <p class="tech">${project.tech}</p>
    //                 <div class="button-card-project">
    //                     <button class="show-button" onclick="showProject(${i})">show<i class="fa-regular fa-eye"></i></button>
    //                     <button onclick="deleteProject(${i})" class = "deleteProject">Delet</button>
    //                 </div>
    //             </div>
    //     `
    // }

    // Loping mengunakan forEach

    projets.forEach((project, i) => {
        projectHtml += `
              <div class="card-Projects">
                     <img src="${project.image}" alt="">
                     <h3>${project.nama}</h3>
                     <div class="des-container">
                         <p>${project.deskripsi}</p>
                     </div>
                     <p class="tech">${project.tech}</p>
                     <div class="button-card-project">
                         <button class="show-button" onclick="showProject(${i})">show<i class="fa-regular fa-eye"></i></button>
                         <button onclick="deleteProject(${i})" class = "deleteProject">Delet</button>
                     </div>
                 </div>
         `;
    });


    container.innerHTML = projectHtml
}
renderProjects()

const form = document.getElementById("projectForm");

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById("namaP").value;
    const deskription = document.getElementById("deskripsiP").value;
    const imageInput = document.getElementById("image").files[0];

    let tech = [];

    if (document.getElementById("nodeJs").checked) tech.push("Node Js");
    if (document.getElementById("reactJs").checked) tech.push("React Js");
    if (document.getElementById("nextJs").checked) tech.push("Next Js");
    if (document.getElementById("typeSc").checked) tech.push("typeSc");


    const reader = new FileReader();

    reader.onload = function () {
        const newProject = {
            id: projets.length + 1,
            nama: name,
            deskripsi: deskription,
            image: reader.result,
            tech: tech
        };

        projets.push(newProject);
        localStorage.setItem("projects", JSON.stringify(projets));

        renderProjects();
    }

    reader.readAsDataURL(imageInput);
});

function deleteProject(index) {
    projets.splice(index, 1);

    localStorage.setItem("projects", JSON.stringify(projets));

    renderProjects();
}

function showProject(index) {
    const project = projets[index];

    alert(
        "Nama: " + project.nama + "\n" +
        "Deskripsi: " + project.deskripsi + "\n" +
        "Tech: " + (project.tech ? project.tech.join(", ") : "-")
    );
}