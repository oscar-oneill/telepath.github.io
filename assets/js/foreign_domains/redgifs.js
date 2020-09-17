export default async function redgifsPosts(domain, parsedSub, postUrl, title, upvotes, author, convertedDate, flair, media, reddit, subreddit) {
        let imageList = document.querySelector('.objects');

        if (domain == "redgifs.com") {
            let redgifsID = postUrl.slice(26);
            
            async function getredgifsVideo() {
                const redgifsData = await fetch(`https://api.redgifs.com/v1/gfycats/${redgifsID}`);
                const data = await redgifsData.json();

                const response = await fetch(`https://api.reddit.com/r/${reddit}/about`);
                const _data = await response.json();

                let icon = _data.data.icon_img ? _data.data.icon_img : _data.data.community_icon ? _data.data.community_icon : _data.data.header_img ? _data.data.header_img : 'https://www.interactive.org/images/games_developers/no_image_available_sm.jpg';
                let nsfw = _data.data.over18 == true ? 'https://alanma11.files.wordpress.com/2014/12/1ly1h6i.png' : "";

                if (data.message) {
                    let newRedgifsID = redgifsID.slice(4);
                    console.log(`Working on making the redgif ${newRedgifsID} available for viewing...`);

                    var moreRedgifs = await fetch(`https://api.redgifs.com/v1/gfycats/${newRedgifsID}`);
                    var moreData = await moreRedgifs.json();

                    console.log(`${newRedgifsID} is now available for viewing!`)
                }

                let i = 0;
                let dynamicUrl = data.message ? moreData.gfyItem.mp4Url : data.gfyItem.mp4Url;
                let postFlair = flair ? flair : "";

                let redgifs = {
                    video: dynamicUrl,
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

                }
                imageList.innerHTML += redgifsImage(redgifs);
            
            }
            getredgifsVideo();
        } 

        function redgifsImage(redgifs) {    
            return `
                    <div class="container">
                        <div class="identifier">
                            <div class="subreddit_img">
                                <img class="subreddit_icon" src="${redgifs.icon}" alt="subreddit icon">
                            </div>
                            <div class="nameplate">
                                <span>${redgifs.sub}</span> <img id="nsfw" src="${redgifs.nsfw}" alt="nsfw">
                            </div>
                        </div>
                        <div class="media_box">
                            <video class="media" preload="none" controls muted poster="${redgifs.poster}">
                                <source src="${redgifs.video}" type="video/mp4">
                            </video>
                        </div>
                        <div class="activity">
                            <i class="fas fa-heart like_btn"></i> <span class="likes">${redgifs.ups} Likes</span><br>
                            <div class="data_box">
                                <span class="user">u/${redgifs.author}</span> 
                                <span class="post_title">${redgifs.title}</span>
                            </div>
                            <div class="date_box">
                                <span class="date">${redgifs.date}</span> 
                                &#183; 
                                <span class="domain">${redgifs.domain}</span>
                                &#183;
                                <a class="link" href="${redgifs.link}" target="_blank" rel="noopener noreferrer nofollow">Permalink</a>
                            </div>
                        </div>
                    </div>       
                        `;
            }
}

redgifsPosts();