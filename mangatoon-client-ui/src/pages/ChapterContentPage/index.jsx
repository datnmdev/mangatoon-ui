import { useParams } from "react-router-dom"
import TopControlBox from "./components/TopControlBox"
import { useEffect, useRef, useState } from "react"
import api from "../../api"
import ContentSection from "./components/ContentSection"
import BottomControlBox from "./components/BottomControlBox"
import MainControlBox from "./components/MainControlBox"
import { useSelector } from 'react-redux'
import { userSelectors } from "../../features/user.feature"

function ChapterContentPage() {
    const { bookId, chapterId } = useParams()
    const [book, setBook] = useState(null)
    const [chapter, setChapter] = useState(null)
    const isCreateHistoryDetailCalled = useRef(false)
    const tokens = useSelector(userSelectors.selectTokens)

    useEffect(() => {
        async function getBook() {
            try {
                const book = (await api.story.getStories({
                    page: 1,
                    limit: 1,
                    id: bookId
                })).data.data.rows[0]
                setBook(book)
            } catch (error) {

            }
        }

        async function getChapter() {
            try {
                const chapter = (await api.chapter.getChapters({
                    page: 1,
                    limit: 1,
                    id: chapterId
                })).data.data.rows[0]
                setChapter(chapter)
            } catch (error) {

            }
        }

        getBook()
        getChapter()
    }, [chapterId])

    useEffect(() => {
        async function createHistoryDetail() {
            try {
                await api.history.createHistoryDetail({
                    chapterId: Number(chapterId)
                })
            } catch (error) {

            }
        }

        if (!isCreateHistoryDetailCalled.current && tokens) {
            isCreateHistoryDetailCalled.current = true
            createHistoryDetail()
        }
    }, [tokens])

    return (
        <div className="bg-[#333333] py-8">
            <div className="container mx-auto space-y-4">
                <div className='rounded-[6px] overflow-hidden'>
                    {book && chapter
                        ? (
                            <TopControlBox
                                book={book}
                                chapter={chapter}
                            />
                        )
                        : null}
                </div>

                <div>
                    {book && chapter
                        ? (
                            <ContentSection
                                book={book}
                                chapter={chapter}
                            />
                        )
                        : null}
                </div>

                <div className='rounded-[6px] overflow-hidden'>
                    {book && chapter
                        ? (
                            <BottomControlBox
                                book={book}
                                chapter={chapter}
                            />
                        )
                        : null}
                </div>
            </div>

            <div className="mb-[54px]">
                {book && chapter
                    ? (
                        <MainControlBox
                            book={book}
                            chapter={chapter}
                        />
                    )
                    : null}
            </div>
        </div>
    )
}

export default ChapterContentPage