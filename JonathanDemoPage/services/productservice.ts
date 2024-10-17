import axiosInstance from "@/app/lib/axiosInstance";

  class ProductsService {
	constructor() {

	}

    async getProducts(page: number) {
        try {
          return axiosInstance.get('/api/products/' + page).then((response) => {
            const products = response.data;
            return {results: products, count: 70};  
          });
          
        } catch (err) {
          console.error('Database Error:', err);
          throw new Error('Failed to fetch all products.');
        }
    }
	
}


export default new ProductsService;
  