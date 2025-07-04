"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Loader2, Globe as GlobeIcon, Plus, Minus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export interface TransformedLocation {
  lat: number;
  lng: number;
  name: string;
  country: string;
  date?: string;
  notes?: string;
}

export default function GlobePage() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const [visitedCountries, setVisitedCountries] = useState<Set<string>>(new Set());
  const [locations, setLocations] = useState<TransformedLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isRotating, setIsRotating] = useState(true);
  const [highlightedLocations, setHighlightedLocations] = useState<TransformedLocation[]>([]);

  // Fetch locations data
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("/api/trips");
        const data = await response.json();
        setLocations(data);
        
        const countries = new Set<string>(
          data.map((loc: TransformedLocation) => loc.country)
        );
        setVisitedCountries(countries);
      } catch (err) {
        console.error("Error fetching locations:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // Initialize globe controls
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = isRotating;
      globeRef.current.controls().autoRotateSpeed = 0.5;
      
      // Add click handler for countries
      globeRef.current.onCountryClick(country => {
        setSelectedCountry(country.properties.name);
        const countryLocations = locations.filter(
          loc => loc.country === country.properties.name
        );
        setHighlightedLocations(countryLocations);
      });
    }
  }, [isRotating, locations]);

  // Handle zoom changes
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView({ altitude: 3 / zoomLevel });
    }
  }, [zoomLevel]);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };

  const toggleRotation = () => {
    setIsRotating(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl font-bold">Your Travel Journey</h1>
            <div className="flex gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={toggleRotation}>
                    <GlobeIcon className={`h-4 w-4 ${isRotating ? 'text-blue-500' : ''}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isRotating ? 'Stop rotation' : 'Start rotation'}
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={handleZoomIn}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Zoom in</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={handleZoomOut}>
                    <Minus className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Zoom out</TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  {selectedCountry ? `Locations in ${selectedCountry}` : "See where you've been..."}
                </h2>

                <div className="h-[600px] w-full relative">
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                      <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                      <p className="text-gray-500">Loading your travel data...</p>
                    </div>
                  ) : (
                    <Globe
                      ref={globeRef}
                      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                      backgroundColor="rgba(0,0,0,0)"
                      pointColor={() => "#FF5733"}
                      pointLabel={(d: TransformedLocation) => `
                        <div class="p-2 bg-white rounded shadow-lg">
                          <strong>${d.name}</strong><br/>
                          ${d.country}<br/>
                          ${d.date ? `Visited: ${d.date}` : ''}
                        </div>
                      `}
                      pointsData={locations}
                      pointRadius={0.5}
                      pointAltitude={0.1}
                      pointsMerge={true}
                      width={800}
                      height={600}
                      onPointClick={(point) => {
                        setSelectedCountry(point.country);
                        setHighlightedLocations(locations.filter(loc => loc.country === point.country));
                      }}
                      hexPolygonsData={Array.from(visitedCountries).map(country => ({
                        properties: { name: country }
                      }))}
                      hexPolygonColor={() => 'rgba(100, 200, 255, 0.2)'}
                      hexPolygonLabel={(d: any) => d.properties.name}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 space-y-8">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-red-500" />
                    Countries Visited
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-800">
                        You've visited <span className="font-bold">{visitedCountries.size}</span> countries.
                      </p>
                    </div>

                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                      {Array.from(visitedCountries)
                        .sort()
                        .map((country, key) => (
                          <div
                            key={key}
                            className={`flex items-center gap-2 p-3 rounded-lg transition-colors border cursor-pointer ${
                              selectedCountry === country 
                                ? 'bg-blue-50 border-blue-200' 
                                : 'border-gray-100 hover:bg-gray-50'
                            }`}
                            onClick={() => {
                              setSelectedCountry(country);
                              setHighlightedLocations(locations.filter(loc => loc.country === country));
                              if (globeRef.current) {
                                const countryLoc = locations.find(loc => loc.country === country);
                                if (countryLoc) {
                                  globeRef.current.pointOfView({
                                    lat: countryLoc.lat,
                                    lng: countryLoc.lng,
                                    altitude: 1.5
                                  });
                                }
                              }
                            }}
                          >
                            <MapPin className="h-4 w-4 text-red-500" />
                            <span className="font-medium">{country}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {selectedCountry && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-green-500" />
                      {selectedCountry} Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        {highlightedLocations.length} location{highlightedLocations.length !== 1 ? 's' : ''} visited
                      </p>
                      <div className="max-h-[200px] overflow-y-auto space-y-3">
                        {highlightedLocations.map((location, index) => (
                          <div key={index} className="p-3 bg-gray-50 rounded-lg">
                            <h4 className="font-medium">{location.name}</h4>
                            {location.date && (
                              <p className="text-sm text-gray-500">Visited: {location.date}</p>
                            )}
                            {location.notes && (
                              <p className="text-sm mt-1 text-gray-600">{location.notes}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
