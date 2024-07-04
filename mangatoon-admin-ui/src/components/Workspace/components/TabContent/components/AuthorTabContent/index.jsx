import { useState } from "react"
import SearchInput from "../../../../../SearchInput"
import { AddAuthorContext, AuthorListContext, UpdateAuthorContext } from "./contexts"
import IconButton from "../../../../../IconButton"
import AuthorList from "./components/AuthorList"
import AddAuthorIW from "./components/AddAuthorIW"
import UpdateAuthorIW from "./components/UpdateAuthorIW"

function AuthorTabContent() {
    const [openAddAuthorIW, setOpenAddAuthorIW] = useState({
        value: false,
        key: crypto.randomUUID()
    })
    const [openUpdateAuthorIW, setOpenUpdateAuthorIW] = useState({
        value: false,
        key: crypto.randomUUID()
    })
    const [refetch, setRefetch] = useState({
        value: 0
    })

    return (
        <>
            <div className="h-full flex flex-col">
                <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                        <IconButton 
                            icon={(<i className="fa-solid fa-plus"></i>)}
                            content="Thêm"
                            backgroundColor="#21C55D"
                            onClick={() => {
                                return setOpenAddAuthorIW({
                                    value: true,
                                    key: crypto.randomUUID()
                                })
                            }}
                        />

                        <IconButton 
                            content="Refresh"
                            onClick={() => {
                                setRefetch({
                                    value: 1
                                })
                            }}
                        />
                    </div>

                    <div>
                        <SearchInput 
                            placeholder="Tìm kiếm bằng id, tên tác giả..."
                        />
                    </div>
                </div>

                <div className="relative grow overflow-y-auto mt-4">
                    <AuthorListContext.Provider
                        value={{
                            setOpenUpdateAuthorIW
                        }}
                    >
                        <AuthorList
                            refetch={refetch}
                        />
                    </AuthorListContext.Provider>
                </div>
            </div>

            <div>
                <AddAuthorContext.Provider
                    value={{
                        setRefetchAuthors: setRefetch
                    }}
                >
                    <AddAuthorIW
                        key={openAddAuthorIW.key}
                        isOpenWindow={openAddAuthorIW.value}
                    />
                </AddAuthorContext.Provider>

                <UpdateAuthorContext.Provider value={{
                    authorId: openUpdateAuthorIW.authorId,
                    setOpenUpdateAuthorIW,
                    setRefetchAuthors: setRefetch
                }}>
                    <UpdateAuthorIW
                        key={openUpdateAuthorIW.key}
                        isOpenWindow={openUpdateAuthorIW.value}
                    />
                </UpdateAuthorContext.Provider>
            </div>
        </>

    )
}

export default AuthorTabContent