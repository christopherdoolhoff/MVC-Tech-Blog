// dropdown functionality
function dropDown() {
    document.getelementbyid("#").classlist.toggle("show")
}
// close dropdown if clicked outside of box
window.onclick = function(event) {
    if (!event.target.matches('.dropDownBtn')) {
        var dropDown = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropDown.length; i++) {
            var open = dropDown[i];
            if (open.classList.contains('show')) {
                open.classList.remove('show');
            }
        }
    }
};

// const test = async (event) => {
//     event.preventDefault();
//     const session = await fetch ('api/users/session');
//     console.log('test session', session)
//     alert('test');
// }
const feed = async () => {
    // event.preventDefault();
        const feedData = await fetch ('/api/users/posts');
        const feedInfo = await feedData.json();
        console.log(feedInfo);
        feedResults(feedInfo);
}
  
feed();

//     document
//     .querySelector('#testBtn')
//     .addEventListener('click', test);
var feedBoxEl = document.querySelector(".feed");
var feedResults = function (data) {
    console.log(data);
    $(".feed").empty();
    document.querySelector(".feed").style.display = "block";
    for (var i = 0; i < data.length; i++) {
      var repoInfo =
        "Title: " +
        data[i].title +
        "<br>Content: " +
        data[i].content +
        "<br><br><br><br>";
      var repoEl = document.createElement("div");
      repoEl.classList = "feed-results";
      repoEl.innerHTML = repoInfo;
      feedBoxEl.appendChild(repoEl);
    }
  };