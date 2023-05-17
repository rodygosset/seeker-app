import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { TouchableOpacity } from "react-native"

import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";


import styles from "@styles/components/rating-star.scss"


interface Props {
    starNumber: number;
    currentRating?: number;
    onPress: () => void;
}

const RatingStar = (
    {
        starNumber,
        currentRating,
        onPress
    }: Props
) => {


    // render

    return (
        <TouchableOpacity onPress={onPress}>
            <FontAwesomeIcon 
                icon={currentRating && currentRating >= starNumber ? faStarSolid : faStarRegular}
                style={styles.star} 
            />
            
        </TouchableOpacity>
    )

}

export default RatingStar