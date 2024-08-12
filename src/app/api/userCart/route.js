import dotenv from 'dotenv';
import { ConversationContextImpl } from 'twilio/lib/rest/conversations/v1/conversation';
import pool from 'utils/db';
dotenv.config();

//$sam
export async function POST(req) {
    try {
        const now = new Date();
        const addedDate = now.toISOString().split("T")[0]; // YYYY-MM-DD
        const addedTime = now.toTimeString().split(" ")[0]; // HH:MM:SS
        const addedDay = now.toLocaleString("en-US", { weekday: "long" });// Full day name (e.g., Monday)
        console.log("entered in cart crud");
        const { id, userid, qty, remainingqty } = await req.json();
        console.log(id, userid, qty, remainingqty, "in crud cart");
        // check if product already exist in cart table if not exist add product else increase increment quantity
        const checkProductAlreadyExsitInCart = 'select * from cart where productid=$1 and userid=$2';
        const resultProductCount = await pool.query(checkProductAlreadyExsitInCart, [id, userid]);
        console.log(resultProductCount, "jsonresult");
        if (resultProductCount.rowCount > 0) {//if product exists updating quantity
            if (qty == 0) {//if qty of product is zero then product will be deleted 
                const deleteProductFromCart = 'delete from cart where userid=$1 and productid=$2';
                const deleteResult = await pool.query(deleteProductFromCart, [userid, id]);
                return new Response("product deleted", {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

            }
            else {
                const updateProductQtyInCart = 'update cart set quantity=$1 where userid=$2 and productid=$3';
                const updatedProductQty = await pool.query(updateProductQtyInCart, [qty, userid, id]);
                console.log(updatedProductQty, "qtyincreased");
                return new Response("product quantity increased", {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }

        }
        else {//if product not exist with user it will insert as new record 
            const insertProductToCartQuery = "insert into cart(productid,userid,quantity,remaining_quantity,addeddate,addedtime,addedday) values($1,$2,$3,$4,$5,$6,$7)";
            const resultQuery = await pool.query(insertProductToCartQuery, [id, userid, qty, qty, addedDate, addedTime, addedDay]);
            return new Response("product added to cart", {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    }
    catch (error) {
        return new Response("Failed adding to cart server error please try agian after some time", {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

}

// getting cart data 
export async function GET(req) {
    console.log("url", req);
    try {
        const userid = req.url.split("?")[1];
        const getCartDataQuery = "select cart.cartid,cart.productid,cart.userid,cart.quantity,inventoryy.remaining_qty,inventoryy.selling_price from cart join inventoryy on cart.productid=inventoryy.product_id where cart.userid=$1;";
        const resultCartData = await pool.query(getCartDataQuery, [userid]);
        console.log(resultCartData.rows, "getCartData");
        return new Response(JSON.stringify(resultCartData.rows), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        return new Response("Internal server Error Failed in Fetching Cart Details from Server", {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}