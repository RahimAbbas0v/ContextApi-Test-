import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Cards.css";
import { Input } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/favitems";
function Cards() {
  const [data, setdata] = useState([]);
  const [search, setSearch] = useState([]);
  const [sort, setSort] = useState(0);
  const { fav, setFav } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://northwind.vercel.app/api/suppliers")
      .then((res) => setdata(res.data));
  }, []);

  const handlesearch = (value) => {
    const searched = data.filter((x) =>
      x.name.toLowerCase().includes(value.toLowerCase())
    );
    setdata(data);
  };
  const handledelete = (id) => {
    axios.delete(`https://northwind.vercel.app/api/suppliers/${id}`);
    // .then(res=>setdata([...data].filter(x=>x.id!=res.data.id)))
    let arr = data.filter((x) => x.id != id);
    setdata(arr);
  };
  const handleview = (Id) => {
    navigate(`view/${Id}`);
  };
  const handlefav = (item) => {
    if (fav.find((x) => x.id == item.id)) {
      alert("Bu Card fav bolmesinde movcuddur");
    } else {
      setFav([...fav, item]);
    }
  };
  const handlesortLowToHigh = () => {
    setdata([...data.sort((a, b) => a.address?.postalCode - b.address?.postalCode)]);
  };

  const handlesortHighToLow = () => {
    setdata([...data.sort((a, b) => b.address?.postalCode - a.address?.postalCode)]);
  };

  const handlesortAtoZ = () => {
    setdata([...data.sort((a, b) => a.companyName.localeCompare(b.companyName))]);
  };

  const handlesortZtoA = () => {
    setdata([...data.sort((a, b) => b.companyName.localeCompare(a.companyName))]);
  };

  return (
    <>
      <section id="section2">
        <div className="container" id="container2">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="search"
          />
          <button onClick={handlesortAtoZ}>az</button>
          <button onClick={handlesortZtoA}>za</button>
          <button onClick={handlesortHighToLow}>hl</button>
          <button onClick={handlesortLowToHigh}>lh</button>
          <div className="heading">
            <h2>
              Practice <span id="span">Area</span>
            </h2>
            <p id="info">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
         
          <div className="row">
            {sort == 0
              ? data
                  .filter((item) =>
                    search == ""
                      ? data
                      : item.companyName
                          .toLowerCase()
                          .includes(search.toLowerCase())
                  )
                  .map((item, index) => (
                    <div className="col-4" style={{ flexWrap: "wrap" }}>
                      <div className="card" style={{ flexWrap: "wrap" }} key={index}>
                        <img
                          src="https://www.sportsbusinessjournal.com/-/media/Images/Daily/2023/09/13/SOCIAL/SOCIAL-IMG-logo.ashx"
                          alt=""
                        />
                        <div className="card-body">
                          <h2>{item.companyName}</h2>
                          <p>{item.contactTitle}</p>
                          <div style={{ display: "flex" }}>
                            <button onClick={() => handledelete(item.id)}>
                              Delete
                            </button>
                            <button onClick={() => handleview(item.id)}>
                              View
                            </button>
                            <button onClick={() => handlefav(item)}>Fav</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
              : data.map((item, index) => (
                  <div className="col-4" style={{ flexWrap: "wrap" }}>
                    <div className="card" style={{ flexWrap: "wrap" }} key={index}>
                      <img src={item.img} alt="" />
                      <div className="card-body">
                        <h2>{item.name}</h2>
                        <p>{item.about}</p>
                        <div style={{ display: "flex" }}>
                          <button onClick={() => handledelete(item.id)}>
                            Delete
                          </button>
                          <button onClick={() => handleview(item.id)}>
                            View
                          </button>
                          <button onClick={() => handlefav(item)}>Fav</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Cards;
