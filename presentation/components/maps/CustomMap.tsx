import { LatLng } from "@/infrastructure/interfaces/lat-lng";
import { useLocationStore } from "@/presentation/store/useLocationStore";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import MapView, { Polyline } from "react-native-maps";
import FAB from "../shared/FAB";

interface Props extends ViewProps {
  initialLocation: LatLng;
  showUserLocation?: boolean;
}

const CustomMap = ({
  initialLocation,
  showUserLocation = true,
  ...rest
}: Props) => {
  const [isFollowingUser, setIsFollowingUser] = useState(true);
  const [isShowingPolyline, setIsShowingPolyline] = useState(true);
  const mapRef = useRef<MapView>(null);

  const {
    watchLocation,
    clearWatchLocation,
    lastKnownLocation,
    getLocation,
    userLocationList,
  } = useLocationStore();

  useEffect(() => {
    watchLocation();
    return () => {
      clearWatchLocation();
    };
  }, []);

  useEffect(() => {
    if (lastKnownLocation && isFollowingUser) {
      moveCameraToLocation(lastKnownLocation);
    }
  }, [lastKnownLocation, isFollowingUser]);

  const moveCameraToLocation = (latLng: LatLng) => {
    if (!mapRef.current) return;

    mapRef.current.animateCamera({
      center: latLng,
      zoom: 18, // google maps android
      altitude: 2000, // apple maps ios
    });
  };

  const moveToCurrentLocation = async () => {
    if (!lastKnownLocation) {
      moveCameraToLocation(initialLocation);
    } else {
      moveCameraToLocation(lastKnownLocation);
    }

    const location = await getLocation();
    if (!location) return;

    moveCameraToLocation(location);
  };

  return (
    <View {...rest}>
      <MapView
        ref={mapRef}
        // showsPointsOfInterest={false}
        // provider="google"
        // provider={PROVIDER_GOOGLE}
        onTouchStart={() => setIsFollowingUser(false)}
        initialRegion={{
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
        showsUserLocation={showUserLocation}
      >
        {isShowingPolyline && (
          <Polyline
            strokeColor={"red"}
            strokeWidth={5}
            coordinates={userLocationList}
          />
        )}
      </MapView>

      <FAB
        iconName="compass-outline"
        style={{
          bottom: 20,
          right: 20,
        }}
        onPress={moveToCurrentLocation}
      />

      <FAB
        iconName={isFollowingUser ? "walk-outline" : "accessibility-outline"}
        style={{
          bottom: 80,
          right: 20,
        }}
        onPress={() => setIsFollowingUser(!isFollowingUser)}
      />

      <FAB
        iconName={isShowingPolyline ? "eye-outline" : "eye-off-outline"}
        style={{
          bottom: 140,
          right: 20,
        }}
        onPress={() => setIsShowingPolyline(!isShowingPolyline)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});

export default CustomMap;
