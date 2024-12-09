import React, { useEffect } from 'react';
import { useMap } from '@vis.gl/react-google-maps';

const Circle = ({ center, radius, strokeColor, strokeOpacity, strokeWeight, fillColor, fillOpacity }) => {
  const map = useMap();
  const circleRef = React.useRef(null);

  useEffect(() => {
    if (!map) return;

    if (circleRef.current) {
      circleRef.current.setMap(null);
    }

    circleRef.current = new window.google.maps.Circle({
      center,
      radius,
      strokeColor,
      strokeOpacity,
      strokeWeight,
      fillColor,
      fillOpacity,
      map
    });

    return () => {
      if (circleRef.current) {
        circleRef.current.setMap(null);
      }
    };
  }, [map, center, radius, strokeColor, strokeOpacity, strokeWeight, fillColor, fillOpacity]);

  return null;
};

export default Circle;
