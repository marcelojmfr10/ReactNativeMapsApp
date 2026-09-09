import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        // showsPointsOfInterest={false}
        // provider="google"
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 45.41256,
          longitude: -75.698931,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
      >
        <Marker
          coordinate={{
            latitude: 45.41256,
            longitude: -75.698931,
          }}
          title="Aquí estoy"
          description="Esta es mi casa"
        />

        <Marker
          coordinate={{
            latitude: 45.434005,
            longitude: -75.677708,
          }}
          title="Un parque"
          description="Esta es mi casa"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapScreen;
