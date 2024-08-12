import { NextResponse } from 'next/server';
import pool from 'utils/db';
import dotenv from 'dotenv';
dotenv.config();

export async function POST(request) {
  const emailOrMobile=await request.json();
  console.log(emailOrMobile)
  try{
    const sql="select * from users where phonenumber=$1"
    const result=await pool.query(sql,[emailOrMobile]);
    const validuserid=result.rows[0].userid;
    if(result.rowCount==1)
    {
      const otp=Math.floor(10000 + Math.random() * 90000);
      const sql="insert into otp(otpnumber,userid) values($1,$2)"
      const result1=await pool.query(sql,[otp,validuserid])
      if(result1.rowCount==1){
        const result2=await pool.query("select otpnumber from otp order by id desc limit 1")
        console.log(result2.rows[0].otpnumber)
      
      return new Response(JSON.stringify({success:"true",otp:result2.rows[0].otpnumber}), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    }else{
      return new Response(JSON.stringify("false"), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

  }
  catch(error)
    {
        console.error('GET Error:', error);
        return new Response(JSON.stringify({ success: false, error: 'Server Error', details: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
}