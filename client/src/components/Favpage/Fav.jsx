import React, { useContext } from "react";
import { Context } from "../../context/favitems";
import { Helmet } from "react-helmet";
function Fav() {
  const { fav, setFav } = useContext(Context);
  const handledelete=(id)=>{
      console.log('fav',fav)
      let delitem =fav.filter(x=>x.id!=id)
      console.log('deleted item',delitem)
      setFav(delitem)
  }
  return (
    <>
     <Helmet>
        <meta charSet="utf-8" />
        <title>Favorite Page</title>
        <link rel="icon" type="image/x-icon" href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUEEybzjp8yK_qgIBuTq_h-fiSOssdw-QqXQ&usqp=CAU" />
        
      </Helmet>
    <div className="container">
        <h2 style={{textAlign:"center"}}>YOUR FAVORITE PRODUCTS</h2>
      <div className="row">
        {fav.map((item, index) => (
          <div className="col-4">
            <div className="card">
              <img src='https://www.sportsbusinessjournal.com/-/media/Images/Daily/2023/09/13/SOCIAL/SOCIAL-IMG-logo.ashx'alt="" />
              <div className="card-body">
                <h2>{item.companyName}</h2>
                <p>{item.contactTitle}</p>
                <div style={{ display: "flex" }}>
                <button onClick={()=>handledelete(item.id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div></div>
    </>
  );
}

export default Fav;
