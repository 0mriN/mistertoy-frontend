import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function Marker() {
    return (
        <div>
            <p>🎌</p>
        </div>
    )
}

export default function Maps() {
    const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
    const [zoom, setZoom] = useState(8)

    function handleClick({ lat, lng }) {
        setCoordinates({ lat, lng })
    }

    const branches = [
        {
            city: 'Haifa',
            id: 101,
            position: {
                lat: 32.820789,
                lng: 34.963488,
            },
        },
        {
            city: 'Tel Aviv',
            id: 102,
            position: {
                lat: 32.071035,
                lng: 34.779118,
            },
        },
        {
            city: 'Jerusalem',
            id: 103,
            position: {
                lat: 31.773362,
                lng: 35.221193,
            },
        },
    ]

    return (
        <div>
            {branches.map(branch => {
                return (
                    <button
                        key={branch.city}
                        onClick={() => {
                            setCoordinates(branch.position)
                            setZoom(12)
                        }}
                    >
                        {branch.city}
                    </button>
                )
            })}
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyAgCW_rhK9MqAFNXK4c1P9x8kkQpj0o-2Q" }}
                    center={coordinates}
                    zoom={zoom}
                    onClick={handleClick}
                >
                    {branches.map(branch => {
                        return (
                            <Marker
                                lat={branch.position.lat}
                                lng={branch.position.lng}
                                key={branch.id}
                            />
                        )
                    })}
                </GoogleMapReact>
            </div>
        </div>
    )
}