function SidebarItem({ icon, name, onClick, active }) {
    return (
        <div
            className={
                "flex flex-col text-center items-center px-2 py-4 hover:bg-[#E8EBED] cursor-pointer rounded-[12px] max-w-[80px]"
                + ` ${active ? 'transition-[background-color] duration-[0.5s] bg-[#E8EBED]' : ''}`
            }
            onClick={onClick}
        >
            <div className="text-[1.2rem]">
                {icon}
            </div>

            <div className="text-[0.8rem] line-clamp-1">
                {name}
            </div>
        </div>
    )
}

export default SidebarItem