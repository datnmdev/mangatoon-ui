import { Link, useNavigate } from 'react-router-dom'
import colors from '../../../../assets/colors'
import Button from '../../../Button'
import Search from '../../../Search'
import location from '../../../../routers/location'
import Profile from './components/Profile'
import { useSelector } from 'react-redux'
import { userSelectors } from '../../../../features/user.feature'

function Top() {
    const navigate = useNavigate()
    const tokens = useSelector(userSelectors.selectTokens)

    return (
        <div className='flex justify-between items-center space-x-8'>
            <div className='flex items-center space-x-2'>
                <div>
                    <Link to={location.homePage()}>
                        <img
                            className='w-52 h-9 object-contain'
                            src='/logos/mangatoon.png'
                            alt='Mangatoon'
                        />
                    </Link>

                </div>

                <div>
                    <button
                        className='w-10 h-10 rounded-[50%] border-[1px] border-current'
                        style={{
                            color: colors.primaryColor
                        }}
                    >
                        <i className='fa-regular fa-lightbulb'></i>
                    </button>
                </div>

                <div>
                    <Search
                        placeholder='Bạn muốn tìm truyện gì?'
                    />
                </div>
            </div>

            <div>
                {tokens
                    ? (
                        <Profile />
                    )
                    : (
                        <div className='flex items-center space-x-2'>
                            <Button
                                content='Đăng nhâp'
                                backgroundColor='#55CAF2'
                                onClick={() => navigate(location.signInPage())}
                            />

                            <Button
                                content='Đăng ký'
                                backgroundColor='#55CAF2'
                                onClick={() => navigate(location.signUpPage())}
                            />
                        </div>
                    )}
            </div>

        </div>
    )
}

export default Top