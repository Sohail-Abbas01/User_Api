let base_url = "https://jsonplaceholder.typicode.com/users";

window.onload = function() {
  const userID = new URLSearchParams(window.location.search).get("id");
  if (userID) {
    singleUser(userID);
  } else {
    document.getElementById("fetch_users").addEventListener("click", () => {
      fetchUsers();
    });
  }
}

// Fetch and display a single user's details
async function singleUser(id) {
  try {
    const response = await fetch(`${base_url}/${id}`);
    if (response.ok) {
      const userData = await response.json();
      const userDetailSection = document.getElementById("user_detail");
      userDetailSection.innerHTML = `
        <h2>User ID: ${userData.id}</h2>
        <h3>Name: ${userData.name}</h3>
        <h5>Username: ${userData.username}</h5>
        <p>Email: ${userData.email}</p>
        <p>Address: ${userData.address.street}, ${userData.address.city}</p>
        <p>Phone: ${userData.phone}</p>
        <p>Website: ${userData.website}</p>
      `;
      const backButton = document.createElement("button");
      backButton.textContent = "Back";
      backButton.addEventListener("click", () => {
        window.location.href = "index.html";
      });
    } else {
      console.log("Failed to fetch user.");
    }
  } catch (error) {
    console.log(error);
  }
}

// Fetch and display the list of users
async function fetchUsers() {
  try {
    const response = await fetch(`${base_url}`);
    if (response.ok) {
      const data = await response.json();
      let userCard = document.getElementById("user_container");
      userCard.innerHTML = ""; // Clear previous users

      data.forEach((user) => {
        let card = document.createElement("div");
        card.className = "cards";
        card.id = `${user.id}`;
        card.innerHTML = `
          <div>
            <h2>User ID: ${user.id}</h2>
            <h3>Name: ${user.name}</h3>
            <h5>Username: ${user.username}</h5>
            <p>Email: ${user.email}</p>
            <p>Address: ${user.address.street}, ${user.address.city}</p>
            <button onclick="viewSingleUser(${user.id})">View User</button>
          </div>
        `;
        userCard.append(card);
      });
    } else {
      console.log("Failed to fetch users.");
    }
  } catch (error) {
    console.log("Failed to fetch users.");
  }
}

// Redirect to view a single user's details
function viewSingleUser(id) {
  window.location.href = `userDetail.html?id=${id}`;
}

