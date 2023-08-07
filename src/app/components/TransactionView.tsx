
import { TransactionType } from "./types"
export function TransactionView({merchant_name,amount,date,category, location}: TransactionType) {
    return <div className="bg-[#121212] flex font-['poppins'] justify-between flex-row w-[500px] shadow h-[80px] rounded-lg p-3 m-5 text-white ">

        <div className="flex flex-col">
        <h1 data-testid="merchant_name">{merchant_name}</h1>
        <h1>{location.region}</h1>
        <h1 data-testid="date">{date}</h1>
        </div>

        <h1 data-testid="amount">   {`$${amount}`}</h1>

        
  

    </div>
}