import { useEffect, useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { useLocation, useParams } from 'react-router-dom'
import api from '../../api'
import BookInfo from './components/BookInfo'
import BookContent from './components/BookContent'
import ChapterList from './components/ChapterList'
import locationRouter from '../../routers/location'
import CommentSection from './components/CommentSection'

function BookInfoPage() {
    const { bookId } = useParams()
    const location = useLocation()
    const [book, setBook] = useState(null)

    useEffect(() => {
        async function getBook() {
            try {
                const book = (await api.story.getStories({
                    page: 1,
                    limit: 1,
                    id: Number(bookId)
                })).data.data.rows?.[0]
                setBook(book)
            } catch (error) {

            }
        }

        getBook()
    }, [])

    return (
        <div className='my-8'>
            <div className='container mx-auto bg-white rounded-[4px] p-4'>
                <div>
                    {book
                        && (
                            <Breadcrumb
                                data={[
                                    {
                                        title: 'Trang Chủ',
                                        link: locationRouter.homePage()
                                    },
                                    {
                                        title: book.title,
                                        link: location.pathname
                                    }
                                ]}
                            />
                        )}
                </div>

                <div className='mt-2 p-4'>
                    {book
                        && (

                            <BookInfo
                                data={book}
                            />
                        )}
                </div>

                <div className='mt-6'>
                    {book
                        ? (
                            <BookContent
                                content={book.description}
                            />
                        )
                        : null}
                </div>

                <div className='mt-6'>
                    {book
                        ? (
                            <ChapterList
                                book={book}
                            />
                        )
                        : null}
                </div>

                <div className='mt-6'>
                    {book
                        ? (
                            <CommentSection
                                book={book}
                            />
                        )
                        : null}
                </div>
            </div>
        </div>
    )
}

export default BookInfoPage