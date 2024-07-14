import Bottom from './components/Bottom'
import Top from './components/Top'

function Header() {
    return (
        <header className='bg-white'>
            <div className='md:container md:mx-auto py-3'>
                <Top />
            </div>

            <div>
                <Bottom />
            </div>
        </header>
    )
}

export default Header