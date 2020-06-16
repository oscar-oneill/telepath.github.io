export default async function instagramPosts(domain, parsedSub, postUrl, title, upvotes, author, convertedDate, flair){
    let imageList = document.querySelector('.media');
    if (domain == 'instagram.com') {
        async function getInstagramData() {
            let instagramURL = postUrl;
            console.log(instagramURL);

            if (instagramURL.length > 40) {
                var newUrl = instagramURL.slice(0, 40);

                var instagramData = await fetch(`${newUrl}?__a=1`);
                var data = await instagramData.json();

            } else {
                var instagramData = await fetch(`${instagramURL}?__a=1`);
                var data = await instagramData.json();
            }
           

            let video = data.graphql.shortcode_media.video_url;
            let postFlair = flair ? flair : "";

            let instagramObject = {
                instagramTitle: title,
                instagramSub: parsedSub,
                instagramAuthor: author,
                instagramUps: upvotes,
                instagramVideo: video,
                instagramDomain: domain,
                instagramDate: convertedDate,
                instagramFlair: postFlair
            }

            imageList.innerHTML += addNewImageInstagram(instagramObject);

        }
        getInstagramData();
    } 

    function addNewImageInstagram(instagramObject) {
    return `
            <div class="post-header">
                <p class="title">${instagramObject.instagramTitle} <span class="flair">${instagramObject.instagramFlair}</span></p>
                <p class="video-items">posted to <span class="subreddit">${instagramObject.instagramSub}</span> on <span>${instagramObject.instagramDate}</span> by u/${instagramObject.instagramAuthor} - ${instagramObject.instagramDomain}</p>
                <p class="video-items" class="upvotes"><span class="like">❤︎</span> ${instagramObject.instagramUps} upvotes</p>
            </div>
            <div class="video-box">
                <video controls preload="metadata" muted src="${instagramObject.instagramVideo}#t=0.05"></video>
            </div>
        `;
}
}