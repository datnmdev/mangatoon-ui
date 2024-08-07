import { urlOfStoryServiceGenerator } from "../../../../../../helpers/url"

function Image({
    chapterImage,
    alt
}) {
    return (
        <div>
            <img
                src={urlOfStoryServiceGenerator(chapterImage.path)}
                alt={alt}
            />
        </div>
    )
}

export default Image