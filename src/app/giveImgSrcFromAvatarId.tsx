import badge_img from "../../public/badge.webp"
import badge3_img from "../../public/badge3.webp"
import badge32_img from "../../public/badge3.png"
import badge5_img from "../../public/badge5.png"

export function giveImgSrcFromAvatarId (avatar_id: number) {
    if (avatar_id == 0) {
        return badge_img;
    } else if (avatar_id == 2) {
        return badge5_img;
    } else {
        return badge3_img;
    }
}
