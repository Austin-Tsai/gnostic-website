import { useState, Fragment, use, useEffect } from 'react'
import { Link } from "react-router";
import dayjs from 'dayjs'
import './App.css'

function deepParseJSON(value) {
  if (typeof value === "string") {
    try {
      // Try to parse the string
      const parsed = JSON.parse(value);
      // Recursively parse the result in case it contains more JSON strings
      return deepParseJSON(parsed);
    } catch {
      // Not JSON, return as-is
      return value;
    }
  } else if (Array.isArray(value)) {
    // Recursively parse each element of the array
    return value.map(deepParseJSON);
  } else if (value !== null && typeof value === "object") {
    // Recursively parse each property of the object
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, deepParseJSON(v)])
    );
  }
  // Primitive value (number, boolean, null)
  return value;
}

function App() {
  const [database, setData] = useState({})
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000');
        const text = await response.text();
        const data = deepParseJSON(text);
        // const outer = JSON.parse(text);
        // console.log(outer);

        // const inner = Object.fromEntries(
        //   Object.entries(outer).map(([key, value]) => {
        //     try {
        //       // If value is itself a JSON string, parse it
        //       return [key, JSON.parse(value)];
        //     } catch {
        //       // If not JSON (e.g. status), keep as-is
        //       return [key, value];
        //     }
        //   })
        // );
        // console.log(inner);
        const processedData = Object.fromEntries(
          Object.entries(data).map(([key, value]) => [
            key,
            { ...value, id: crypto.randomUUID(), html_show: false, ml_show: false, url_show: false}
          ])
        );
        setData(processedData);
        console.log(data);
      }
      catch (err) {
        console.log(err);
      }
      
    }
    fetchData();
    // const temp = {
    //   1000239600000: {url: "https://github.com/Austin-Tsai", ml_keywords: ["Hello","Test","More","Words","To","Fill","Space"], metadata_json: {title: "Github", author: "test", html_keywords: ["asd"]}, body_json: {paragraphs: ["plain text for stackoverflow", "new stuff", "woah"]}, id: crypto.randomUUID(), html_show: false, ml_show: false, url_show: false},
    //   1763842800000: {url: "https://stackoverflow.com/questions/65314853/how-to-add-a-package-such-as-axios-to-a-chrome-extension://github.com/Austin-Tsai", ml_keywords: ["Hello","Wsedf"], metadata_json: {title: "Stackoverflow", author: "bm", html_keywords: ["bds","adsnk"]}, body_json: {paragraphs: ["Plain Text For Github", "Testsdf"]},  id: crypto.randomUUID(),  html_show: false, ml_show: false, url_show: false},
    // }
    // setData(temp)
  }, []);
  
  const handleShow = (time, field) => {
    setData(prevState => ({
      ...prevState, 
      [time]: {  
        ...prevState[time],
        [field]: !prevState[time][field]
      }
    }));
  }

  return (
    <>
      <div className="wrapper">
        <div className="search">
          <label htmlFor="search">Search Terms (Comma Separated List)</label>
          <input
              type="text"
              name="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
        </div>

        <div className="container">
          <div className="row">
            <div className="header">Date Served</div>
            <div className="header">Title</div>
            <div className="header">Author</div>
            <div className="header">HTML Keywords</div>
            <div className="header">ML Keywords</div>
            <div className="header">URL</div>
            <div className="header">Plain Text</div>
          </div>
          {Object.entries(database).map(([time, data], index) => {
            if (searchTerm != '' && !data.metadata.title.toLowerCase().includes(searchTerm.toLowerCase()) 
              && !data.url.toLowerCase().includes(searchTerm.toLowerCase())
              && !data.metadata.author.toLowerCase().includes(searchTerm.toLowerCase())) return;
              // && !data.ml_keywords.toLowerCase().includes(searchTerm.toLowerCase())
              // && !data.metadata_json.html_keywords.toLowerCase().includes(searchTerm.toLowerCase())) return;

            // if (index == Object.keys(temp).length - 1) 
            //   return <Fragment key={data.key}>
            //   <div className="item-left item-bottom">{title}</div>
            //   {Object.entries(data).map(([category, info], index) => {
            //     if (category == "key") return
            //     if (index == 2) return <div className="item-right item-bottom">{info}</div>
            //     return <div className="item item-bottom">{info}</div>
            //   })}
            // </Fragment>
            
            return <div className="row" key={data.id}>
              <div className="item">{dayjs(time).format("MM/DD/YY")}</div>
              {Object.entries(data["metadata"]).map(([category, info], index) => {
                if (category == "htmlkeywords") {
                  // {console.log(info)}
                  return <div className="item">
                    {data.html_show ? <div>{info.join(", ")}</div> : <div></div>}
                    <button onClick={() => handleShow(time, 'html_show')}>{data.html_show ? "Hide" : "Show"}</button>
                  </div>
                }
                // if (category == "time") {
                  //   return <div className="item">{dayjs(info).format("DD/MM/YY")}</div>
                  // }
                  
                  // if (index == 2) return <div className="item-right">{info}</div>
                  return <div className="item">{info}</div>
                })}
                <div className="item">
                    {data.ml_show && data.keywords.ml_keywords ? <div>{data.keywords.ml_keywords.join(", ")}</div> : <div></div>}
                    <button onClick={() => handleShow(time, 'ml_show')}>{data.ml_show ? "Hide" : "Show"}</button>
                  </div>
                <div className="item">
                    {data.url_show || data.url.length < 50 ? <div>{data.url}</div> : <div>{data.url.substring(0, 50)+"..."}</div>}
                    {data.url.length >= 50 && <button onClick={() => handleShow(time, 'url_show')}>{data.url_show ? "Hide" : "Show More"}</button>}
                  </div>
                <div className="item">
                  <Link 
                    to={"page/"+time}
                    state={{ plainText: data.body.paragraphs }}
                  >Plain Text</Link>
                </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
