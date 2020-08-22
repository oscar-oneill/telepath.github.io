export default async function vredditPosts(redditPosts, domain, parsedSub, title, upvotes, author, convertedDate, flair, media, reddit) {
    let imageList = document.querySelector(".objects");

    if (domain == "v.redd.it" && "crosspost_parent_list" in redditPosts) {
        async function getVredditVideo() {
            const response = await fetch(`https://api.reddit.com/r/${reddit}/about`);
            const data = await response.json();

            let icon = data.data.header_img ? data.data.header_img : data.data.icon_img ? data.data.icon_img : data.data.community_icon ? data.data.community_icon : 'https://www.interactive.org/images/games_developers/no_image_available_sm.jpg';

            let postFlair = flair ? flair : "";
            let vreddit = {
                post: 'crosspost',
                video: media.crosspost_parent_list[0].secure_media.reddit_video.fallback_url,
                title: title,
                sub: parsedSub,
                ups: upvotes,
                author: author,
                domain: domain,
                date: convertedDate,
                flair: postFlair,
                poster: media.preview.images[0].source.url,
                icon: icon,
                link: "https://www.reddit.com" + media.permalink
            }; 

            imageList.innerHTML += vredditImage(vreddit);
            console.log(reddit);
        }

        getVredditVideo()
    } 
    
    else if (domain == "v.redd.it") {
        async function getVredditVideo() {
            const response = await fetch(`https://api.reddit.com/r/${reddit}/about`);
            const data = await response.json();

            let icon = data.data.header_img ? data.data.header_img : data.data.icon_img ? data.data.icon_img : data.data.community_icon ? data.data.community_icon : 'https://www.interactive.org/images/games_developers/no_image_available_sm.jpg';

            let postFlair = flair ? flair : "";
            let vreddit = {
                post: "normal",
                video: media.secure_media.reddit_video.fallback_url,
                title: title,
                sub: parsedSub,
                ups: upvotes,
                author: author,
                domain: domain,
                date: convertedDate,
                flair: postFlair,
                poster: media.preview.images[0].source.url,
                icon: icon,
                link: "https://www.reddit.com" + media.permalink
            };

            imageList.innerHTML += vredditImage(vreddit);
            console.log(vreddit);
        }

        getVredditVideo()
    }

        function vredditImage(vreddit) {
            return `
            <div class="container">
                <div class="identifier">
                    <div class="subreddit_img">
                        <img class="icon" src="${vreddit.icon}">
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
                        <span class="date">${vreddit.date}</span> 
                        &#183; 
                        <span class="domain">${vreddit.domain}</span>
                        &#183;
                        <a class="link" href="${vreddit.link}" target="_blank">Permalink</a>
                    </div>
                </div>    
            </div>      
                `;
        }

}
vredditPosts()