import { urlOfStoryServiceGenerator } from "../../../../../../helpers/url"

function CoverImage({ data }) {
    return (
        <img
            className="w-[64px] h-[82px] object-cover object-center"
            src={urlOfStoryServiceGenerator(data.coverImageUrl)}
            alt={data.title}
        />
    )
}

export default CoverImage