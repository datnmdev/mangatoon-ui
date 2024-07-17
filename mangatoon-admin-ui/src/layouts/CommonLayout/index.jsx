function CommonLayout({ header, content, footer }) {
    return (
        <div>
            <div>
                {header}
            </div>

            <div>
                {content}
            </div>

            <div>
                {footer}
            </div>
        </div>
    )
}

export default CommonLayout