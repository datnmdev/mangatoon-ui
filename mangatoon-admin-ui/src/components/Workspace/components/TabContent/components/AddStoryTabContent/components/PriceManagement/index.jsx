import IconButton from "../../../../../../../IconButton"
import PriceList from "./components/PriceList"

function PriceManagement() {
    return (
        <div>
            <div className="flex justify-between items-center">
                <div>
                    <div className="text-[1.4rem] font-[600]">Lịch sử giá</div>
                </div>

                <div className="flex space-x-2">
                    <IconButton
                        content="Refresh"
                        onClick={() => aliasManagementContext.setRefetchAliasList({ value: 1 })}
                    />

                    <IconButton
                        icon={(<i className="fa-solid fa-plus"></i>)}
                        content="Thêm"
                        backgroundColor="rgb(33, 197, 93)"
                    />
                </div>
            </div>

            <div className="mt-6">
                <PriceList />
            </div>
        </div>
    )
}

export default PriceManagement