const blogNum = localStorage.getItem("blogId");
const blogContainer = document.querySelector("#blog-post");
const commentContainer = document.querySelector("#comment-container");

function addAuthor(author, currentIndex) {
  let myAuthor = document.createElement("p");
  let holder = document.querySelector(`#${CSS.escape(currentIndex)}_holder`);
  myAuthor.classList.add("comment");

  myAuthor.textContent = "--- " + author;

  holder.appendChild(myAuthor);
}

function createHTML(content, currentIndex) {
  let myContent = document.createElement("p");
  let commentHolder = document.createElement("div");

  myContent.classList.add("comment");
  commentHolder.classList.add(
    "bg-light",
    "mt-4",
    "text-dark",
    "py-3",
    "px-3",
    "comment"
  );
  commentHolder.id = currentIndex + "_holder";

  myContent.textContent = content;

  commentHolder.appendChild(myContent);
  commentContainer.appendChild(commentHolder);
}

function loadExistingComments() {
  fetch("/api/comment/getConnected:" + blogNum).then((response) =>
    response.json().then((comments) => {
      for (let i = 0; i < comments.length; i++) {
        createHTML(comments[i].content, i);
        fetch("/api/user/findUser:" + comments[i].posterId).then((response) =>
          response.json().then((poster) => {
            addAuthor(poster, i);
          })
        );
      }
    })
  );
}

function handleLoadingBlogs() {
  const post = localStorage.getItem("blogPost");
  let mytempHTML = document.createElement("div");
  mytempHTML.classList.add(
    "bg-dark",
    "mt-4",
    "text-light",
    "py-3",
    "px-3",
    "blog-post"
  );
  mytempHTML.innerHTML = post;
  blogContainer.appendChild(mytempHTML);
  loadExistingComments();
}

const blogFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector("#content").value;

  if (content) {
    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({ content, blogNum }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/addComment");
    } else {
      document.location.replace("/");
    }
  }
};

document
  .querySelector(".blog-form")
  .addEventListener("submit", blogFormHandler);

handleLoadingBlogs();
