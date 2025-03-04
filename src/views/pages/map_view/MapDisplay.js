import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import leaflet from "leaflet";
import useLocalStorage from "hooks/useLocalStorage";
import useGeoLocation from "hooks/useGeoLocation";
import markerIconPng from "assets/leaflet/marker-icon.png";
import markerShadowPnd from "assets/leaflet/marker-shadow.png";
import PopupSinglePost from "./PopupSinglePost";

export default function MapDisplay(props) {
    const mapRef = useRef(null); // Initialize mapRef with null
    const userMarkerRef = useRef(null);
    const nearbyMarkersRef = useRef([]); // Ref to store nearby markers

    // Define the marker icon with proper anchor points
    const myIcon = leaflet.icon({
        iconUrl: markerIconPng,
        shadowUrl: markerShadowPnd,
        iconSize: [25, 41], // Default size for Leaflet marker
        iconAnchor: [12, 41], // Anchor point of the icon
        popupAnchor: [1, -34], // Anchor point for the popup
        shadowSize: [41, 41], // Size of the shadow
    });

    const [userPosition, setUserPosition] = useLocalStorage("USER_MARKER", {
        latitude: 0,
        longitude: 0,
    });

    const location = useGeoLocation();

    // Initialize the map
    useEffect(() => {
        // Ensure the map container exists
        if (!mapRef.current) {
            mapRef.current = leaflet.map("map").setView([userPosition.latitude, userPosition.longitude], 13);

            leaflet
                .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    maxZoom: 19,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                })
                .addTo(mapRef.current);
        }

        // Cleanup on unmount
        return () => {
            if (mapRef.current) {
                mapRef.current.remove(); // Remove the map instance if it exists
                mapRef.current = null; // Reset mapRef to null
            }
        };
    }, []);

    // Update user marker and map view when location changes
    useEffect(() => {
        if (!location.latitude || !location.longitude || !mapRef.current) return;

        console.log("Updating User Marker Position:", [location.latitude, location.longitude]);

        // Remove existing user marker if it exists
        if (userMarkerRef.current) {
            mapRef.current.removeLayer(userMarkerRef.current);
        }

        // Add new user marker
        userMarkerRef.current = leaflet
            .marker([location.latitude, location.longitude], { icon: myIcon })
            .addTo(mapRef.current)
            .bindPopup("User");

        // Style the user marker
        const el = userMarkerRef.current.getElement();
        if (el) {
            el.style.filter = "hue-rotate(120deg)";
        }

        // Update map view to the new location
        mapRef.current.flyTo([location.latitude, location.longitude]);
    }, [location]);

    // Update nearby markers when posts change
    useEffect(() => {
        if (!props.posts || !mapRef.current) return;

        console.log("Updating Nearby Markers:", props.posts);

        // Remove existing nearby markers
        nearbyMarkersRef.current.forEach((marker) => {
            mapRef.current.removeLayer(marker);
        });
        nearbyMarkersRef.current = [];

        // Add new nearby markers
        props.posts.forEach((record, index) => {
            const popupContainer = document.createElement("div"); // Create a container for the popup content
            const root = createRoot(popupContainer); // Create a root for the container
            root.render(<PopupSinglePost key={index} post={record} />); // Render the React component into the container

            const marker = leaflet
                .marker([parseFloat(record?.latitude), parseFloat(record?.longitude)], { icon: myIcon })
                .addTo(mapRef.current)
                .bindPopup(popupContainer); // Pass the container to Leaflet's bindPopup

            nearbyMarkersRef.current.push(marker); // Store the marker in the ref
        });
    }, [props.posts]);

    return <div id="map" style={{ height: "500px", width: "100%" }}></div>;
}