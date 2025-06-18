import ProductDto from "../dao/dto/product.dto.js";
import ProductDao from "../dao/product.dao.js";
export default class ProductRepository {
  constructor() {
    this.dao = new ProductDao();
  }

  getProducts = async () => {
    const products = await this.dao.getProducts();
    return products.map((product) => new ProductDto(product));
  };

  getProductById = async (pid) => {
    const product = await this.dao.getProductById(pid);
    return product;
  };

  createProduct = async (product) => {
    const newProduct = await this.dao.createProduct(product);
    return newProduct;
  };

  updateProduct = async (pid, product) => {
    const updatedProduct = await this.dao.updateProduct(pid, product);
    return updatedProduct;
  };

  deleteProduct = async (pid) => {
    const deletedProduct = await this.dao.deleteProduct(pid);
    return deletedProduct;
  };

  paginateProducts = async (page, limit) => {
    const products = await this.dao.paginateProducts(page, limit);
    // products.docs = products.docs.map((product) => new ProductDto(product));
    return products;
  };
}
