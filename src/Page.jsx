import { useParams } from "react-router";
import { useState, useEffect } from 'react';

function Page() {
    const { time } = useParams();
    const [plainText, setPlainText] = useState(["Loading..."])
    useEffect(() => {
        const text = {
            1000239600000: {paragraphs: ["Plain Text For Github", "Testsdf"], headers: "asd"}, 
            1763842800000: {paragraphs: ["plain text for stackoverflow", "new stuff", "woah"], headers: "asd"}
        }
        setPlainText(text[time].paragraphs)
        console.log(time)
    }, [time])
    
    return <>

        {plainText.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
        ))
        }
    </>
}

export default Page;