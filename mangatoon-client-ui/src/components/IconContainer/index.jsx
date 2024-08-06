import { memo, useEffect, useState } from "react"

function IconContainer({
    data = [],
    size = '1.2rem',
    onChange = data => {}
}) {
    const [selected, setSelected] = useState(data?.[0])
    const [clickedItem, setClickedItem] = useState({
        value: undefined
    })
    const [createdImage, setCreatedImage] = useState(undefined) 

    async function createImageElementFromUrl(imageUrl) {

        try {
            const response = await fetch(imageUrl)
            const blob = await response.blob()
            const reader = new FileReader()
            reader.onloadend = function () {
                const imgElement = document.createElement('img')
                imgElement.style.display = 'inline-block'
                imgElement.style.width = size
                imgElement.src = reader.result
                setCreatedImage(imgElement)
            }
            reader.readAsDataURL(blob)
        } catch (error) {
            console.error('Error creating img tag:', error)
        }
    }

    useEffect(() => {
        if (clickedItem.value !== undefined) {
            createImageElementFromUrl(clickedItem.value)
        }
    }, [clickedItem])

    useEffect(() => {
        if (createdImage !== undefined) {
            if (onChange) {
                onChange(createdImage)
            }
        }
    }, [createdImage])

    return (
        <div className="relative bg-white w-[380px] h-[280px] rounded-tl-[6px] rounded-tr-[6px] rounded-br-[6px] shadow-[0_0_8px_#ccc]">
            <span className="sm:hidden md:block absolute top-full left-0 border-[8px] border-solid border-white rounded-bl-[6px] border-r-transparent border-b-transparent z-[1]"></span>
            <div className="w-full h-full px-2 py-4 flex flex-col justify-between">
                <div className="grow mb-2 bg-[rgba(239,242,245,0.4)] overflow-hidden flex flex-col">
                    {selected
                    ? (
                        <div className="h-full overflow-hidden flex flex-col">
                            <div className="text-[0.85rem] font-[450] text-[#6C6F73]">{selected.title}</div>
                            <div className="grow grid grid-cols-10 overflow-auto">
                                {selected.data.map((url, index) => {
                                    return (
                                        <img
                                            key={index}
                                            onClick={() => setClickedItem({
                                                value: url
                                            })}
                                            className="w-8 h-8 object-cover object-center ml-1 mt-1 cursor-pointer select-none"
                                            src={url} 
                                            alt="Icon" 
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    )
                : null}
                </div>

                <div className="flex items-center">
                    {data.map((item, index) => {
                        return (
                            <span
                                key={index}
                                style={{
                                    backgroundColor: selected?.title === item.title ? '#EF8122' : 'white'
                                }}
                                className="p-1.5 hover:bg-[#EF8122] select-none cursor-pointer rounded-[50%]"
                                onClick={() => setSelected(item)}
                            >
                                <img
                                    className="w-6 h-6 object-cover object-center"
                                    src={item.icon}
                                    alt="Icon"
                                />
                            </span>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default memo(IconContainer)