import { FC } from "react";
import {
	LazyLoadImage,
} from "react-lazy-load-image-component";
import "style-loader!css-loader!react-lazy-load-image-component/src/effects/blur.css";
import "style-loader!css-loader!react-lazy-load-image-component/src/effects/black-and-white.css";
import "style-loader!css-loader!react-lazy-load-image-component/src/effects/opacity.css";

const LazyLoadImg: FC<{
	picture: string;
    wrapperCls: string,
    clsName: string
}> = ({ picture, wrapperCls, clsName }) => (
	<LazyLoadImage
        alt={picture}
        className={`gallery-img ${clsName}`}
        effect="blur"
        key={picture}
        placeholderSrc={picture}
        src={picture}
        threshold={100}
        wrapperClassName={`gallery-img-wrapper ${wrapperCls}`}
	/>
);
export default LazyLoadImg;
