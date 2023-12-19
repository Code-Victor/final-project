import React from "react";
import { useParams } from "react-router-dom";
import { Star, ChevronDown } from "lucide-react";
import { geoApify, weather } from "../api";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Details = () => {
  const { placeId } = useParams();
  const [searchParams] = useSearchParams();
  const filter = searchParams?.filter ?? "hotel";
  const { data } = geoApify.getPlacebyId.useQuery({
    variables: {
      placeId: placeId,
    },
  });
  const properties = data?.features[0]?.properties;
  // const { data: weatherData } = weather.getWeather.useQuery({
  //   enabled: properties?.lat && properties?.lon,
  //   variables: {
  //     lat: properties?.lat,
  //     lon: properties?.lon,
  //   },
  // });
  // console.log(weatherData);

  console.log(properties);
  return (
    <section className="overflow-hidden">
      <div className="mx-auto max-w-5xl px-5 py-24">
        <div className="mx-auto flex flex-wrap items-center lg:w-4/5">
          <img
            alt="Nike Air Max 21A"
            className="h-64 w-full rounded object-cover lg:h-96 lg:w-1/2"
            src={`https://source.unsplash.com/random/?${filter}&${placeId}`}
          />
          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
            <h2 className="text-sm capitalize font-semibold tracking-widest dark:text-grayy-100 text-gray-500">
              {filter}
            </h2>
            <h1 className="my-4 text-3xl font-semibold dark:text-white text-black">
              {properties?.name}
            </h1>
            <div className="my-4 flex items-center">
              <span className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-500" />
                ))}
                <span className="ml-3 inline-block text-xs font-semibold">
                  4 Reviews
                </span>
              </span>
            </div>
            <p className="leading-relaxed">{properties?.address_line2}</p>

            <div className="flex items-center justify-between mt-8">
              <Link
                to={`https://www.booking.com/searchresults.en-us.html?ss=${properties?.formatted}&group_adults=1&group_children=0&no_rooms=1`}
                asChild
              >
                <Button type="button" variant="secondary">
                  view details
                </Button>
              </Link>
              <Button type="button">Add to Favourite</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-5xl">
        <h2>Weather</h2>
      </div>
    </section>
  );
};
