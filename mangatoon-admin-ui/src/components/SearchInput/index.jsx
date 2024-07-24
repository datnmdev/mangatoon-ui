function SearchInput({
    placeholder = 'Tìm kiếm bằng id, tên thể loại...',
    onChange,
    onSubmit
}) {
    return (
        <div className="min-w-[360px] relative">
            <input
                className="px-4 py-2 border-[2px] rounded-[16px] pr-[48px] focus:outline-[#000] w-full"
                type="text"
                placeholder={placeholder}
                onChange={onChange}
            />

            <button className="absolute top-0 right-0 w-[48px] h-full text-[1.2rem]">
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </div>
    )
}

export default SearchInput