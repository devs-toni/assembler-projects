const remoteAPI = false;
const remote = 'http://localhost:3000';
const local = 'https://jsonplaceholder.typicode.com'

/* Users */
const usersAPI = `http://${remoteAPI ? remote : local}/users`; //non-used
const userByIdAPI = id => `http://${remoteAPI ? remote : local}/users/${id}`;

/* Posts */
const postsAPI = `http://${remoteAPI ? remote : local}/posts`;
const postByIdAPI = id => `http://${remoteAPI ? remote : local}/posts/${id}`;

/* Comments */
const commentsAPI = 'http://localhost:3000/comments'; //non-used
const commentsByPostAPI = id => `http://${remoteAPI ? remote : local}/comments?postId=${id}`;
