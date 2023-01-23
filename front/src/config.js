export let apiUrl = 'http://localhost:8000';

if(process.env.REACT_APP_ENV === 'test') {
  apiUrl = 'http://localhost:8010';
}

if(process.env.NODE_ENV === 'production'){
  apiUrl = 'https://supreme.dispatch.pashster.com/api'
}

export const statusInterval = 1200000;

const adminMenu = [
  {title: "My profile", path: "/my-profile", id:1},
  {title: "Administrators", path: "/administrators", id:2},
  {title: "Dispatchers", path: "/dispatchers", id:3},
  {title: "Carriers", path: "/user-carriers", id:4},
];

export const dropDownMenu = (role) => {
  if (role === "admin") {
    return adminMenu;
  } else {
    return [{title: "My profile", path: "/my-profile", id: 1}];
  }
};

export const showedItemCount = [3, 5, 10, 25, 50, 100];
