import { memo, useState } from 'react'
import Bottom from './components/Bottom'
import Top from './components/Top'
import StorySearcher from './components/Top/components/StorySearcher'

function Header() {
    const [hiddenSearch, setHiddenSearch] = useState(true)

    return (
        <header className='bg-white'>
            <div className='md:container md:mx-auto py-3'>
                <Top 
                    setHiddenSearch={setHiddenSearch}
                />
            </div>

            <div>
                <Bottom 
                    hiddenSearch={hiddenSearch}
                    setHiddenSearch={setHiddenSearch}
                />
            </div>

            {!hiddenSearch
                && (
                    <div className='mt-2'>
                        <StorySearcher />
                    </div>
                )}
        </header>
    )
}

export default memo(Header)