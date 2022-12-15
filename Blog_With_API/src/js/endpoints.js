let remoteAPI = false;
const local = 'http://localhost:3000/';
const remote = 'https://jsonplaceholder.typicode.com/'

function changeMode(){
  if (mode.value === 'remote') {
    remoteAPI = true;
  } else {
    remoteAPI = false;
  }
}

/* Users */
const usersAPI = `${remoteAPI ? remote : local}users`; //non-used
const userByIdAPI = id => `${remoteAPI ? remote : local}users/${id}`;

/* Posts */
const postsAPI = `${remoteAPI ? remote : local}posts`;
const postByIdAPI = id => `${remoteAPI ? remote : local}posts/${id}`;

/* Comments */
const commentsAPI = `${remoteAPI ? remote : local}comments`; //non-used
const commentsByPostAPI = id => `${remoteAPI ? remote : local}comments?postId=${id}`;
