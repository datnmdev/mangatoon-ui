function Window({
    title,
    onCloseClicked,
    children
}) {
    return (
        <div className="overflow-hidden min-w-[420px] bg-white rounded-[12px] shadow-[0_0_8px_#E8EBED] flex flex-col justify-between">
            <div className="py-4 px-6 flex justify-between items-center bg-[rgba(232,235,237,0.2)]">
                <div>
                    <div className="text-[1.2rem] font-[600]">{title}</div>
                </div>

                <div>
                    <button
                        className="text-[1.4rem] hover:opacity-60"
                        onClick={onCloseClicked}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>

            <div className="grow">
                {children}
            </div>
        </div>
    )
}

export default Window