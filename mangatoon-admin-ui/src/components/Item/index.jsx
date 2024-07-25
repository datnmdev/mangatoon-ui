import RoundButton from "../RoundButton"

function Item({
    content,
    onRemoveClicked
}) {
    return (
        <div className="flex justify-between items-center bg-black text-white px-3 py-1.5 rounded-[8px]">
            <div>
                <div>{content}</div>
            </div>

            <div className="ml-4">
                <RoundButton 
                    icon={(<i className="fa-solid fa-xmark"></i>)}
                    color="white"
                    onMouseEnter={(e, setStyle) => setStyle({
                        color: 'black'
                    })}
                    onMouseLeave={(e, setStyle) => setStyle({
                        color: 'white'
                    })}
                    onClick={onRemoveClicked}
                />
            </div>
        </div>
    )
}

export default Item