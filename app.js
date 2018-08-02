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
      myTitle.innerHTML = resAPI.data.children[i].data.title;

      if (resAPI.data.children[i].data.secure_media === null) {
        console.log(resAPI.data.children[i].data.url.substring(resAPI.data.children[i].data.url.length - 1), "WHAT IS LAST LETTER");
        const myVid = document.createElement("img");
        myVid.id = "post" + i;
        myVid.className = "redditPost";
        myTitle.appendChild(myVid);
        if (resAPI.data.children[i].data.url.substring(resAPI.data.children[i].data.url.length - 1) === "v") {
          myVid.src = resAPI.data.children[i].data.url.slice(0, (resAPI.data.children[i].data.url.length - 1));
        } else {
          myVid.src = resAPI.data.children[i].data.url;
        }
      } else {
        const myVid = document.createElement("img");
        myVid.id = "post" + i;
        myVid.className = "redditPost";
        myTitle.appendChild(myVid);
        myVid.src = resAPI.data.children[i].data.secure_media.oembed.thumbnail_url;
      }

    } else {
      const myTitle = document.createElement("div");
      myTitle.id = "title" + i;
      myTitle.className = "postTitle";
      document.body.appendChild(myTitle);
      myTitle.innerHTML = resAPI.data.children[i].data.title;

      const myDivs = document.createElement("div");
      myDivs.id = "post" + i;
      myDivs.className = "postBody";
      myTitle.appendChild(myDivs);
      myDivs.innerHTML = resAPI.data.children[i].data.selftext;
    }
  }
})