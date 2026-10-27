import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { WEATHER_URL } from "../config";
const WeatherChip = () => {
    //4 states
    const [isLoading, setIsLoading] = useState(true);
    const [temperature, setTemperature] = useState<number | null>(null);
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setIsLoading(true);
                // Asks our own server (api/weather.ts), which adds the secret
                // OpenWeather key — so the key never ships inside the app.
                const response = await fetch(WEATHER_URL);
                if (!response.ok) {
                    throw new Error('Weather fetch failed');
                }
                const data = await response.json();

                setTemperature(data.main.temp);
                setDescription(data.weather[0].description);
            }
            catch (err) {
                setError("Could not Load");
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchWeather();
    }, []);

    //Renders'
    if (isLoading) {
        return <Text style={{ color: '#000000' }}>Loading...</Text>
    }
    if (error) {
        return <Text style={{ color: '#dc143c' }}>{error}</Text>
    }
    return (
        <View style={styles.weatherchip}>
            <Text style={styles.temp}>{temperature}</Text>
            <View style={{ borderLeftWidth: 1, borderLeftColor: '#D6E2F0', height: '100%' }} />
            <Text style={styles.desc}>{description}</Text>
        </View>)
};
export default WeatherChip;
const styles = StyleSheet.create({
    weatherchip: {
        flexDirection: 'row',
        alignContent: 'space-between',
        justifyContent: 'space-around',
        borderRadius: 15,
        marginVertical: 10,
        marginHorizontal: 7,
        padding: 10,
        borderWidth: 0.5,
        borderColor: '#BFD7F2',
        backgroundColor: '#F7F9FC'
    },
    temp: {
        color: '#1E5BB8',
        fontSize: 20,
    },
    desc: {

        color: '#2F5D8A',
        fontSize: 20,
    }
});