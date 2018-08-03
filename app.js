const request = (method, eventType, url, callback) => {
  let oReq = new XMLHttpRequest;
  oReq.addEventListener(eventType, callback);
  oReq.open(method, url);
  oReq.send();
};

request("GET", "load", "https://www.reddit.com/r/gifrecipes.json", res => {
  console.log(JSON.parse(res.currentTarget.response));
  let resAPI = JSON.parse(res.currentTarget.response);

  for (var i = 0; i < resAPI.data.children.length; i++) {
    let shorterAPI = resAPI.data.children[i].data;

    if (resAPI.data.children[i].data.selftext === "") {
      const myAuthor = document.createElement("div");
      myAuthor.id = "author" + i;
      myAuthor.className = "postAuthor";
      document.getElementById("posts").appendChild(myAuthor);
      myAuthor.innerHTML = "Posted by u/" + shorterAPI.author;
      // myAuthor.addEventListener("mouseover", lightUp);

      // lightup = () => {
      //   this.style.border = "thick solid darkgrey";
      // }

      const myTitle = document.createElement("div");
      myTitle.id = "title" + i;
      myTitle.className = "postTitle";
      myAuthor.appendChild(myTitle);
      myTitle.innerHTML = shorterAPI.title;

      if (shorterAPI.secure_media === null) {
        if (shorterAPI.url.substring(shorterAPI.url.length - 1) === "v") {
          const myVid = document.createElement("img");
          myVid.id = "post" + i;
          myVid.className = "redditPost";
          myTitle.appendChild(myVid);
          myVid.src = shorterAPI.url.slice(0, (shorterAPI.url.length - 1));
        } else if (shorterAPI.crosspost_parent_list != null) {
          const myVid = document.createElement("embed");
          myVid.id = "post" + i;
          myVid.className = "redditPost";
          myTitle.appendChild(myVid);
          myVid.src = shorterAPI.crosspost_parent_list[0].secure_media.oembed.thumbnail_url;
        } else {
          const myVid = document.createElement("img");
          myVid.id = "post" + i;
          myVid.className = "redditPost";
          myTitle.appendChild(myVid);
          myVid.src = shorterAPI.url;
        }
      } else {
        const myVid = document.createElement("img");
        myVid.id = "post" + i;
        myVid.className = "redditPost";
        myTitle.appendChild(myVid);
        myVid.src = shorterAPI.secure_media.oembed.thumbnail_url;
      }

    } else {
      const myAuthor = document.createElement("div");
      myAuthor.id = "author" + i;
      myAuthor.className = "postAuthor";
      document.getElementById("posts").appendChild(myAuthor);
      myAuthor.innerHTML = "Posted by u/" + shorterAPI.author;

      const myTitle = document.createElement("div");
      myTitle.id = "title" + i;
      myTitle.className = "postTitle";
      myAuthor.appendChild(myTitle);
      myTitle.innerHTML = shorterAPI.title;

      const myDivs = document.createElement("div");
      myDivs.id = "post" + i;
      myDivs.className = "redditPost";
      myTitle.appendChild(myDivs);

      //Domparser I found on stackoverflow that parses HTML code so I can preserve the string properties
      //https://stackoverflow.com/questions/1912501/unescape-html-entities-in-javascript/34064434#34064434
      function htmlDecode(input) {
        var doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
      };

      myDivs.innerHTML = htmlDecode(shorterAPI.selftext_html);
    }
  }



  //Loads next page data
  request("GET", "load", ("http://www.reddit.com/r/gifrecipes.json?after=" + resAPI.data.after), res => {

    console.log(JSON.parse(res.currentTarget.response), "2nd one");
    let resAPI = JSON.parse(res.currentTarget.response);

    for (var i = 0; i < resAPI.data.children.length; i++) {
      let shorterAPI = resAPI.data.children[i].data;

      if (resAPI.data.children[i].data.selftext === "") {
        const myAuthor = document.createElement("div");
        myAuthor.id = "author" + i;
        myAuthor.className = "postAuthor";
        document.getElementById("posts").appendChild(myAuthor);
        myAuthor.innerHTML = "Posted by u/" + shorterAPI.author;
        // myAuthor.addEventListener("mouseover", lightUp);

        // lightup = () => {
        //   this.style.border = "thick solid darkgrey";
        // }

        const myTitle = document.createElement("div");
        myTitle.id = "title" + i;
        myTitle.className = "postTitle";
        myAuthor.appendChild(myTitle);
        myTitle.innerHTML = shorterAPI.title;

        if (shorterAPI.secure_media === null) {
          if (shorterAPI.url.substring(shorterAPI.url.length - 1) === "v") {
            const myVid = document.createElement("img");
            myVid.id = "post" + i;
            myVid.className = "redditPost";
            myTitle.appendChild(myVid);
            myVid.src = shorterAPI.url.slice(0, (shorterAPI.url.length - 1));
          } else if (shorterAPI.crosspost_parent_list != null) {
            const myVid = document.createElement("embed");
            myVid.id = "post" + i;
            myVid.className = "redditPost";
            myTitle.appendChild(myVid);
            myVid.src = shorterAPI.crosspost_parent_list[0].secure_media.oembed.thumbnail_url;
          } else {
            const myVid = document.createElement("img");
            myVid.id = "post" + i;
            myVid.className = "redditPost";
            myTitle.appendChild(myVid);
            myVid.src = shorterAPI.url;
          }
        } else {
          const myVid = document.createElement("img");
          myVid.id = "post" + i;
          myVid.className = "redditPost";
          myTitle.appendChild(myVid);
          myVid.src = shorterAPI.secure_media.oembed.thumbnail_url;
        }

      } else {
        const myAuthor = document.createElement("div");
        myAuthor.id = "author" + i;
        myAuthor.className = "postAuthor";
        document.getElementById("posts").appendChild(myAuthor);
        myAuthor.innerHTML = "Posted by u/" + shorterAPI.author;

        const myTitle = document.createElement("div");
        myTitle.id = "title" + i;
        myTitle.className = "postTitle";
        myAuthor.appendChild(myTitle);
        myTitle.innerHTML = shorterAPI.title;

        const myDivs = document.createElement("div");
        myDivs.id = "post" + i;
        myDivs.className = "redditPost";
        myTitle.appendChild(myDivs);

        //Domparser I found on stackoverflow that parses HTML code so I can preserve the string properties
        //https://stackoverflow.com/questions/1912501/unescape-html-entities-in-javascript/34064434#34064434
        function htmlDecode(input) {
          var doc = new DOMParser().parseFromString(input, "text/html");
          return doc.documentElement.textContent;
        };

        myDivs.innerHTML = htmlDecode(shorterAPI.selftext_html);
      }
    }
  })
})

document.getElementById("favoriteButton").addEventListener("click", favorite);

//Repeat of above function to reload the first subreddit that is seen
function favorite() {
  request("GET", "load", "https://www.reddit.com/r/gifrecipes.json", res => {
    let getBody = document.body;
    let getPost = document.getElementById("posts");
    getBody.removeChild(getPost);

    let createPost = document.createElement("div");
    createPost.id = "posts";
    document.body.appendChild(createPost);

    let resAPI = JSON.parse(res.currentTarget.response);

    for (var i = 0; i < resAPI.data.children.length; i++) {
      let shorterAPI = resAPI.data.children[i].data;

      if (resAPI.data.children[i].data.selftext === "") {
        const myAuthor = document.createElement("div");
        myAuthor.id = "author" + i;
        myAuthor.className = "postAuthor";
        document.getElementById("posts").appendChild(myAuthor);
        myAuthor.innerHTML = "Posted by u/" + shorterAPI.author;
        // myAuthor.addEventListener("mouseover", lightUp);

        // lightup = () => {
        //   this.style.border = "thick solid darkgrey";
        // }

        const myTitle = document.createElement("div");
        myTitle.id = "title" + i;
        myTitle.className = "postTitle";
        myAuthor.appendChild(myTitle);
        myTitle.innerHTML = shorterAPI.title;

        if (shorterAPI.secure_media === null) {
          if (shorterAPI.url.substring(shorterAPI.url.length - 1) === "v") {
            const myVid = document.createElement("img");
            myVid.id = "post" + i;
            myVid.className = "redditPost";
            myTitle.appendChild(myVid);
            myVid.src = shorterAPI.url.slice(0, (shorterAPI.url.length - 1));
          } else if (shorterAPI.crosspost_parent_list != null) {
            const myVid = document.createElement("embed");
            myVid.id = "post" + i;
            myVid.className = "redditPost";
            myTitle.appendChild(myVid);
            myVid.src = shorterAPI.crosspost_parent_list[0].secure_media.oembed.thumbnail_url;
          } else {
            const myVid = document.createElement("img");
            myVid.id = "post" + i;
            myVid.className = "redditPost";
            myTitle.appendChild(myVid);
            myVid.src = shorterAPI.url;
          }
        } else {
          const myVid = document.createElement("img");
          myVid.id = "post" + i;
          myVid.className = "redditPost";
          myTitle.appendChild(myVid);
          myVid.src = shorterAPI.secure_media.oembed.thumbnail_url;
        }

      } else {
        const myAuthor = document.createElement("div");
        myAuthor.id = "author" + i;
        myAuthor.className = "postAuthor";
        document.getElementById("posts").appendChild(myAuthor);
        myAuthor.innerHTML = "Posted by u/" + shorterAPI.author;

        const myTitle = document.createElement("div");
        myTitle.id = "title" + i;
        myTitle.className = "postTitle";
        myAuthor.appendChild(myTitle);
        myTitle.innerHTML = shorterAPI.title;

        const myDivs = document.createElement("div");
        myDivs.id = "post" + i;
        myDivs.className = "redditPost";
        myTitle.appendChild(myDivs);

        //Domparser I found on stackoverflow that parses HTML code so I can preserve the string properties
        //https://stackoverflow.com/questions/1912501/unescape-html-entities-in-javascript/34064434#34064434
        function htmlDecode(input) {
          var doc = new DOMParser().parseFromString(input, "text/html");
          return doc.documentElement.textContent;
        };

        myDivs.innerHTML = htmlDecode(shorterAPI.selftext_html);
      }
    }
    //Loads next page data
    request("GET", "load", ("http://www.reddit.com/r/gifrecipes.json?after=" + resAPI.data.after), res => {

      console.log(JSON.parse(res.currentTarget.response), "2nd one");
      let resAPI = JSON.parse(res.currentTarget.response);

      for (var i = 0; i < resAPI.data.children.length; i++) {
        let shorterAPI = resAPI.data.children[i].data;

        if (resAPI.data.children[i].data.selftext === "") {
          const myAuthor = document.createElement("div");
          myAuthor.id = "author" + i;
          myAuthor.className = "postAuthor";
          document.getElementById("posts").appendChild(myAuthor);
          myAuthor.innerHTML = "Posted by u/" + shorterAPI.author;
          // myAuthor.addEventListener("mouseover", lightUp);

          // lightup = () => {
          //   this.style.border = "thick solid darkgrey";
          // }

          const myTitle = document.createElement("div");
          myTitle.id = "title" + i;
          myTitle.className = "postTitle";
          myAuthor.appendChild(myTitle);
          myTitle.innerHTML = shorterAPI.title;

          if (shorterAPI.secure_media === null) {
            if (shorterAPI.url.substring(shorterAPI.url.length - 1) === "v") {
              const myVid = document.createElement("img");
              myVid.id = "post" + i;
              myVid.className = "redditPost";
              myTitle.appendChild(myVid);
              myVid.src = shorterAPI.url.slice(0, (shorterAPI.url.length - 1));
            } else if (shorterAPI.crosspost_parent_list != null) {
              const myVid = document.createElement("embed");
              myVid.id = "post" + i;
              myVid.className = "redditPost";
              myTitle.appendChild(myVid);
              myVid.src = shorterAPI.crosspost_parent_list[0].secure_media.oembed.thumbnail_url;
            } else {
              const myVid = document.createElement("img");
              myVid.id = "post" + i;
              myVid.className = "redditPost";
              myTitle.appendChild(myVid);
              myVid.src = shorterAPI.url;
            }
          } else {
            const myVid = document.createElement("img");
            myVid.id = "post" + i;
            myVid.className = "redditPost";
            myTitle.appendChild(myVid);
            myVid.src = shorterAPI.secure_media.oembed.thumbnail_url;
          }

        } else {
          const myAuthor = document.createElement("div");
          myAuthor.id = "author" + i;
          myAuthor.className = "postAuthor";
          document.getElementById("posts").appendChild(myAuthor);
          myAuthor.innerHTML = "Posted by u/" + shorterAPI.author;

          const myTitle = document.createElement("div");
          myTitle.id = "title" + i;
          myTitle.className = "postTitle";
          myAuthor.appendChild(myTitle);
          myTitle.innerHTML = shorterAPI.title;

          const myDivs = document.createElement("div");
          myDivs.id = "post" + i;
          myDivs.className = "redditPost";
          myTitle.appendChild(myDivs);

          //Domparser I found on stackoverflow that parses HTML code so I can preserve the string properties
          //https://stackoverflow.com/questions/1912501/unescape-html-entities-in-javascript/34064434#34064434
          function htmlDecode(input) {
            var doc = new DOMParser().parseFromString(input, "text/html");
            return doc.documentElement.textContent;
          };

          myDivs.innerHTML = htmlDecode(shorterAPI.selftext_html);
        }
      }
    })
  })
}


var urlArr = ["https://www.reddit.com/r/earthporn.json", "https://www.reddit.com/r/cozyplaces.json", "https://www.reddit.com/r/roomporn.json"]


document.getElementById("randomButton").addEventListener("click", random);


function random() {
  let randomNum = Math.floor(Math.random() * urlArr.length)

  let randomArr = urlArr[randomNum];

  request("GET", "load", randomArr, res => {
    console.log(JSON.parse(res.currentTarget.response), "favorite");
    let getBody = document.body;
    let getPost = document.getElementById("posts");
    getBody.removeChild(getPost);

    let createPost = document.createElement("div");
    createPost.id = "posts";
    document.body.appendChild(createPost);

    let resAPI = JSON.parse(res.currentTarget.response);

    for (var i = 0; i < resAPI.data.children.length; i++) {
      let shorterAPI = resAPI.data.children[i].data;

      if (resAPI.data.children[i].data.selftext === "") {
        const myAuthor = document.createElement("div");
        myAuthor.id = "author" + i;
        myAuthor.className = "postAuthor";
        document.getElementById("posts").appendChild(myAuthor);
        myAuthor.innerHTML = "Posted by u/" + shorterAPI.author;
        // myAuthor.addEventListener("mouseover", lightUp);

        // lightup = () => {
        //   this.style.border = "thick solid darkgrey";
        // }

        const myTitle = document.createElement("div");
        myTitle.id = "title" + i;
        myTitle.className = "postTitle";
        myAuthor.appendChild(myTitle);
        myTitle.innerHTML = shorterAPI.title;

        if (shorterAPI.secure_media === null) {
          if (shorterAPI.url.substring(shorterAPI.url.length - 1) === "v") {
            const myVid = document.createElement("img");
            myVid.id = "post" + i;
            myVid.className = "redditPost";
            myTitle.appendChild(myVid);
            myVid.src = shorterAPI.url.slice(0, (shorterAPI.url.length - 1));
          } else if (shorterAPI.crosspost_parent_list != null) {
            const myVid = document.createElement("embed");
            myVid.id = "post" + i;
            myVid.className = "redditPost";
            myTitle.appendChild(myVid);
            myVid.src = shorterAPI.crosspost_parent_list[0].secure_media.oembed.thumbnail_url;
          } else if (shorterAPI.preview.images != null) {
            const myVid = document.createElement("img");
            myVid.id = "post" + i;
            myVid.className = "redditPost";
            myTitle.appendChild(myVid);
            myVid.src = shorterAPI.preview.images[0].source.url;
          } else {
            const myVid = document.createElement("img");
            myVid.id = "post" + i;
            myVid.className = "redditPost";
            myTitle.appendChild(myVid);
            myVid.src = shorterAPI.url;
          }
        } else {
          const myVid = document.createElement("img");
          myVid.id = "post" + i;
          myVid.className = "redditPost";
          myTitle.appendChild(myVid);
          myVid.src = shorterAPI.secure_media.oembed.thumbnail_url;
        }

      } else {
        const myAuthor = document.createElement("div");
        myAuthor.id = "author" + i;
        myAuthor.className = "postAuthor";
        document.getElementById("posts").appendChild(myAuthor);
        myAuthor.innerHTML = "Posted by u/" + shorterAPI.author;

        const myTitle = document.createElement("div");
        myTitle.id = "title" + i;
        myTitle.className = "postTitle";
        myAuthor.appendChild(myTitle);
        myTitle.innerHTML = shorterAPI.title;

        const myDivs = document.createElement("div");
        myDivs.id = "post" + i;
        myDivs.className = "redditPost";
        myTitle.appendChild(myDivs);

        //Domparser I found on stackoverflow that parses HTML code so I can preserve the string properties
        //https://stackoverflow.com/questions/1912501/unescape-html-entities-in-javascript/34064434#34064434
        function htmlDecode(input) {
          var doc = new DOMParser().parseFromString(input, "text/html");
          return doc.documentElement.textContent;
        };

        myDivs.innerHTML = htmlDecode(shorterAPI.selftext_html);
      }
    }
  })

}


document.getElementById("appButton").addEventListener("click", app);

function app() {
  window.open("https://www.reddit.com/mobile/download");
};



