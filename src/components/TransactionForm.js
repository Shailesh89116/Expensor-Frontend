import * as React from 'react';
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';



export default function TransactionForm({fetchTransactions,editTransactions}) {

  const {categories}=useSelector(state=>state.auth.user)

    const [form,setForm]=useState({
        amount:0,
        desc:'',
        date: new Date(),
        category:''
      });


      useEffect(()=>{
        if(editTransactions.amount !== undefined){
          setForm(editTransactions);
        }
        
      },[editTransactions])

      const handleChange=(e)=>{
        setForm({...form,[e.target.name] : e.target.value});    
      }

      const handleDate=(newValue)=>{
        setForm({...form,date:newValue})
      }
    
      const [transactions,setTransactions]=useState([]);

    //   async function fetchTransactions(){
    //     const res=await fetch("http://localhost:4000/transactions");
    //     const {data } =await res.json();
    //     setTransactions(data);
    //     // console.log(data);
    //   }

      const handleSubmit=async(e)=>{
        e.preventDefault();
        const res=editTransactions.amount===undefined ? create() : update(); 
      }

      function reload(res){
        if(res.ok){
          setForm({
            amount:0,
            desc:'',
            date: new Date()
          });
          fetchTransactions();
        }
      }

      async function create(){
        const token=Cookies.get('token');
      
        const res= await fetch(`${process.env.REACT_APP_API_URL}/transactions`,{
          method:"POST",
          body:JSON.stringify(form),
          headers:{
            'content-type':"application/json",
            Authorization:`Bearer ${token}`
          }
        })
        reload(res);
      }

      async function update(){
        const token=Cookies.get('token');
        const res= await fetch(`http://localhost:4000/transactions/${editTransactions._id}`,{
          method:"PATCH",
          body:JSON.stringify(form),
          headers:{
            'content-type':"application/json",
            Authorization:`Bearer ${token}`
          }
        })
        reload(res);
      }
      
    
  return (
    <Card sx={{ minWidth: 275, marginTop:10 }}>
      <CardContent>
      <Typography variant="h6">Add New Transaction</Typography>
      <Box component="form" action="submit" onSubmit={handleSubmit} sx={{display:'flex'}} >
    {/* Amount Input */}
      <TextField sx={{marginRight:5}} size="small" id="outlined-basic" label="Amount" variant="outlined" onChange={handleChange} value={form.amount} name='amount' />
    {/* Description Input */}
      <TextField sx={{marginRight:5}} size="small" id="outlined-basic" label="Description" variant="outlined" onChange={handleChange} value={form.desc} name='desc' />
    {/*Category Input */}
    <Autocomplete
            value={form.category}
            onChange={(event, newValue) => {
              setForm({ ...form, category: newValue.label});
            }}
            id="controllable-states-demo"
            options={categories}
            sx={{ width: 200, marginRight: 5 }}
            renderInput={(params) => (
              <TextField {...params} size="small" label="Category" />
            )}
          />
    {/* Date Input */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="Transaction Date"
          inputFormat="DD/MM/YYYY"
          size="small"
          value={form.date}
          onChange={handleDate}
          renderInput={(params) => <TextField {...params} size="small" sx={{marginRight:5}}/>}
        />
    </LocalizationProvider>
    {editTransactions.amount !== undefined && <Button type="submit" variant="secondary">Update</Button>}
    {editTransactions.amount === undefined && <Button type="submit" variant="contained">Submit</Button>}
      </Box>
      </CardContent>
    </Card>
  );
}
