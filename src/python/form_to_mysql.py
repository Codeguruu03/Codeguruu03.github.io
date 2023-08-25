# from flask import Flask, render_template, request, redirect,url_for, send_file
# import mysql.connector
# from mysql.connector import Error

# app = Flask(__name__)

# @app.route('/')
# def index():
#     return render_template('form.html')

# @app.route('/submit', methods=['POST'])
# def submit():
#     try:
#         data = {
#             'full_name': request.form['full-name'],
#             'country_code': request.form['country-code'],
#             'phone_number': request.form['phone-number'],
#             'email': request.form['email'],
#             'nationality': request.form['nationality'],
#             'num_tourists': request.form['num-tourists'],
#             'package': request.form['package']
#             # Get other form fields here
#         }

#         connection = mysql.connector.connect(
#             host='localhost',
#             user='root',
#             database='travelbuddy',
#             password='NerdyGamer611'
#         )

#         if connection.is_connected():
#             cursor = connection.cursor()

#             query = "INSERT INTO travel_data (full_name, country_code, phone_number, email, nationality, num_tourists, package) VALUES (%s,%s,%s,%s,%s,%s,%s)"
#             values = (data['full_name'], data['country_code'], data['phone_number'], data['email'], data['nationality'], data['num_tourists'], data['package'])
#             cursor.execute(query, values)
#             connection.commit()

#             cursor.close()
#             connection.close()

#             return 'Data inserted successfully'

#     except Error as e:
#         print("Error",e)
#         return f"Error: {e}"

# if __name__ == '__main__':
#     app.run(debug=True)


from flask import Flask, render_template, request, redirect,flash
import mysql.connector
import time
app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'naman123!@#G',
    'database': 'travelbuddy'
}

@app.route('/')
def pkg_form():
    return render_template('form.html')

@app.route('/src/backend/stash', methods=['POST'])
def submit():
    
    full_name = request.form['full-name']
    country_code = request.form['country-code']
    phone_number = request.form['phone-number']
    mail = request.form['email']
    nation = request.form['nationality']
    tourists_num = request.form['num-tourists']
    plan = request.form['package']
    month_of_travel = request.form['month-of-travel']
    
    db_connection = mysql.connector.connect(**db_config)
    cursor = db_connection.cursor()
    print('connected')
    
    query = "INSERT INTO travel_data (full_name, country_code, phone_number, email, nationality,num_tourists,package,month_of_travel) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)"
    values = (full_name, country_code, phone_number,mail,nation,tourists_num,plan,month_of_travel)
    cursor.execute(query,values)
    
    db_connection.commit()
    cursor.close()
    db_connection.close()
    
    flash("Data Saved, redirecting you to home page...")
    return redirect("https://deepesh611.github.io/deep-home.html")

if __name__ == "__main__":
    app.run(debug=True,port = 5550)