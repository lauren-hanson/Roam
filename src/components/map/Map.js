
import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Icon } from 'leaflet';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import { useLeafletContext } from '@react-leaflet/core'
// import {LatLng, toLatLng} from './components/geo/LatLng';


export function Map({token}) {

    const center = [36.1627, -86.7816]

    const customIcon = new Icon({
        iconUrl: 'https://www.pngall.com/wp-content/uploads/2017/05/Map-Marker-Free-Download-PNG.png',
        iconSize: [20, 20],
        // iconAnchor: [1, 1],
        // popupAnchor: [-0, -76]
    })

    const polyline = [
        [36.1627, -86.7816],
        [31.892008, -104.820476],
        [33.833378, -111.417358],
        [34.871002, -111.760826],
        [38.55056, -107.68667],
        [36.372852, -94.208817],
        [36.1627, -86.7816]

    ]

    const greenOption = { color: 'darkgreen' }

    // var geojsonFeature = {
    //     "type": "Feature",
    //     "properties": {
    //         "name": "Coors Field",
    //         "amenity": "Baseball Stadium",
    //         "popupContent": "This is where the Rockies play!"
    //     },
    //     "geometry": {
    //         "type": "Point",
    //         "coordinates": [-104.99404, 39.75621]
    //     }
    // };

    return (
        <section className='map-component' >

            <div id='map'>
                <MapContainer center={[36.1627, -86.7816]} zoom={4} style={{ height: "500px" }} scrollWheelZoom={true} >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" 
                    /> 
                    <Marker position={center} icon={customIcon}>
                        <Popup>
                            Home, Sweet Home
                        </Popup>
                    </Marker>
                    <Marker position={[31.892008, -104.820476]} icon={customIcon}>
                        <Popup>This is a popup.</Popup>
                    </Marker >
                    <Marker position={[33.833378, -111.417358]} icon={customIcon}>
                        <Popup>Tonto</Popup>
                    </Marker >
                    <Marker position={[34.871002, -111.760826]} icon={customIcon}>
                        <Popup>Sedona.</Popup>
                    </Marker >
                    <Marker position={[38.55056, -107.68667]} icon={customIcon}>
                        <Popup>Black Canyon.</Popup>
                    </Marker >
                    <Marker position={[36.372852, -94.208817]} icon={customIcon}>
                        <Popup>Bentonville, Arkansas.</Popup>
                    </Marker >

                    <Polyline pathOptions={greenOption} positions={polyline} />

                </MapContainer>

            </div>
        </section>
    )
}