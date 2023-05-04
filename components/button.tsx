import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Pressable, StyleProp, Text, View } from "react-native"


import styles from "@styles/components/button.scss"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

interface Props {
    title: string;
    icon?: IconProp;
    fullWidth?: boolean; 
    role?: "primary" | "secondary";
    onPress: () => void;
}

const Button = (
    {
        title,
        icon,
        fullWidth,
        role = "primary",
        onPress
    }: Props
) => {

    // utils
    
    const getStyles = () => {
        let s = styles.button
        if(fullWidth) s = { ...s, ...styles.fullWidth }
        if(role == "primary") s = { ...s, ...styles.primary }
        if(role == "secondary") s = { ...s, ...styles.secondary }
        return s
    }

    const getComponentStyles = (component: string) => {
        let s = styles[component]
        if(role == "primary") s = { ...s, ...styles[`${component}Primary`] }
        if(role == "secondary") s = { ...s, ...styles[`${component}Secondary`] }
        return s
    }


    // render

    return (
        <Pressable
            style={getStyles()}
            onPress={onPress}>
            {
                icon ?
                <FontAwesomeIcon icon={icon} style={getComponentStyles("icon")} />
                :
                <></>
            }
            <Text style={getComponentStyles("title")}>{title}</Text>
        </Pressable>
    )
}

export default Button