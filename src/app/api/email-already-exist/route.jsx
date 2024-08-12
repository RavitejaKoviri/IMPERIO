import dotenv from 'dotenv';
import pool from 'utils/db';
dotenv.config();


export async function GET(request) {
    const param = request.url.split('?')[1].split('=')[1];
    const column= request.url.split('?')[1].split('=')[0];
   if (column === "email"){
    try {
        const sql="SELECT email FROM users WHERE email=$1  ";
        const inputs = [param]
        const result = await pool.query(sql,inputs);
        console.log(result)
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
   else if (column === "phone"){
    try {
        const sql="SELECT phonenumber FROM users WHERE phonenumber=$1  ";
        const inputs = [param]
        const result = await pool.query(sql,inputs);
        console.log(result)
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
  } 