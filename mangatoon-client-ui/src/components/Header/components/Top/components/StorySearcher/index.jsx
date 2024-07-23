import { useEffect, useState } from "react"
import Search from "../../../../../Search"
import useStorySearch from "./hooks/useStorySearch"
import { PENDING } from "../../../../../../constants/fetchStatus.constant"
import SearchResult from "./components/SearchResult"

function StorySearcher() {
    const [text, setText] = useState('')
    const { data, status, setSubmit } = useStorySearch(text)

    useEffect(() => {
        if (status !== PENDING) {
            setSubmit(true)
        }
    }, [text])

    return (
        <div className="relative">
            <Search
                placeholder='Bạn muốn tìm truyện gì?'
                onChange={(e) => setText(e.target.value)}
            />

            {data?.data?.rows?.length > 0
                && (
                    <div
                        className="absolute top-[calc(100%+4px)] left-0 w-full z-[1] max-h-[480px] overflow-y-auto border-[2px]"
                    >
                        <SearchResult
                            data={data.data.rows}
                        />
                    </div>
                )}
        </div>
    )
}

export default StorySearcher