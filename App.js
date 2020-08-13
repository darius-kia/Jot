import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-community/async-storage'

import LandingPage from './src/components/Landing/LandingPage'
import HomePage from './src/components/Home/HomePage'
import JournalPage from './src/components/Journal/JournalPage'
import SettingsPage from './src/components/Settings/SettingsPage'
import Entries from './src/components/Entries/Entries'
import LoginPage from './src/components/Landing/Login/LoginPage'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import COLORS from './src/utils/Colors'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function HomeTabs() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName

					if (route.name === 'Home') {
						iconName = focused ? 'home' : 'home-outline'
					} else if (route.name === 'Journal') {
						iconName = focused ? 'pencil' : 'pencil-outline'
					} else if (route.name === 'Entries') {
						iconName = focused ? 'bookmark' : 'bookmark-outline'
					}

					return <Icon name={iconName} size={size} color={color} />
				},
			})}
			tabBarOptions={{
				activeTintColor: COLORS.themed.primary,
				inactiveTintColor: COLORS.inactiveGray,
				keyboardHidesTabBar: true,
				showLabel: false,
				style: {
					height: 65,
				},
			}}
			backBehavior="initialRoute">
			<Tab.Screen name="Home" component={HomePage} />
			<Tab.Screen name="Journal" component={JournalPage} />
			<Tab.Screen name="Entries" component={Entries} />
		</Tab.Navigator>
	)
}

export default function App() {
	const [firstOpen, setFirstOpen] = useState(true)

	return firstOpen ? (
		<NavigationContainer>
			<Stack.Navigator headerMode="none">
				<Stack.Screen name="Landing" component={LandingPage} />
				<Stack.Screen
					name="Login"
					component={LoginPage}
					initialParams={{ displayArrow: true }}
				/>
				<Stack.Screen name="Home" component={HomeTabs} />
				<Stack.Screen name="Settings" component={SettingsPage} />
			</Stack.Navigator>
		</NavigationContainer>
	) : (
		<NavigationContainer>
			<Stack.Navigator headerMode="none">
				<Stack.Screen
					name="Login"
					component={LoginPage}
					initialParams={{ displayArrow: false }}
				/>
				<Stack.Screen name="Home" component={HomeTabs} />
				<Stack.Screen name="Settings" component={SettingsPage} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}
