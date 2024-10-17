import axiosInstance from "@/app/lib/axiosInstance";

  class ProductsService {
	constructor() {

	}

    async getProducts(page: number) {
        try {
          return axiosInstance.get('/products/' + page).then((response) => {
            const products = response.data;
            return products;  
          });
          
        } catch (err) {
          console.error('Database Error:', err);
          throw new Error('Failed to fetch all products.');
        }
    }
	
}


export default new ProductsService;
  