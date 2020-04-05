export default {
  search: function(reddit, sortType, limit) {
    return fetch(
      `https://api.reddit.com/r/${reddit}/${sortType}.json?limit=${limit}`
    )
      .then(res => res.json())
      .then(data => {
      return data.data.children.map(data => data.data);
    })
      .catch(err => console.log(err));
  }
}
