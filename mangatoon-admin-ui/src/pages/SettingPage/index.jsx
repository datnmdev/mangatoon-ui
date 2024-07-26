import { useState } from "react"
import AccountManagementTabContent from "./components/AccountManagementTabContent"
import Tabbar from "./components/Tabbar"
import { ACCOUNT_MANAGEMENT_TAB, RESET_PASSWORD_TAB } from "./components/Tabbar/constants"
import ResetPasswordTabContent from "./components/ResetPasswordTabContent"

function SettingPage() {
    const [activeTab, setActiveTab] = useState(ACCOUNT_MANAGEMENT_TAB)

    return (
        <div>
            <div className="bg-white flex justify-between p-8 space-x-8">
                <div className="min-w-[290px]">
                    <Tabbar
                        value={activeTab}
                        onChange={tab => setActiveTab(tab)}
                    />
                </div>

                <div className="grow min-h-[100vh]">
                    {activeTab === ACCOUNT_MANAGEMENT_TAB
                        && (
                            <AccountManagementTabContent />
                        )}

                    {activeTab === RESET_PASSWORD_TAB
                        && (
                            <ResetPasswordTabContent />
                        )}
                </div>
            </div>
        </div>
    )
}

export default SettingPage