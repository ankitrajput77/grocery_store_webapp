from flask import Flask, request, jsonify, render_template
import sql_connect , json
import manage_functions

app = Flask(__name__)
 
connection = sql_connect.connect_sql()


@app.route('/', methods = ['GET'])
def home_page():
    return "This is a starting page, give some endpoints to see some result"


@app.route('/getProducts', methods=['GET'])
def get_products():
    response = manage_functions.get_all_products(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/insertProduct', methods=['POST'])
def insert_product():
    request_payload = json.loads(request.form['data'])
    product_id = manage_functions.insert_new_product(connection, request_payload)
    response = jsonify({
        'product_id': product_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/updateProduct', methods= ['POST'])
def update_product():
    request_payload = json.loads(request.form['data'])
    product_id = manage_functions.update_a_product(connection,request_payload)
    response = jsonify({
        'product_id': product_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/deleteProduct', methods=['POST'])
def delete_product():
    return_id = manage_functions.delete_product(connection, request.form['product_id'])
    response = jsonify({
        'product_id': return_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/getAllOrders', methods=['GET', 'POST'])
def get_all_orders():
    response = manage_functions.get_all_orders(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/insertOrder', methods=['POST'])
def insert_order():
    request_payload = json.loads(request.form['data'])
    order_id = manage_functions.insert_order(connection, request_payload)
    response = jsonify({
        'order_id': order_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')    
    return response

@app.route('/orderDetails', methods=['GET','POST'])
def order_details():
    response = manage_functions.get_all_order_details(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/getUOM', methods=['GET'])
def get_uom():
    response = manage_functions.get_uoms(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Grocery Store Management System")
    app.run(port=5000, debug = True)
