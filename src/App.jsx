import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState([])
  const url1="http://localhost:3000/admin/courses";
  const getdata = async () => {
    
    try{
    // const response=await axios({
    //   method:'get',
    //   url:url1,
    //   headers:{
    //     Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhbW1vaGFuIiwiaWF0IjoxNzI4MjMyNzI1fQ.A8jKKMM3J4EJxojwdNahSNCOxnGUjfGqyS8B9Env1Ew"
    //   }
    // }
    console.log("lawda");

    const response = await axios.get(url1,{headers:{
      authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhbW1vaGFuIiwiaWF0IjoxNzI4MjMyNzI1fQ.A8jKKMM3J4EJxojwdNahSNCOxnGUjfGqyS8B9Env1Ew"
        }})
    console.log(response);
    setData(response.data);
  }
  catch(error){
    console.error("error fetching data:",error);
  }
}
  useEffect(()=>{
    getdata();
  },[]);
  return (
    <>
    <p>hello</p>
    {data}
    </>
  )
}

export default App
