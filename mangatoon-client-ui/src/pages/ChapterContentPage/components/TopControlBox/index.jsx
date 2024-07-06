import moment from "moment"
import Breadcrumb from "../../../../components/Breadcrumb"
import Alert from "../../../../components/Alert"
import { INFO } from "../../../../components/Alert/constants"
import Button from "../../../../components/Button"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../../../../api"
import location from "../../../../routers/location"

function TopControlBox({
    book,
    chapter
}) {
    const navigate = useNavigate()
    const [previousChapter, setPreviousChapter] = useState(null)
    const [nextChapter, setNextChapter] = useState(null)

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

    return (
        <div className="p-4 overflow-hidden bg-white">
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

            <div className="mt-4 md:flex md:items-center md:space-x-2 xl:items-center xl:space-x-2">
                <h3 className='text-[1.2rem] font-[350]'>{book.title} - {chapter.name}</h3>
                <span className="text-[0.9rem]">(Cập nhật lúc {moment(book.updatedAt).format('HH:mm:ss DD/MM/YYYY')})</span>
            </div>

            <div className="mt-4">
                <div>
                    <Alert type={INFO}>
                        <div className="text-[#31708F]">
                            <i className="fa fa-info-circle"></i>
                            <em className="ml-2">Sử dụng mũi tên trái (←) hoặc phải (→) để chuyển chapter</em>
                        </div>
                    </Alert>
                </div>

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
        </div>
    )
}

export default TopControlBox