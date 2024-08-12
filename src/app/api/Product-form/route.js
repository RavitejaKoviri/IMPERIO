// app/api/products/route.js
import { NextResponse } from 'next/server';
import pool from '../../../utils/db';
import { ModuleResolutionKind } from 'typescript';

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Received body:", body);

    const {
      categoryId,
      subCategoryId,
      productName,
      description,
      specification,
      originalPrice,
      currentPrice,
      discount
    } = body;

    const requiredFields = ['categoryId', 'subCategoryId', 'productName', 'description', 'specification', 'originalPrice', 'currentPrice', 'discount'];
    const missingFields = requiredFields.filter(field => !body[field]);
    if (missingFields.length > 0) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields',
        missingFields
      }, { status: 400 });
    }

    console.log("Received body:", body);

    // Generate current date, time, and day
    const now = new Date();
    const addedDate = now.toISOString().split('T')[0];
    const addedTime = now.toTimeString().split(' ')[0];
    const addedDay = now.toLocaleString('en-US', { weekday: 'long' });

    const sql = `
      INSERT INTO products (
        categoryId, subCategoryId, productName, originalPrice, currentPrice,
        discount, description, specification,
        addedDate, addedTime, addedDay
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING productId
    `;

    const inputs = [
      categoryId, subCategoryId, productName, originalPrice, currentPrice,
      discount, description, specification,
      addedDate, addedTime, addedDay
    ];

    const result = await pool.query(sql, inputs);
    if(result.rowCount>0)
    {
      // const resultrows=await pool.query("select * from products");
      // console.log(resultrows,"jkfgkjds")
      console.log(result,"asdfg")
       const overallRatingQuery="INSERT INTO public.ratings (productid, overallrating, addeddate, addedtime, addedday) VALUES($1,5, '2024-07-29', '10:00:00', 'Monday')"
       const query=await pool.query(overallRatingQuery,[result.rows[0].productid]);
       console.log(query,"query rating")
    }
    const insertedProductId = result.rows[0].productid;

    return NextResponse.json({ success: true, productId: insertedProductId }, { status: 201 });
  } catch (error) {
    console.error('Server Error:', error);
    if (error.code === '23503') {
      return NextResponse.json({ 
        success: false, 
        error: 'Foreign key constraint violation', 
        details: 'The provided categoryId or subCategoryId does not exist in the database.'
      }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Server Error', details: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    let baseurl=request.url.split("?")[1].split("=")[1];
    console.log(baseurl);
     let resQuery="";
    if(baseurl==='categories')
    {
       resQuery = `SELECT * from `+baseurl;
    }
    else
    {
      console.log("else block");
      let urlBase=request.url.split("?")[1].split("&")[1].split("=")[1];
      console.log(urlBase);
      var s = urlBase;
      resQuery = `SELECT * FROM subcategories 
            JOIN categories ON categories.categoryid = subcategories.categoryid
            WHERE subcategories.categoryid = $1`;
    }
    

    console.log("Executing SQL query...");
    let result;
    if(baseurl==='categories')
    {
     result = await pool.query(resQuery);
    }
    else
    result = await pool.query(resQuery,[s]);
    console.log("Query executed successfully");

    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error occurred:", error);

    return new Response(JSON.stringify({ success: false, error: 'Server Error', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
