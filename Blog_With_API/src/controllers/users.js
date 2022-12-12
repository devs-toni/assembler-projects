import { httpConnection as http } from '../js/httpConnection';

const showUsers = () => {
    http().get(usersEndpoint).then((data) => console.log(data));
}

document.getElementById("users").addEventListener("click", showUsers);




