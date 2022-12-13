import { httpConnection as http } from '../js/httpConnection';
import { addElement } from '../js/main';
import { searchUserById } from './users';

let idToRemovePost;

const loadPosts = () => {
    const list = document.getElementById('posts');
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    http().get(localPostsEndpoint).then((data) => {
        data.forEach((post) => {
            list.append(
                addElement( // element / classes / attributes / text /events 
                    'li',
                    ['list-group-item', 'd-flex', 'justify-content-between', 'align-items-start'],
                    [
                        { name: "id", value: `post${post.id}` }
                    ]
            ));
            const li = document.getElementById(`post${post.id}`);
            li.append(
                addElement( // element / classes / attributes / text /events 
                    'div',
                    ['ms-2', 'me-auto'],
                    [
                        { name: 'data-bs-toggle', value: 'modal' },
                        { name: 'data-bs-target', value: '#showPostModal' },
                        { name: 'style', value: 'cursor:pointer' }
                    ],
                    post.title,
                    { 
                        e: 'click',
                        func: openModaPost 
                    }
            ));
            li.append(
                addElement( // element / classes / attributes / text /events 
                    'span', 
                    [
                        'badge', 'bg-primary', 'rounded-pill', 'me-2'],
                    [],
                    Object.keys(post).length
            ));
            li.append(
                addElement( // element / classes / attributes / text /events 
                    'span', 
                    ['badge', 'bg-danger', 'rounded-pill'],
                    [
                        { name: 'data-bs-toggle', value: 'modal' },
                        { name: 'data-bs-target', value: '#deletePostModal' },
                        { name: 'id', value: `trashPost${post.id}` },
                        { name: 'style', value: 'cursor:pointer' }
                    ],
                    '',
                    { 
                        e: 'click', 
                        func: waitingIdToRemovePost 
                    }
            ));
            const trash = document.getElementById(`trashPost${post.id}`);
            trash.append(
                addElement( // element / classes / attributes / text /events 
                    'i', 
                    ['bi', 'bi-trash3'],
                    [
                        {name: 'style', value: 'cursor:pointer'},
                        {name: 'id', value: `trashPost${post.id}`}
                    ]
            ));
        });
    });
}

const openModaPost = async (e) => {
    let idUser;
    let id = e.target.parentElement.id.replace('post', '');
    await http().get(localPostEndpoint(id)).then(res => {
        idUser = res.userId;
        document.getElementById('modalContent').textContent = res.body;
        document.getElementById('showModalLabel').textContent = res.title;
    });
    searchUserById(idUser);
}

const waitingIdToRemovePost = (e) => {
    idToRemovePost = e.target.id.replace('trashPost', '');
}
const removePost = async (e) => {
    await http().del(localPostsEndpoint + '/' + idToRemovePost);
    loadPosts();
}

loadPosts();
document.getElementById('finalRemovePost').addEventListener('click', removePost);
