import redditParse from './telepath-api.js';

const imageList = document.querySelector(".media");
const current = document.getElementById("subreddit");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const welcome = document.getElementById("welcome"); 

searchForm.addEventListener('submit', e => {
    const reddit = searchInput.value; // search subreddit
    const sortType = document.getElementById("sort-type").value //sort posts
    const limit = document.getElementById("limit").value //limit post return
    let proxy = "https://cors-anywhere.herokuapp.com/"; //proxy

    // searchInput.value = ''; // clears value/text in search bar
    welcome.innerHTML = '';
    imageList.innerHTML = ''; // resets (not reloads) page when new search is executed
    console.clear(); // clears console when new search is executed

    e.preventDefault(); // prevents form from submitting

    redditParse.search(reddit, sortType, limit, proxy).then(query => {
        let redditPosts = query, i;
        for (i = 0; i < redditPosts.length; i++) {
            
            let domain = redditPosts[i].domain;
            let parsedSub = redditPosts[i].subreddit_name_prefixed;
            let postUrl = redditPosts[i].url;
            
            current.innerHTML = ` You are currently viewing ${parsedSub}`;

            // Posts from gfycat
            if (domain == "gfycat.com") {

                let slicedGIF = postUrl.slice(8);

                let gfycatObject = {
                gfycatVideo: `${proxy}https://thumbs.${slicedGIF}-mobile.mp4`,
                gfycatTitle: redditPosts[i].title,
                gfycatSub: redditPosts[i].subreddit_name_prefixed,
                gfycatUps: redditPosts[i].ups,
                gfycatAuthor: redditPosts[i].author,
                gfycatDomain: redditPosts[i].domain,
            }

            imageList.innerHTML += addNewImageGfycat(gfycatObject);
            console.log(gfycatObject);
        } 

            // Posts hosted by v.redd.it
        if (domain == "v.redd.it") {
            let vredditObject = {
                vredditVideo: redditPosts[i].secure_media.reddit_video.fallback_url,
                vredditTitle: redditPosts[i].title,
                vredditSub: redditPosts[i].subreddit_name_prefixed,
                vredditUps: redditPosts[i].ups, 
                vredditAuthor: redditPosts[i].author, 
                vredditDomain: redditPosts[i].domain,
            }

            imageList.innerHTML += addNewImageVreddit(vredditObject);
            console.log(vredditObject);
        }

            // Posts from imgur
        if (domain == "i.imgur.com" && postUrl.includes("gif")) {
            let imgurObject = {
                imgurVideo: redditPosts[i].preview.reddit_video_preview.fallback_url,
                imgurTitle: redditPosts[i].title,
                imgurSub: redditPosts[i].subreddit_name_prefixed,
                imgurUps: redditPosts[i].ups, 
                imgurAuthor: redditPosts[i].author,
                imgurDomain: redditPosts[i].domain, 
            }

            imageList.innerHTML += addNewImageImgur(imgurObject);
            console.log(imgurObject);
        }

            // Posts hosted by i.redd.it
        if (domain == "i.redd.it" && postUrl.includes("gif")) {
            let iredditObject = {
                iredditImage: redditPosts[i].url,
                iredditTitle: redditPosts[i].title,
                iredditSub: redditPosts[i].subreddit_name_prefixed,
                iredditUps: redditPosts[i].ups, 
                iredditAuthor: redditPosts[i].author,
                iredditDomain: redditPosts[i].domain,
            }

            imageList.innerHTML += addNewImageIreddit(iredditObject);
            console.log(iredditObject);
        }

        }

        function addNewImageGfycat(gfycatObject) {
            return `
                    <div class="post-header">
                        <p class="title">${gfycatObject.gfycatTitle}</p>
						<p class="video-items" class="subreddit">posted to ${gfycatObject.gfycatSub} by u/${gfycatObject.gfycatAuthor} - ${gfycatObject.gfycatDomain}</p>
						<p class="video-items" class="upvotes">❤︎ ${gfycatObject.gfycatUps} likes</p>
                    </div>
                    <div class="video-box">
                        <video src="${gfycatObject.gfycatVideo}" preload muted autoplay loop></video>
                    </div>
		        `;
            }

        function addNewImageVreddit(vredditObject) {
            return `
                    <div class="post-header">
                        <p class="title">${vredditObject.vredditTitle}</p>
						<p class="video-items" class="subreddit">posted to ${vredditObject.vredditSub} by u/${vredditObject.vredditAuthor} - ${vredditObject.vredditDomain}</p>
						<p class="video-items" class="upvotes">❤︎ ${vredditObject.vredditUps} likes</p>
                    </div>
                    <div class="video-box">
                        <video src="${vredditObject.vredditVideo}" preload muted autoplay loop></video>
                    </div>
		        `;
            }

        function addNewImageImgur(imgurObject) {
                return `
                    <div class="post-header">
                        <p class="title">${imgurObject.imgurTitle}</p>
						<p class="video-items" class="subreddit">posted to ${imgurObject.imgurSub} by u/${imgurObject.imgurAuthor} - ${imgurObject.imgurDomain}</p>
						<p class="video-items" class="upvotes">❤︎ ${imgurObject.imgurUps} likes</p>
                    </div>
                    <div class="video-box">
                        <video src="${imgurObject.imgurVideo}" preload muted autoplay loop><video/>
                    </div>
		        `;
        }

        function addNewImageIreddit(iredditObject) {
                return `
                    <div class="post-header">
                        <p class="title">${iredditObject.iredditTitle}</p>
						<p class="video-items" class="subreddit">posted to ${iredditObject.iredditSub} by u/${iredditObject.iredditAuthor} - ${iredditObject.iredditDomain}</p>
						<p class="video-items" class="upvotes">❤︎ ${iredditObject.iredditUps} likes</p>
                    </div>
                    <div class="video-box">
                        <img src="${iredditObject.iredditImage}"/>
                    </div>
		        `;
            }
    })

});










