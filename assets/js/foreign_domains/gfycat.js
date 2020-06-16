export default async function gfycatPosts(domain, parsedSub, postUrl, title, upvotes, author, convertedDate, flair, poster) {
    let imageList = document.querySelector('.media');
    
    if (domain == "gfycat.com") {
        let gfycatID = postUrl.slice(19);
        async function getGfycatVideo() {
            const gfycatData = await fetch(`https://api.gfycat.com/v1/gfycats/${gfycatID}`);
            const data = await gfycatData.json();

            if (data.errorMessage || data.message) {
                let newRedgifsID = postUrl.slice(19);
                var redgifsData = await fetch(`https://api.redgifs.com/v1/gfycats/${newRedgifsID}`);
                var redData = await redgifsData.json();
            }

            let i = 0;
            let dynamicUrl = data.errorMessage || data.message ? redData.gfyItem.webmUrl : data.gfyItem.webmUrl ? data.gfyItem.webmUrl : 'https://st4.depositphotos.com/9625262/26433/v/600/depositphotos_264332102-stock-video-not-found-glitch-effect-text.jpg';
            let postFlair = flair ? flair : "";

            let gfycatObject = {
                gfycatVideo: dynamicUrl,
                gfycatTitle: title,
                gfycatSub: parsedSub,
                gfycatUps: upvotes,
                gfycatAuthor: author,
                gfycatDomain: domain,
                gfycatDate: convertedDate,
                gfycatFlair: postFlair,
                poster: poster
            }

            imageList.innerHTML += addNewImageGfycat(gfycatObject);
            
        }
        getGfycatVideo();
    }

    // Posts from gfycat with alternate url
    else if (domain == "gfycat.com" && postUrl.includes("gifs/detail/")) {
        let gfycatID = postUrl.slice(31);
        async function getGfycatVideo() {
            const gfycatData = await fetch(`https://api.gfycat.com/v1/gfycats/${gfycatID}`);
            const data = await gfycatData.json();

            if (data.errorMessage || data.message) {
                let newRedgifsID = gfycatID.slice(31);
                var redgifsData = await fetch(`https://api.redgifs.com/v1/gfycats/${newRedgifsID}`);
                var redData = await redgifsData.json();
            }

            let i = 0;
            let dynamicUrl = data.errorMessage || data.message ? redData.gfyItem.webmUrl : data.gfyItem.webmUrl ? data.gfyItem.webmUrl : 'https://st4.depositphotos.com/9625262/26433/v/600/depositphotos_264332102-stock-video-not-found-glitch-effect-text.jpg';
            let postFlair = flair ? flair : "";

            let gfycatObject = {
                gfycatVideo: dynamicUrl,
                gfycatTitle: title,
                gfycatSub: parsedSub,
                gfycatUps: upvotes,
                gfycatAuthor: author,
                gfycatDomain: domain,
                gfycatDate: convertedDate,
                gfycatFlair: postFlair,
                poster: poster
            }

            imageList.innerHTML += addNewImageGfycat(gfycatObject);

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

            if (data.errorMessage || data.message) {
                let newRedgifsID = postUrl.slice(19);
                var redgifsData = await fetch(`https://api.redgifs.com/v1/gfycats/${newRedgifsID}`);
                var redData = await redgifsData.json();
            }

            let i = 0;
            let dynamicUrl = data.errorMessage || data.message ? redData.gfyItem.webmUrl : data.gfyItem.webmUrl ? data.gfyItem.webmUrl : 'https://st4.depositphotos.com/9625262/26433/v/600/depositphotos_264332102-stock-video-not-found-glitch-effect-text.jpg';
            let postFlair = flair ? flair : "";

            let gfycatObject = {
                gfycatVideo: dynamicUrl,
                gfycatTitle: title,
                gfycatSub: parsedSub,
                gfycatUps: upvotes,
                gfycatAuthor: author,
                gfycatDomain: domain,
                gfycatDate: convertedDate,
                gfycatFlair: postFlair,
                poster: poster
            }

            imageList.innerHTML += addNewImageGfycat(gfycatObject);
        
        }
        getGfycatVideo();
    }

    function addNewImageGfycat(gfycatObject) {
        return `
                    <div class="post-header">
                        <p class="title">${gfycatObject.gfycatTitle} <span class="flair">${gfycatObject.gfycatFlair}</span></p>
						<p class="video-items">posted to <span class="subreddit">${gfycatObject.gfycatSub}</span> on <span>${gfycatObject.gfycatDate}</span> by u/${gfycatObject.gfycatAuthor} - ${gfycatObject.gfycatDomain}</p>
						<p class="video-items" class="upvotes"><span class="like">❤︎</span> ${gfycatObject.gfycatUps} upvotes</p>
                    </div>
                    <div class="video-box">
                        <video controls preload="metadata" muted poster="${gfycatObject.poster}">
                            <source src="${gfycatObject.gfycatVideo}#t=0.05" type="video/mp4">
                        </video>
                    </div>
		        `;
    }
}

gfycatPosts();