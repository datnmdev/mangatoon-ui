import Breadcrumb from "../../../../components/Breadcrumb"
import Button from "../../../../components/Button"
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import api from "../../../../api"
import location from "../../../../routers/location"

function BottomControlBox({
    book,
    chapter
}) {
    const navigate = useNavigate()
    const [previousChapter, setPreviousChapter] = useState(null)
    const [nextChapter, setNextChapter] = useState(null)
    const bottomControlBoxRef = useRef(null)
    const availableView = useRef(false)

    useEffect(() => {
        const id = setTimeout(() => {
            availableView.current = true
        }, 10*1000)

        return () => {
            clearTimeout(id)
        }
    }, [])

    useEffect(() => {
        async function getPreviousChapter() {
            try {
                const previousChapter = (await api.chapter.getChapters({
                    storyId: book.id,
                    order: chapter.order - 1,
                    page: 1,
                    limit: 1
                })).data.data.rows?.[0]
                setPreviousChapter(previousChapter)
            } catch (error) {

            }
        }

        async function getNextChapter() {
            try {
                const nextChapter = (await api.chapter.getChapters({
                    storyId: book.id,
                    order: chapter.order + 1,
                    page: 1,
                    limit: 1
                })).data.data.rows?.[0] ?? null
                setNextChapter(nextChapter)
            } catch (error) {

            }
        }

        getPreviousChapter()
        getNextChapter()
    }, [])

    useEffect(() => {

    }, [])

    useEffect(() => {
        async function createViewDetail() {
            try {
                await api.viewDetail.createViewDetail({
                    chapterId: chapter.id,
                    clientId: localStorage.getItem('visitorId')
                })
            } catch (error) {

            }
        }

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(async (entry) => {
                if (entry.isIntersecting) {
                    if (availableView.current && entry.target === bottomControlBoxRef.current) {
                        await createViewDetail()
                    }
                }
            })
        })

        observer.observe(bottomControlBoxRef.current);

        return () => {
            observer.disconnect();
        };
    }, [])

    return (
        <div
            ref={bottomControlBoxRef}
            className="p-4 overflow-hidden bg-white space-y-6"
        >
            <div className="mt-4">
                <div className="flex items-center justify-center space-x-2 mt-4">
                    <Button
                        backgroundColor='#5BC0DE'
                        disabled={previousChapter ? false : true}
                        onClick={() => {
                            navigate(location.chapterContentPage(book, previousChapter))
                            window.location.reload()
                        }}
                    >
                        <div className="text-[0.9rem] space-x-2 text-white">
                            <span>
                                <i className="fa-solid fa-arrow-left"></i>
                            </span>

                            <span>Chương trước</span>
                        </div>
                    </Button>

                    <Button
                        backgroundColor='#5BC0DE'
                        disabled={nextChapter ? false : true}
                        onClick={() => {
                            navigate(location.chapterContentPage(book, nextChapter))
                            window.location.reload()
                        }}
                    >
                        <div className="text-[0.9rem] space-x-2 text-white">
                            <span>Chương sau</span>

                            <span>
                                <i className="fa-solid fa-arrow-right"></i>
                            </span>
                        </div>
                    </Button>
                </div>
            </div>

            <div>
                <Breadcrumb
                    data={[
                        {
                            title: 'Trang Chủ',
                            link: location.homePage()
                        },
                        {
                            title: book.title,
                            link: location.bookInfoPage(book)
                        },
                        {
                            title: chapter.name,
                            link: location.chapterContentPage(book, chapter)
                        }
                    ]}
                />
            </div>
        </div>
    )
}

export default BottomControlBox