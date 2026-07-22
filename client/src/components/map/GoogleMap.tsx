"use client";

import {
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

interface Props {
  latitude: number;
  longitude: number;
  name: string;
}

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "16px",
};

export default function GoogleMapComponent({
  latitude,
  longitude,
  name,
}: Props) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const center = {
    lat: latitude,
    lng: longitude,
  };

  if (!isLoaded) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-xl bg-gray-100">
        Loading Map...
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={16}
    >
      <Marker
        position={center}
        title={name}
      />
    </GoogleMap>
  );
}