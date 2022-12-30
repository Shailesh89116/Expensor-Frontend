import React from 'react';
import { useEffect, useState } from "react";
import Container from '@mui/material/Container';
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import Cookies from 'js-cookie';

const Home = () => {
    const [form,setForm]=useState({
        amount:0,
        desc:'',
        date:''
      });
    
      const [transactions,setTransactions]=useState([]);
      const [editTransactions,setEditTransactions]=useState({});  
    
      async function fetchTransactions(){
        const token=Cookies.get('token');
        const res = await fetch(`${process.env.REACT_APP_API_URL}/transactions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const {data } =await res.json();
        setTransactions(data);
       
      }
    
      useEffect(()=>{
        fetchTransactions();
      },[]);
    
  return (
    <div>
       <Container>
      <TransactionForm fetchTransactions={fetchTransactions} editTransactions={editTransactions} />
      <TransactionList transactions={transactions} fetchTransactions={fetchTransactions} setEditTransactions={setEditTransactions}/>
      </Container>
    </div>
  )
}

export default Home
