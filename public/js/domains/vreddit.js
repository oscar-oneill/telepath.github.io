export default async function vreddit(domain, subreddit, title, upvotes, author, convertedDate, flair, media, inputRequest) {
    let imageList = document.querySelector(".objects");

    if (domain == "v.redd.it") {
        async function getVredditVideo() {
            const response = await fetch(`https://api.reddit.com/r/${inputRequest}/about`);
            const _data = await response.json();

            let icon = _data.data.icon_img ? _data.data.icon_img : _data.data.community_icon ? _data.data.community_icon : _data.data.header_img ? _data.data.header_img : 'https://www.interactive.org/images/games_developers/no_image_available_sm.jpg';
            let postFlair = flair ? flair : "";

            let vreddit = {
                video: media.secure_media ? media.secure_media.reddit_video.fallback_url : "",
                title: title,
                sub: subreddit,
                ups: upvotes,
                author: author,
                domain: domain,
                date: convertedDate,
                flair: postFlair,
                poster: media.preview ? media.preview.images[0].source.url : "https://i.imgur.com/OCLOQYa.jpg",
                icon: icon,
                link: "https://www.reddit.com" + media.permalink
            }

            imageList.innerHTML += vredditImage(vreddit);
        }

        getVredditVideo()
    }

        function vredditImage(vreddit) {
            return `
            <div class="container">
                <div class="identifier">
                    <div class="subreddit_img">
                        <a href="/subreddit/${inputRequest}">
                            <img class="subreddit_icon" src="${vreddit.icon}" alt="subreddit icon">
                        </a>
                    </div>
                    <div class="nameplate">
                        <div><a href="/subreddit/${inputRequest}">${vreddit.sub}</a></div>
                        <div class="user_domain">
                            <a href="/user/${vreddit.author}"><span class="user">u/${vreddit.author}</span></a> &#183; <span class="domain">${vreddit.domain}</span>
                        </div>
                    </div>
                </div>
                <div class="media_box">
                    <video class="visual_media" preload="none" playsinline controls muted poster="${vreddit.poster}">
                        <source src="${vreddit.video}" type="video/mp4">
                    </video>
                </div>
                <div class="activity">
                    <i class="fas fa-heart like_btn"></i> <span class="likes">${vreddit.ups} Likes</span><br>
                    <div class="data_box">
                        <span class="post_title">${vreddit.title}</span>
                    </div>
                    <div class="date_box">
                        <span class="date">${vreddit.date}</span> 
                        &#183; 
                        <a class="link" href="${vreddit.link}" target="_blank" rel="noopener noreferrer nofollow">Permalink</a>
                    </div>
                </div>    
            </div>      
                `;
        }

}
vreddit()