const posts = [
  {
      name: "Vincent van Gogh",
      username: "vincey1853",
      location: "Zundert, Netherlands",
      avatar: "images/avatar-vangogh.jpg",
      post: "images/post-vangogh.jpg",
      comment: "just took a few mushrooms lol",
      likes: 21
  },
  {
      name: "Gustave Courbet",
      username: "gus1819",
      location: "Ornans, France",
      avatar: "images/avatar-courbet.jpg",
      post: "images/post-courbet.jpg",
      comment: "i'm feelin a bit stressed tbh",
      likes: 4
  },
      {
      name: "Joseph Ducreux",
      username: "jd1735",
      location: "Paris, France",
      avatar: "images/avatar-ducreux.jpg",
      post: "images/post-ducreux.jpg",
      comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
      likes: 152
  }
]

document.getElementById('root').innerHTML = getPostHtml(posts)

function getPostHtml(arr) {
  let postHtml = ''

  for (const obj of arr) {
    const { name, username, location, avatar, post, comment, likes} = obj
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
          <img src="${post}">
      </div>

      <div class="post-body">
          <div class="icons">
              <img
              src="./images/icon-heart.png"
              alt="like icon"
              class="icon like">

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
  }

  return postHtml
}


const likeIcons = document.querySelectorAll('.like')
const postImage = document.querySelectorAll('.post-image')
const likeCount = document.querySelectorAll('.like-count')

likeIcons.forEach((icon, index) => {
  icon.addEventListener('click', () => {
    likeCount[index].textContent = posts[index].likes + 1
  })
})

postImage.forEach((image, index) => {
  image.addEventListener('dblclick', () => {
    likeCount[index].textContent = posts[index].likes + 1
  })
})


fetch('https://randomuser.me/api/')
	.then(res => res.json())
	.then(data => {
  document.getElementById('avatar').innerHTML +=`
  	<img src=${data.results[0].picture.large} class="thumbnail">
  `;
})