function CommonLayout({ header, content, footer }) {
    return (
        <div 
            className="flex flex-col min-h-[100vh]"
            style={{
                background: "url('/imgs/bg.jpg') no-repeat center center/cover"
            }}
        >
            <div>
                {header}
            </div>

            <div className="grow flex flex-col h-full">
                {content}
            </div>

            <div>
                {footer}
            </div>
        </div>
    )
}

export default CommonLayout