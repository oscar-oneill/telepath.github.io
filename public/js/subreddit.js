import vreddit from "./domains/vreddit.js";
import ireddit from "./domains/ireddit.js";
import imgur from "./domains/imgur.js";
import streamable from "./domains/streamable.js";
import gfycat from './domains/gfycat.js';

let objects = document.querySelector(".objects");
let queryString = window.location;
let name = queryString.pathname.slice(11);

const setFavicon = async () => {
    const response = await fetch(`https://api.reddit.com/r/${name}/about`)
    const data = await response.json();

    const icons = data.data.community_icon ? data.data.community_icon.slice(0, 79) : "https://www.vectorico.com/wp-content/uploads/2018/08/Reddit-logo-300x300.png";
    const favicon = document.getElementById("favicon");
    favicon.setAttribute("href", icons);
}

setFavicon()

const fetchSubreddit = async () => {
    const sub = await fetch("/subreddit", {
        method: 'POST', 
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        body: JSON.stringify({queryString})
    })
    const subredditData = await sub.json();

    const getObjects = () => {
        let i = 0;

        for(i = 0; i < subredditData.length; i++) {
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

            vreddit(domain, subreddit, title, upvotes, author, convertedDate, flair, media, inputRequest);
            gfycat(domain, subreddit, url, title, upvotes, author, convertedDate, flair, media, inputRequest);
            imgur(domain, subreddit, url, title, upvotes, author, convertedDate, flair, media, inputRequest);
            ireddit(domain, subreddit, url, title, upvotes, author, convertedDate, flair, media, inputRequest);
            streamable(domain, subreddit, url, title, upvotes, author, convertedDate, flair, media, inputRequest);

            document.title = `${subreddit} | Telepath`;

        }
    }
    getObjects()
}

fetchSubreddit();

form.addEventListener("submit", e => {
    const inputRequest = document.querySelector(".input-request").value;
    objects.innerHTML = '';
    console.clear();
    e.preventDefault();

    location.href = `/subreddit/${inputRequest}`;
})