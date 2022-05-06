const apiURL = "https://kodeblokk.com/exam_semester2/wp-json/wp/v2/posts?per_page=6";
const blogList = document.querySelector(".home-blog-list");
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
        <div class="home-blog">
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



// I know the that there are 13 results so I hardcoded the values
function pageForward(){
    pagenumber++;
    if(pagenumber == 4) pagenumber = 1
    const newUrl  = apiURL + "&page=" + pagenumber;
    blogList.innerHTML = "";
    apiCall(newUrl);
}

function pageBackward(){
    pagenumber--;
    if(pagenumber == 0) pagenumber = 3
    const newUrl  = apiURL + "&page=" + pagenumber;
    blogList.innerHTML = "";
    apiCall(newUrl);
}

forwardBTN.addEventListener("click", pageForward);
backwardBTN.addEventListener("click", pageBackward);

apiCall(apiURL);