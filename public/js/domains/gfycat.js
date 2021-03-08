export default async function gfycat(domain, subreddit, url, title, upvotes, author, convertedDate, flair, media, inputRequest) {
    let objects = document.querySelector('.objects');

    if (domain == "gfycat.com") {
        const getGfycatVideo = async () => {
            const response = await fetch(`https://api.reddit.com/r/${inputRequest}/about`);
            const data = await response.json();

            let icon = data.data.icon_img ? data.data.icon_img : data.data.community_icon ? data.data.community_icon : data.data.header_img ? data.data.header_img : 'https://www.interactive.org/images/games_developers/no_image_available_sm.jpg';
            let postFlair = flair ? flair : "";

            let gfy = (domain == "gfycat.com") ? url.replace("https://gfycat.com/", "https://gfycat.com/ifr/") : "";
        
            let gfycat = {
                video: gfy,
                title: title,
                sub: subreddit,
                ups: upvotes,
                author: author,
                domain: domain,
                date: convertedDate,
                flair: postFlair,
                icon: icon, 
                link: "https://www.reddit.com" + media.permalink
            }

            objects.innerHTML += gfycatImage(gfycat);
        }

        getGfycatVideo()

    }  else if (domain == "redgifs.com") {
        const getRedgifsVideo = async () => {
            const response = await fetch(`https://api.reddit.com/r/${inputRequest}/about`);
            const data = await response.json();

            let icon = data.data.icon_img ? data.data.icon_img : data.data.community_icon ? data.data.community_icon : data.data.header_img ? data.data.header_img : 'https://www.interactive.org/images/games_developers/no_image_available_sm.jpg';
            let postFlair = flair ? flair : "";

            let redgifs = (domain == "redgifs.com") ? url.replace("watch", "ifr") : "";
        
            let gfycat = {
                video: redgifs,
                title: title,
                sub: subreddit,
                ups: upvotes,
                author: author,
                domain: domain,
                date: convertedDate,
                flair: postFlair,
                icon: icon, 
                link: "https://www.reddit.com" + media.permalink
            }

            objects.innerHTML += gfycatImage(gfycat);
        }

        getRedgifsVideo()
    }

    function gfycatImage(gfycat) {    
        return `
                <div class="container">
                    <div class="identifier">
                        <div class="subreddit_img">
                            <a href="/subreddit/${inputRequest}">
                                <img class="subreddit_icon" src="${gfycat.icon}" alt="subreddit icon">
                            </a>
                        </div>
                        <div class="nameplate">
                            <div><a href="/subreddit/${inputRequest}">${gfycat.sub}</a></div>
                            <div class="user_domain">
                                <a href="/user/${gfycat.author}"><span class="user">u/${gfycat.author}</span></a> &#183; <span class="domain">${gfycat.domain}</span>
                            </div>
                        </div>
                    </div>

                    <div class="ifr-container">
                        <iframe src="${gfycat.video}" frameborder="0" allowfullscreen scrolling="no" class="gfycat"></iframe>
                    </div>

                    <div class="activity">
                        <i class="fas fa-heart like_btn"></i> <span class="likes">${gfycat.ups} Likes</span><br>
                        <div class="data_box">
                            <span class="post_title">${gfycat.title}</span>
                        </div>
                        <div class="date_box">
                            <span class="date">${gfycat.date}</span> 
                            &#183; 
                            <a class="link" href="${gfycat.link}" target="_blank" rel="noopener noreferrer nofollow">Permalink</a>
                        </div>
                    </div>
                </div>       
                    `;
        }
}

gfycat();