export const useFetched = () => {
  const fetch = async (request: string, options: any, accessToken: string | null) => {
    const { tokenCookie } = useAuth();
    return await $fetch(request, {
      ...options,
      headers: {
        Authorization:
          tokenCookie.value || accessToken
            ? `Bearer ${tokenCookie.value || accessToken}`
            : "",
      },
    });
  };
  return {
    fetch,
  };
};
