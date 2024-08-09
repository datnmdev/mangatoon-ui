import { Link, useNavigate } from "react-router-dom"
import IconButton from "../../../../components/IconButton"
import Search from "../../../../components/Search"
import InlineWindow from "../../../../components/InlineWindow"
import { useEffect, useState } from "react"
import api from "../../../../api"
import Button from "../../../../components/Button"
import location from "../../../../routers/location"
import { v4 } from 'uuid'
import FollowButton from "./components/FollowButton"

function MainControlBox({
    book,
    chapter
}) {
    const navigate = useNavigate()
    const [chapters, setChapters] = useState(null)
    const [searchText, setSearchText] = useState('')
    const [searchResult, setSearchResult] = useState(null)
    const [openSearchIW, setOpenSearchIW] = useState({
        value: false,
        key: v4()
    })

    useEffect(() => {
        async function getChapters() {
            try {
                const chapters = (await api.chapter.getChapters({
                    storyId: book.id,
                    page: 1,
                    limit: Number.MAX_SAFE_INTEGER
                })).data.data.rows
                setChapters(chapters)
                setSearchResult(chapters)
            } catch (error) {

            }
        }

        getChapters()
    }, [])

    useEffect(() => {
        if (chapters) {
            if (searchText.length > 0) {
                const regex = new RegExp(`\\b${searchText}\\b`, 'i')
                const searchResult = chapters.filter(chapter => regex.test(chapter.name))
                setSearchResult(searchResult)
            } else {
                setSearchResult(chapters)
            }
        }
    }, [searchText])

    return (
        <div className="fixed left-0 bottom-0 bg-[#242526] w-full flex justify-center items-center py-2 sm:px-2 z-10">
            <div className="flex items-center space-x-4">
                <Link
                    className="shrink-0"
                    to={location.homePage()}
                >
                    <IconButton
                        icon={(<i className="fa-solid fa-house-chimney"></i>)}
                        backgroundColor="transparent"
                        sx={{
                            fontSize: '1.2rem',
                            padding: '0'
                        }}
                    />
                </Link>

                <div className="flex items-center space-x-2 shrink-0">
                    <IconButton
                        icon={(<i className="fa-solid fa-angle-left"></i>)}
                        color="black"
                        backgroundColor="white"
                        sx={{
                            borderRadius: '50%',
                            width: '38px',
                            height: '38px',
                            padding: '0'
                        }}
                        disabled={chapter.order - 1 > 0 ? false : true}
                        onClick={() => {
                            if (chapter.order - 1 > 0 && chapters) {
                                navigate(location.chapterContentPage(book, chapters[chapters.length - chapter.order + 1]))
                                window.location.reload()
                            }
                        }}
                    />

                    <div className="rounded-[4px] overflow-hidden cursor-pointer">
                        <div
                            className="bg-white leading-[36px] flex space-x-4 px-4"
                            onClick={() => setOpenSearchIW({
                                value: true,
                                key: v4()
                            })}
                        >
                            <h3 className="line-clamp-1">{chapter.name}</h3>

                            <span>
                                <i className="fa-solid fa-angle-down"></i>
                            </span>
                        </div>

                        <div>
                            <InlineWindow
                                title='Danh sách chương'
                                isOpenWindow={openSearchIW.value}
                                key={openSearchIW.key}
                            >
                                <div className="px-6 mb-6 max-h-[400px] overflow-hidden flex flex-col">
                                    <div>
                                        <Search
                                            placeholder="Nhập tên chương..."
                                            onChange={e => setSearchText(e.target.value)}
                                        />
                                    </div>

                                    <div className="grow overflow-y-auto mt-4 grid md:grid-cols-5 md:gap-2 xl:grid-cols-5 xl:gap-2 sm:grid-cols-2 sm:px-2 sm:gap-2">
                                        {searchResult !== null
                                            ? (
                                                searchResult.map(chapter => {
                                                    return (
                                                        <Button
                                                            key={chapter.id}
                                                            backgroundColor='white'
                                                            color="black"
                                                            sx={{
                                                                border: `1px solid black`
                                                            }}
                                                            onClick={() => {
                                                                navigate(location.chapterContentPage(book, chapter))
                                                                window.location.reload()
                                                            }}
                                                        >
                                                            {chapter.name}
                                                        </Button>
                                                    )
                                                })
                                            )
                                            : null}
                                    </div>
                                </div>
                            </InlineWindow>
                        </div>
                    </div>

                    <IconButton
                        icon={(<i className="fa-solid fa-angle-right"></i>)}
                        backgroundColor="white"
                        color="black"
                        sx={{
                            borderRadius: '50%',
                            width: '38px',
                            height: '38px',
                            padding: '0'
                        }}
                        disabled={(chapters && chapter.order + 1 <= chapters.length) ? false : true}
                        onClick={() => {
                            if (chapters && chapter.order + 1 <= chapters.length) {
                                navigate(location.chapterContentPage(book, chapters[chapters.length - chapter.order - 1]))
                                window.location.reload()
                            }
                        }}
                    />
                </div>

                <FollowButton
                    book={book}
                />
            </div>
        </div>
    )
}

export default MainControlBox