import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import ExpenseDetailsScreen from '../screens/ExpenseDetailsScreen';
import IncomeDetailsScreen from '../screens/IncomeDetailsScreen';
import SummaryScreen from '../screens/SummaryScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">

        <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Expenses" component={ExpenseDetailsScreen} />
          <Stack.Screen name="Income" component={IncomeDetailsScreen} />
          <Stack.Screen name="Summary" component={SummaryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default RootNavigator;