import { router } from "react-query-kit";
import { allCategories } from "../constants";

export const weather = router("weather", {
  getWeather: router.query({
    fetcher: async (variables) => {
      const location = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
            };
            resolve(location);
          },
          (error) => {
            fetch("https://ipapi.co/json/")
              .then((res) => res.json())
              .then((json) => {
                const data = json;
                const location = {
                  longitude: data.longitude,
                  latitude: data.latitude,
                };
                resolve(location);
              })
              .catch((e) => {
                const mute = e;
                reject(new Error("failure"));
              });
          }
        );
      });
      const data= await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=b53a43afba94d247b1847981790f85de`
      ).then((res) => res.json());
      return data;
    },
  }),
});

export const geoApify = router("geoapify", {
  autoComplete: router.query({
    fetcher: ({ query }) => {
      return fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${
          import.meta.env.VITE_GEOAPIFY_API_KEY
        }&limit=8&lang=en`
      ).then((res) => res.json());
    },
  }),
  places: router.query({
    fetcher: ({ placeId, category }) => {
      const url = new URL("https://api.geoapify.com/v2/places");

      url.searchParams.append("categories", allCategories[category]);

      url.searchParams.append("limit", "20");
      url.searchParams.append("filter", `place:${placeId}`);
      url.searchParams.append("apiKey", import.meta.env.VITE_GEOAPIFY_API_KEY);
      return fetch(url.href).then((res) => res.json());
    },
  }),
  getPlacebyId: router.query({
    fetcher: ({ placeId }) => {
      const url = new URL(
        `https://api.geoapify.com/v2/place-details/?id=${placeId}&apiKey=${
          import.meta.env.VITE_GEOAPIFY_API_KEY
        }`
      );
      return fetch(url.href).then((res) => res.json());
    },
  }),
});
