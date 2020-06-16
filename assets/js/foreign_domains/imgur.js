export default async function imgurPosts(redditPosts, domain, parsedSub, postUrl, title, upvotes, author, convertedDate, flair, media) {
    let imageList = document.querySelector('.media');
    if (domain == "i.imgur.com" && postUrl.includes("gif") && "crosspost_parent_list" in redditPosts) {
        let postFlair = flair ? flair : "";
        let imgurObject = {
            type: "crosspost from i.imgur.com",
            imgurVideo: media.crosspost_parent_list[0].preview.reddit_video_preview.fallback_url,
            imgurTitle: title,
            imgurSub: parsedSub,
            imgurUps: upvotes,
            imgurAuthor: author,
            imgurDomain: domain,
            imgurDate: convertedDate,
            imgurFlair: postFlair,
            poster: media.images[0].source.url
        }

        imageList.innerHTML += addNewImageImgur(imgurObject);
        console.log(imgurObject);

    } else if (domain == "m.imgur.com" && postUrl.includes("gif") && "crosspost_parent_list" in redditPosts) {
        let postFlair = flair ? flair : "";
        let imgurObject = {
            type: "crosspost from m.imgur.com",
            imgurVideo: media.crosspost_parent_list[0].preview.reddit_video_preview.fallback_url,
            imgurTitle: title,
            imgurSub: parsedSub,
            imgurUps: upvotes,
            imgurAuthor: author,
            imgurDomain: domain,
            imgurDate: convertedDate,
            imgurFlair: postFlair,
            poster: media.images[0].source.url
        }

        imageList.innerHTML += addNewImageImgur(imgurObject);
        console.log(imgurObject);


    } else if (domain == "i.imgur.com" && postUrl.includes("gif")) {
        let postFlair = flair ? flair : "";

        let imgurObject = {
            imgurVideo: media.preview.reddit_video_preview.fallback_url,
            imgurTitle: title,
            imgurSub: parsedSub,
            imgurUps: upvotes,
            imgurAuthor: author,
            imgurDomain: domain,
            imgurDate: convertedDate,
            imgurFlair: postFlair,
            poster: media.preview.images[0].source.url
        }

        imageList.innerHTML += addNewImageImgur(imgurObject);
        console.log(imgurObject);

    } else if (domain == "m.imgur.com" && postUrl.includes("gif")) {
        let postFlair = flair ? flair : "";

        let imgurObject = {
            imgurVideo: media.preview.reddit_video_preview.fallback_url,
            imgurTitle: title,
            imgurSub: parsedSub,
            imgurUps: upvotes,
            imgurAuthor: author,
            imgurDomain: domain,
            imgurDate: convertedDate,
            imgurFlair: postFlair,
            poster: media.images[0].source.url
        }
        imageList.innerHTML += addNewImageImgur(imgurObject);
        console.log(imgurObject);
    } 

    function addNewImageImgur(imgurObject) {
        return `
            <div class="post-header">
                <p class="title">${imgurObject.imgurTitle} <span class="flair">${imgurObject.imgurFlair}</span></p>
                <p class="video-items">posted to <span class="subreddit">${imgurObject.imgurSub}</span> on <span>${imgurObject.imgurDate}</span> by u/${imgurObject.imgurAuthor} - ${imgurObject.imgurDomain}</p>
                <p class="video-items" class="upvotes"><span class="like">❤︎</span> ${imgurObject.imgurUps} upvotes</p>
            </div>
            <div class="video-box">
                <video class="video" src="${imgurObject.imgurVideo}#t=0.05" controls muted poster="${imgurObject.poster}">

                </video>
            </div>
        `;
}
}

imgurPosts();