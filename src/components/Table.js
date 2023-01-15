import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import "./table.css"



function Table() {
 const[dataLog, setDataLog] = useState([]);
 const[logId,setLogId]=useState("");
 const[actionType,setActionType]=useState("");
 const[applicationType,setApplicationType]=useState("");
 const[applicationId,setApplicationId]=useState("");
 const[toDate,setToDate]=useState("");
 const[fromDate,setFromDate]=useState("");
 const[actionTypeList,setActionTypeList]=useState([]);
 const[applicationTypeList,setApplicationTypeList]=useState([]);

 
 useEffect(() => {
 getDataLog();
 
}, []);

//Function to fetch data from API provided
async function getDataLog() {
  let data=[];
  try{
    const response= await axios.get('https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f');
    data=response.data.result.auditLog;
    setDataLog(data);
  } catch (error){
    console.log(error);
  }

  //creating new array with unique value to display in the selector dropdown
  setActionTypeList([...new Set (data.map((x)=>x.actionType))]); 
  setApplicationTypeList([...new Set (data.map((x)=>x.applicationType))]);

}


//Filtering the Data based on User Input
function handleSearch() {
 
if(logId){
 setDataLog(dataLog.filter((e) =>e.logId == logId));
 console.log(JSON.stringify(setDataLog)); 
 }
if(actionType){
setActionType(dataLog.filter((e) =>e.actionTypeList==actionType));
}
if(applicationType){
  setApplicationType(dataLog.filter((e)=>e.applicationType==applicationType));
}
if(applicationId){
  setApplicationId(dataLog.filter((e)=>e.applicationId==applicationType));
}
if(toDate){
  setToDate(dataLog.filter((e)=>e.toDate==toDate));
}
if(fromDate){
  setFromDate(dataLog.filter((e)=>e.fromDate==fromDate));
}
}


 

//Defining columns of the table
  const columns = [
    {
      name: 'Log ID',
      selector: row => row.logId,
      sortable: true,
    },
  
    {
      name: 'Application Type',
      selector: row => row.applicationType,
      sortable: true,
    },
    {
      name: 'Application ID',
      selector: row => row.applicationId,
      sortable: true,
    },
    {
      name: 'Action',
      selector: row => row.actionType,
      sortable: true,
    },
    {
      name: 'Action Details',
      selector: row => row.actionType,
    },
    {
      name: 'Date:Time',
      selector: row => row.creationTimestamp,
    },
  
  
  ];
  
  
  return ( 
    <div className="body">
    <div className="input-container">
    <div>
    <p>Log ID</p>
    <input label="LogID" type="text" placeholder="eg. 182297412602900 " value={logId} onChange={(e)=>{setLogId(e.target.value)}}/>
    </div>
    <div>
    <p>Action Type</p>
    <select name="Action Type" onChange={(e)=>{setActionType(e.target.value)}}>
      <option value=""></option>
      {
        actionTypeList.map((x,index) =>{
          return(
            <option key={index} value={x}>{x}</option>
          )
        })
      }
      
    </select>
    </div>
    <div>
    <p>Application Type</p>
    <select name="Application Type" onChange={(e)=>{setApplicationType(e.target.value)}}>
      {
        applicationTypeList.map((x,index) =>{
          return(
            <option key={index} value={x}>{x}</option>
          )
        })
      }
    </select>
    </div>
    <div>
    <p>From Date</p>
    <input label="FromDate" type="date" placeholder="dd/mm/yyyy" value={fromDate} onChange={(e)=>{setFromDate(e.target.value)}} />
    </div>
    <div>
    <p>To Date</p>
    <input label="ToDate" type="date" placeholder="dd/mm/yyyy" value={toDate} onChange={(e)=>{setToDate(e.target.value)}} />
    </div>
    <div>
    <p>Application Id</p>
    <input label="ApplicationID" type="text" placeholder="eg. 999981634772447" value={applicationId} onChange={(e)=>{setApplicationId(e.target.value)}} />
    </div>
    <button onClick={handleSearch}>Search Logger</button>
    </div>

  <div className='table-container'>
  <DataTable 
  columns={columns} 
  data={dataLog} 
  pagination 
  fixedHeader
  fixedHeaderScrollHeight='550px'
  highlightOnHover />
  </div>
  </div>
  );
};

export default Table;