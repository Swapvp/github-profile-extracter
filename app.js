const apiUrl = "https://api.github.com/users/";
const cardContainer = document.querySelector(".card-container");

const getUser = async (username) => {
  let response = await fetch(apiUrl + username);
  console.log(response);

  let data = await response.json();
  console.log(data);
  let card = `
  
    <div class="card">
        <div class="left">
            <img src="${data.avatar_url}" alt="${data.login}">
        </div>
        <div class="right">
            <h2><a href="">${data.login}</a></h2>
            <p>${data.bio}</p>
            <div class="follow">
                <div>${data.followers} Followers</div>
                <div>${data.following} Following</div>
                <div>${data.public_repos} Public Repos</div>
            </div>
            <div id="repos">
            </div>
        </div>
    </div>
    
`;
  cardContainer.style.backgroundColor = "cadetblue";

  cardContainer.innerHTML = card;
  userRepos(username);
};

const userRepos = async (username) => {
  let repos = document.querySelector("#repos");
  let response = await fetch(apiUrl + username + "/repos");
  let data = await response.json();
  data.forEach((element) => {
    const anchor = document.createElement("a");
    anchor.classList.add("repo");
    anchor.href = element.html_url;
    anchor.innerText = element.name;
    anchor.target = "_blank";
    repos.appendChild(anchor);
  });
};

const btn = document.querySelector("#input-btn");

btn.addEventListener("click", () => {
  let inputBox = document.querySelector("#input_box");
  if (inputBox.value != "") {
    getUser(inputBox.value);
  }
  return false;
});
