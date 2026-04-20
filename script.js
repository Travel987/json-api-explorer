const postList = document.getElementById("postList");
const fetchButton = document.getElementById("fetchButton");
const form = document.getElementById("postForm");
const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("body");
const message = document.getElementById("message");
const errorDiv = document.getElementById("error");

// FETCH POSTS
async function loadPosts() {
  postList.innerHTML = "Loading...";
  errorDiv.textContent = "";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();

    postList.innerHTML = "";

    data.slice(0, 5).forEach(post => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <hr/>
      `;
      postList.appendChild(div);
    });

  } catch (error) {
    errorDiv.textContent = "Error loading posts 😭";
  }
}

// BUTTON CLICK
fetchButton.addEventListener("click", loadPosts);

// SUBMIT FORM
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  message.textContent = "Sending...";

  const newPost = {
    title: titleInput.value,
    body: bodyInput.value,
    userId: 1
  };

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPost)
    });

    const data = await response.json();

    message.textContent = "Post submitted successfully 🎉";
    console.log(data);

    form.reset();

  } catch (error) {
    message.textContent = "Error submitting post 😭";
  }
});