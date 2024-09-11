import axiosInstance from "@/utils/libs/axiosInstance";

class UserDataService {
	constructor() {

	}

    getUsers(){
        return axiosInstance.get("/users").then(function (response) {
            return response.data ? response.data : null;
        });
    }
	
}


export default new UserDataService;