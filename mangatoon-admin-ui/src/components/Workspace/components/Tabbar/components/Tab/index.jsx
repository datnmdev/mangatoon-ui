function Tab({ id, favicon, name, active, onClick, onCloseClick }) {
    return (
        <div 
            className={
                "flex justify-between items-center max-w-[240px] pl-4 py-1 pr-1 rounded-[4px] cursor-pointer animate-fadeIn"
                + ` ${active ? 'border-2' : 'shadow-[2px_2px_2px]'}`
            }
            onClick={onClick}
        >
            <div className="flex items-center">
                <div className="text-[1.2rem]">
                    {favicon}
                </div>

                <div className="ml-2">
                    {name}
                </div>
            </div>

            <div className="ml-4">
                <button 
                    className="w-[24px] h-[24px] flex justify-center items-center rounded-[50%] hover:bg-[#E8EBED]"
                    onClick={onCloseClick}
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>
    )
}

export default Tab