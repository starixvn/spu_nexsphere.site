import gatewayInstance from "@/src/lib/gatewayInstance";

  class UserAgentService {
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
          console.log(error.message);
          return null;
        });
    }

    async getUserAgent(username: string) {
      const token = await this.authenticate(username, "123456");

      if(token){
        return gatewayInstance.get('/UseAgent/10000', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
          })
          .then(function (response) {
            return response.data ?? null;
          })
          .catch(function (error) {
            console.log(error.message);
            return null;
          });
      }

      
    }
	
}

export default new UserAgentService;
  