from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Load model and scaler
try:
    with open('model.pkl', 'rb') as f:
        model = pickle.load(f)
    
    with open('scaler.pkl', 'rb') as f:
        scaler = pickle.load(f)
    
    with open('features.pkl', 'rb') as f:
        feature_names = pickle.load(f)
    
    print(f"Model loaded successfully!")
    print(f"Features expected: {feature_names}")
    
except Exception as e:
    print(f"Error loading model: {e}")
    model = None
    scaler = None
    feature_names = []

@app.route('/')
def home():
    return jsonify({
        'message': 'Cardiovascular Disease Prediction API',
        'status': 'running',
        'endpoints': {
            '/predict': 'POST - Get prediction with patient data',
            '/health': 'GET - API health check'
        }
    })

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None
    })

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if model is None or scaler is None:
            return jsonify({'error': 'Model not loaded'}), 500
        
        # Get data from request
        data = request.json
        
        # Extract features in correct order
        features = []
        for feature in feature_names:
            if feature in data:
                features.append(data[feature])
            else:
                # Provide default value if feature missing
                if feature == 'age_years':
                    # Use age in years directly if provided
                    if 'age' in data:
                        features.append(float(data['age']))  # Age in years
                    else:
                        features.append(50)  # default 50 years
                elif feature == 'bmi':
                    # Calculate BMI if height and weight provided
                    if 'height' in data and 'weight' in data:
                        height_m = data['height'] / 100
                        features.append(data['weight'] / (height_m ** 2))
                    else:
                        features.append(25)  # default BMI
                else:
                    features.append(0)  # default for other features
        
        # Convert to numpy array and reshape
        features_array = np.array(features).reshape(1, -1)
        
        # Scale features
        features_scaled = scaler.transform(features_array)
        
        # Make prediction
        probability = model.predict_proba(features_scaled)[0][1]
        
        # Get risk category
        risk_category = get_risk_category(probability)
        
        # Get recommendations
        recommendations = get_recommendations(data, probability)
        
        return jsonify({
            'success': True,
            'probability': round(probability * 100, 2),
            'risk_category': risk_category,
            'prediction': 'High Risk' if probability > 0.5 else 'Low Risk',
            'recommendations': recommendations,
            'features_used': feature_names,
            'features_values': dict(zip(feature_names, features))
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400
    
def get_risk_category(probability):
    """Categorize risk based on probability"""
    if probability < 0.3:
        return "Low Risk"
    elif probability < 0.6:
        return "Moderate Risk"
    elif probability < 0.8:
        return "High Risk"
    else:
        return "Very High Risk"

def get_recommendations(data, probability):
    """Generate personalized recommendations"""
    recommendations = []
    
    # Cholesterol-based recommendations
    if 'cholesterol' in data:
        if data['cholesterol'] > 2:
            recommendations.append("High cholesterol detected. Consider dietary changes and exercise.")
        elif data['cholesterol'] == 2:
            recommendations.append("Moderate cholesterol level. Regular monitoring recommended.")
    
    # Blood pressure recommendations
    if 'ap_hi' in data and 'ap_lo' in data:
        if data['ap_hi'] > 140 or data['ap_lo'] > 90:
            recommendations.append("Elevated blood pressure. Consult with a healthcare provider.")
    
    # Lifestyle recommendations
    if 'smoke' in data and data['smoke'] == 1:
        recommendations.append("Smoking increases cardiovascular risk. Consider smoking cessation programs.")
    
    if 'alco' in data and data['alco'] == 1:
        recommendations.append("Limit alcohol consumption to reduce cardiovascular risk.")
    
    if 'active' in data and data['active'] == 0:
        recommendations.append("Incorporate regular physical activity (30 minutes daily, 5 days/week).")
    
    # BMI recommendations
    if 'bmi' in data or ('height' in data and 'weight' in data):
        if 'bmi' in data:
            bmi = data['bmi']
        else:
            height_m = data['height'] / 100
            bmi = data['weight'] / (height_m ** 2)
        
        if bmi > 25:
            recommendations.append(f"BMI is {bmi:.1f} (overweight). Maintain a healthy weight through diet and exercise.")
    
    # General recommendations based on risk level
    if probability > 0.6:
        recommendations.append("High risk detected. Schedule a consultation with a cardiologist.")
    elif probability > 0.3:
        recommendations.append("Moderate risk. Regular health check-ups are recommended.")
    
    if not recommendations:
        recommendations.append("Maintain healthy lifestyle with balanced diet and regular exercise.")
    
    return recommendations

@app.route('/features', methods=['GET'])
def get_features():
    """Return expected features and their descriptions"""
    feature_descriptions = {
        'gender': 'Gender (1: female, 2: male)',
        'height': 'Height in cm',
        'weight': 'Weight in kg',
        'ap_hi': 'Systolic blood pressure',
        'ap_lo': 'Diastolic blood pressure',
        'cholesterol': 'Cholesterol level (1: normal, 2: above normal, 3: well above normal)',
        'gluc': 'Glucose level (1: normal, 2: above normal, 3: well above normal)',
        'smoke': 'Smoking (0: no, 1: yes)',
        'alco': 'Alcohol intake (0: no, 1: yes)',
        'active': 'Physical activity (0: no, 1: yes)',
        'age': 'Age in years (preferred) OR age in days',
        'age_years': 'Age in years (calculated automatically)',
        'bmi': 'Body Mass Index (calculated automatically)'
    }
    
    return jsonify({
        'features': feature_names,
        'descriptions': feature_descriptions,
        'example_input': {
            'gender': 2,
            'height': 170,
            'weight': 70,
            'ap_hi': 120,
            'ap_lo': 80,
            'cholesterol': 1,
            'gluc': 1,
            'smoke': 0,
            'alco': 0,
            'active': 1,
            'age': 50,  # Now in years, not days!
        }
    })

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
