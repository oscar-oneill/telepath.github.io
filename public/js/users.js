import vreddit from "./domains/vreddit.js";
import ireddit from "./domains/ireddit.js";
import streamable from "./domains/streamable.js";
import imgur from "./domains/imgur.js";
import gfycat from './domains/gfycat.js';

let queryString = window.location;
let username = queryString.pathname.slice(6);

let objects = document.querySelector('.objects');

const fetchProfile = async () => {
    const profile = await fetch("/redditor", {
        method: 'POST', 
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        body: JSON.stringify({queryString})
    })
    const subredditData = await profile.json();

    document.title = `u/${username}'s Profile | Telepath`;

    for (let i = 0; i < subredditData.length; i++) {
        const options = { year: "numeric", month: "long", day: "numeric" };
        const timestamp = subredditData[i].created_utc;
        const date = new Date(timestamp * 1000);
        const convertedDate = date.toLocaleDateString("en-US", options);
        const domain = subredditData[i].domain;
        const subreddit = subredditData[i].subreddit_name_prefixed;
        const url = subredditData[i].url;
        const title = subredditData[i].title;
        const upvotes = subredditData[i].ups;
        const author = subredditData[i].author;
        const flair = subredditData[i].link_flair_text;
        const media = subredditData[i];
        const inputRequest = subredditData[i].subreddit;

        gfycat(domain, subreddit, url, title, upvotes, author, convertedDate, flair, media, inputRequest);
        imgur(domain, subreddit, url, title, upvotes, author, convertedDate, flair, media, inputRequest);
        ireddit(domain, subreddit, url, title, upvotes, author, convertedDate, flair, media, inputRequest);
        streamable(domain, subreddit, url, title, upvotes, author, convertedDate, flair, media, inputRequest);
        vreddit(domain, subreddit, title, upvotes, author, convertedDate, flair, media, inputRequest);
    }
}

fetchProfile();

form.addEventListener("submit", e => {
    const inputRequest = document.querySelector(".input-request").value;
    objects.innerHTML = '';
    console.clear();
    e.preventDefault();

    location.href = `/subreddit/${inputRequest}`;
})