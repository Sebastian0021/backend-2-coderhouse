import productModel from "./models/product.model.js";

export default class ProductDao {
  getProducts = async () => {
    try {
      const products = await productModel.find();
      return products;
    } catch (error) {
      console.log(error);
    }
  };

  getProductById = async (pid) => {
    try {
      const product = await productModel.findById(pid);
      return product;
    } catch (error) {
      console.log(error);
    }
  };

  createProduct = async (product) => {
    try {
      const newProduct = await productModel.create(product);
      return newProduct;
    } catch (error) {
      console.log(error);
    }
  };

  updateProduct = async (pid, product) => {
    try {
      const updatedProduct = await productModel.findByIdAndUpdate(
        pid,
        product,
        { new: true }
      );
      return updatedProduct;
    } catch (error) {
      console.log(error);
    }
  };

  deleteProduct = async (pid) => {
    try {
      const deletedProduct = await productModel.findByIdAndDelete(pid);
      return deletedProduct;
    } catch (error) {
      console.log(error);
    }
  };

  paginateProducts = async (filter, options) => {
    try {
      const result = await productModel.paginate(filter, options);
      return result;
    } catch (error) {
      console.log(error);
    }
  };
}
