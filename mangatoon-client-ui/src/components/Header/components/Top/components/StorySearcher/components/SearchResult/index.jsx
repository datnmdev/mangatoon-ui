import { memo } from "react"
import SearchResultItem from "./components/SearchResultItem"

function SearchResult({
    data
}) {
    return (
        <div
            className="bg-white rounded-bl-[12px] rounded-br-[12px] space-y-2 p-2"
        >
            {data?.map(row => {
                return (
                    <SearchResultItem
                        key={row.id}
                        data={row}
                    />
                )
            })}
        </div>
    )
}

export default memo(SearchResult)