import { httpConnection as http } from './httpConnection';
import '../scss/styles.scss'
import * as bootstrap from 'bootstrap';

const commentsDiv = document.getElementById('commentsDiv');
const finalRemovePostButton = document.getElementById('finalRemovePost');
const finalEditPostButton = document.getElementById('finalEditPost');
const editPostForm = document.getElementById('editPostForm');
const editModalTitle = document.getElementById('editModalLabel');
const editTitle = document.getElementById('editTitle');
const editBody = document.getElementById('editBody');
const list = document.getElementById('posts');
const editModalFooter = document.getElementById('editModalFooter');
const notification = document.getElementById('notification');
const deletePostToast = new bootstrap.Toast(notification)
const notificationTitle = document.getElementById('notificationTitle');

// Charge posts from DB

const loadPosts = async () => {

  await http().get(postsAPI).then((data) => {
    data.forEach(async post => {
      if (post) {
        let cloneList = list.children[0].cloneNode(true);
        cloneList.id = `post${post.id}`;
        cloneList.children[0].onclick = openModalPost;
        cloneList.children[0].textContent = post.title;
        cloneList.children[2].id = `editPost${post.id}`;
        cloneList.children[2].children[0].id = `editPost${post.id}`;
        cloneList.children[2].onclick = openEditPost;
        await http().get(commentsByPostAPI(post.id)).then((comments) => {
          cloneList.children[1].textContent = comments.length;
        });
        list.appendChild(cloneList);
      }
    });
  }).then(() => list.removeChild(list.children[0]));
}

// Configure modal when you open it.

async function openModalPost(e) {

  commentsDiv.innerHTML = '';   //Reset data inside modal
  let idUser;
  let id = e.target.parentElement.id.replace('post', '');

  await http().get(postByIdAPI(id)).then(result => {
    if (result) {
      idUser = result.userId;
      document.getElementById('modalContent').textContent = result.body;
      document.getElementById('showModalLabel').textContent = result.title;
    }
  });

  await http().get(userByIdAPI(idUser)).then((result) => {
    if (result) {
      document.getElementById('modalUser').innerHTML =
        `<p>Email - ${result.email}</p><p>Username - ${result.username}</p>`;
    }
  });

  await http().get(commentsByPostAPI(id)).then((result) => {
    if (result) {
      result.forEach((comment) => {
        commentsDiv.innerHTML += `
          <div>
            <h4 class='border-top pb-2 pt-4'>${comment.name}</h4>
            <p class='pb-2'>${comment.body}</p>
            <p class='pb-2'>${comment.email}</p>
          </div>
        `;
      });
    }
  });
}

async function openEditPost(e) {
  finalEditPostButton.setAttribute('edit-id', e.target.id.replace('editPost', ''));
  let idToEditPost = finalEditPostButton.getAttribute('edit-id');

  if (finalRemovePostButton) {
    finalRemovePostButton.addEventListener('click', () => deletePostToast.show());
  }

  await http().get(postByIdAPI(idToEditPost))
    .then(result => {
      editTitle.value = result.title;
      editBody.value = result.body;
    })

  await http().get(userByIdAPI(idToEditPost)).then(result => {
    editModalTitle.innerText = `${result.name} @${result.username}`;
  });
  editModalFooter.children[0].id = `trashPost${idToEditPost}`;
  editModalFooter.children[0].onclick = (e) => {
    finalRemovePostButton.setAttribute('remove-id', e.target.id.replace('trashPost', ''));
  }
}
// Action when edit or remove and close modal

async function removePost() {
  let idToRemovePost = finalRemovePostButton.getAttribute('remove-id');
  await http().del(postByIdAPI(idToRemovePost));
    notificationTitle.textContent = `Removing post ${idToRemovePost}`;

  setTimeout(() => {
    deletePostToast.hide();
    document.getElementById(`post${idToRemovePost}`).remove();
  }, 1500);
}

async function editPost(e) {
  e.preventDefault();
  let idToEditPost = finalEditPostButton.getAttribute('edit-id');
  let options = {};
  await http().get(postByIdAPI(idToEditPost)).then(result => {
    options.body = {
      userId: result.userId,
      id: idToEditPost,
      title: editTitle.value,
      body: editBody.value,
    }
  });
  await http().put(postByIdAPI(idToEditPost), options).then(() => {
    document.getElementById(`post${idToEditPost}`).children[0].textContent = editTitle.value;
  });
}

loadPosts();
finalRemovePostButton.addEventListener('click', removePost);
editPostForm.addEventListener('submit', editPost);
