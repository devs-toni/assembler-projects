import { httpConnection as http } from '../js/httpConnection';

const showPosts = () => {
    http().get(postsEndpoint).then((data) => console.log(data));
}

document.getElementById("posts").addEventListener("click", showPosts);


