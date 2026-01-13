import React, { useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Grid,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Alert,
  LinearProgress
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CalculateIcon from '@mui/icons-material/Calculate';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import './App.css';

const PredictionForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    gender: 2,
    height: 170,
    weight: 70,
    ap_hi: 120,
    ap_lo: 80,
    cholesterol: 1,
    gluc: 1,
    smoke: 0,
    alco: 0,
    active: 1,
    age: 50,
  });

  const [bmi, setBmi] = useState(24.22);

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    
    setFormData(prev => {
      const newData = { ...prev, [field]: Number(value) };
      
      if (field === 'height' || field === 'weight') {
        const heightM = newData.height / 100;
        const calculatedBmi = newData.weight / (heightM * heightM);
        setBmi(calculatedBmi.toFixed(2));
      }
      
      return newData;
    });
  };

  const handleSliderChange = (field) => (event, newValue) => {
    setFormData(prev => ({ ...prev, [field]: newValue }));
  };

  const handleSwitchChange = (field) => (event) => {
    setFormData(prev => ({ ...prev, [field]: event.target.checked ? 1 : 0 }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleReset = () => {
    setFormData({
      gender: 2,
      height: 170,
      weight: 70,
      ap_hi: 120,
      ap_lo: 80,
      cholesterol: 1,
      gluc: 1,
      smoke: 0,
      alco: 0,
      active: 1,
      age: 50,
    });
    setBmi(24.22);
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  const bmiCategory = getBMICategory(bmi);
  const bmiColor = bmiCategory === 'Normal' ? '#00ff9d' : 
                   bmiCategory === 'Overweight' ? '#ff7b00' : '#ff0055';

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {/* Input Sections */}
      <Grid container spacing={2}>
        {/* Section 1: Demographics */}
        <Grid item xs={12}>
          <Paper className="glass-dark" sx={{ p: 2.5, border: '1px solid rgba(0, 243, 255, 0.2)' }}>
            <Typography variant="subtitle1" className="neon-blue" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 6, height: 6, bgcolor: '#00f3ff', mr: 1.5, boxShadow: '0 0 5px #00f3ff' }} />
              DEMOGRAPHIC DATA
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Gender</InputLabel>
                  <Select
                    value={formData.gender}
                    onChange={handleChange('gender')}
                    label="Gender"
                    className="futuristic-input"
                  >
                    <MenuItem value={1}>Female</MenuItem>
                    <MenuItem value={2}>Male</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ px: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      AGE: {formData.age}
                    </Typography>
                    <Typography variant="caption" className="neon-blue">
                      {formData.age < 30 ? 'YOUNG' : formData.age < 50 ? 'ADULT' : 'SENIOR'}
                    </Typography>
                  </Box>
                  <Slider
                    value={formData.age}
                    onChange={handleSliderChange('age')}
                    min={18}
                    max={100}
                    marks={[
                      { value: 20, label: '20' },
                      { value: 40, label: '40' },
                      { value: 60, label: '60' },
                      { value: 80, label: '80' },
                    ]}
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Section 2: Physical Metrics */}
        <Grid item xs={12}>
          <Paper className="glass-dark" sx={{ p: 2.5, border: '1px solid rgba(0, 255, 157, 0.2)' }}>
            <Typography variant="subtitle1" className="neon-green" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 6, height: 6, bgcolor: '#00ff9d', mr: 1.5, boxShadow: '0 0 5px #00ff9d' }} />
              PHYSICAL METRICS
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Height (cm)"
                  type="number"
                  value={formData.height}
                  onChange={handleChange('height')}
                  className="futuristic-input"
                  InputProps={{ inputProps: { min: 100, max: 250 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Weight (kg)"
                  type="number"
                  value={formData.weight}
                  onChange={handleChange('weight')}
                  className="futuristic-input"
                  InputProps={{ inputProps: { min: 30, max: 200 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ 
                  p: 1.5, 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(0, 0, 0, 0.3)'
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      BMI ANALYSIS
                    </Typography>
                    <Typography variant="caption" sx={{ color: bmiColor, fontWeight: 'bold' }}>
                      {bmi} ({bmiCategory})
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={bmi > 40 ? 100 : (bmi / 40) * 100} 
                    sx={{ 
                      height: 4,
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: bmiColor
                      }
                    }} 
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Section 3: Blood Pressure */}
        <Grid item xs={12}>
          <Paper className="glass-dark" sx={{ p: 2.5, border: '1px solid rgba(255, 0, 85, 0.2)' }}>
            <Typography variant="subtitle1" className="neon-red" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 6, height: 6, bgcolor: '#ff0055', mr: 1.5, boxShadow: '0 0 5px #ff0055' }} />
              BLOOD PRESSURE
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ px: 1 }}>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1, display: 'block' }}>
                    SYSTOLIC
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Slider
                      value={formData.ap_hi}
                      onChange={handleSliderChange('ap_hi')}
                      min={80}
                      max={200}
                      sx={{ flex: 1 }}
                    />
                    <Typography variant="h6" sx={{ color: '#fff', minWidth: 60, fontFamily: 'Orbitron' }}>
                      {formData.ap_hi}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ px: 1 }}>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1, display: 'block' }}>
                    DIASTOLIC
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Slider
                      value={formData.ap_lo}
                      onChange={handleSliderChange('ap_lo')}
                      min={50}
                      max={120}
                      sx={{ flex: 1 }}
                    />
                    <Typography variant="h6" sx={{ color: '#fff', minWidth: 60, fontFamily: 'Orbitron' }}>
                      {formData.ap_lo}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Section 4: Health & Lifestyle */}
        <Grid item xs={12}>
          <Paper className="glass-dark" sx={{ p: 2.5, border: '1px solid rgba(255, 123, 0, 0.2)' }}>
            <Typography variant="subtitle1" className="neon-orange" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 6, height: 6, bgcolor: '#ff7b00', mr: 1.5, boxShadow: '0 0 5px #ff7b00' }} />
              HEALTH & LIFESTYLE
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Cholesterol</InputLabel>
                  <Select
                    value={formData.cholesterol}
                    onChange={handleChange('cholesterol')}
                    label="Cholesterol"
                    className="futuristic-input"
                  >
                    <MenuItem value={1}>Normal</MenuItem>
                    <MenuItem value={2}>Elevated</MenuItem>
                    <MenuItem value={3}>High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Glucose</InputLabel>
                  <Select
                    value={formData.gluc}
                    onChange={handleChange('gluc')}
                    label="Glucose"
                    className="futuristic-input"
                  >
                    <MenuItem value={1}>Normal</MenuItem>
                    <MenuItem value={2}>Elevated</MenuItem>
                    <MenuItem value={3}>High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <Paper sx={{ 
                      p: 2, 
                      textAlign: 'center',
                      background: formData.smoke === 1 ? 'rgba(255, 0, 85, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                      border: formData.smoke === 1 ? '1px solid rgba(255, 0, 85, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formData.smoke === 1}
                            onChange={handleSwitchChange('smoke')}
                            color="error"
                          />
                        }
                        label="SMOKING"
                        labelPlacement="top"
                        sx={{ m: 0 }}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper sx={{ 
                      p: 2, 
                      textAlign: 'center',
                      background: formData.alco === 1 ? 'rgba(255, 123, 0, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                      border: formData.alco === 1 ? '1px solid rgba(255, 123, 0, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formData.alco === 1}
                            onChange={handleSwitchChange('alco')}
                            color="warning"
                          />
                        }
                        label="ALCOHOL"
                        labelPlacement="top"
                        sx={{ m: 0 }}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper sx={{ 
                      p: 2, 
                      textAlign: 'center',
                      background: formData.active === 1 ? 'rgba(0, 255, 157, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                      border: formData.active === 1 ? '1px solid rgba(0, 255, 157, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formData.active === 1}
                            onChange={handleSwitchChange('active')}
                            color="success"
                          />
                        }
                        label="ACTIVE"
                        labelPlacement="top"
                        sx={{ m: 0 }}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Action Buttons */}
        <Grid item xs={12}>
          <Paper className="glass-dark" sx={{ p: 2.5, border: '1px solid rgba(0, 243, 255, 0.3)' }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={8}>
                <Alert 
                  severity="info" 
                  className="glass-dark"
                  icon={false}
                  sx={{ border: '1px solid rgba(0, 243, 255, 0.2)' }}
                >
                  <Typography variant="caption" sx={{ fontFamily: 'JetBrains Mono' }}>
                    Complete all 12 biometric parameters for neural analysis.
                  </Typography>
                </Alert>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-end' } }}>
                  <Button
                    variant="outlined"
                    startIcon={<RestartAltIcon />}
                    onClick={handleReset}
                    disabled={loading}
                    sx={{ 
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      color: '#fff'
                    }}
                  >
                    RESET
                  </Button>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    startIcon={<CalculateIcon />}
                    loading={loading}
                    loadingPosition="start"
                    className="cyber-button"
                  >
                    ANALYZE
                  </LoadingButton>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PredictionForm;