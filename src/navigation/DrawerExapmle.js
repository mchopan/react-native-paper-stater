import { createDrawerNavigator } from '@react-navigation/drawer';
import Feed from '../screens/Feed';
import Article from '../screens/Article';

const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Feed" component={Feed} />
            <Drawer.Screen name="Article" component={Article} />
        </Drawer.Navigator>
    );
}

export default MyDrawer