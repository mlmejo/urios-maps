import Navbar from "@/Components/Navbar";
import { PageProps } from "@/types";
import { Box } from "@chakra-ui/react";
import { Head } from "@inertiajs/react";
import mapboxgl from "mapbox-gl";
import { LegacyRef, useEffect, useRef, useState } from "react";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaWQtYmFsYWJhIiwiYSI6ImNrbGhkejZuZzVlY3AzMXBsdnVvZnZwcmwifQ.8UcxPw97_UxuaLNakAjbdA";

export default function Map({ auth }: PageProps) {
  const mapContainer = useRef<HTMLElement>();
  const map = useRef<mapboxgl.Map>();
  const [zoom, setZoom] = useState(15.5);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style: "mapbox://styles/id-balaba/clg8y6wio006101o5ckmybywp",
      center: [125.542699, 8.939122],
      zoom: 15.5,
    });

    map.current.on("click", (e) => {
      const features = map.current?.queryRenderedFeatures(e.point, {
        layers: ["markers"],
      });

      if (!features?.length) return;

      interface Point {
        type: "Point";
        coordinates: [number, number];
      }
      const feature = features[0];
      const geometry = feature.geometry as Point;

      const popup = new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(geometry?.coordinates)
        .setHTML(
          `<h3>${feature.properties?.Name}</h3>
          <p>${feature.properties?.description}</p>`
        )
        .addTo(map.current as mapboxgl.Map);
    });
  });

  return (
    <Navbar user={auth.user}>
      <Head title="Map" />

      <div className="h-screen">
        <div
          ref={mapContainer as LegacyRef<HTMLDivElement>}
          className="map-container h-5/6"
        ></div>
      </div>
    </Navbar>
  );
}
