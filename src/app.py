from flask import Flask, render_template
import subprocess

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('control_panel.html')

@app.route('/start')
def start_app():
    result = subprocess.run(['gunicorn', 'app:app'], capture_output=True, text=True)
    return f"Application started:\n{result.stdout}"

@app.route('/stop')
def stop_app():
    # Implement your stop logic here
    return "Application stopped."

if __name__ == '__main__':
    app.run(debug=True)
