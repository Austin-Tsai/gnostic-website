import { useState, Fragment } from 'react'
import { Link } from "react-router";
import dayjs from 'dayjs'
import './App.css'

function App() {
  const [data, setData] = useState({})
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const temp = {
    1000239600000: {url: "https://github.com/Austin-Tsai", ml_keywords: "Hello,Test,More,Words,To,Fill,Space", metadata_json: {title: "Github", author: "test", html_keywords: "asd"}, body_json: {paragraphs: "test", headers: "das"}, key: crypto.randomUUID()},
    1763842800000: {url: "https://stackoverflow.com/questions/65314853/how-to-add-a-package-such-as-axios-to-a-chrome-extension://github.com/Austin-Tsai", ml_keywords: "Hello,Wsedf", metadata_json: {title: "Stackoverflow", author: "bm", html_keywords: "bds,adsnk"}, body_json: {paragraphs: "test", headers: "das"},  key: crypto.randomUUID()}
  }

  return (
    <>
      <div className="wrapper">
        <div className="search">
          <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
        </div>

        <div className="container">
          <div className="header-left">Date Served</div>
          <div className="header">Title</div>
          <div className="header">Author</div>
          <div className="header">HTML Keywords</div>
          <div className="header">ML Keywords</div>
          <div className="header-right">URL</div>

          {Object.entries(temp).map(([time, data], index) => {
            if (searchTerm != '' && !data.metadata_json.title.toLowerCase().includes(searchTerm.toLowerCase()) 
              && !data.url.toLowerCase().includes(searchTerm.toLowerCase())
              && !data.metadata_json.author.toLowerCase().includes(searchTerm.toLowerCase())
              && !data.ml_keywords.toLowerCase().includes(searchTerm.toLowerCase())
              && !data.metadata_json.html_keywords.toLowerCase().includes(searchTerm.toLowerCase())) return;

            // if (index == Object.keys(temp).length - 1) 
            //   return <Fragment key={data.key}>
            //   <div className="item-left item-bottom">{title}</div>
            //   {Object.entries(data).map(([category, info], index) => {
            //     if (category == "key") return
            //     if (index == 2) return <div className="item-right item-bottom">{info}</div>
            //     return <div className="item item-bottom">{info}</div>
            //   })}
            // </Fragment>
            
            return <Fragment key={data.key}>
              <div className="item-left">
                <Link to={"page/"+time}>{dayjs(time).format("DD/MM/YY")}</Link>
              </div>
              {Object.entries(data["metadata_json"]).map(([category, info], index) => {
                // if (category == "key") return
                // if (category == "time") {
                  //   return <div className="item">{dayjs(info).format("DD/MM/YY")}</div>
                  // }
                  
                  // if (index == 2) return <div className="item-right">{info}</div>
                  return <div className="item">{info}</div>
                })}
                <div className="item">{data.ml_keywords}</div>
                <div className="item-right">{data.url}</div>
            </Fragment>
          })}
        </div>
      </div>
    </>
  )
}

export default App
