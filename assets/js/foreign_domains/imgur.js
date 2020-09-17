export default async function imgurPosts(redditPosts, domain, parsedSub, postUrl, title, upvotes, author, convertedDate, flair, media, reddit) {
    let imageList = document.querySelector('.objects');

    if (domain == "i.imgur.com" && postUrl.includes("gif") && "crosspost_parent_list" in redditPosts) {
        async function getImgurVideo() {
            const response = await fetch(`https://api.reddit.com/r/${reddit}/about`);
            const _data = await response.json();

            let icon = _data.data.icon_img ? _data.data.icon_img : _data.data.community_icon ? _data.data.community_icon : _data.data.header_img ? _data.data.header_img : 'https://www.interactive.org/images/games_developers/no_image_available_sm.jpg';
            let nsfw = _data.data.over18 == true ? 'https://alanma11.files.wordpress.com/2014/12/1ly1h6i.png' : "";
            
            let postFlair = flair ? flair : "";
            let imgur = {
                video: media.crosspost_parent_list[0].preview.reddit_video_preview.fallback_url,
                title: title,
                sub: parsedSub,
                ups: upvotes,
                author: author,
                domain: domain,
                date: convertedDate,
                flair: postFlair,
                poster: media.crosspost_parent_list[0].preview.images[0].source.url,
                icon: icon,
                nsfw: nsfw,
                link: "https://www.reddit.com" + media.permalink
        }

        imageList.innerHTML += imgurImage(imgur);
        }

        getImgurVideo();

    } 
    
    else if (domain == "m.imgur.com" && postUrl.includes("gif") && "crosspost_parent_list" in redditPosts) {
        async function getImgurVideo() {
            const response = await fetch(`https://api.reddit.com/r/${reddit}/about`);
            const _data = await response.json();

            let icon = _data.data.icon_img ? _data.data.icon_img : _data.data.community_icon ? _data.data.community_icon : _data.data.header_img ? _data.data.header_img : 'https://www.interactive.org/images/games_developers/no_image_available_sm.jpg';
            let nsfw = _data.data.over18 == true ? 'https://alanma11.files.wordpress.com/2014/12/1ly1h6i.png' : "";

            let postFlair = flair ? flair : "";
            let imgur = {
                video: media.crosspost_parent_list[0].preview.reddit_video_preview.fallback_url,
                title: title,
                sub: parsedSub,
                ups: upvotes,
                author: author,
                domain: domain,
                date: convertedDate,
                flair: postFlair,
                poster: media.crosspost_parent_list[0].preview.images[0].source.url,
                icon: icon,
                nsfw: nsfw,
                link: "https://www.reddit.com" + media.permalink
        }

        imageList.innerHTML += imgurImage(imgur);
        }

        getImgurVideo();


    } 
    
    else if (domain == "i.imgur.com" && postUrl.includes("gif")) {
        async function getImgurVideo() {
            const response = await fetch(`https://api.reddit.com/r/${reddit}/about`);
            const _data = await response.json();

            let icon = _data.data.icon_img ? _data.data.icon_img : _data.data.community_icon ? _data.data.community_icon : _data.data.header_img ? _data.data.header_img : 'https://www.interactive.org/images/games_developers/no_image_available_sm.jpg';
            let nsfw = _data.data.over18 == true ? 'https://alanma11.files.wordpress.com/2014/12/1ly1h6i.png' : "";

            let postFlair = flair ? flair : "";
            let imgur = {
                video: media.preview.reddit_video_preview.fallback_url,
                title: title,
                sub: parsedSub,
                ups: upvotes,
                author: author,
                domain: domain,
                date: convertedDate,
                flair: postFlair,
                poster: media.preview.images[0].source.url,
                icon: icon,
                nsfw: nsfw,
                link: "https://www.reddit.com" + media.permalink
            };

            imageList.innerHTML += imgurImage(imgur);
        }

        getImgurVideo()

    } 
    
    else if (domain == "m.imgur.com" && postUrl.includes("gif")) {
        async function getImgurVideo() {
            const response = await fetch(`https://api.reddit.com/r/${reddit}/about`);
            const _data = await response.json();

            let icon = _data.data.icon_img ? _data.data.icon_img : _data.data.community_icon ? _data.data.community_icon : _data.data.header_img ? _data.data.header_img : 'https://www.interactive.org/images/games_developers/no_image_available_sm.jpg';
            let nsfw = _data.data.over18 == true ? 'https://alanma11.files.wordpress.com/2014/12/1ly1h6i.png' : "";

            let postFlair = flair ? flair : "";
            let imgur = {
                video: media.preview.reddit_video_preview.fallback_url,
                title: title,
                sub: parsedSub,
                ups: upvotes,
                author: author,
                domain: domain,
                date: convertedDate,
                flair: postFlair,
                poster: media.preview.images[0].source.url,
                icon: icon,
                nsfw: nsfw,
                link: "https://www.reddit.com" + media.permalink
            };

            imageList.innerHTML += imgurImage(imgur);
        }

        getImgurVideo()
    } 

    function imgurImage(imgur) {
        return `
                <div class="container">
                    <div class="identifier">
                        <div class="subreddit_img">
                            <img class="subreddit_icon" src="${imgur.icon}" alt="subreddit icon">
                        </div>
                        <div class="nameplate">
                            <span>${imgur.sub}</span> <img id="nsfw" src="${imgur.nsfw}" alt="nsfw">
                        </div>
                    </div>
                    <div class="media_box">
                        <video class="media" preload="none" controls muted poster="${imgur.poster}">
                             <source src="${imgur.video}" type="video/mp4">
                        </video>
                    </div>
                    <div class="activity">
                        <i class="fas fa-heart like_btn"></i> <span class="likes">${imgur.ups} Likes</span> <br>
                        <div class="data_box">
                            <span class="user">u/${imgur.author}</span> 
                            <span class="post_title">${imgur.title}</span>
                        </div>
                        <div class="date_box">
                            <span class="date">${imgur.date}</span> 
                            &#183; 
                            <span class="domain">${imgur.domain}</span>
                            &#183;
                            <a class="link" href="${imgur.link}" target="_blank" rel="noopener noreferrer nofollow">Permalink</a>
                        </div>
                    </div>
                </div>      
                    `;
}
}

imgurPosts();