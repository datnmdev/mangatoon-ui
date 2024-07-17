import { useNavigate } from "react-router-dom"
import BorderedButton from "../../components/BorderedButton"
import path from "../../routers/path"

function HomePage() {
    const navigate = useNavigate()

    return (
        <div className="relative grow">
            <div className="absolute left-[120px] top-1/4 animate-fadeIn">
                <h1 className="font-[900] text-[2.8rem] text-white max-w-[500px] [text-shadow:0_0_8px_black]">Chào mừng đến với trang dành cho quản trị viên</h1>
                
                <div className="mt-6">
                    <BorderedButton
                        onClick={() => navigate(path.storyManagementPage())}
                    >
                        Đi ngay!
                    </BorderedButton>
                </div>
            </div>

        </div>
    )
}

export default HomePage