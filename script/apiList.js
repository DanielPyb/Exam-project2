//Getting the api and container
const apiURL = "https://kodeblokk.com/exam_semester2/wp-json/wp/v2/posts";
const blogList = document.querySelector(".blog-list");

//Getting the buttons and reading the page
const forwardBTN = document.querySelector("#forward-button")
const backwardBTN = document.querySelector("#backward-button")
let pagenumber = 1;



async function apiCall(url){
    try{
    const result = await fetch(url);
    const response = await result.json();

    response.forEach(post =>{
        blogList.innerHTML +=
        `<a href="blog.html?id=${post.id}">
        <div class="blog">
            <img src="images/blogImg.jpg" />
                <div class="blog-text">
                <h2>${post.title.rendered}</h2>
            <p>By Elias</p>
        </div>
      </div></a>
        `
    })

}
    catch(error){
        console.log(error);
    }
}

apiCall(apiURL);


//Page changes
function pageForward(){
    if(pagenumber == 1){
    pagenumber++;
    const newUrl  = "https://kodeblokk.com/exam_semester2/wp-json/wp/v2/posts?page=" + pagenumber;
    blogList.innerHTML = "";
    apiCall(newUrl);}
}

function pageBackward(){
    if (pagenumber == 2){
    pagenumber--;
    const newUrl  = "https://kodeblokk.com/exam_semester2/wp-json/wp/v2/posts?page=" + pagenumber;
    blogList.innerHTML = "";
    apiCall(newUrl);
    }
}

forwardBTN.addEventListener("click", pageForward);
backwardBTN.addEventListener("click", pageBackward);