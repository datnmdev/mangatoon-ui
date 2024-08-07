import { urlOfStoryServiceGenerator } from "../../../../../../../../../../../../helpers/url"

function Previewer({
    chapterImageData
}) {
    return (
        <div>
            <img
                className="block w-full"
                src={urlOfStoryServiceGenerator(chapterImageData.path)}
                alt={`Ảnh ${chapterImageData.order}`}
            />
        </div>
    )
}

export default Previewer