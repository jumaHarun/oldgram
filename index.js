import { posts } from './scripts/data.js'

function getPostHtml() {
  let postHtml = ''

  posts.forEach(post => {
    const { name, username, location, avatar, postUrl, comment, likes, uuid} = post

    let heartClass 
    let iconClass
    let icon

    if(post.isLiked) {
      heartClass = 'liked'
      iconClass = 'fa-solid'
    } else {
      iconClass = 'fa-regular'
      icon = 'icon'
    }


    postHtml += `
    <div class="post-content">
      <div class="user-info flex">
        <img
          src="${avatar}"
          alt="potrait of ${name}"
          class="avatar thumbnail"
        />

        <div class="username">
          <h3 class="username">${name}</h3>
          <p class="location">${location}</p>
        </div>
      </div>

      <div class="post-image">
          <img src="${postUrl}" data-image="${uuid}">
      </div>

      <div class="post-body">
          <div class="icons">
            <i class="${iconClass} fa-heart ${heartClass} ${icon}" 
            data-heart="${uuid}"></i>

              <img
              src="./images/icon-comment.png"
              alt="comment icon"
              class="icon">

              <img
              src="./images/icon-dm.png"
              alt="direct message icon"
              class="icon">
          </div>
          
          <p class="bold"><span class="like-count">${likes}</span> likes</p>
          <p><span class="bold">${username}</span> ${comment}</p>
      </div>
    </div>
    `
  })

  return postHtml
}

function render() {
  document.getElementById('root').innerHTML = getPostHtml()
}

render()


fetch('https://randomuser.me/api/')
	.then(res => res.json())
	.then(data => {
  document.getElementById('avatar').innerHTML +=`
  	<img src=${data.results[0].picture.large} class="thumbnail">
  `;
})

document.addEventListener('click', (e)=>{
  if(e.target.dataset.heart) {
    handleLikeClicks(e.target.dataset.heart)
  }
})

document.addEventListener('dblclick', (e)=>{
  if(e.target.dataset.image) {
    handleLikeClicks(e.target.dataset.image)
  }
})

function handleLikeClicks(postId) {
  const targetPostObj = posts.filter(post => 
      post.uuid === postId )[0]
  
  if(targetPostObj.isLiked) {
    targetPostObj.likes--
  } else {
    targetPostObj.likes++
  }
  
  targetPostObj.isLiked = !targetPostObj.isLiked

  render()
}