import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { TouchableOpacity, Text } from "react-native";

import styles from "@styles/components/floating-button.scss"

interface Props {
    onPress: () => void;
}

const FloatingButton = (
    { onPress }: Props
) => {

    // render

    return (
        <TouchableOpacity
            style={styles.floatingButton}
            onPress={onPress}
        >
            <FontAwesomeIcon 
                icon={faHeart} 
                style={styles.icon}
            />
            <Text style={styles.text}>Got to Liked Songs</Text>
        </TouchableOpacity>
    )
}

export default FloatingButton