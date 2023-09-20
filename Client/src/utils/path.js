const path = {
  PUBLIC: "/*",
  HOME: "",
  ALL: "*",
  LOGIN: "login",
  PRODUCTS: ":category",
  BLOGS: "blogs",
  DETAIL_BLOGS: "blogs/:id/:title",
  CONTACTS: "pages/contacts",
  FAQ: "faqs",
  CART: "cart",
  CHECKOUT: "checkouts",
  DETAIL_PRODUCT_CATEGORY_ID_TITLE: ":category/:id/:title",
  FINAL_REGISTER: "finalregister/:status",
  FORGOT_PASSWORD: "forgotpassword",
  RESET_PASSWORD: "reset-password/:token",

  //Admin
  ADMIN: "admin",
  DASHBOARD: "dashboard",
  MANAGE_USER: "manage-user",
  MANAGE_PRODUCT: "manage-product",
  MANAGE_ORDER: "manage-order",
  CREATE_PRODUCT: "create-product",

  //Member
  MEMBER: "member",
  PERSONAL: "personal",
  MY_CART: "my-cart",
  HISTORY: "buy-history",
  WISHLIST: "wishlist",
};

export default path;
