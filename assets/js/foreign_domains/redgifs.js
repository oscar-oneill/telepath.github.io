export default async function redgifsPosts(domain, parsedSub, postUrl, title, upvotes, author, convertedDate, flair, poster) {
        let imageList = document.querySelector('.media');

        if (domain == "redgifs.com") {
            let redgifsID = postUrl.slice(26);
            
            async function getredgifsVideo() {
                const redgifsData = await fetch(`https://api.redgifs.com/v1/gfycats/${redgifsID}`);
                const data = await redgifsData.json();

                if (data.message) {
                    let newRedgifsID = redgifsID.slice(4);
                    console.log(`Working on making the redgif ${newRedgifsID} available for viewing...`);

                    var moreRedgifs = await fetch(`https://api.redgifs.com/v1/gfycats/${newRedgifsID}`);
                    var moreData = await moreRedgifs.json();

                    console.log(`${newRedgifsID} is now available for viewing!`)
                }

                let i = 0;
                let dynamicUrl = data.message ? moreData.gfyItem.webmUrl : data.gfyItem.webmUrl;
                let postFlair = flair ? flair : "";

                let redgifsObject = {
                    redgifsVideo: dynamicUrl,
                    redgifsTitle: title,
                    redgifsSub: parsedSub,
                    redgifsUps: upvotes,
                    redgifsAuthor: author,
                    redgifsDomain: domain,
                    redgifsDate: convertedDate,
                    redgifsFlair: postFlair,
                    poster: poster

                }
                imageList.innerHTML += addNewImageRedgifs(redgifsObject);
            
            }
            getredgifsVideo();
        } 

        function addNewImageRedgifs(redgifsObject) {    
            return `
                    <div class="post-header">
                        <p class="title">${redgifsObject.redgifsTitle} <span class="flair">${redgifsObject.redgifsFlair}</span></p>
						<p class="video-items">posted to <span class="subreddit">${redgifsObject.redgifsSub}</span> on <span>${redgifsObject.redgifsDate}</span> by u/${redgifsObject.redgifsAuthor} - ${redgifsObject.redgifsDomain}</p>
						<p class="video-items" class="upvotes"><span class="like">❤︎</span> ${redgifsObject.redgifsUps} upvotes</p>
                    </div>
                    <div class="video-box">
                        <video controls preload="metadata" muted poster="${redgifsObject.poster}">
                            <source src="${redgifsObject.redgifsVideo}#t=0.05" type="video/mp4">
                        </video>
                    </div>
		        `;
            }
}

redgifsPosts();