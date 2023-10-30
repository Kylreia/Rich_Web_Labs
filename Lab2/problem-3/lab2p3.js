const userInput = document.querySelector("#searchField");
const searchButton = document.querySelector(".searchButton");
const imgContainer = document.querySelector(".profileImg")
const nameContainer = document.querySelector(".profileName");
const userContainer = document.querySelector(".profileUsername");
const emailContainer = document.querySelector(".profileEmail");
const locationContainer = document.querySelector(".profileLocation");
const gistsContainer = document.querySelector(".profileGists");
const client_id ="Iv1.32af8cafcaa4b782";
const client_secret ="98042c34507380fed4e97b97ab8b0417d59fb2a5";

const fetchUsers = async (user) => {
    const api_call = await fetch(`https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`);
    const data = await api_call.json();
    return { data }
};

const fetchUserRepos = async (user) => {
    const api_call_repos = await fetch(`https://api.github.com/users/${user}/repos?client_id=${client_id}&client_secret=${client_secret}`);
    const data = await api_call_repos.json();
    return { data }
};

const showData = () => {
    fetchUsers(userInput.value).then((response) => {
        console.log(response);

        var img = document.createElement("img");
        img.src = response.data.avatar_url;
        imgContainer.appendChild(img);
        nameContainer.innerHTML = `Name: <span class="main_profile-value">${response.data.name}</span>`;
        userContainer.innerHTML = `Username: <span class="main_profile-value">${response.data.login}</span>`;
        emailContainer.innerHTML = `Email: <span class="main_profile-value">${response.data.email}</span>`;
        locationContainer.innerHTML = `Location: <span class="main_profile-value">${response.data.location}</span>`;
        gistsContainer.innerHTML = `Number of Gists: <span class="main_profile-value">${response.data.public_gists}</span>`;
    })

    fetchUserRepos(userInput.value).then((response) => {
        console.log(response);
        if(response.data[0].name != null) {
            console.log(response.data);
            var perrow = 1;
            var cellCount = 0;
            var myTable = document.createElement("table");
            row = myTable.insertRow();

            for(let i = 0; i < response.data.length; i++) {
                var cell = row.insertCell();
                cell.innerHTML = "Name: " + response.data[i].name;
                var cell1 = row.insertCell();
                cell1.innerHTML = "Description: " + response.data[i].description; 
                cellCount++;

                if(cellCount % perrow == 0) {
                    row = myTable.insertRow();
                } // end inner if

                if(cellCount > 5) {
                    myTable.setAttribute("class", "scrollBar");
                } // end inner if
            } // end for
            document.getElementById("reposTable").appendChild(myTable);
        } // end if
    })
}

searchButton.addEventListener('click', () =>
{
    showData();
})