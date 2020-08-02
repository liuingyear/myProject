import React, { useState, useMemo } from 'react';

function Example4 () {
    const [aa, setAaValue] = useState("AA");
    const [bb, setBbValue] = useState("BB");
    return (
        <>
            <button onClick={()=>{setAaValue(new Date().getTime())}}>AA</button>
            <button onClick={()=>{setBbValue(new Date().getTime()+',BB的值')}}>BB</button>
            <ChildComponent name={aa}>{bb}</ChildComponent>
        </>
    )
}
export default Example4

function ChildComponent ({name, children}) {
    function getName () {
        console.log("这是aa的值")
        return name + "这是aa的值"
    }
    const customeName = useMemo(() => getName(name), [name])
    return (
        <>
            <div>{customeName}</div>
            <div>{children}</div>
        </>
    )
}