import { useState } from "react"
import SearchInput from "../../../../../SearchInput"
import AddGenreIW from "./components/AddGenreIW"
import GenreList from "./components/GenreList"
import { AddGenreContext, GenreListContext, UpdateGenreContext } from "./contexts"
import UpdateGenreIW from "./components/UpdateGenreIW"
import IconButton from "../../../../../IconButton"

function GenreTabContent() {
    const [openAddGenreIW, setOpenAddGenreIW] = useState({
        value: false,
        key: crypto.randomUUID()
    })
    const [openUpdateGenreIW, setOpenUpdateGenreIW] = useState({
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
                                return setOpenAddGenreIW({
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
                        <SearchInput />
                    </div>
                </div>

                <div className="relative grow overflow-y-auto mt-4">
                    <GenreListContext.Provider
                        value={{
                            setOpenUpdateGenreIW
                        }}
                    >
                        <GenreList
                            refetch={refetch}
                        />
                    </GenreListContext.Provider>
                </div>
            </div>

            <div>
                <AddGenreContext.Provider
                    value={{
                        setRefetchGenres: setRefetch
                    }}
                >
                    <AddGenreIW
                        key={openAddGenreIW.key}
                        isOpenWindow={openAddGenreIW.value}
                    />
                </AddGenreContext.Provider>

                <UpdateGenreContext.Provider value={{
                    genreId: openUpdateGenreIW.genreId,
                    setOpenUpdateGenreIW,
                    setRefetchGenres: setRefetch
                }}>
                    <UpdateGenreIW
                        key={openUpdateGenreIW.key}
                        isOpenWindow={openUpdateGenreIW.value}
                    />
                </UpdateGenreContext.Provider>
            </div>
        </>

    )
}

export default GenreTabContent