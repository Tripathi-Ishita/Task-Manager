import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { useNavigation } from "@react-navigation/native";


const SplashScreen = () => {
    const navigation = useNavigation<any>();
    return (
        //the gradient on top-right
        <LinearGradient
            colors={['#A9C9FF', '#FFFFFF', '#FFFFFF']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}>
            <Image
                source={require('../assets/images/todosplash.png')}
                style={styles.image}
                resizeMode="contain"
            />
            <View style={styles.textContainer}>
                <Text style={styles.title}>To-Do List</Text>

                <Text style={styles.description}>
                    Maecenas vehicula ligula mauris, sed efficitur tortor tincidunt vitae.
                    Suspendisse mattis viverra purus.
                </Text>
            </View>
            {/* the button */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};
export default SplashScreen;
//styles are placed downwards
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',//top middle and bottom,
        paddingVertical: 60,
        paddingHorizontal: 20
    },
    image: {
        width: '100%',
        height: 300,
        marginTop: 50
    },
    textContainer: {
        alignItems: 'center'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        paddingHorizontal: 20,
        lineHeight: 24
    },
    button: {
        backgroundColor: '#2F66F6',
        width: '100%',
        padding: 18,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600'
    }
});
