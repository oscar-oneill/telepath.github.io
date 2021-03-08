export default async function imgur(domain, subreddit, url, title, upvotes, author, convertedDate, flair, media, inputRequest) {
    let imageList = document.querySelector('.objects');

    if (domain == "i.imgur.com" && url.includes(".gif")) {
        async function getImgurVideo() {
            const response = await fetch(`https://api.reddit.com/r/${inputRequest}/about`);
            const _data = await response.json();

            let icon = _data.data.icon_img ? _data.data.icon_img : _data.data.community_icon ? _data.data.community_icon : _data.data.header_img ? _data.data.header_img : 'https://www.interactive.org/images/games_developers/no_image_available_sm.jpg';

            const imgurMotion = url.includes(".gif") ? url.replace(".gif", ".mp4") : "";

            let postFlair = flair ? flair : "";
            let imgur = {
                video: imgurMotion,
                title: title,
                sub: subreddit,
                ups: upvotes,
                author: author,
                domain: domain,
                date: convertedDate,
                flair: postFlair,
                poster: media.preview ? media.preview.images[0].source.url : media.crosspost_parent_list ? media.crosspost_parent_list[0].preview.images[0].source.url : "https://i.imgur.com/OCLOQYa.jpg",
                icon: icon,
                link: "https://www.reddit.com" + media.permalink
            }

            imageList.innerHTML += imgurImage(imgur);
        }

        getImgurVideo()

    } else if (domain == "i.imgur.com" && url.includes(".gif")) {
        async function getImgurVideoII() {
            const response = await fetch(`https://api.reddit.com/r/${inputRequest}/about`);
            const _data = await response.json();

            let icon = _data.data.icon_img ? _data.data.icon_img : _data.data.community_icon ? _data.data.community_icon : _data.data.header_img ? _data.data.header_img : 'https://www.interactive.org/images/games_developers/no_image_available_sm.jpg';

            const imgurMotion = url.includes(".gifv") ? url.replace(".gifv", ".mp4") : "";

            let postFlair = flair ? flair : "";
            let imgur = {
                video: imgurMotion,
                title: title,
                sub: subreddit,
                ups: upvotes,
                author: author,
                domain: domain,
                date: convertedDate,
                flair: postFlair,
                poster: media.preview ? media.preview.images[0].source.url : media.crosspost_parent_list ? media.crosspost_parent_list[0].preview.images[0].source.url : "https://i.imgur.com/OCLOQYa.jpg",
                icon: icon,
                link: "https://www.reddit.com" + media.permalink
            }

            imageList.innerHTML += imgurImage(imgur);
        }

        getImgurVideoII()

    } 

    function imgurImage(imgur) {
        return `
                <div class="container">
                    <div class="identifier">
                        <div class="subreddit_img">
                            <a href="/subreddit/${inputRequest}">
                                <img class="subreddit_icon" src="${imgur.icon}" alt="subreddit icon">
                            </a>
                        </div>
                        <div class="nameplate">
                            <div><a href="/subreddit/${inputRequest}">${imgur.sub}</a></div>
                            <div class="user_domain">
                                <a href="/user/${imgur.author}"><span class="user">u/${imgur.author}</span></a> &#183; <span class="domain">${imgur.domain}</span>
                            </div>
                        </div>
                    </div>
                    <div class="media_box">
                        <video class="visual_media" preload="none" playsinline controls muted poster="${imgur.poster}">
                            <source src="${imgur.video}" type="video/mp4">
                        </video>
                    </div>
                    <div class="activity">
                        <i class="fas fa-heart like_btn"></i> <span class="likes">${imgur.ups} Likes</span> <br>
                        <div class="data_box"> 
                            <span class="post_title">${imgur.title}</span>
                        </div>
                        <div class="date_box">
                            <span class="date">${imgur.date}</span> 
                            &#183; 
                            <a class="link" href="${imgur.link}" target="_blank" rel="noopener noreferrer nofollow">Permalink</a>
                        </div>
                    </div>
                </div>      
                    `;
    }
}

imgur();