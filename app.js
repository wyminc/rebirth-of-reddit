//This variable is used so that it can be called over and over to create new XMLHttpRequests
const request = (method, eventType, url, callback) => {
  let oReq = new XMLHttpRequest;
  oReq.addEventListener(eventType, callback);
  oReq.open(method, url);
  oReq.send();
};

//First request that loads the intiial page
request("GET", "load", "https://www.reddit.com/r/gifrecipes.json", res => {
  console.log(JSON.parse(res.currentTarget.response));
  let resAPI = JSON.parse(res.currentTarget.response);

  //Create the text to see what subreddit that is being viewed
  //Needs to be inside the request because the loop will only know what subreddit it is when the data is loaded from API
  let createSub = document.createElement("h2");
  let getTitle = document.getElementById("title");
  createSub.id = "currentSub";
  getTitle.appendChild(createSub);
  createSub.innerHTML = "PEPE TELLS YOU TO LOOK AT : " + resAPI.data.children[0].data.subreddit;

  //For loop that will create post according to how many posts are on that subreddit's first page
  //The if conditions in here are mainly just looking for alternative links that will work on load because certain ones do not work and meet CORB issues
  //Try to write code to look for an object field that houses a link that will work most of the time then write more if conditions to look for links that may work. The last if/else statement houses the link that works the least. This is usually the object key labelled as URL in the general "children" array.
  for (var i = 0; i < resAPI.data.children.length; i++) {
    let shorterAPI = resAPI.data.children[i].data;

    if (resAPI.data.children[i].data.selftext === "") {
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
  //If a recursion is inserted at the bottom, it can load indefinitely because the eventhandler is load
  //Repeat of code above to append more post
  //Line 98 is the only difference where there is a "?after=" to tell reddit to load the next page
  //resAPI.data.after is one of the object values that houses the after address that is put in the url
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

//Code for Favorite Button to work
document.getElementById("favoriteButton").addEventListener("click", favorite);

//Repeat of above function to reload the first subreddit that is seen
//Lines 186 to 192 destroys the current post elements and makes new ones so that the for loop can append new posts properly
//Lines 196 to 197 is to just change the innerHTML to the proper subreddit that is currently being viewed
function favorite() {
  request("GET", "load", "https://www.reddit.com/r/gifrecipes.json", res => {
    let getBody = document.body;
    let getPost = document.getElementById("posts");
    getBody.removeChild(getPost);

    let createPost = document.createElement("div");
    createPost.id = "posts";
    document.body.appendChild(createPost);

    let resAPI = JSON.parse(res.currentTarget.response);

    let getSub = document.getElementById("currentSub");
    getSub.innerHTML = "Pepe wants you to see: " + resAPI.data.children[0].data.subreddit;


    for (var i = 0; i < resAPI.data.children.length; i++) {
      let shorterAPI = resAPI.data.children[i].data;

      if (resAPI.data.children[i].data.selftext === "") {
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
    //Loads next page data on load and not on scroll
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

//Code for App Button to work
document.getElementById("appButton").addEventListener("click", app);

function app() {
  window.open("https://www.reddit.com/mobile/download");
};


//Array to house the links for our random button to pull from
var urlArr = ["https://www.reddit.com/r/earthporn.json", "https://www.reddit.com/r/showerthoughts.json", "https://www.reddit.com/r/roomporn.json", "https://www.reddit.com/r/meirl.json", "https://www.reddit.com/r/getmotivated.json", "https://www.reddit.com/r/art.json"]

//Adding the event listener to call the function to load new links
document.getElementById("randomButton").addEventListener("click", random);

//A copy of the initial request
//Lines 412 to 418 is grayed out cause it didn't work with the random subreddits I chose mainly comprised of images
//Lines 419 to 424 was added instead to try and improve loading of images
//Lines 378 to 384 destroys the current post elements and makes new ones so that the for loop can append new posts properly
//Lines 389 to 390 is to just change the innerHTML to the proper subreddit that is currently being viewed
function random() {
  let randomNum = Math.floor(Math.random() * urlArr.length)

  let randomArr = urlArr[randomNum];

  request("GET", "load", randomArr, res => {
    console.log(JSON.parse(res.currentTarget.response), "random");
    let getBody = document.body;
    let getPost = document.getElementById("posts");
    getBody.removeChild(getPost);

    let createPost = document.createElement("div");
    createPost.id = "posts";
    document.body.appendChild(createPost);

    let resAPI = JSON.parse(res.currentTarget.response);

    let getSub = document.getElementById("currentSub");
    getSub.innerHTML = "Pepe wants you to see: " + resAPI.data.children[0].data.subreddit;

    for (var i = 0; i < resAPI.data.children.length; i++) {
      let shorterAPI = resAPI.data.children[i].data;

      if (resAPI.data.children[i].data.selftext === "") {
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

        if (shorterAPI.secure_media === null) {
          if (shorterAPI.url.substring(shorterAPI.url.length - 1) === "v") {
            const myVid = document.createElement("img");
            myVid.id = "post" + i;
            myVid.className = "redditPost";
            myTitle.appendChild(myVid);
            myVid.src = shorterAPI.url.slice(0, (shorterAPI.url.length - 1));
            // } else if (shorterAPI.crosspost_parent_list !== undefined) {
            //   const myVid = document.createElement("embed");
            //   myVid.id = "post" + i;
            //   myVid.className = "redditPost";
            //   myTitle.appendChild(myVid);
            //   myVid.src = shorterAPI.crosspost_parent_list[0].secure_media.oembed.thumbnail_url;
          } else if (shorterAPI.preview !== undefined) {
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
    //Loads next page data
    request("GET", "load", ("http://www.reddit.com/r/gifrecipes.json?after=" + resAPI.data.after), res => {

      console.log(JSON.parse(res.currentTarget.response), "random 2nd");
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


//Bonus
let pepeArr = ["https://www.youtube.com/watch?v=7JyDJzawiU8", "https://www.youtube.com/watch?v=qTksCYUgI7s"]

document.getElementById("logo").addEventListener("click", pepe);

function pepe() {
  let randomNum = Math.floor(Math.random() * pepeArr.length);
  let randomArr = pepeArr[randomNum];

  window.open(randomArr);
};


