const blogContainer = document.querySelector("#my-blogs");

function newPost() {
  window.location.href = "/newPost";
}

function createHTML(title, content, date) {
  let myTitle = document.createElement("h2");
  let myContent = document.createElement("p");
  let myAuthor = document.createElement("p");
  let blogHolder = document.createElement("div");
  let myDate = date.split("T");

  blogHolder.classList.add("bg-dark", "mt-4", "text-light", "py-3", "px-3");

  myTitle.textContent = title;
  myContent.textContent = content;
  myAuthor.textContent = myDate[0];

  blogHolder.appendChild(myTitle);
  blogHolder.appendChild(myContent);
  blogHolder.appendChild(myAuthor);
  blogContainer.appendChild(blogHolder);
  console.log(blogHolder);
}

function handleLoadingBlogs() {
  fetch("/api/blog/").then((response) =>
    response.json().then((myBlogs) => {
      console.log(myBlogs);
      for (myBlog of myBlogs) {
        createHTML(myBlog.title, myBlog.content, myBlog.createdAt);
      }
    })
  );
}

handleLoadingBlogs();
