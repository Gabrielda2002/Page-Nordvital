import React, { useState } from 'react'
import { Map, MapControls, MapMarker, MarkerContent, MarkerPopup,  } from '../ui/map'
import { MapPin } from 'lucide-react';

interface MapExtProps {
    lng: number;
    lat: number;
}

const MapExt: React.FC<MapExtProps> = ({ lng, lat } ) => {

  return (
    <>
      <Map center={[-72.495104, 7.884075]} zoom={4}>
        <MapMarker
          draggable
          longitude={lng}
          latitude={lat}
        >
          <MarkerContent>
            <div className="cursor-move">
              <MapPin
                className="fill-black stroke-white dark:fill-white"
                size={28}
              />
            </div>
          </MarkerContent>
          <MarkerPopup>
            <div className="space-y-1">
              <p className="font-medium text-foreground">Coordinates</p>
              <p className="text-xs text-muted-foreground">
                {lat},{" "}
                {lng}
              </p>
            </div>
          </MarkerPopup>
        </MapMarker>
      </Map>
    </>
  )
}

export default MapExt
