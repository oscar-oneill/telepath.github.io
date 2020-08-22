export default async function gfycatPosts(domain, parsedSub, postUrl, title, upvotes, author, convertedDate, flair, media, reddit) {
    let imageList = document.querySelector('.objects');
    
    if (domain == "gfycat.com") {
        let gfycatID = postUrl.slice(19);
        async function getGfycatVideo() {
            const gfycatData = await fetch(`https://api.gfycat.com/v1/gfycats/${gfycatID}`);
            const data = await gfycatData.json();

            const response = await fetch(`https://api.reddit.com/r/${reddit}/about`);
            const _data = await response.json();

            let icon = _data.data.header_img ? _data.data.header_img : _data.data.icon_img ? _data.data.icon_img : _data.data.community_icon ? _data.data.community_icon : 'https://www.interactive.org/images/games_developers/no_image_available_sm.jpg';



            if (data.errorMessage || data.message) {
                let newRedgifsID = postUrl.slice(19);
                var redgifsData = await fetch(`https://api.redgifs.com/v1/gfycats/${newRedgifsID}`);
                var redData = await redgifsData.json();
            }

            let i = 0;
            let dynamicUrl = data.errorMessage || data.message ? redData.gfyItem.mp4Url : data.gfyItem.mp4Url ? data.gfyItem.mp4Url : 'https://st4.depositphotos.com/9625262/26433/v/600/depositphotos_264332102-stock-video-not-found-glitch-effect-text.jpg';
            let postFlair = flair ? flair : "";

            let gfycat = {
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
                link: "https://www.reddit.com" + media.permalink
            }

            imageList.innerHTML += gfycatImage(gfycat);
            
        }
        getGfycatVideo();
    }

    // Posts from gfycat with alternate url
    else if (domain == "gfycat.com" && postUrl.includes("gifs/detail/")) {
        let gfycatID = postUrl.slice(31);
        async function getGfycatVideo() {
            const gfycatData = await fetch(`https://api.gfycat.com/v1/gfycats/${gfycatID}`);
            const data = await gfycatData.json();

            const response = await fetch(`https://api.reddit.com/r/${reddit}/about`);
            const _data = await response.json();

            let icon = _data.data.header_img ? _data.data.header_img : _data.data.icon_img ? _data.data.icon_img : _data.data.community_icon ? _data.data.community_icon : 'https://www.interactive.org/images/games_developers/no_image_available_sm.jpg';



            if (data.errorMessage || data.message) {
                let newRedgifsID = gfycatID.slice(31);
                var redgifsData = await fetch(`https://api.redgifs.com/v1/gfycats/${newRedgifsID}`);
                var redData = await redgifsData.json();
            }

            let i = 0;
            let dynamicUrl = data.errorMessage || data.message ? redData.gfyItem.mp4Url : data.gfyItem.mp4Url ? data.gfyItem.mp4Url : 'https://st4.depositphotos.com/9625262/26433/v/600/depositphotos_264332102-stock-video-not-found-glitch-effect-text.jpg';
            let postFlair = flair ? flair : "";

            let gfycat = {
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
                link: "https://www.reddit.com" + media.permalink
            }

            imageList.innerHTML += gfycatImage(gfycat);

        }
        getGfycatVideo();
    }

    // Posts from gfycat which include hyphens in url
    else if (domain == "gfycat.com" && postUrl.includes("-")) {
        let newGfycatID = postUrl.slice(19);
        let search = "-";
        let indexOf = newGfycatID.indexOf(search);
        let length = newGfycatID.length
        let remainder = indexOf - length;
        let gfycatID = newGfycatID.slice(0, `${remainder}`);

        async function getGfycatVideo() {
            const gfycatData = await fetch(`https://api.gfycat.com/v1/gfycats/${gfycatID}`);
            const data = await gfycatData.json();

            const response = await fetch(`https://api.reddit.com/r/${reddit}/about`);
            const _data = await response.json();

            let icon = _data.data.header_img ? _data.data.header_img : _data.data.icon_img ? _data.data.icon_img : _data.data.community_icon ? _data.data.community_icon : 'https://www.interactive.org/images/games_developers/no_image_available_sm.jpg';



            if (data.errorMessage || data.message) {
                let newRedgifsID = postUrl.slice(19);
                var redgifsData = await fetch(`https://api.redgifs.com/v1/gfycats/${newRedgifsID}`);
                var redData = await redgifsData.json();
            }

            let i = 0;
            let dynamicUrl = data.errorMessage || data.message ? redData.gfyItem.mp4Url : data.gfyItem.mp4Url ? data.gfyItem.mp4Url : 'https://st4.depositphotos.com/9625262/26433/v/600/depositphotos_264332102-stock-video-not-found-glitch-effect-text.jpg';
            let postFlair = flair ? flair : "";

            let gfycat = {
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
                link: "https://www.reddit.com" + media.permalink
            }

            imageList.innerHTML += gfycatImage(gfycat);
        
        }
        getGfycatVideo();
    }

    function gfycatImage(gfycat) {
        return `
                <div class="container">
                    <div class="identifier">
                        <div class="subreddit_img">
                            <img class="icon" src="${gfycat.icon}">
                        </div>
                        <div class="nameplate">
                            <span>${gfycat.sub}</span>
                        </div>
                    </div>
                    <div class="media_box">
                        <video class="media" preload="none" controls muted poster="${gfycat.poster}">
                             <source src="${gfycat.video}" type="video/mp4">
                        </video>
                    </div>
                    <div class="activity">
                        <i class="fas fa-heart like_btn"></i> <span class="likes">${gfycat.ups} Likes</span><br>
                        <div class="data_box">
                            <span class="user">u/${gfycat.author}</span> 
                            <span class="post_title">${gfycat.title}</span>
                        </div>
                        <div class="date_box">
                            <span class="date">${gfycat.date}</span> &#183; 
                            <span class="domain">${gfycat.domain}</span> &#183;
                            <a class="link" href="${gfycat.link}" target="_blank">Permalink</a>
                        </div>
                    </div>
                </div>      
                `;
    }
}

gfycatPosts();