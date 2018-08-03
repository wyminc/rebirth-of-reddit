const request = (method, url, callback) => {
  let oReq = new XMLHttpRequest;
  oReq.addEventListener("load", callback);
  oReq.open(method, url);
  oReq.send();
};

request("GET", "http://www.reddit.com/r/gifrecipes.json", res => {
  console.log(JSON.parse(res.currentTarget.response));
  let resAPI = JSON.parse(res.currentTarget.response);

  for (var i = 0; i < resAPI.data.children.length; i++) {
    let shorterAPI = resAPI.data.children[i].data;

    if (resAPI.data.children[i].data.selftext === "") {
      const myTitle = document.createElement("div");
      myTitle.id = "title" + i;
      myTitle.className = "postTitle";
      document.body.appendChild(myTitle);
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
      const myTitle = document.createElement("div");
      myTitle.id = "title" + i;
      myTitle.className = "postTitle";
      document.body.appendChild(myTitle);
      myTitle.innerHTML = shorterAPI.title;

      const myDivs = document.createElement("div");
      myDivs.id = "post" + i;
      myDivs.className = "postBody";
      myTitle.appendChild(myDivs);
      myDivs.innerHTML = shorterAPI.selftext;
    }
  }
})

document.getElementById("favoriteButton").addEventListener("click",
  request("GET", "http://www.reddit.com/r/gifrecipes.json", res => {
    console.log(JSON.parse(res.currentTarget.response));
    let resAPI = JSON.parse(res.currentTarget.response);

    for (var i = 0; i < resAPI.data.children.length; i++) {
      let shorterAPI = resAPI.data.children[i].data;

      if (resAPI.data.children[i].data.selftext === "") {
        const myTitle = document.createElement("div");
        myTitle.id = "title" + i;
        myTitle.className = "postTitle";
        document.body.appendChild(myTitle);
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
        const myTitle = document.createElement("div");
        myTitle.id = "title" + i;
        myTitle.className = "postTitle";
        document.body.appendChild(myTitle);
        myTitle.innerHTML = shorterAPI.title;

        const myDivs = document.createElement("div");
        myDivs.id = "post" + i;
        myDivs.className = "postBody";
        myTitle.appendChild(myDivs);
        myDivs.innerHTML = shorterAPI.selftext;
      }
    }
  })
)

