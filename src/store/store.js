import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./Slices/ProductSlice";
import CustomerSlice from "./Slices/CustomerSlice";
import CategorySlice from "./Slices/CategorySlice";
import SubCategorySlice from "./Slices/SubCategorySlice";
import CartSlice from "./Slices/CartSlice";
import OrderSlice from "./Slices/OrderSlice";
import CustomerAddressSlice from "./Slices/CustomerAddressSlice";
import CustomerOrderSlice from "./Slices/CustomerOrderSlice";
import CardSlice from "./Slices/CardSlice";
import MyProfileSlice from "./Slices/MyProfileSlice";
import TopTenProductSlice from "./Slices/TopTenProductSlice";
import CitiesSlice from "./Slices/CitiesSlice";

export const store = configureStore({
  reducer: {
    ProductState: ProductSlice,
    CategoryState: CategorySlice,
    SubCategoryState: SubCategorySlice,
    CustomerState: CustomerSlice,
    CartState: CartSlice,
    OrderState: OrderSlice,
    CustomerAddress: CustomerAddressSlice,
    CustomerOrderState: CustomerOrderSlice,
    CardState: CardSlice,
    MyProfileState: MyProfileSlice,
    TopTenProductState: TopTenProductSlice,
    CitiesState: CitiesSlice,
  },
});
