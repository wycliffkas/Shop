import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, StyleSheet } from 'react-native';
  
const Startup = () => {
    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem("userData");
            if(!userData) {
                useLinkProps.navigation.navigate("Auth");
                return;
            }

            const transformedData = JSON.parse(userData);
            const {token, userId, expiryDate} = transformedData
            const expirationDate = new Date(expiryDate)

            if(expirationDate <= new Date() || !token || !userId) {
                props.navigation.navigate("Auth")
                return;
            }

            props.navigation.navigate("Shop")
        }
    }, [])

    return (
        <View style={styles.container}>
            <Text>Startup</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

 
export default Startup;