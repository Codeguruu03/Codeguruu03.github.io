from flask import Flask, render_template, request, redirect, url_for, send_file, session
import mysql.connector

app = Flask(__name__)
app.secret_key='abcdef'

# Configuration for MySQL connection
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'NerdyGamer611',
    'database': 'travelbuddy'
}

@app.route('/')
def login_form():
    return render_template('login.html')


@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    # Establish MySQL connection
    db_connection = mysql.connector.connect(**db_config)
    cursor = db_connection.cursor()

    query = "SELECT * FROM users WHERE username = %s AND password = %s"
    values = (username, password)
    cursor.execute(query, values)

    user = cursor.fetchone()
    cursor.close()
    db_connection.close()

    if user:
        session['username'] = user[1]  # Store username in session
        return redirect('https://deepesh611.github.io/deep-home.html')  # Redirect to the home page
    else:
        return "Invalid login credentials. Please try again."

if __name__ == '__main__':
    app.run(debug=True, port=5000)
