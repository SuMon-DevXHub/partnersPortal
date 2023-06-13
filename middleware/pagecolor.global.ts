import { usePageColorStore } from "~/stores/pagecolor";

export default defineNuxtRouteMiddleware((to, from) => {
  const { setPageColor } = usePageColorStore();
  if (to.name === "partners-portal") {
    setPageColor({
      color: "#e4801d",
      backgroundColor: "#e4801d",
      activeBackgroundColor: "#e4801d",
    });
  } else if (to.matched[0].path === "/profile") {
    setPageColor({
      color: "#8db230",
      backgroundColor: "#8db230",
      activeBackgroundColor: "#8db230",
    });
  } else if (to.name === "users") {
    setPageColor({
      color: "#7d80bd", // color: "#8E5E17",
      backgroundColor: "#7d80bd", // backgroundColor: "#FEEBB3",
      activeBackgroundColor: "#7d80bd", // activeBackgroundColor: "#F3A026",
    });
  }
});
