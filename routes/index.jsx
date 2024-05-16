import { NavigationContainer, useRoute } from '@react-navigation/native';
import DrawerRoutes from './drawer.routes';

export default function Routes() {
    return (
        <NavigationContainer>
            <DrawerRoutes />
        </NavigationContainer>
    )
}