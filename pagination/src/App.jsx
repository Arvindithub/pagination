import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [product, setProduct] = useState([]);
const [pages,setpages]=useState(1)
  const fetchData = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      setProduct(data); // Set the fetched data directly to the product state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const selectpagehandler=(selctedpage)=>{
   // if(selctedpage>=1 && selctedpage<=pages.length/10 && selctedpage!==pages)
setpages(selctedpage)
  }

  return (
    <>
      {product.length > 0 && (
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,400px)",}}>
          {product.slice(pages*10-10,pages*10).map((prod) => (
            <div key={prod.id}>
              <p>{prod.id}</p>
              <p>{prod.body}</p>
              <p>{prod.title}</p>
            </div>
          ))}
        </div>

      )}
      {product.length>0 && <div>
        <span onClick={()=>selectpagehandler(pages-1)}>◀</span>
    
    {
     [ ...Array(product.length/10)].map((_,i)=>{
return <span onClick={()=>selectpagehandler(i+1)} style={{padding:"10px",margin:"15px",justifyContent:"center"}}>{i+1}</span>
     })
    }
     <span onClick={()=>selectpagehandler(pages+1)}>▶</span>
        </div>}
    </>
  );
}

export default App;

