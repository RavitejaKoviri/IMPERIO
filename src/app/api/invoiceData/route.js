import { log } from 'console';
import dotenv from 'dotenv';
import pool from 'utils/db';
const { GET: getHandler } = require('./route.js'); 
dotenv.config();

export async function POST(req) {
  try {
    const { invoiceNumber, invoiceImage} = await req.json();

    // Log received data
    console.log("Received data:", { invoiceNumber, invoiceImage});

    // Validate input data
    if (!invoiceNumber || !invoiceImage) {
      console.error("Missing required fields");
      return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sql = 'INSERT INTO invoices (invoiceNumber,invoiceImage) VALUES ($1, $2)';
    const inputs = [invoiceNumber, invoiceImage];

    // Execute the query
    const response = await pool.query(sql, inputs);
    console.log( response.rowCount);//to hold the no of rows inserted and recorded in this response
    console.log("Data inserted successfully");
    
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Server Error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Server Error', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function GET(request) {
  try {
    // const resUrl=request.url.split('?')[1].split('=')[1];
    const Load="SELECT * FROM invoices order by id desc limit 10";
    // let updated="select * from invoices order by id desc limit 1";
    // let resQuery = (resUrl === "onLoad") ? Load : updated;

    const result = await pool.query(Load);
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
