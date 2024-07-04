import { useDispatch } from "react-redux"
import { workspaceActions } from "../../features/workspace/workspaceSlice"
import { DASHBOARD } from "../Workspace/components/Tabbar/constants"

function EmptyWorkspace() {
    const dispatch = useDispatch()

    return (
        <div className="h-full flex justify-center items-center">
            <div>
                <div className="flex flex-col items-center text-[rgba(181,182,183,0.6)]">
                    <div className="text-[6rem]">
                        <i className="fa-solid fa-rocket"></i>
                    </div>

                    <div className="text-[1.4rem]">
                        Không gian làm việc trống
                    </div>
                </div>

                <div className="flex justify-center items-center mt-4">
                    <button 
                        className="bg-red-500 px-6 py-4 rounded-[8px] text-white font-[600]"
                        onClick={() => {
                            return dispatch(workspaceActions.addTab({
                                name: 'Dashboard',
                                type: DASHBOARD
                            }))
                        }}
                    >
                        Đi tới Dashboard
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EmptyWorkspace