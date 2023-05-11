import React, {useContext} from "react";
import { View, Text, Switch} from "react-native";
import ThemeContext from "../context/context";
import AppTheme from "./api/rick-and-morty/themes";

const ThemeToogler = () => {
    const[themeMode, setThemeMode] = useContext(ThemeContext);

    return(
        <View style={AppTheme[themeMode+'Container']}>
            <Text style={[{fontSize:20}]}>
                {themeMode === 'light' ? "🌑" : "☀️"} 
            </Text>
            <Switch
             style={{transform: [{saleX:1.5}, {scaleY: 1.5}]}}
             value={themeMode === 'light' ? false  : true}
             onValueChange={() => setThemeMode(themeMode === "light" ? "dark" : "light")}
            />
        </View>
    );
}

export default ThemeToogler;