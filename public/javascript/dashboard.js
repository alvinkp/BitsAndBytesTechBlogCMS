const blogContainer = document.querySelector("#my-blogs");

function newPost() {
  window.location.href = "/newPost";
}

function updatePost(id) {
  localStorage.setItem("postId", id);
  window.location.href = "/updatePost";
}

// async function updatePost(url, data) {
//   const response = await fetch(url, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       body: JSON.stringify(data),
//     },
//   });
//   return response.json();
// }

function createHTML(title, date, id) {
  let blogHolder = document.createElement("div");
  let myDate = date.split("T");
  let blogButton = document.createElement("button");
  blogButton.classList.add("flex-fill", "btn", "btn-dark", "mt-2");
  blogButton.id = id;

  blogButton.textContent = title + " --- " + myDate[0];
  blogButton.setAttribute("onClick", "updatePost(" + blogButton.id + ")");

  blogHolder.appendChild(blogButton);
  blogContainer.appendChild(blogHolder);
  console.log(blogHolder);
}

function handleLoadingBlogs() {
  fetch("/api/blog/").then((response) =>
    response.json().then((myBlogs) => {
      console.log(myBlogs);
      for (myBlog of myBlogs) {
        createHTML(myBlog.title, myBlog.createdAt, myBlog.id);
      }
    })
  );
}

handleLoadingBlogs();
