import dotenv from 'dotenv';
import pool from 'utils/db';
dotenv.config();



export async function POST(req) {
  try {
    const {id,proid,comment,rating} = await req.json();
    
    const now = new Date();
    const addedDate = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const addedTime = now.toTimeString().split(' ')[0]; // HH:MM:SS
    const addedDay = now.toLocaleString('en-US', { weekday: 'long' }); // Full day name (e.g., Monday)

    const sql = `INSERT INTO reviews (userid,productid,reviewcomment,rating, addeddate, addedtime, addedday) VALUES ($1, $2, $3, $4, $5,$6,$7)`;
    const inputs = [id,proid,comment,rating, addedDate, addedTime, addedDay];

    const result = await pool.query(sql, inputs);
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Server Error', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


export async function GET(req) {
  try {
    console.log(req.url,"request url");
    const productId=req.url.split("?")[1];
    let result;
    if(productId!="AllProducts")
    {
      console.log("if");
    const sql='select  productname,reviewcomment,reviews.userid,users.firstname,rating from reviews join products on products.productid = reviews.productid join users on users.userid = reviews.userid where products.productid=$1 order by reviewid DESC';
     result = await pool.query(sql,[productId]);
    }
    else
    {
      console.log("else block");
      const sql='select firstname,reviewcomment,reviews.productid,products.productname  from reviews join users on users.userid = reviews.userid join products ON products.productid = reviews.productid';
      result = await pool.query(sql);
    }
    console.log("in route",result);
    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Server Error', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}