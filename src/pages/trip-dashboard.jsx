import { useUser } from "@/providers/auth-provider";
import { useTrip } from "@/providers/trip-provider";
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const TripDashboard = () => {
  const user = useUser();
  const { trip } = useTrip();
  return (
    <div className="flex min-h-screen justify-center">
      <div className="w-full max-w-lg  py-6 px-4">
        <h2>Welcome, {user?.name}</h2>
        <h1 className="font-bold text-3xl mt-2">Trips Dashboard</h1>
        <ul>
          {trip.map((t) => (
            <li
              className="bg-gray-100 p-2 rounded-md mt-2 text-black"
              key={t.placeId}
            >
              <div className="flex justify-between gap-2">
                  <h3 className="text-lg font-semibold">{t.nameZX}</h3>
                <div className="bg-gray-700 text-white px-2 py-1 rounded-sm">{t.filter}</div>
              </div>
              <p className="mt-3 text-sm text-gray-600">{t.address}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <Button asChild>
            <Link to="/">Add new trip</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TripDashboard;
