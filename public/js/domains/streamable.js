export default async function streamable(domain, subreddit, url, title, upvotes, author, convertedDate, flair, media, inputRequest){
    let imageList = document.querySelector('.objects');

        if (domain == 'streamable.com') {
            async function getStreamableData() {
                let streamableID = url.replace("https://streamable.com/", "");

                const streamableData = await fetch(`https://api.streamable.com/videos/${streamableID}`);
                const data = await streamableData.json();

                const response = await fetch(`https://api.reddit.com/r/${inputRequest}/about`);
                const _data = await response.json();

                let i = 0;
                let video = data.files.mp4.url;
                let poster = data.thumbnail_url;
                let icon = _data.data.icon_img ? _data.data.icon_img : _data.data.community_icon ? _data.data.community_icon : _data.data.header_img ? _data.data.header_img : 'https://www.interactive.org/images/games_developers/no_image_available_sm.jpg';
                
                let postFlair = flair ? flair : "";

                let streamable = {
                    title: title,
                    sub: subreddit,
                    author: author,
                    ups: upvotes,
                    video: video,
                    domain: domain,
                    date: convertedDate,
                    flair: postFlair,
                    poster: poster,
                    icon: icon,
                    link: "https://www.reddit.com" + media.permalink
                }

                imageList.innerHTML += streamableImage(streamable);
            }
            getStreamableData();
        } 

    function streamableImage(streamable) {
        return `
                <div class="container">
                    <div class="identifier">
                        <div class="subreddit_img">
                            <a href="/subreddit/${inputRequest}">
                                <img class="subreddit_icon" src="${streamable.icon}" alt="subreddit icon">
                            </a>
                        </div>
                        <div class="nameplate">
                            <div><a href="/subreddit/${inputRequest}">${streamable.sub}</a></div>
                            <div class="user_domain">
                                <a href="/user/${streamable.author}"><span class="user">u/${streamable.author}</span></a> &#183; <span class="domain">${streamable.domain}</span>
                            </div>
                        </div>
                    </div>
                    <div class="media_box">
                        <video class="visual_media" preload="none" playsinline controls muted poster="${streamable.poster}">
                             <source src="${streamable.video}" type="video/mp4">
                        </video>
                    </div>
                    <div class="activity">
                        <i class="fas fa-heart like_btn"></i> <span class="likes">${streamable.ups} Likes</span><br>
                        <div class="data_box">
                            <span class="post_title">${streamable.title}</span>
                        </div>
                        <div class="date_box">
                            <span class="date">${streamable.date}</span> 
                            &#183; 
                            <a class="link" href="${streamable.link}" target="_blank" rel="noopener noreferrer nofollow">Permalink</a>
                        </div>
                    </div>
                </div>      
                    `;
    }
}

streamable()