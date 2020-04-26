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

    welcome.innerHTML = '';
    imageList.innerHTML = ''; // resets (not reloads) page when new search is executed
    console.clear(); // clears console when new search is executed

    e.preventDefault(); // prevents form from submitting

    redditParse.search(reddit, sortType, limit).then(query => {
        let redditPosts = query, i;
        for (i = 0; i < redditPosts.length; i++) {
            
            let domain = redditPosts[i].domain;
            let parsedSub = redditPosts[i].subreddit_name_prefixed;
            let postUrl = redditPosts[i].url;
            let title = redditPosts[i].title;
            let upvotes = redditPosts[i].ups;
            let author = redditPosts[i].author;

            current.innerHTML = `You are currently viewing ${parsedSub}`;

            // Posts from gfycat with typical url
        if (domain == "gfycat.com") {
            let slicedGfycat = postUrl.slice(19);
            async function getGfycatVideo() {
                const gfycatData = await fetch(`https://api.gfycat.com/v1/gfycats/${slicedGfycat}`);
                const data = await gfycatData.json();

                let i = 0;
                let gfycatUrl = data.gfyItem.miniUrl;
                
                let gfycatObject = {
                    gfycatVideo: gfycatUrl,
                    gfycatTitle: title,
                    gfycatSub: parsedSub,
                    gfycatUps: upvotes,
                    gfycatAuthor: author,
                    gfycatDomain: domain,
                }

                imageList.innerHTML += addNewImageGfycat(gfycatObject)
                console.log(gfycatObject);
            }
            getGfycatVideo();
        } 

            // Posts from gfycat with alternate url
        if (domain == "gfycat.com" && postUrl.includes("gifs/detail/")) {
            let newGfycatID = postUrl.slice(31);
            async function getGfycatVideoTwo() {
                const gfycatData = await fetch(`https://api.gfycat.com/v1/gfycats/${newGfycatID}`);
                const data = await gfycatData.json();

                let i = 0;
                let gfycatUrlTwo = data.gfyItem.miniUrl;

                let gfycatObjectTwo = {
                    gfycatVideoTwo: gfycatUrlTwo,
                    gfycatTitleTwo: title,
                    gfycatSubTwo: parsedSub,
                    gfycatUpsTwo: upvotes,
                    gfycatAuthorTwo: author,
                    gfycatDomainTwo: domain,
                }

                imageList.innerHTML += addNewImageGfycatTwo(gfycatObjectTwo)
                console.log(gfycatObjectTwo);
            }
            getGfycatVideoTwo();
        }

            // Posts from gfycat that includes hyphens in url
        if (domain == "gfycat.com" && postUrl.includes("-")) {
            let newGfycatID = postUrl.slice(19);
            let search = "-";
            let indexOf = newGfycatID.indexOf(search);
            let length = newGfycatID.length
            let remainder = indexOf - length;
            let newSlice = newGfycatID.slice(0, `${remainder}`);
            async function getGfycatVideoThree() {
                const gfycatData = await fetch(`https://api.gfycat.com/v1/gfycats/${newSlice}`);
                const data = await gfycatData.json();

                let i = 0;
                let gfycatUrlThree = data.gfyItem.miniUrl;

                let gfycatObjectThree = {
                    gfycatVideoThree: gfycatUrlThree,
                    gfycatTitleThree: title,
                    gfycatSubThree: parsedSub,
                    gfycatUpsThree: upvotes,
                    gfycatAuthorThree: author,
                    gfycatDomainThree: domain,
                }

                imageList.innerHTML += addNewImageGfycatThree(gfycatObjectThree)
                console.log(gfycatObjectThree);
            }
            getGfycatVideoThree();
        }

            // Posts hosted by v.redd.it and posts hosted by v.redd.it that have been crossposted
        if (domain == "v.redd.it" && "crosspost_parent_list" in redditPosts[i]) {
            let vredditCrossObj = {
                vredditCrossVideo: redditPosts[i].crosspost_parent_list[0].secure_media.reddit_video.fallback_url,
                vredditCrossTitle: redditPosts[i].crosspost_parent_list[0].title,
                vredditCrossSub: redditPosts[i].crosspost_parent_list[0].subreddit_name_prefixed,
                vredditCrossUps: redditPosts[i].ups,
                vredditCrossAuthor: redditPosts[i].author,
                vredditCrossDomain: redditPosts[i].domain
            }
            imageList.innerHTML += addNewImageVredditX(vredditCrossObj)
            console.log(vredditCrossObj);

        } else if (domain == "v.redd.it") {
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

        function addNewImageGfycatTwo(gfycatObjectTwo) {
            return `
                    <div class="post-header">
                        <p class="title">${gfycatObjectTwo.gfycatTitleTwo}</p>
						<p class="video-items" class="subreddit">posted to ${gfycatObjectTwo.gfycatSubTwo} by u/${gfycatObjectTwo.gfycatAuthorTwo} - ${gfycatObjectTwo.gfycatDomainTwo}</p>
						<p class="video-items" class="upvotes">❤︎ ${gfycatObjectTwo.gfycatUpsTwo} likes</p>
                    </div>
                    <div class="video-box">
                        <video src="${gfycatObjectTwo.gfycatVideoTwo}" preload muted autoplay loop></video>
                    </div>
		        `;
        }

        function addNewImageGfycatThree(gfycatObjectThree) {
            return `
                    <div class="post-header">
                        <p class="title">${gfycatObjectThree.gfycatTitleThree}</p>
						<p class="video-items" class="subreddit">posted to ${gfycatObjectThree.gfycatSubThree} by u/${gfycatObjectThree.gfycatAuthorThree} - ${gfycatObjectThree.gfycatDomainThree}</p>
						<p class="video-items" class="upvotes">❤︎ ${gfycatObjectThree.gfycatUpsThree} likes</p>
                    </div>
                    <div class="video-box">
                        <video src="${gfycatObjectThree.gfycatVideoThree}" preload muted autoplay loop></video>
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

        function addNewImageVredditX(vredditCrossObj) {
            return `
                    <div class="post-header">
                        <p class="title">${vredditCrossObj.vredditCrossTitle}</p>
						<p class="video-items" class="subreddit">crossposted from ${vredditCrossObj.vredditCrossSub} by u/${vredditCrossObj.vredditCrossAuthor} - ${vredditCrossObj.vredditCrossDomain}</p>
						<p class="video-items" class="upvotes">❤︎ ${vredditCrossObj.vredditCrossUps} likes</p>
                    </div>
                    <div class="video-box">
                        <video src="${vredditCrossObj.vredditCrossVideo}" preload muted autoplay loop></video>
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










