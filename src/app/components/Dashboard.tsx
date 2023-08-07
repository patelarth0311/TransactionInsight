"use client"
import { SetStateAction, useEffect, useState } from "react"
import { myAxios } from "../axiosConfig"
import { TransactionView } from "./TransactionView"

import * as Realm from "realm-web";
import { useApp } from "../RealmApp"
import { TransactionType } from "./types"

import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import '../panel.css'



export function Dashboard() {
 
    const [accessToken, setAccessToken] = useState('')
    const [transactions,setTransactions]    = useState<TransactionType[]>([])
    const [displayedTransactions,setDisplayedTransactions]    = useState<TransactionType[]>([])

    const sdk = new ChartsEmbedSDK({
        baseUrl: "https://charts.mongodb.com/charts-transactions-bgefp",
      });
      
      const dashboard = sdk.createDashboard( {
        dashboardId: "64d00483-7ddc-4f61-8e90-f6918673d77d", // REPLACE with the Dashboard ID
        height: "1500px",
        widthMode: "scale",
        heightMode: "scale",
        background: 'transparent',
        theme: 'dark'
        // Additional options go here
      })





    useEffect(() => {

        
          
          dashboard.render(document.getElementById("dashboard")!);
     

    },[])





    const app = useApp()


    useEffect(() => {
        if (app?.currentUser) { 
            const mongo = app.currentUser.mongoClient("mongodb-atlas")
            const collection = mongo.db("Portfolio").collection("Transaction"); 
            var fetch = async () => await collection.find({ amount: { $gt: 0  }}).then((res: TransactionType[]) => {
                setTransactions(res)
                setDisplayedTransactions(res.slice(0,5))
    
            })
          
            fetch()
        }
       
    },[app])

    return  <div className="flex items-center  flex-col gap-[10px] p-10 font-['poppins'] ">
        <div className="flex flex-col items-center" >
        <div>
        <h1 className="text-xl m-10 text-left ">Transactions Insights</h1>
        <div id = "dashboard" className="w-screen p-10">

        </div>
        <div id = "chart"></div>

        </div>
  
     
           
        <div className="flex flex-col">
        <h1 className="text-xl m-5 text-left">Latest Transactions</h1>
       
        {displayedTransactions.map((item,index) => (

<TransactionView key={index} merchant_name={item.merchant_name} amount={item.amount} date={item.date} category={item.category} location={item.location } ></TransactionView>

))

} 
        </div>

       
        </div>

    </div>
    
}

