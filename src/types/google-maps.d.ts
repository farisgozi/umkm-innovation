declare global {
  interface Window {
    google: typeof google;
  }

  namespace google.maps {
    interface MapOptions {
      center?: LatLng | LatLngLiteral;
      zoom?: number;
      minZoom?: number;
      maxZoom?: number;
      mapTypeId?: MapTypeId | string;
      mapTypeControl?: boolean;
      mapTypeControlOptions?: MapTypeControlOptions;
      streetViewControl?: boolean;
      streetViewControlOptions?: StreetViewControlOptions;
      zoomControl?: boolean;
      zoomControlOptions?: ZoomControlOptions;
      panControl?: boolean;
      panControlOptions?: PanControlOptions;
      rotateControl?: boolean;
      rotateControlOptions?: RotateControlOptions;
      scaleControl?: boolean;
      scaleControlOptions?: ScaleControlOptions;
      fullscreenControl?: boolean;
      fullscreenControlOptions?: FullscreenControlOptions;
      keyboardShortcuts?: boolean;
      backgroundColor?: string;
      draggable?: boolean;
      draggableCursor?: string;
      draggingCursor?: string;
      scrollwheel?: boolean;
      styles?: MapTypeStyle[];
      disableDoubleClickZoom?: boolean;
      disableDefaultUI?: boolean;
      clickableIcons?: boolean;
    }
  }
}

export {};
