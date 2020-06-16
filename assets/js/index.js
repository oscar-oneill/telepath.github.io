import redditParse from './subreddit-api.js';
import gfycatPosts from './foreign_domains/gfycat.js';
import redgifsPosts from './foreign_domains/redgifs.js';
import imgurPosts from './foreign_domains/imgur.js';
import streamablePosts from './foreign_domains/streamable.js';
import instagramPosts from './foreign_domains/instagram.js';


const imageList = document.querySelector(".media");
const infoBox = document.querySelector(".info-box");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const welcome = document.getElementById("welcome"); 
const background = document.body;
const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

searchForm.addEventListener('submit', e => {
    const reddit = searchInput.value; // search subreddit
    const sortType = document.getElementById("sort-type").value //sort posts
    const limit = document.getElementById("limit").value //limit post return

    if (isDarkMode) {
        (background.style.backgroundColor = '#1A2225');
    } else {
        (background.style.backgroundColor = '#DAE0E6')
    }

    welcome.style.display = 'none';
    imageList.innerHTML = '';
    console.clear(); // clears console when new search is executed
    e.preventDefault(); // prevents form from submitting

    redditParse.search(reddit, sortType, limit).then(query => {
        let redditPosts = query, i;
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let subreddit = reddit;

        async function subredditData() {
            const subredditData = await fetch(`https://api.reddit.com/r/${subreddit}/about`);
            const data = await subredditData.json();

            let nsfw = data.data.over18 == true ? 'https://alanma11.files.wordpress.com/2014/12/1ly1h6i.png' : '';
            let header = data.data.banner_background_image ? data.data.banner_background_image : 'https://i.pinimg.com/564x/96/03/16/960316f379829871ab5b9452c6afd9fb.jpg';
            let icon = data.data.icon_img ? data.data.icon_img : data.data.community_icon ? data.data.community_icon : 'https://www.interactive.org/images/games_developers/no_image_available_sm.jpg';
            let description = data.data.public_description ? data.data.public_description : 'No description available for this subreddit.';
            let time = data.data.created;
            let date = new Date(time * 1000);
            let dateCreated = date.toLocaleDateString("en-US", options);
            let subscribers = data.data.subscribers;
            let subsOrganized = subscribers.toLocaleString();
            let displayName = data.data.display_name_prefixed;

            let subDataObject = {
                header: header,
                icon: icon,
                subreddit: displayName,
                description: description,
                subscribers: subsOrganized,
                created: dateCreated,
                nsfw: nsfw
            }

            infoBox.innerHTML = `
                    <div class="top-container" >
                        <div class="image-box">
                            <img src="${subDataObject.header}" alt="banner">
				        </div>
                    </div>

                    <div class="sub-container">
                        <div class="sub-icon">
                            <img class="sub-img" src=${subDataObject.icon} alt="icon">
                        </div>

                        <div class="sub-name">
                            <span>${subDataObject.subreddit}</span> <br>
                            <img class="nsfw" src="${subDataObject.nsfw}">
                        </div>
                    </div>

                    <div class="info-container">
                        <div class="sub-info">
                            <p>${subDataObject.description}</p>
                        </div>
                    </div>

                    <div class="bottom-container">
                        <div class="sub-count">
                            <span>${subDataObject.subscribers} subscribers</span> <br>
                            <span>Created: ${subDataObject.created}</span>
                        </div>
                    </div>
                `
            console.log(subDataObject);

        }

        subredditData();

        for (i = 0; i < redditPosts.length; i++) {
            
            let options = { year: 'numeric', month: 'long', day: 'numeric' };

            let subreddit = reddit;
            let domain = redditPosts[i].domain;
            let parsedSub = redditPosts[i].subreddit_name_prefixed;
            let postUrl = redditPosts[i].url;
            let title = redditPosts[i].title;
            let upvotes = redditPosts[i].ups;
            let author = redditPosts[i].author;
            let timestamp = redditPosts[i].created_utc;
            let date = new Date(timestamp * 1000);
            let convertedDate = date.toLocaleDateString("en-US", options);
            let flair = redditPosts[i].link_flair_text;
            let media = redditPosts[i];

            gfycatPosts(domain, parsedSub, postUrl, title, upvotes, author, convertedDate, flair, media);
            redgifsPosts(domain, parsedSub, postUrl, title, upvotes, author, convertedDate, flair, media);
            imgurPosts(redditPosts, domain, parsedSub, postUrl, title, upvotes, author, convertedDate, flair, media);
            instagramPosts(domain, parsedSub, postUrl, title, upvotes, author, convertedDate, flair);
            streamablePosts(domain, parsedSub, postUrl, title, upvotes, author, convertedDate, flair, media);

            // Posts hosted by v.redd.it and posts hosted by v.redd.it that have been crossposted
            if (domain == "v.redd.it" && "crosspost_parent_list" in redditPosts[i]) {
                let postFlair = flair ? flair : "";
                let vredditObject = {
                    crosspost: true,
                    vredditVideo: redditPosts[i].crosspost_parent_list[0].secure_media.reddit_video.fallback_url,
                    vredditTitle: redditPosts[i].title,
                    vredditSub: "crossposted to " + redditPosts[i].subreddit_name_prefixed,
                    vredditUps: redditPosts[i].ups,
                    vredditAuthor: redditPosts[i].author,
                    vredditDomain: redditPosts[i].domain,
                    vredditDate: convertedDate,
                    vredditFlair: postFlair,
                } 

                imageList.innerHTML += addNewImageVreddit(vredditObject)

                } else if (domain == "v.redd.it") {
                    let postFlair = flair ? flair : "";
                    let vredditObject = {
                        vredditVideo: redditPosts[i].secure_media.reddit_video.fallback_url,
                        vredditTitle: redditPosts[i].title,
                        vredditSub: "posted to " + redditPosts[i].subreddit_name_prefixed,
                        vredditUps: redditPosts[i].ups,
                        vredditAuthor: redditPosts[i].author,
                        vredditDomain: redditPosts[i].domain,
                        vredditDate: convertedDate, 
                        vredditFlair: postFlair,
                    } 

                    imageList.innerHTML += addNewImageVreddit(vredditObject);

                }

            // Posts hosted by i.redd.it
        if (domain == "i.redd.it" && postUrl.includes("gif")) {
            let postFlair = flair ? flair : "";
            let iredditObject = {
                iredditImage: redditPosts[i].url,
                iredditTitle: redditPosts[i].title,
                iredditSub: redditPosts[i].subreddit_name_prefixed,
                iredditUps: redditPosts[i].ups, 
                iredditAuthor: redditPosts[i].author,
                iredditDomain: redditPosts[i].domain,
                iredditDate: convertedDate, 
                iredditFlair: postFlair
            }
            imageList.innerHTML += addNewImageIreddit(iredditObject);

        }

    }

        function addNewImageVreddit(vredditObject) {
            return `
                    <div class="post-header">
                        <p class="title">${vredditObject.vredditTitle} <span class="flair">${vredditObject.vredditFlair}</span></p>
						<p class="video-items"><span class="subreddit">${vredditObject.vredditSub}</span> on <span>${vredditObject.vredditDate}</span> by u/${vredditObject.vredditAuthor} - ${vredditObject.vredditDomain}</p>
						<p class="video-items" class="upvotes"><span class="like">❤︎</span> ${vredditObject.vredditUps} upvotes</p>
                    </div>
                    <div class="video-box">
                        <video class="video" src="${vredditObject.vredditVideo}#t=0.05" controls muted>
                           
                        </video>
                    </div>
		        `;
        }

        function addNewImageIreddit(iredditObject) {
                return `
                    <div class="post-header">
                        <p class="title">${iredditObject.iredditTitle} <span class="flair">${iredditObject.iredditFlair}</span></p>
						<p class="video-items">posted to <span class="subreddit">${iredditObject.iredditSub}</span> on <span>${iredditObject.iredditDate}</span> by u/${iredditObject.iredditAuthor} - ${iredditObject.iredditDomain}</p>
						<p class="video-items" class="upvotes"><span class="like">❤︎</span> ${iredditObject.iredditUps} upvotes</p>
                    </div>
                    <div class="video-box">
                        <img src="${iredditObject.iredditImage}"/>
                    </div>
		        `;
        }
        
    })

});