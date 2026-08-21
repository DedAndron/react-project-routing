import {useEffect, useState} from "react";

const Test = ()=>{
    const [count, setCount] = useState(0);
    const [values, setValues] = useState<number[]>([1]);
    console.log("Render Test Component")
    useEffect(() => {
        console.log("Push UseEffect")
        return ()=>{
            console.log("Unmounting Test Component")
        }
    }, [values]);
    return(<div><button onClick={()=>{
        setCount(count+1);
    }}>Up</button>
        <button onClick={()=>{
            setValues([...values, 1])
        }}>Push</button>
        Test Component {count}</div>)
}
export default Test;