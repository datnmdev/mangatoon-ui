import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"

function ManagePageLayout({ children }) {
    return (
        <div className="h-[100vh] flex flex-col ">
            <div className="bg-[#e8ebed66]">
                <div className="container mx-auto py-4">
                    <Header />
                </div>
            </div>

            <div className="grow container mx-auto flex justify-between overflow-hidden py-4">
                <div>
                    <Sidebar />
                </div>

                <div className="grow overflow-hidden mx-6">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ManagePageLayout