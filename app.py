from flask import *
import requests
import json
 
app = Flask(__name__)

app.secret_key = "abc" 

url = "http://3.89.27.245/api/v2/delispeedservice/_table/Reservations?fields=FirstName,StartTime,Phoneno,ReservationId&order=StartTime%20ASC&api_key=87844c86a2ba5720fdfd7e48df7922cd8e4dd8dca52a7bb357c8bcc8eb68075a"
    

@app.route('/fetch', methods = ['POST', 'GET'])
def fetch():
    response = requests.get(url)
    data = dict(response.json())['resource']
    len_ = len(data)
    dir_, num_ = int(request.form['dir']), int(request.form['num'])
    session['first'] = int(session['first']) + dir_*num_
    if session['first'] < 0:
        session['first'] = 0
    elif session['first'] >= len_:
        session['first'] = 0
    first = int(session['first'])
    if first + num_ >= len_:
        return {"start": first, "data": data[first : len_]} 
    else:
        return {"start": first, "data": data[first : first + num_]} 
    

@app.route('/')
def home():
    if 'login' in session:
        return render_template('index.html')
    else:
        return redirect('/login')

@app.route('/login')  
def login():
    return render_template('login.html')

@app.route('/auth/login', methods = ['POST'])
def auth_login():
    if request.form['Name']:
        session['profile'] = request.form
        session['login'] = True
        session['first'] = 0
        return {"success": True}
    return {"success": False}

@app.route('/auth/logout')  
def auth_logout(): 
    del session['login']
    del session['profile']
    del session['first']
    return redirect('/')

if __name__ == '__main__': 
    app.run() 
