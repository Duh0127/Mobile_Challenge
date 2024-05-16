import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Feather } from "@expo/vector-icons";

import Home from "../pages/Home";
import Login from "../pages/auth/login";

const { Navigator, Screen } = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: () => (
                        <Feather name="home" size={24} />
                    ),
                    tabBarLabel: "INÍCIO"
                }}
            />
            <Screen
                name="Login"
                component={Login}
            />
        </Navigator>
    )
}