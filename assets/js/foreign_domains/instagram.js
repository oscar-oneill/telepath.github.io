export default async function instagramPosts(domain, parsedSub, postUrl, title, upvotes, author, convertedDate, flair, reddit, media){
    let imageList = document.querySelector('.objects');

    if (domain == 'instagram.com') {
        async function getInstagramData() {
            let instagramURL = postUrl;

            const response = await fetch(`https://api.reddit.com/r/${reddit.subreddit}/about`);
            const _data = await response.json();

            let icon = _data.data.icon_img ? _data.data.icon_img : _data.data.community_icon ? _data.data.community_icon : _data.data.header_img ? _data.data.header_img : 'https://www.interactive.org/images/games_developers/no_image_available_sm.jpg';
            
            if (instagramURL.length > 40) {
                var newUrl = instagramURL.slice(0, 40);

                var instagramData = await fetch(`${newUrl}?__a=1`);
                var data = await instagramData.json();

            } else {
                var instagramData = await fetch(`${instagramURL}?__a=1`);
                var data = await instagramData.json();
            }
        
            let video = data.graphql.shortcode_media.video_url;
            let poster = data.graphql.shortcode_media.thumbnail_src;
            let postFlair = flair ? flair : "";

            let instagram = {
                title: title,
                sub: parsedSub,
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

            imageList.innerHTML += instagramImage(instagram);

        }
        getInstagramData();
    } 

    function instagramImage(instagram) {
        return `
                <div class="container">
                    <div class="identifier">
                        <div class="subreddit_img">
                            <img class="subreddit_icon" src="${instagram.icon}" alt="subreddit icon">
                        </div>
                        <div class="nameplate">
                            <span>${instagram.sub}</span>
                        </div>
                    </div>
                    <div class="media_box">
                        <video class="media" preload="none" controls poster="${instagram.poster}">
                             <source src="${instagram.video}" type="video/mp4">
                        </video>
                    </div>
                    <div class="activity">
                        <i class="fas fa-heart like_btn"></i> <span class="likes">${instagram.ups} Likes</span> <br>
                        <div class="data_box">
                            <span class="user">u/${instagram.author}</span> 
                            <span class="post_title">${instagram.title}</span>
                        </div>
                        <div class="date_box">
                            <span class="date">${instagram.date}</span> 
                            &#183; 
                            <span class="domain">${instagram.domain}</span>
                            &#183;
                            <a class="link" href="${instagram.link}" target="_blank" rel="noopener noreferrer nofollow">Permalink</a>
                        </div>
                    </div>
                </div>      
                    `;
}
}

instagramPosts();