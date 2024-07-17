function HomePageLayout({ header, content, footer }) {
    return (
        <div 
            className="min-h-[100vh] flex flex-col"
            style={{
                background: "url('/imgs/bg.jpg') no-repeat center center/cover"
            }}
        >
            <div>
                {header}
            </div>

            <div className="grow flex">
                {content}
            </div>

            <div>
                {footer}
            </div>
        </div>
    )
}

export default HomePageLayout