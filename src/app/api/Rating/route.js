import dotenv from 'dotenv';
import { success } from 'theme/theme-colors';
import pool from 'utils/db';
dotenv.config();


export async function POST(req)
{
    try{
        console.log("req for overal",req.url.split("?")[1].split("&")[1].split("=")[1]);
        const prodId=req.url.split("?")[1].split("=")[1].split("&")[0];
        console.log("prod id ss" , prodId);
        const overalRating=req.url.split("?")[1].split("&")[1].split("=")[1];
        console.log("product id , overalRating",prodId,overalRating);
        const sql='update ratings set overallrating=$1 where productid=$2';
        const result=await pool.query(sql,[overalRating,prodId]);
        console.log(result,"result in overla");
        if(result.rowCount){
            return new Response(JSON.stringify({success:true}),{
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        
        return new Response(JSON.stringify({success:false}),{
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    catch(error)
    {
        console.log("error message",error);
        return new Response(JSON.stringify({ success: false, error: 'Server Error', details: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
    }

}

export async function GET(req){
    try{
        console.log(req.url.split("?")[1].split("=")[1],"in rating get call");
        const prodId=req.url.split("?")[1].split("=")[1];
        const sql="select overallrating from ratings where productid=$1";
        const result=await pool.query(sql,[prodId]);
        console.log(result,"helloooo");
        console.log(result.rows[0].overallrating,"overalllll")
        const log= result.rows[0].overallrating;
        return new Response(log,{
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          })
    }
    catch(error)
    {
        return new Response(JSON.stringify({ success: false, error: 'Server Error', details: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
    }
}