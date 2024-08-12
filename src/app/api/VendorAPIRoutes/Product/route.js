import { NextResponse } from 'next/server';
import dotenv from 'dotenv';
import { forEach } from 'lodash';
import pool from 'utils/db';
dotenv.config();


export async function POST(request) {
  try {
    const
      {
        categoryId,
        currentPrice,
        description,
        discount,
        originalPrice,
        productName,
        specification,
        subCategoryId,
        color
      } = await request.json();

    console.log("color", color)

    // Generate current date, time, and day
    const now = new Date();
    const addedDate = now.toISOString().split('T')[0];
    const addedTime = now.toTimeString().split(' ')[0];
    const addedDay = now.toLocaleString('en-US', { weekday: 'long' });

    const sql = `
      INSERT INTO products (
        categoryid, subCategoryid, productname, originalprice, currentprice,
        discount, description, specification,
        addedDate, addedTime, addedDay,status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12)
      RETURNING productId
    `;

    const inputs = [
      categoryId, subCategoryId, productName, originalPrice, currentPrice,
      discount, description, "specification",
      addedDate, addedTime, addedDay,'active'
    ];

    const result = await pool.query(sql, inputs);

    console.log("result", result.rowCount);
    if (result.rowCount) {
      const prodId = "select * from products where addeddate=$1 and addedtime=$2 and addedday=$3";
      const resultProdId = await pool.query(prodId, [addedDate, addedTime, addedDay]);
      console.log(resultProdId.rows[0].productid, "returning prodId");
      console.log("specification", specification);

      const baseString = "insert into specification(productid, specification_name, specification_value)";
      const spec = specification.split(";");
      let counter = 2;
      let string1 = ""; // Initialize string1 outside the loop
      let insertQuery = "";

      // Generate the dynamic part of the query
      for (let i = 0; i < (spec.length - 1) / 2; i++) {
        let s = "$" + counter++;
        let s1 = "$" + counter++;
        string1 += (i === 0 ? " values($1," + s + "," + s1 + ")" : ",($1," + s + "," + s1 + ")");
      }

      let sqlValues = []
      sqlValues[0] = resultProdId.rows[0].productid;
      for (let j of spec) {
        sqlValues.push(j);  // Correct usage of the push method
      }
      sqlValues.splice(-1, 1);


      insertQuery = baseString + string1;

      console.log(insertQuery, "result query");
      console.log(sqlValues, "arrayValues");
      const resultSpecification = await pool.query(insertQuery, sqlValues);
      console.log("resultSpecification", resultSpecification);
      if (resultSpecification) {
        const basecolorString = "insert into productsizecolors(productid,colorid)";
        let holderCounter = 2;
        let string2 = "";
        for (let i = 0; i < color.length; i++) {
          let s = "$" + holderCounter++;
          string2 += (i === 0 ? " values($1," + s + ")" : ",($1," + s + ")");
        }
        const insertcolorquery = basecolorString + string2;
        console.log("insertcolorquery", insertcolorquery)
        let values = [];
        values[0] = resultProdId.rows[0].productid;
        for (let i = 0; i < color.length; i++) {
          values.push(color[i].colorid);
        }
        console.log("valules...", values);
        const resultColor = await pool.query(insertcolorquery, values);
        if (resultColor) {
          const overallRatingQuery = "INSERT INTO public.ratings (productid, overallrating, addeddate, addedtime, addedday) VALUES($1,5,$2,$3,$4)"
          const query = await pool.query(overallRatingQuery, [sqlValues[0], addedDate, addedTime, addedDay]);
          console.log(query, "query rating")
        }
      }

    }
    return NextResponse.json({ success: true }, { status: 200 })

  }
  catch (error) {
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

export async function GET() {
  console.log("hi")
  try{
    const sql="SELECT p.*,c.categoryid,c.categoryname,s.subcategoryid,s.subcategoryname,p.currentprice FROM products p JOIN subcategories s ON p.subcategoryid = s.subcategoryid JOIN categories c ON s.categoryid = c.categoryid where p.status='active'";
    const result=await pool.query(sql);
    console.log("result",result.rowCount)
    return new Response(JSON.stringify(result.rows))
}
catch(error){
    console.error("Error occurred:", error);
    return new Response(JSON.stringify({ success: false, error: 'Server Error', details: error.message }))
}
}


export async function PATCH(request) {
  try {
    const
      {
        description,
        productName,
        specification,
        colors,
        productId
      } = await request.json();
    console.log("description", description, "productName", productName, "specification", specification, "colors", colors, "productId", productId)
    const sql = "update products set productname=$1,description=$2 where productid=$3";
    const sqlvalues = [productName, description, productId]
    const result = await pool.query(sql, sqlvalues);
    console.log("result", result.rowCount);
    if (result.rowCount > 0) {
      console.log("hi")
      // Delete old specifications for the productId
      const deleteSpecSql = "DELETE FROM specification WHERE productid=$1";
      const result=await pool.query(deleteSpecSql, [productId]);
      console.log("spec deleted");
      const baseString = "insert into specification(productid, specification_name, specification_value)";
      let counter = 2;
      let string2= "";
      for (let i = 0; i < specification.length; i++) {
        let s = "$" + counter++;
        let s1 = "$" + counter++;
        string2 += (i === 0 ? " values($1," + s + "," + s1 + ")" : ",($1," + s + "," + s1 + ")");
      }
      const insertcolorquery = baseString + string2;
      console.log("insertcolorquery",insertcolorquery)
      let values=[];
      values[0]=productId;
      for(let i=0;i<specification.length;i++)
      {
        values.push(specification[i].name)
        values.push(specification[i].value)
      }
      console.log("values",values)
      const specificationResult=await pool.query(insertcolorquery,values)
      console.log("specificationResult",specificationResult.rowCount)
      if(specificationResult.rowCount)
      {
        const deleteSpecSql = "DELETE FROM productsizecolors WHERE productid=$1";
        const result=await pool.query(deleteSpecSql, [productId]);
        console.log("color deleted",result.rowCount)
        const basecolorString = "insert into productsizecolors(productid,colorid)";
        let holderCounter = 2;
        let string2 = "";
        for (let i = 0; i < colors.length; i++) {
          let s = "$" + holderCounter++;
          string2 += (i === 0 ? " values($1," + s + ")" : ",($1," + s + ")");
        }
        const insertcolorquery = basecolorString + string2;
        let values=[];
        values[0]=productId;
        for(let i=0;i<colors.length;i++)
        {
          values.push(colors[i].colorid)
        }
        console.log("vales",values);
        console.log("insertcolorquery",insertcolorquery);
        const resultColor=await pool.query(insertcolorquery,values);
        console.log("resulColor",resultColor);
      }
    }
    return NextResponse.json({ success: true }, { status: 200 })
  }
  catch (error) {
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

export async function DELETE(request){
  const param=request.url.split("?")[1].split("=")[1];
  console.log("param",param)
  try{
    const result=await pool.query("update products set status='inactive' where productid=$1",[param]);
    console.log("result",result.rowCount);
    return NextResponse.json({ success: true }, { status: 200 })
  }
  catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ success: false, error: 'Server Error', details: error.message }, { status: 500 });
  }
}