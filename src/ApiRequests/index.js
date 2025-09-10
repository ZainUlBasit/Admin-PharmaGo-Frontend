import axios from "axios";
const baseURL = "http://localhost:9000/api";
// const baseURL = "https://game-point-backend-wmvs.vercel.app/api";

export const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const apiForImage = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
});

// User Requests
export const SignUpApi = (payload) => api.post("/auth/register", payload);
export const SignInApi = (payload) => api.post("/auth/login", payload);
export const AcceptRequestApi = (id) => api.patch("/customer/approved/" + id);
export const DeclineRequestApi = (id) => api.delete("/customer/decline/" + id);
export const DeleteUserApi = (id) => api.delete("/customer/delete/" + id);
export const ChangeProfilePicApi = (id, payload) =>
  apiForImage.patch("/customer/upload-profile-pciture/" + id, payload);

// Category Requests
export const CreateCatgeoryApi = (payload) =>
  api.post("/category/create", payload);
export const GetCatgeoryApi = () => api.get("/category/all");
export const UpdateCategoryApi = (id, payload) =>
  api.patch("/category/update/" + id, payload);
export const DeleteCategoryApi = (id) => api.delete("/category/delete/" + id);

// Sub Category
export const CreateSubCatgeoryApi = (payload) =>
  api.post("/sub-category/create", payload);
export const UpdateSubCategoryApi = (id, payload) =>
  api.patch("/sub-category/update/" + id, payload);
export const DeleteSubCategoryApi = (id) =>
  api.delete("/sub-category/delete/" + id);
export const GetSubCatgeoryApi = () => api.get("/sub-category/all");

// order requests
export const AddToCartApi = (payload) =>
  api.post("/order/add-to-cart", payload);
export const DeleteOrderApi = (id) => api.delete("/order/delete/" + id);
export const AddAddressToOrderApi = (id, payload) =>
  api.patch("/order/add-address/" + id, payload);
export const AddShippingToOrderApi = (id, payload) =>
  api.patch("/order/add-shipping/" + id, payload);
export const UpdateOrderStatusApi = (id, payload) =>
  api.patch("/order/update-status/" + id, payload);
export const RemoveItemFromCartApi = (id, payload) =>
  api.post("/order/remove-item/" + id, payload);

// Dashboard requests
export const GetCardDataApi = () => api.get("/stats/get-card-data");
export const GetTopTenSellingProductsApi = () => api.get("/top-selling");

// Customer requests
export const GetAllCustomerApi = (payload) => api.get("/customer/all", payload);
export const GetCustomerApi = (id) => api.get("/customer/get/" + id);
export const GetCustomerOrdersApi = (id) => api.get("/customer/orders/" + id);
export const UpdateCustomerApi = (id, payload) =>
  api.patch("/customer/update/" + id, payload);
export const AddCustomerAddressApi = (payload) =>
  api.post("/customer/add-address", payload);
export const GetCustomerAddressApi = (id) =>
  api.get("/customer/get-address/" + id);
export const GetCartApi = (id) => api.get("/order/cart/" + id);
export const GetAllOrdersApi = () => api.get("/order/all");
export const ChangeCartItemQtyApi = (id, payload) =>
  api.patch("/order/update-qty/" + id, payload);
export const ChangePasswordApi = (id, payload) =>
  api.patch("/customer/change-password/" + id, payload);

// product requests
export const UploadingFilesApi = (payload) =>
  apiForImage.post("/upload-files", payload);
export const CreateProductApi = (payload) =>
  apiForImage.post("/product/create", payload);
export const UpdateProductApi = (id, payload) =>
  apiForImage.patch("/product/update/" + id, payload);
export const UpdateProductStatusApi = (id, payload) =>
  api.patch("/product/update-status/" + id, payload);
export const UpdateProductImagesApi = (payload) =>
  apiForImage.post("/product/update-images", payload);
export const DeleteProductApi = (id) => api.delete("/product/delete/" + id);
export const GetAllProductApi = (payload) => api.get("/product/all", payload);

// My Profile requests
export const GetMyProfileApi = (id) => api.get("/auth/get-profile/" + id);
export const UpdateMyProfileApi = (id, payload) =>
  api.patch("/auth/update-profile/" + id, payload);

// Cities requests
export const GetCitiesApi = () => api.get("/cities/all");
export const CreateCityApi = (payload) => api.post("/cities/create", payload);
export const UpdateCityApi = (id, payload) => api.patch("/cities/update/" + id, payload);
export const DeleteCityApi = (id) => api.delete("/cities/delete/" + id);
