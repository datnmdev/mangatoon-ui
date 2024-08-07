import { urlOfStoryServiceGenerator } from "../../../../../../../../../../../../helpers/url"

function Item({
    chapterImageData
}) {
    return (
        <div>
            <div>
                <img
                    className="w-[64px] h-[64px] object-cover object-center"
                    src={urlOfStoryServiceGenerator(chapterImageData.path)}
                    alt={`Ảnh ${chapterImageData.order}`}
                />
            </div>

            <div className="text-center">{chapterImageData.order}</div>
        </div>
    )
}

export default Item