import React, { useRef, useState, useEffect } from 'react';

function Example5 () {
    const inputEl = useRef(null)
    const setValueToInput = () => {
        inputEl.current.value = "aaa"
        console.log(inputEl)
    }
    const [text, setText] = useState('bbb')
    const textRef = useRef();

    useEffect(()=>{
        textRef.current = text
        console.log(textRef.current)
    })
    return (
        <>
            <input ref={inputEl} />
            <button onClick={setValueToInput}>给input赋值</button>
            <input onChange={(e) => {setText(e.target.value)}} />

        </>
    )
}
export default Example5