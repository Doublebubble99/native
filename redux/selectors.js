import { useSelector } from "react-redux";
const login = (state) => state.login;
const email = (state) => state.email;
const password = (state) => state.password;
const posts = (state) => state.posts;
export default function getSelector(selector) {
  switch (selector) {
    case "login":
      return useSelector(login);
    case "email":
      return useSelector(email);
    case "password":
      return useSelector(password);
    case "posts":
      return useSelector(posts);
    default:
      console.log("Unused selector");
  }
}
