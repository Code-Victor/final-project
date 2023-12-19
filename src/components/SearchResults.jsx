import React from "react";
import { geoApify } from "../api";
import { allCategories, categoriesDisplay } from "../constants";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { FilterIcon, FilterX } from "lucide-react";
import { motion } from "framer-motion";
import { useTrip } from "@/providers/trip-provider";
import { toast } from "sonner";

export const SearchResults = ({ placeId }) => {
  const [filter, setFilter] = React.useState("hotel");
  const { data, isLoading, isError, error } = geoApify.places.useQuery({
    enabled: placeId.length > 0,
    variables: {
      placeId,
      category: filter,
    },
  });

  return (
    <div className=" py-16">
      <h2 className="font-bold text-4xl text-center text-[#eb5757]">
        Seach Results
      </h2>
      <Filter filter={filter} setFilter={setFilter} />
      <div className="max-w-4xl mx-auto flex flex-wrap gap-2">
        {data?.features.map((feature, i) => (
          <Card
            key={i}
            name={feature.properties.name}
            address={feature.properties.formatted}
            placeId={feature.properties.place_id}
            filter={filter}
          />
        ))}
      </div>
    </div>
  );
};

function Filter({ filter, setFilter }) {
  return (
    <div className="flex my-4 gap-4 max-w-2xl mx-auto">
      <Button variant="outline">
        <div className="flex gap-2 items-center">
          <span>Filter</span>
          <FilterIcon size={16} />
        </div>
      </Button>
      <div className="flex gap-2">
        {Object.keys(allCategories).map((category) => {
          const present = filter === category;
          return (
            <Tag
              active={present}
              onClick={() => {
                setFilter(category);
              }}
              key={category}
            >
              {categoriesDisplay[category]}
            </Tag>
          );
        })}
      </div>
    </div>
  );
}
function Tag({ active, children, onClick }) {
  return (
    <Button onClick={onClick} variant={active ? "default" : "ghost"}>
      {children}
    </Button>
  );
}

function Card({ name, address, placeId, filter }) {
  const { trip, setTrip } = useTrip();
  return (
    <motion.div
      layoutId={placeId}
      className="flex-[1_1_260px] rounded-md border"
    >
      <img
        src={`https://source.unsplash.com/random/?${filter}&${placeId}`}
        alt="Laptop"
        className="h-[200px] w-full rounded-md object-cover"
      />
      <div className="p-4">
        <h1 className="text-lg font-semibold">{name}</h1>
        <p className="mt-3 text-sm text-gray-600">{address}</p>
        <div className="flex gap-2 mt-4">
          <Button
            type="button"
            onClick={() => {
              toast.success("Added to trip");
              setTrip((t) => [
                ...t,
                {
                  name,
                  address,
                  placeId,
                  filter,
                },
              ]);
            }}
          >
            Add to Trip
          </Button>
          <Button type="button" variant="secondary" asChild>
            <Link to={`/detail/${placeId}?filter=${filter}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
