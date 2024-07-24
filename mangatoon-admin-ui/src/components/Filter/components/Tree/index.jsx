import { useState } from "react"
import Node from "../Node"
import { useEffect } from "react"
import { memo } from "react"

function Tree({
    data,
    onChange = (value) => {}
}) {
    const [value, setValue] = useState(null)

    useEffect(() => {
        if (onChange) {
            onChange(value)
        }
    }, [value])

    return (
        <div>
            {data.map((node, index) => {
                return (
                    <Node
                        key={index}
                        data={node}
                        onChange={data => setValue({
                            ...value,
                            [node.group]: data
                        })}
                    />
                )
            })}
        </div>
    )
}

export default memo(Tree)