import { usePageColorStore } from "~/stores/pagecolor";

export default defineNuxtRouteMiddleware((to, from) => {
  const { setPageColor } = usePageColorStore();
  const { userInfo } = useAuth();
  console.log(to.name);
  if (to.name === "partners-portal" && userInfo.value.paymentStatus !== "") {
    setPageColor({
      color: "#e4801d",
      backgroundColor: "#e4801d",
      activeBackgroundColor: "#e4801d",
    });
  } else if (
    to.matched[0].name === "partners-profile" &&
    userInfo.value.paymentStatus !== ""
  ) {
    setPageColor({
      color: "#8db230",
      backgroundColor: "#8db230",
      activeBackgroundColor: "#8db230",
    });
  } else if (to.name === "users" && userInfo.value.paymentStatus !== "") {
    setPageColor({
      color: "#7d80bd", // color: "#8E5E17",
      backgroundColor: "#7d80bd", // backgroundColor: "#FEEBB3",
      activeBackgroundColor: "#7d80bd", // activeBackgroundColor: "#F3A026",
    });
  } else if (to.name === "payment-method") {
    setPageColor({
      color: "#E0AD1F",
      backgroundColor: "#E0AD1F",
      activeBackgroundColor: "#E0AD1F",
    });
  }
});
