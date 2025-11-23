import { useParams } from "react-router";
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

function Page() {
    const { time } = useParams();
    const { state } = useLocation();
    // const [plainText, setPlainText] = useState(["Loading..."])
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch("http://localhost:8000/");
    //             const text = await response.text();
    //             const data = await JSON.parse(text);
    //             const processedData = Object.fromEntries(
    //             Object.entries(data).map(([key, value]) => [
    //             key,
    //             { ...value, id: crypto.randomUUID(), html_show: false, ml_show: false, url_show: false}
    //             ])
    //         );
    //             setData(processedData);
    //         }
    //         catch (err) {
    //             console.log(err);
    //         }
    //     }
    //     const text = {
    //         1000239600000: {paragraphs: ["Plain Text For Github", "Testsdf"]}, 
    //         1763842800000: {paragraphs: ["plain text for stackoverflow", "new stuff", "woah"], headers: "asd"}
    //     }
    //     setPlainText(text[time].paragraphs)
    //     console.log(time)
    // }, [time])
    
    return <div className="plain_text">
        {state.plainText.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
        ))
        }
    </div>
}

export default Page;