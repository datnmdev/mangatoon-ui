import { memo } from "react"
import TopItem from "../TopItem"

function TopList({
    data
}) {
    return (
        <div className="space-y-4">
            {data.map((story, index) => {
                let strokeColor = '#4a4747'
                switch (index + 1) {
                    case 1:
                        strokeColor = "#4a90e2"
                        break

                    case 2:
                        strokeColor = "#50e3c2"
                        break

                    case 3:
                        strokeColor = "#e35050"
                        break
                }

                return (
                    <TopItem
                        key={story.id}
                        number={index + 1}
                        data={story}
                        strokeColor={strokeColor}
                    />
                )
            })}
        </div>
    )
}

export default memo(TopList)