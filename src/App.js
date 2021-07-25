import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [state, setstate] = useState([]);
  const [pageno, setpagno] = useState(1);
  const [totalpage, settotalpage] = useState(1);

  useEffect(() => {
    getData();
  }, [pageno]);
  async function getData() {
    const data = await fetch(`https://reqres.in/api/users?page=${pageno}`);
    const jsondata = await data.json();
    setstate(jsondata.data);

    //console.log(jsondata);
    settotalpage(jsondata.total_pages);

    //console.log(jsondata.total_pages);
  }
  function changedetails(index) {
    setpagno(index);
  }

  const arr = new Array(totalpage);
  for (let i = 1; i <= totalpage; i++) {
    arr[i] = i;
  }
  return (
    <>
      <h1>
        <center>List of People</center>
        <center>
          {totalpage
            ? arr.map((item, index) => {
                return (
                  <div className="dis" key={index}>
                    <button
                      className="btn btn-outline-primary"
                      key={index}
                      onClick={() => {
                        changedetails(index);
                      }}
                    >
                      {index}
                    </button>
                    &nbsp;&nbsp;
                  </div>
                );
              })
            : null}
        </center>
      </h1>
      {state.map((elem, index) => {
        return (
          <center key={"abc" + index}>
            <div className="item">
              <h1>
                Full Name : {elem.first_name} {elem.last_name}
              </h1>
              <h2>Email at : {elem.email}</h2>
              <h4>
                <img src={elem.avatar} alt="" />
              </h4>
            </div>
          </center>
        );
      })}
    </>
  );
}

export default App;
