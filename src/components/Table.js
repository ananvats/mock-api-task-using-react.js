import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import moment from 'moment';
import "./table.css"



function Table() {
 const [auditLogArray, setAuditLogArray] = useState([]);
 const [logId,setLogId]=useState("");
 const [actionType,setActionType]=useState("");
 const [applicationType,setApplicationType]=useState("");
 const [applicationId,setApplicationId]=useState("");
 const [toDate,setToDate]=useState("");
 const [fromDate,setFromDate]=useState("");
 const [actionTypeList,setActionTypeList]=useState([]);
 const [applicationTypeList,setApplicationTypeList]=useState([]);
 const [filterAuditArray, setFilterAuditArray] = useState([]);

 
 useEffect(() => {
 getAuditLogArray();
 
}, []);

//Function to fetch data from API provided
async function getAuditLogArray() {
  let data=[];
  try{
    const response= await axios.get('https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f');
    data=response.data.result.auditLog;
    setAuditLogArray(data);
    setFilterAuditArray(data);
  } catch (error){
    console.log(error);
  }

  //creating new array with unique value to display in the selector dropdown
  setActionTypeList([...new Set (data.map((x)=>x.actionType))]); 
  setApplicationTypeList([...new Set (data.map((x)=>x.applicationType))]);

}


//Filtering the Data based on User Input
function handleSearch() {
  let isEmpty=true;
let filteredlist=auditLogArray;
console.log(logId,actionType,applicationId,applicationType,toDate,fromDate,isEmpty)
 
 if(logId){
   filteredlist=filteredlist.filter((e) =>e.logId == logId); 
   isEmpty=false;
 }
if(actionType){
  filteredlist=filteredlist.filter((e) =>e.actionType==actionType);
  isEmpty=false;
}
if(applicationType){
  filteredlist=filteredlist.filter((e)=>e.applicationType==applicationType);
  isEmpty=false;
}
if(applicationId){
  filteredlist=filteredlist.filter((e)=>e.applicationId==applicationId);
  isEmpty=false;
}
if(toDate){
  filteredlist=filteredlist.filter((e)=>moment(e.creationTimestamp,"YYYY-MM-DD hh:mm:ss").isBefore(toDate,'day'));
  isEmpty=false;
}
if(fromDate){
  filteredlist=filteredlist.filter((e)=>moment(e.creationTimestamp,"YYYY-MM-DD hh:mm:ss").isAfter(fromDate));
  console.log(filteredlist);
  isEmpty=false;
}
if(isEmpty){
  filteredlist=auditLogArray;
}

setFilterAuditArray(filteredlist);
console.log(filterAuditArray);
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
      sortable: true,
    },
    {
      name: 'Date:Time',
      selector: row => row.creationTimestamp,
      sortable: true,
    },
  
  
  ];

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: 'ALL',
  };
  
  
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
    <input label="FromDate" type="date" placeholder="DD/mm/YYYY" value={fromDate} onChange={(e)=>{setFromDate(e.target.value)}} />
    </div>
    <div>
    <p>To Date</p>
    <input label="ToDate" type="date" placeholder="DD/mm/YYYY" value={toDate} onChange={(e)=>{setToDate(e.target.value)}} />
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
  data={filterAuditArray} 
  pagination 
  paginationComponentOptions={paginationComponentOptions}
  fixedHeader
  fixedHeaderScrollHeight='550px'
  highlightOnHover/>
  </div>
  </div>
  );
};

export default Table;