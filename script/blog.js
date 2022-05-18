// Getting the containers
const blogContent = document.querySelector(".mainblog-content");
const blogList = document.querySelector(".mainblog-list");
const modal = document.querySelector(".mainblog-modal");
const modalContent = document.querySelector(".mainblog-modal-content");

// Getting the Query Pram to see which post will be displayed
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const blogID = params.get("id");

// Using two different endpoints, one to show all of the posts and one for getting the blog we're on
const apiURL =
  "https://kodeblokk.com/exam_semester2/wp-json/wp/v2/posts/?per_page=15";
const singleBlog =
  "https://kodeblokk.com/exam_semester2/wp-json/wp/v2/posts/" + blogID;

// Api call to display blogs
async function apiCall(url) {
  try {
    const result = await fetch(url);
    const response = await result.json();
    response.reverse();
    
    blogList.innerHTML = '';
    response.forEach((post) => {
      if (blogID == post.id) {
        //showing what the blog that is currently active is
        blogList.innerHTML += `<a href="blog.html?id=${post.id}"><li class="active underline">${post.title.rendered}</li></a>`;
      } else {
        blogList.innerHTML += `<a href="blog.html?id=${post.id}"><li>${post.title.rendered}</li></a>`;
      }
    });
  } catch(error) {
    console.log(error);
  }
}

// Api call to show the single blog page
async function getBlog(url) {
  try {
    const result = await fetch(url);
    const response = await result.json();
    blogContent.innerHTML = '';
    blogContent.innerHTML = `
        <h1>${response.title.rendered}</h1>
        <p>${response.content.rendered}</p>
        `;
    //creating a div to append the next and previous buttons to
    const nextPrev = document.createElement("div");
    nextPrev.classList.add("next-prev");
    if (response.id != 6) {
      nextPrev.innerHTML += `<p class="blog-line"><a href="blog.html?id=${response.previous.id}">Prev</a></p>`;
    } else if(response.next.id){}
    if (response.id != 33) {
      nextPrev.innerHTML += `<p class="blog-line"><a href="blog.html?id=${response.next.id}">Next</a></p>`;
    }
    blogContent.append(nextPrev);
    //if there are images in the blog post this will grab the images into an array. OBS using the blogcontent instead of document because of a bug with document(grabbing the icons as a modal)
    const images = blogContent.querySelectorAll("img");

    // function that opens the modals if the image is clicked this will also chose the selected Image through the event
    function openModal(e) {
      modal.style.display = "flex";
      modalContent.innerHTML = `${e.target.outerHTML}`;
    }

    function closeModal() {
      modal.style.display = "none";
    }

    // adding event listener for every single image
    images.forEach((image) => image.addEventListener("click", openModal));
    modal.addEventListener("click", closeModal);

    document.title = "Mitheria | " + response.title.rendered;
  } catch (error) {
    console.log(error);
  }
}

apiCall(apiURL);
getBlog(singleBlog);