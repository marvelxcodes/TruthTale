from flask import Flask, request, jsonify
from ml.model import predict
from ml.train_model import retrain
import sqlite3
import csv

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    review = predict(data['review'])
    result = {'reason': review['reasoning'], "probability": review['probability'], 'class' : review['class']}

    return jsonify(result)

@app.route('/report', methods=['POST'])
def report():
    report_data = request.get_json()
    print(report_data)
    conn = sqlite3.connect('reports.db')
    c = conn.cursor()

    c.execute('''CREATE TABLE IF NOT EXISTS reports
                 (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT, review TEXT)''')

    c.execute("INSERT INTO reports (message, review) VALUES (?, ?)", 
              (report_data['message'], report_data['review']))

    with open('reviews.csv', 'a') as f:
        writer = csv.writer(f)
        writer.writerow([report_data['review'], '1' if report_data['class'] == 'Fake' else '0'])
        
    retrain()
    conn.commit()
    conn.close()

    return jsonify(report_data)

if __name__ == '__main__':
    app.run(debug=True)