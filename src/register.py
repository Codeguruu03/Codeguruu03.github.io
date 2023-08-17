from flask import Flask, render_template, request, redirect, url_for, send_file
import mysql.connector

app = Flask(__name__)

# Configuration for MySQL connection
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'NerdyGamer611',
    'database': 'travelbuddy'
}

@app.route('/')
def registration_form():
    return render_template('registration.html')

@app.route('/register', methods=['POST'])
def register():
    username = request.form['username']
    email = request.form['email']
    password = request.form['password']

    # Establish MySQL connection
    db_connection = mysql.connector.connect(**db_config)
    cursor = db_connection.cursor()

    # Insert data into the database
    query = "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)"
    values = (username, email, password)
    cursor.execute(query, values)

    db_connection.commit()
    cursor.close()
    db_connection.close()

    return 'Account registration successful !\n You Can Close This Tab and login from the Hoome Page'


if __name__ == '__main__':
    app.run(debug=True,port=5500)
