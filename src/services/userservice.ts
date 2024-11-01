import gatewayInstance from "@/src/lib/gatewayInstance";

  class UserService {
	constructor() {

	}

    async authenticate(username: string, password: string) {
      return gatewayInstance.post('/authenticate', {
          username: username,
          password: password
        })
        .then(function (response) {
          return response.data ?? null;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
	
}

export default new UserService;
  