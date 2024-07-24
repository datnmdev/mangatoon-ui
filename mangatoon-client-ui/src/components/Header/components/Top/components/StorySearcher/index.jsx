import { useEffect, useState } from "react"
import Search from "../../../../../Search"
import useStorySearch from "./hooks/useStorySearch"
import { PENDING } from "../../../../../../constants/fetchStatus.constant"
import SearchResult from "./components/SearchResult"

function StorySearcher() {
    const [hidden, setHidden] = useState(false)
    const [text, setText] = useState('')
    const { data, status, setSubmit } = useStorySearch({
        keyword: text === '' ? ' ' : text,
        page: 1,
        limit: 20
    })

    useEffect(() => {
        if (status !== PENDING) {
            setSubmit(true)
        }
    }, [text])

    return (
        <div className="relative">
            <Search
                placeholder='Bạn muốn tìm truyện gì?'
                onFocus={() => setHidden(false)}
                onBlur={() => setHidden(true)}
                onChange={(e) => setText(e.target.value)}
            />

            {data?.data?.rows?.length > 0 && !hidden
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