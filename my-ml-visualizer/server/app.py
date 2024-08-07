from flask import Flask, jsonify, request
from flask_cors import CORS
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor, AdaBoostRegressor
from sklearn.svm import SVR
from sklearn.ensemble import BaggingRegressor
import numpy as np
import os


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Sample dataset
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2, 4, 6, 8, 10])

@app.route('/predict', methods=['POST'])
def predict():
    input_data = request.json['input']
    input_array = np.array(input_data).reshape(-1, 1)
    params = request.json.get('params', {})

    print("Received parameters:", params)  # Debugging

    # Initialize models with hyperparameters
    models = {
        "linear_regression": LinearRegression(),
        "ridge_regression": Ridge(alpha=float(params.get('ridge_alpha', 1.0))),
        "lasso_regression": Lasso(alpha=float(params.get('lasso_alpha', 1.0))),
        "decision_tree": DecisionTreeRegressor(max_depth=int(params.get('tree_max_depth', None)) if params.get('tree_max_depth', None) else None),
        "random_forest": RandomForestRegressor(n_estimators=int(params.get('forest_n_estimators', 100))),
        "svm": SVR(C=float(params.get('svm_C', 1.0))),
        "bagging": BaggingRegressor(base_estimator=DecisionTreeRegressor(), n_estimators=int(params.get('bagging_n_estimators', 10))),
        "gradient_boosting": GradientBoostingRegressor(n_estimators=int(params.get('boosting_n_estimators', 100)), learning_rate=float(params.get('boosting_learning_rate', 0.1))),
        "ada_boosting": AdaBoostRegressor(n_estimators=int(params.get('boosting_n_estimators', 50)), learning_rate=float(params.get('boosting_learning_rate', 1.0))),
    }

    # Train models
    for model in models.values():
        model.fit(X, y)

    predictions = {name: model.predict(input_array).tolist() for name, model in models.items()}
    return jsonify(predictions)

@app.route('/gradient-descent', methods=['POST'])
def gradient_descent():
    x = np.linspace(-10, 10, 100)
    y = x ** 2  # Quadratic function

    learning_rate = float(request.json.get('learning_rate', 0.1))
    iterations = int(request.json.get('iterations', 100))
    initial_x = float(request.json.get('initial_x', 5))

    history = []
    current_x = initial_x
    for i in range(iterations):
        gradient = 2 * current_x
        current_x -= learning_rate * gradient
        history.append((current_x, current_x ** 2))

    result = {
        "function": {"x": x.tolist(), "y": y.tolist()},
        "history": [{"x": hx, "y": hy} for hx, hy in history]
    }
    return jsonify(result)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file:
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)
        return jsonify({'message': 'File uploaded successfully', 'filepath': filepath})

@app.route('/clean', methods=['POST'])
def clean_data():
    filepath = request.json['filepath']
    try:
        df = pd.read_csv(filepath)
        # Basic data cleaning
        df.dropna(inplace=True)  # Remove missing values
        df.drop_duplicates(inplace=True)  # Remove duplicates
        cleaned_filepath = os.path.join(app.config['UPLOAD_FOLDER'], 'cleaned_' + os.path.basename(filepath))
        df.to_csv(cleaned_filepath, index=False)
        return jsonify({'message': 'Data cleaned successfully', 'cleaned_filepath': cleaned_filepath})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
