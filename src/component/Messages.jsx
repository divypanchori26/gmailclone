import React, { useState } from 'react'
import { Message } from './Message'
import { onSnapshot, orderBy , query } from 'firebase/firestore'
import { useEffect } from 'react'
import { db } from '../firebase'
import { collection } from 'firebase/firestore'
import { setEmails } from '../redux/appSlice'
import { useDispatch, useSelector } from 'react-redux'
export const Messages = () => {
  const [tempEmails,setTempEmails] = useState();
  const dispatch = useDispatch();
  const {searchText,emails} = useSelector(store=>store.appSlice)
 // it will call first 
  useEffect(()=>{
    const q = query(collection(db,"emails"),orderBy('createdAt','desc'));
    const unsubscribe = onSnapshot(q,(snapshort)=>{
      const allEmails = snapshort.docs.map((doc)=>({...doc.data(), id:doc.id}));
      console.log(allEmails);
      dispatch(setEmails(allEmails));
    })
    // cleanup
    return ()=> unsubscribe();
  },[])
  useEffect(()=>{
    const filteredEmail = emails?.filter((email)=> {
      return email?.subject?.toLowerCase().includes(searchText.toLowerCase()) || email?.to?.toLowerCase().includes(searchText.toLowerCase()) || email?.message?.toLowerCase().includes(searchText.toLowerCase())
    })
    setTempEmails(filteredEmail)
  },[searchText,emails])
  return (
    <div>
      {
        tempEmails && tempEmails?.map((email)=><Message email={email}/>)
      }
      <Message/>
    </div>
  )
}
