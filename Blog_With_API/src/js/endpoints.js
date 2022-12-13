///////////////////////////// Local Endpoints /////////////////////////////

/* Users */
const getUsersLocalAPI = 'http://localhost:3000/users';
const getUserLocalAPI = id => `http://localhost:3000/users/${id}`;

/* Posts */
const getPostsLocalAPI = 'http://localhost:3000/posts';
const fetchPostLocalAPI = id => `http://localhost:3000/posts/${id}`;
const getPostCommentsLocalAPI = id => `http://localhost:3000/posts/${id}/comments`;

/* Comments */
const getCommentsLocalAPI = 'http://localhost:3000/comments';
const getCommentsByPostAPI = postId => `http://localhost:3000/comments?postId=${postId}`;


///////////////////////////// API Endpoints /////////////////////////////

const usersEndpoint = 'https://jsonplaceholder.typicode.com/users';
const postsEndpoint = 'https://jsonplaceholder.typicode.com/posts';
const commentsEndpoint = 'https://jsonplaceholder.typicode.com/comments';
