export default async function streamable(a,e,s,i,n,t,d,r,o,l){let c=document.querySelector(".objects");if("streamable.com"==a){!async function(){let m=s.replace("https://streamable.com/","");const p=await fetch("https://api.streamable.com/videos/"+m),u=await p.json(),v=await fetch(`https://api.reddit.com/r/${l}/about`),b=await v.json();let _=u.files.mp4.url,f=u.thumbnail_url,h=b.data.icon_img?b.data.icon_img:b.data.community_icon?b.data.community_icon:b.data.header_img?b.data.header_img:"https://www.interactive.org/images/games_developers/no_image_available_sm.jpg",$={title:i,sub:e,author:t,ups:n,video:_,domain:a,date:d,flair:r||"",poster:f,icon:h,link:"https://www.reddit.com"+o.permalink};c.innerHTML+=function(a){return`\n                <div class="container">\n                    <div class="identifier">\n                        <div class="subreddit_img">\n                            <a href="/subreddit/${l}">\n                                <img class="subreddit_icon" src="${a.icon}" alt="subreddit icon">\n                            </a>\n                        </div>\n                        <div class="nameplate">\n                            <div class="primary_data"><a href="/subreddit/${l}">${a.sub}</a> &nbsp; &#183; &nbsp; <a href="/user/${a.author}"><span class="user">u/${a.author}</span></a> &#183; <span class="domain">${a.domain}</span></div>\n                            <div class="secondary_data">\n                                <span class="post_title">${a.title}</span>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="media_box">\n                        <video class="visual_media" preload="none" playsinline controls muted poster="${a.poster}">\n                             <source src="${a.video}" type="video/mp4">\n                        </video>\n                    </div>\n                    <div class="activity">\n                        <i class="fas fa-heart like_btn"></i> <span class="likes">${a.ups} Likes</span><br>\n                        <div class="date_box">\n                            <span class="date">${a.date}</span> \n                            &#183; \n                            <a class="link" href="${a.link}" target="_blank" rel="noopener noreferrer nofollow">Permalink</a>\n                        </div>\n                    </div>\n                </div>      \n                    `}($)}()}}streamable();
