export let apiUrl = 'http://localhost:8000';

if(process.env.REACT_APP_ENV === 'test') {
  apiUrl = 'http://localhost:8010';
}

export const statusInterval = 1200000;

const adminMenu = [
  {title: "My profile", path: "/my-profile"},
  {title: "Administrators", path: "/administrators"},
  {title: "Dispatchers", path: "/dispatchers"},
  {title: "Carriers", path: "/user-carriers"},
];

export const dropDownMenu = (role) => {
  if (role === "admin") {
    return adminMenu;
  } else {
    return [{title: "My profile", path: "/my-profile"}];
  }
};
