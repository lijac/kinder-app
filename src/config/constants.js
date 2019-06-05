/** General */
//========

export const API_URL = "https://webutvikleroslo.no/api";
export const BASE_URL = "https://webutvikleroslo.no/react";
// export const API_URL = "http://192.168.1.107:1140/api";
// export const BASE_URL = "http://192.168.1.105:1140";

export const APP_NAME = "House Rental";
export const WELCOME_TO = "WELCOME TO";
export const INTRO_TEXT =
  "House Rental helps you get offers and updates on apartments and houses around and outside your location.";
export const GET_STARTED = "GET STARTED";
export const WELCOME = "Welcome";
export const SIGN_IN_TEXT = "Sign in to use KinderID.";
export const CREATE_AN_ACCOUNT = "Tap here to create an account";
export const HI_THERE = "Hi there";
export const REGISTER_TEXT = "Register";
export const REGISTER_DESC_TEXT = "Create your KinderID account";
export const FORGOT_PASSWORD = "Forgot password?";
export const TYPE_LOCATION = "Type location";
export const NOTIFICATIONS = "Notifications";
export const NOTIFICATIONS_PERMISSION_TEXT =
  "Get notified about new offers and updates";
export const NOTIFICATIONS_PERMISSION_ALLOW_TEXT = "Enable Push Notifications";
export const DO_NOT_ALLOW = "Do not allow";
export const CONTACT_PERSON_TEXT = "The contact person for child is: ";
export const CALL = "Call";
export const CONTACT_OWNER = "Contact Owner";
export const FILTER = "Filter";
export const FILTER_CATEGORIES = [
  {
    title: "Tenant Type",
    filters: ["Family", "Couple", "Single", "Roommates", "Group"]
  },
  {
    title: "Apartment Type",
    filters: ["1BHK", "2BHK", "Dormitory", "Shared", "Room & Bath"]
  },
  {
    title: "Facilities",
    filters: [
      "Elevator",
      "2 Baths",
      "1 Kitchen",
      "2 Rooms",
      "24/7 Water",
      "Constant Power",
      "Parking"
    ]
  }
];
export const ENABLE_LOCATION_SERVICES = "Enable location services";
export const LOCATION_SERVICES_PERMISSION_TEXT = "Find apartments around you";
export const LOCATION_SERVICES_PERMISSION_ALLOW_TEXT = "Enable";

export const SHARE_CONTACT_DETAILS = "Share contact details";
export const CONTACT_PERMISSION_TEXT =
  "Grant House Rental access to your contacts";
export const CONTACT_PERMISSION_ALLOW_TEXT = "Share";

export const RENTAL_LISTINGS = [
  {
    heading: "1BHK Apartments near you.",
    rentalItems: [
      {
        key: "1",
        image: require("../assets/images/rentals/rental2.jpeg"),
        title: "1BHK Residential apartment for sale",
        price: "1,500"
      },
      {
        key: "2",
        image: require("../assets/images/rentals/rental3.jpeg"),
        title: "1BHK Residential apartment for rent",
        price: "3,500"
      },
      {
        key: "3",
        image: require("../assets/images/rentals/rental1.jpeg"),
        title: "1BHK shared apartment for rent",
        price: "5,000"
      },
      {
        key: "4",
        image: require("../assets/images/rentals/rental5.jpeg"),
        title: "1BHK Residential apartment for sale",
        price: "11,500"
      }
    ]
  },
  {
    heading: "2BHK Apartments near you.",
    rentalItems: [
      {
        key: "1",
        image: require("../assets/images/rentals/rental3.jpeg"),
        title: "2BHK Residential apartment for sale",
        price: "1,150"
      },
      {
        key: "2",
        image: require("../assets/images/rentals/rental4.jpeg"),
        title: "2BHK 2Baths apartment for rent",
        price: "2,500"
      },
      {
        key: "3",
        image: require("../assets/images/rentals/rental2.jpeg"),
        title: "2BHK shared apartment for rent",
        price: "11,500"
      },
      {
        key: "4",
        image: require("../assets/images/rentals/rental3.jpeg"),
        title: "2BHK Residential apartment for sale",
        price: "11,500"
      }
    ]
  },
  {
    heading: "Apartments selling around you",
    rentalItems: [
      {
        key: "1",
        image: require("../assets/images/rentals/rental5.jpeg"),
        title: "Mansion for sale",
        price: "4,850"
      },
      {
        key: "2",
        image: require("../assets/images/rentals/rental3.jpeg"),
        title: "Duplex for rent",
        price: "1,500"
      },
      {
        key: "3",
        image: require("../assets/images/rentals/rental5.jpeg"),
        title: "3-storey building for sale",
        price: "6,500"
      }
    ]
  }
];

export const FILTER_RESULT = [
  {
    key: "1",
    image: require("../assets/images/rentals/rental2.jpeg"),
    title: "1BHK Residential apartment for sale",
    price: "1,500"
  },
  {
    key: "2",
    image: require("../assets/images/rentals/rental3.jpeg"),
    title: "1BHK Residential apartment for rent",
    price: "3,500"
  },
  {
    key: "3",
    image: require("../assets/images/rentals/rental1.jpeg"),
    title: "1BHK shared apartment for rent",
    price: "5,000"
  },
  {
    key: "4",
    image: require("../assets/images/rentals/rental5.jpeg"),
    title: "1BHK Residential apartment for sale",
    price: "11,500"
  },
  {
    key: "5",
    image: require("../assets/images/rentals/rental2.jpeg"),
    title: "1BHK Residential apartment for sale",
    price: "1,500"
  },
  {
    key: "6",
    image: require("../assets/images/rentals/rental3.jpeg"),
    title: "1BHK Residential apartment for rent",
    price: "3,500"
  },
  {
    key: "7",
    image: require("../assets/images/rentals/rental1.jpeg"),
    title: "1BHK shared apartment for rent",
    price: "5,000"
  },
  {
    key: "8",
    image: require("../assets/images/rentals/rental5.jpeg"),
    title: "1BHK Residential apartment for sale",
    price: "11,500"
  }
];

export const HOUSE_DETAILS = [
  {
    icon: "phone",
    title: "Phone",
    subtitle: "010-111-1111"
  },
  {
    icon: "inbox",
    title: "Name",
    subtitle: "John Smith"
  }
];
//========

/** Forms */
//========
export const FULL_NAME = "Full name";
export const EMAIL = "E-mail";
export const MOBILE_NUMBER = "Mobile Number";
export const PASSWORD = "Password";
export const LOGIN = "Sign in";
export const REGISTER = "Register";
export const SAVE = "Save";
export const DONE = "Done";
export const PRICE_RANGE = "Price Range";
export const PROFILE_NAME = "Rango, The Sheriff";
export const PROFILE_MOBILE_NUMBER = "+123-4567-890";
export const ENABLE_LOCATION = "Enable location";
//========

/** Tabs */
//========
export const EXPLORE_TAB_LABELS = [
  "Near Me",
  "Explore city",
  "Popular",
  "Featured"
];
export const BOTTOM_MENU_ITEMS = [
  { icon: "home", route: "_houseList" },
  { icon: "sliders", route: "_filter" },
  { icon: "bell", route: "_notifications" },
  { icon: "user", route: "_profile" }
];
//========

/** Dummy data */
//========
export const SAMPLE_NOTIFICATIONS = [
  {
    title: "New offer",
    description:
      "A 2BHK residential apartment is available for rent around you.",
    image: require("../assets/images/house.png")
  },
  {
    title: "Apartment update",
    description:
      "Pets are no longer allowed in residential apartments at your location.",
    image: require("../assets/images/avatar.png")
  },
  {
    title: "Update",
    description: "The 1BHK apartment along Ring Road has been taken.",
    image: require("../assets/images/house.png")
  },
  {
    title: "New offer",
    description:
      "A 2BHK residential apartment is available for rent in a sample area.",
    image: require("../assets/images/house.png")
  },
  {
    title: "New offer",
    description:
      "A 2BHK residential apartment is available for rent in a sample area.",
    image: require("../assets/images/avatar.png")
  },
  {
    title: "New offer",
    description:
      "A 2BHK residential apartment is available for rent in a sample area.",
    image: require("../assets/images/avatar.png")
  },
  {
    title: "New offer",
    description:
      "A 2BHK residential apartment is available for rent in a sample area.",
    image: require("../assets/images/house.png")
  }
];
//========
