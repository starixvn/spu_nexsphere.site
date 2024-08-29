import axios from 'axios';

class UserDataService {
	constructor() {

	}

    getUsers(){
        return axios.get("https://jsonplaceholder.typicode.com/users").then(function (response) {
            return response.data ? response.data : null;
        });
    }
	
}


export default new UserDataService;