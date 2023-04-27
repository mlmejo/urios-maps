//@ts-nocheck
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import Navbar from "@/Components/Navbar";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaWQtYmFsYWJhIiwiYSI6ImNrbGhkejZuZzVlY3AzMXBsdnVvZnZwcmwifQ.8UcxPw97_UxuaLNakAjbdA";

export default function Map({ auth }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom, setZoom] = useState(15.5);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/id-balaba/clg8y6wio006101o5ckmybywp",
      center: [125.542699, 8.939122],
      zoom: 15.5,
    });

    map.current.on("click", (e) => {
      const features = map.current.queryRenderedFeatures(e.point, {
        layers: ["markers"],
      });

      if (!features.length) return;

      const feature = features[0];

      const popup = new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML(
          `<h3>${feature.properties.Name}</h3>
          <p>${feature.properties.description}</p>`
        )
        .addTo(map.current);
    });
  });

  return (
    <Navbar user={auth.user}>
      <Head title="Map" />

      <div className="h-screen">
        <div ref={mapContainer} className="map-container rounded"></div>
      </div>
    </Navbar>
  );
}
