import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import styles from "@styles/components/like-button.scss"
import { TouchableOpacity } from "react-native"


interface Props {
    onToggleLike: () => void;
    liked: boolean;
}

const LikeButton = (
    {
        onToggleLike, 
        liked
    }: Props
) => {

    // render

    return (
        <TouchableOpacity
            style={styles.likeButton}
            onPress={onToggleLike}>
            <FontAwesomeIcon icon={ liked ? faHeartSolid : faHeartRegular} size={24} style={styles.likeIcon}/>
        </TouchableOpacity>
    )

}

export default LikeButton