function CommonLayout({ header, content, footer }) {
    return (
        <div>
            <div className="relative z-10">
                {header}
            </div>

            <div className="relative z-0">
                {content}
            </div>

            <div>
                {footer}
            </div>
        </div>
    )
}

export default CommonLayout