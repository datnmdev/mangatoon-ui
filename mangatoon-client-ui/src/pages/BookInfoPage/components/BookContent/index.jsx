function BookContent({ content }) {
    return (
        <div>
            <div>
                <div className="text-[1.25rem] text-[#F08121] space-x-2">
                    <span>
                        <i className="fa-solid fa-circle-info"></i>
                    </span>

                    <span>Giới thiệu</span>
                </div>
            </div>

            <p 
                className="mt-2"
                dangerouslySetInnerHTML={{__html: content}} 
            />
        </div>
    )
}

export default BookContent