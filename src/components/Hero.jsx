import React from "react";
import { Search, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { geoApify } from "../api";
import { useSearchParams } from "react-router-dom";

function useDoubounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export function Hero({ setPlaceId }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const debouncedValue = useDoubounce(value, 500);
  const { data, isLoading, isError, error } = geoApify.autoComplete.useQuery({
    enabled: debouncedValue.length > 0,
    variables: {
      query: debouncedValue,
    },
  });

  console.log({ data, isLoading, isError, error });
  return (
    <div className="relative isolate z-0 border-b-2 dark:border-slate-700 border-slate-300 px-6 pt-14 lg:px-8 min-h-[calc(80vh_-_64px)]">
      <div className="relative mx-auto max-w-3xl py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[#eb5757] sm:text-6xl">
            Embark on an Unforgettable Journey with Us
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Experience the joy of discovery with our diverse range of
            accommodations. Find your perfect home away from home, right here.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-2">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  aria-label="Search"
                  className="flex items-center justify-center bg-gray-300 border border-gray-700 h-12 w-12 rounded-full text-sm font-semibold text-gray-700 shadow-md hover:bg-gray-300/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
                >
                  <Search size={24} />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[90vh] max-w-lg p-0">
                <Command shouldFilter={false}>
                  <CommandInput
                    placeholder="Search framework..."
                    className="h-9"
                    value={value}
                    onValueChange={setValue}
                  />
                  <CommandEmpty>{"No place found."}</CommandEmpty>
                  <CommandGroup className="max-h-[200px] overflow-y-scroll">
                    {data?.features.map((feature) => (
                      <CommandItem
                        key={feature.properties.place_id}
                        value={feature.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                          setPlaceId(feature.properties.place_id);
                        }}
                      >
                        {feature.properties.formatted}
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            value === feature.properties.formatted
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}
