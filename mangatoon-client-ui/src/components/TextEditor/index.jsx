import { memo, useEffect, useRef, useState } from "react"
import RoundButton from "../RoundButton"
import { IDLE, PENDING } from "../../constants/fetchStatus.constant"
import IconContainer from "../IconContainer"
import activities from '../../assets/emojis/activities.json'
import animals from '../../assets/emojis/animals.json'
import cuisines from '../../assets/emojis/cuisines.json'
import flags from '../../assets/emojis/flags.json'
import objects from '../../assets/emojis/objects.json'
import places from '../../assets/emojis/places.json'
import smiles from '../../assets/emojis/smiles.json'
import symbols from '../../assets/emojis/symbols.json'
import babySoldiers from '../../assets/gifs/baby-soldiers.json'
import cheekyRabbits from '../../assets/gifs/cheeky-rabbits.json'
import emoGifs from '../../assets/gifs/emo-gifs.json'
import onionGifs from '../../assets/gifs/onions.json'
import pandas from '../../assets/gifs/pandas.json'
import tozokiRabbits from '../../assets/gifs/tozoki-rabbits.json'
import trollFaces from '../../assets/gifs/troll-faces.json'
import yoyoMonkeys from '../../assets/gifs/yoyo-monkeys.json'

function TextEditor({
    value = '',
    placeholder = 'Nội dung bình luận...',
    disabled = false,
    status = IDLE,
    onChange = value => { },
    onSubmit = () => { },
}) {
    const editorRef = useRef(null)
    const [content, setContent] = useState(value)
    const [hidden, setHidden] = useState(false)
    const [hiddenEmojis, setHiddenEmojis] = useState(true)
    const [hiddenGifs, setHiddenGifs] = useState(true)
    const emojiBoxRef = useRef(null)
    const gifBoxRef = useRef()

    function setCaretToEnd(element) {
        const range = document.createRange();
        const selection = window.getSelection();
        let lastNode = element.lastChild;
        while (lastNode && lastNode.nodeType === Node.ELEMENT_NODE) {
            lastNode = lastNode.lastChild;
        }
        if (lastNode && lastNode.nodeType === Node.TEXT_NODE) {
            const length = lastNode.textContent.length;
            range.setStart(lastNode, length);
            range.collapse(true);
        } else {
            range.selectNodeContents(element);
            range.collapse(false);
        }
        selection.removeAllRanges();
        selection.addRange(range);
        element.focus();
    }

    useEffect(() => {
        setContent(value)
    }, [value])

    useEffect(() => {
        if (content === '') {
            setHidden(false)
        } else {
            setHidden(true)
        }

        editorRef.current.innerHTML = content
        setCaretToEnd(editorRef.current)

        if (onChange) {
            onChange(content)
        }
    }, [content])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emojiBoxRef.current && !emojiBoxRef.current.contains(event.target)) {
                setHiddenEmojis(true)
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (gifBoxRef.current && !gifBoxRef.current.contains(event.target)) {
                setHiddenGifs(true)
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])

    return (
        <div className="bg-[#EFF2F5] rounded-[12px] p-4">
            <div className="relative flex flex-col">
                <div
                    className="py-1 min-h-[32px] outline-none relative z-[1] whitespace-pre-line break-all grow-0"
                    ref={editorRef}
                    contentEditable={!disabled}
                    onInput={(e) => setContent(e.target.innerHTML)}
                />

                <div
                    className="py-1 absolute top-0 left-0 text-[#74777B]"
                    hidden={hidden}
                >
                    {placeholder}
                </div>
            </div>

            <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                    <div className="relative">
                        <RoundButton
                            icon={(<i className="fa-regular fa-face-smile"></i>)}
                            color="#BDC3C9"
                            disabled={disabled}
                            onClick={() => setHiddenEmojis(!hiddenEmojis)}
                        />

                        {!hiddenEmojis
                            && (
                                <div
                                    className="absolute bottom-[calc(100%+16px)] md:left-[12px] sm:-left-[86px] z-[1]"
                                    ref={emojiBoxRef}
                                >
                                    <IconContainer
                                        data={[
                                            smiles,
                                            animals,
                                            cuisines,
                                            activities,
                                            places,
                                            objects,
                                            symbols,
                                            flags
                                        ]}
                                        defaultSelected={smiles}
                                        onChange={(data) => setContent(content + data.outerHTML)}
                                    />
                                </div>
                            )}
                    </div>

                    <div className="relative">
                        <RoundButton
                            icon={(<i className="fa-solid fa-gift"></i>)}
                            color="#BDC3C9"
                            disabled={disabled}
                            onClick={() => setHiddenGifs(!hiddenGifs)}
                        />

                        {!hiddenGifs
                            && (
                                <div
                                    className="absolute bottom-[calc(100%+16px)] md:left-[12px] sm:-left-[110px] z-[999]"
                                    ref={gifBoxRef}
                                >
                                    <IconContainer
                                        data={[
                                            trollFaces,
                                            onionGifs,
                                            cheekyRabbits,
                                            tozokiRabbits,
                                            yoyoMonkeys,
                                            pandas,
                                            babySoldiers,
                                            emoGifs
                                        ]}
                                        size="56px"
                                        onChange={(data) => setContent(content + data.outerHTML)}
                                    />
                                </div>
                            )}
                    </div>
                </div>

                <div>
                    {status === PENDING
                        ? (
                            <img
                                className="w-6"
                                src="/imgs/loading.gif"
                            />
                        )
                        : (
                            <RoundButton
                                icon={(<i className="fa-solid fa-paper-plane"></i>)}
                                color={content === '' ? '#BDC3C9' : '#005FCE'}
                                disabled={content === ''}
                                onClick={onSubmit}
                            />
                        )}
                </div>
            </div>
        </div>
    )
}

export default memo(TextEditor)
