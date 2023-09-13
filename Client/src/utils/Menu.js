import icons from "./icons";
import path from "./path";
const {
  GiSmartphone,
  GiHeadphones,
  BsTablet,
  BsLaptop,
  AiOutlineCamera,
  AiOutlinePrinter,
  BsSpeaker,
  AiOutlineDesktop,
  MdGroups,
  FaProductHunt,
  HiOutlineShoppingCart,
  MdOutlineDashboardCustomize,
} = icons;

export const navPath = [
  {
    id: 1,
    path: `${path.HOME}`,
    text: "HOME",
  },
  {
    id: 2,
    path: `${path.PRODUCTS}`,
    text: "PRODUCT",
  },
  {
    id: 3,
    path: `${path.BLOGS}`,
    text: "BLOG",
  },
  {
    id: 4,
    path: `${path.CONTACTS}`,
    text: "CONTACT US",
  },
];

export const sidebar = [
  {
    id: 1,
    icons: <GiSmartphone size={22} />,
    text: "Smartphone",
    path: "/smartphone",
  },
  {
    id: 2,
    icons: <BsTablet size={22} />,
    text: "Tablet",
    path: "/tablet",
  },
  {
    id: 3,
    icons: <BsLaptop size={22} />,
    text: "Laptop",
    path: "/laptop",
  },
  {
    id: 4,
    icons: <AiOutlineCamera size={22} />,
    text: "Camera",
    path: "/camera",
  },
  {
    id: 5,
    icons: <AiOutlinePrinter size={22} />,
    text: "Printer",
    path: "/printer",
  },
  {
    id: 6,
    icons: <BsSpeaker size={22} />,
    text: "Speaker",
    path: "/speaker",
  },
  {
    id: 7,
    icons: <GiHeadphones size={22} />,
    text: "Accessories",
    path: "/accessories",
  },
  {
    id: 8,
    icons: <AiOutlineDesktop size={22} />,
    text: "Television",
    path: "/television",
  },
];
export const productInfoTabs = [
  {
    id: 1,
    name: "DISCRIPTION",
    description: `Technology: GSM / HSPA / LTE
                Dimensions: 144.6 x 69.2 x 7.3 mm
                Weight: 129 g
                Display: IPS LCD 5.15 inches
                Resolution: 1080 x 1920
                OS: Android OS, v6.0 (Marshmallow)
                Chipset: Snapdragon 820
                CPU: Quad-core
                Internal: 32GB/64GB/128GB
                Camera: 16 MP, f/2.0 - 4 MP, f/2.0
                It's been a while since we met the last of the Mi kind. Even though the Xiaomi Mi 4 went on sale back in the summer of 2014, it succeeded in staying relevant for over 20 months and surpassed the lifespan of many competitors. Xiaomi surely took the time to make the Mi 5 worthy of the flagship series name.

                The Mi 5 was the first Xiaomi phone to be unveiled under the massive spotlight of the world's biggest mobile expo - the MWC in Barcelona. And with its stunning looks and capable performance, the Mi 5 deserved nothing less.

                The Xiaomi Mi 5 is instantly likeable - the new flagship comes with unbelievably thin bezels, a sharp profile, a curved back and a lightweight body - all adding to one of the most impressive exteriors a modern smartphones can hope for.

                Then you learn that inside there is the latest Snapdragon 820 chipset, a new 16MP camera with 4-axis optical stabilization and yet no camera hump, generous storage options, rich connectivity options, and a beefy battery. How about that?`,
  },
  {
    id: 2,
    name: "WARRANTY",
    description: `WARRANTY INFORMATION
                LIMITED WARRANTIES
                Limited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products:

                Frames Used In Upholstered and Leather Products
                Limited Lifetime Warranty
                A Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects.`,
  },
  {
    id: 3,
    name: "DELIVERY",
    description: `PURCHASING & DELIVERY
Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
Picking up at the store
Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
Delivery
Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.`,
  },
  {
    id: 4,
    name: "PAYMENT",
    description: `PURCHASING & DELIVERY
Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
Picking up at the store
Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
Delivery
Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.`,
  },
];

export const colors = [
  "black",
  "brown",
  "red",
  "white",
  "platinum",
  "deep pink",
  "gray",
];

export const sorts = [
  {
    id: 1,
    value: "-sold",
    text: "Best Selling",
  },
  {
    id: 2,
    value: "-title",
    text: "Alphabetically, A-Z",
  },
  {
    id: 3,
    value: "title",
    text: "Alphabetically, Z-A",
  },
  {
    id: 4,
    value: "-price",
    text: "Price, hight to low",
  },
  {
    id: 5,
    value: "price",
    text: "Price, low to hight",
  },
  {
    id: 6,
    value: "date",
    text: "Date, old to new",
  },
  {
    id: 7,
    value: "-date",
    text: "Date, new to old",
  },
];

export const voteOptions = [
  {
    id: 5,
    text: "Perfect",
  },
  {
    id: 4,
    text: "Good",
  },
  {
    id: 3,
    text: "Neutral",
  },
  {
    id: 2,
    text: "Bad",
  },
  {
    id: 1,
    text: "Terrible",
  },
];

//admin
export const adminSidebar = [
  {
    id: 1,
    type: "Single",
    text: "Dashboard",
    path: `/${path.ADMIN}/${path.DASHBOARD}`,
    icon: <MdOutlineDashboardCustomize size="25" />,
  },
  {
    id: 2,
    type: "Single",
    text: "Manage User",
    path: `/${path.ADMIN}/${path.MANAGE_USER}`,
    icon: <MdGroups size="25" />,
  },
  {
    id: 3,
    type: "Parent",
    text: "Manager Product",
    icon: <FaProductHunt size="25" />,
    submenu: [
      {
        text: "Create Product",
        path: `/${path.ADMIN}/${path.CREATE_PRODUCT}`,
      },
      {
        text: "Manage Product",
        path: `/${path.ADMIN}/${path.MANAGE_PRODUCT}`,
      },
    ],
  },
  {
    id: 4,
    type: "Single",
    text: "Manage Order",
    path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
    icon: <HiOutlineShoppingCart size="25" />,
  },
];

//member
export const memberSidebar = [
  {
    id: 1,
    type: "Single",
    text: "Personal",
    path: `/${path.MEMBER}/${path.PERSONAL}`,
    icon: <MdOutlineDashboardCustomize size="25" />,
  },
  {
    id: 2,
    type: "Single",
    text: "My Cart",
    path: `/${path.MEMBER}/${path.MY_CART}`,
    icon: <MdGroups size="25" />,
  },

  {
    id: 3,
    type: "Single",
    text: "Buy History",
    path: `/${path.MEMBER}/${path.HISTORY}`,
    icon: <HiOutlineShoppingCart size="25" />,
  },
  {
    id: 4,
    type: "Single",
    text: "Wishlist",
    path: `/${path.MEMBER}/${path.WISHLIST}`,
    icon: <HiOutlineShoppingCart size="25" />,
  },
];

export const sideBarMobile = [
  {
    id: 1,
    path: `${path.HOME}`,
    text: "HOME",
    type: "Single",
  },
  {
    id: 2,
    path: `${path.PRODUCTS}`,
    text: "PRODUCT",
    type: "Single",
  },
  {
    id: 3,
    path: `${path.BLOGS}`,
    text: "BLOG",
    type: "Single",
  },
  {
    id: 4,
    path: `${path.CONTACTS}`,
    text: "CONTACT US",
    type: "Single",
  },
  {
    id: 5,
    path: "",
    text: "CATEGORIES",
    type: "Parent",
    submenu: [
      {
        text: "Smartphone",
        path: "/smartphone",
      },
      {
        text: "Tablet",
        path: "/tablet",
      },
      {
        text: "Laptop",
        path: "/laptop",
      },
      {
        text: "Camera",
        path: "/camera",
      },
      {
        text: "Printer",
        path: "/printer",
      },
      {
        text: "Speaker",
        path: "/speaker",
      },
      {
        text: "Accessories",
        path: "/accessories",
      },
      {
        text: "Television",
        path: "/television",
      },
    ],
  },
];
