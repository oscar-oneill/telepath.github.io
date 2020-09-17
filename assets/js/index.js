import redditParse from './subreddit-api.js';

import vredditPosts from './reddit_domains/vreddit.js';
import iredditPosts from './reddit_domains/ireddit.js';

import gfycatPosts from './foreign_domains/gfycat.js';
import redgifsPosts from './foreign_domains/redgifs.js';
import imgurPosts from './foreign_domains/imgur.js';
import streamablePosts from './foreign_domains/streamable.js';
import instagramPosts from './foreign_domains/instagram.js';

const imageList = document.querySelector(".objects");
const searchForm = document.querySelector(".search_form");
const searchInput = document.querySelector(".search_input");

async function landing() {
    const response = await fetch('https://api.reddit.com/r/blackpeoplegifs/top/?t=week');
    const data = await response.json();

    let mapped = data.data.children.map(data => data.data);
    let _data = mapped, i;

    const subreddit = await fetch('https://api.reddit.com/r/blackpeoplegifs/about');
    const info = await subreddit.json();

    let icon = info.data.header_img ? info.data.header_img : info.data.icon_img ? info.data.icon_img : info.data.community_icon ? info.data.community_icon : 'https://www.interactive.org/images/games_developers/no_image_available_sm.jpg';

    for (i = 0; i < _data.length; i++) {
        let options = { year: "numeric", month: "long", day: "numeric" };
        let domain = _data[i].domain;
        let title = _data[i].title;
        let subreddit = _data[i].subreddit_name_prefixed;
        let upvotes = _data[i].ups;
        let author = _data[i].author;

        let timestamp = _data[i].created_utc;
        let date = new Date(timestamp * 1000);
        let convertedDate = date.toLocaleDateString("en-US", options);
        let link = "https://www.reddit.com" + _data[i].permalink;

        if (domain == 'v.redd.it' && 'crosspost_parent_list' in _data[i]) {
            let object = {
                type: "crosspost",
                video: _data[i].crosspost_parent_list[0].secure_media.reddit_video.fallback_url,
                title: title,
                sub: subreddit,
                ups: upvotes,
                author: author,
                domain: domain,
                date: convertedDate,
                poster: _data[i].preview.images[0].source.url,
                icon: icon,
                link: link
            }

            imageList.innerHTML += vredditImage(object);

        } else if (domain == 'v.redd.it') {
            let object = {
                type: "non-crosspost",
                video: _data[i].secure_media.reddit_video.fallback_url,
                title: title,
                sub: subreddit,
                ups: upvotes,
                author: author,
                domain: domain,
                date: convertedDate,
                poster: _data[i].preview.images[0].source.url ,
                icon: icon,
                link: link
            }

            imageList.innerHTML += vredditImage(object);
        } 
    }
}

landing();

function vredditImage(vreddit) {
    return `
        <div class="container">
            <div class="identifier">
                <div class="subreddit_img">
                    <img class="subreddit_icon" src="${vreddit.icon}" alt="subreddit icon">
                </div>
                <div class="nameplate">
                    <span>${vreddit.sub}</span>
                </div>
            </div>
            <div class="media_box">
                <video class="media" preload="none" controls muted poster="${vreddit.poster}">
                    <source src="${vreddit.video}" type="video/mp4">
                </video>
            </div>
            <div class="activity">
                    <i class="fas fa-heart like_btn"></i> <span class="likes">${vreddit.ups} Likes</span><br>
                    <div class="data_box">
                        <span class="user">u/${vreddit.author}</span> 
                        <span class="post_title">${vreddit.title}</span>
                    </div>
                    <div class="date_box">
                        <span class="date">${vreddit.date}</span> &#183; 
                        <span class="domain">${vreddit.domain}</span> &#183; 
                        <a class="link" href="${vreddit.link}" target="_blank">Permalink</a>
                    </div>
            </div>
        </div>      
        `;
}

searchForm.addEventListener('submit', e => {
    const reddit = searchInput.value; // search subreddit
    const sortType = document.querySelector(".sort_type").value //sort posts
    const limit = document.querySelector(".limit").value //limit post return

    imageList.innerHTML = '';
    console.clear(); // clears console when new search is executed
    e.preventDefault(); // prevents form from submitting


    redditParse.search(reddit, sortType, limit).then(query => {
        let redditPosts = query, i;

        for (i = 0; i < redditPosts.length; i++) {
            let options = { year: 'numeric', month: 'long', day: 'numeric' };
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

            vredditPosts(redditPosts, domain, parsedSub, title, upvotes, author, convertedDate, flair, media, reddit);
            iredditPosts(redditPosts, domain, parsedSub, title, upvotes, author, convertedDate, flair, media, reddit, postUrl);

            gfycatPosts(domain, parsedSub, postUrl, title, upvotes, author, convertedDate, flair, media, reddit);
            redgifsPosts(domain, parsedSub, postUrl, title, upvotes, author, convertedDate, flair, media, reddit);
            imgurPosts(redditPosts, domain, parsedSub, postUrl, title, upvotes, author, convertedDate, flair, media, reddit);
            instagramPosts(domain, parsedSub, postUrl, title, upvotes, author, convertedDate, flair, media, reddit);
            streamablePosts(domain, parsedSub, postUrl, title, upvotes, author, convertedDate, flair, media, reddit);

    }
        
    })

});