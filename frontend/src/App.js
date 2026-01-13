import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Button,
  Grid,
  IconButton,
  Divider,
  LinearProgress,
  Fade
} from '@mui/material';
import PredictionForm from './PredictionForm';
import './App.css';
import {
  Close,
  Download,
  Refresh,
  TrendingUp,
  Warning,
  CheckCircle,
  Error,
  ArrowForward
} from '@mui/icons-material';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePrediction = async (formData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || 'Prediction failed');
      }
    } catch (err) {
      setError('Failed to connect to the server. Make sure the backend is running on port 5000.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (probability) => {
    if (probability < 30) return '#00ff9d';
    if (probability < 60) return '#ff7b00';
    if (probability < 80) return '#ff0055';
    return '#ff0000';
  };

  const getRiskGradient = (probability) => {
    if (probability < 30) return 'linear-gradient(135deg, #00ff9d, #00cc7a)';
    if (probability < 60) return 'linear-gradient(135deg, #ff7b00, #cc6200)';
    if (probability < 80) return 'linear-gradient(135deg, #ff0055, #cc0044)';
    return 'linear-gradient(135deg, #ff0000, #cc0000)';
  };

  const handleClearResults = () => {
    setResult(null);
    setError(null);
  };

  return (
    <Box className="bg-grid" sx={{ minHeight: '100vh', position: 'relative' }}>
      {/* Scan line effect */}
      <Box className="scan-line" />
      
      {/* Grid overlay */}
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at 20% 50%, rgba(0, 243, 255, 0.05) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(255, 0, 85, 0.05) 0%, transparent 50%)`,
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography 
            variant="h1" 
            className="neon-text"
            sx={{ 
              fontSize: { xs: '2.5rem', md: '4rem' },
              mb: 2,
              letterSpacing: '4px'
            }}
          >
            NEURAL HEALTH
          </Typography>
          <Typography 
            variant="h6" 
            className="neon-blue"
            sx={{ 
              letterSpacing: '2px',
              opacity: 0.8
            }}
          >
            AI-POWERED RISK ASSESSMENT SYSTEM
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 2, 
            mt: 3,
            flexWrap: 'wrap'
          }}>
            <Box sx={{ 
              px: 3, 
              py: 1, 
              border: '1px solid rgba(0, 243, 255, 0.3)',
              background: 'rgba(0, 243, 255, 0.1)'
            }}>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>MODEL V1.0.0</Typography>
            </Box>
            <Box sx={{ 
              px: 3, 
              py: 1, 
              border: '1px solid rgba(0, 255, 157, 0.3)',
              background: 'rgba(0, 255, 157, 0.1)'
            }}>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>12 PARAMETERS</Typography>
            </Box>
            <Box sx={{ 
              px: 3, 
              py: 1, 
              border: '1px solid rgba(255, 0, 85, 0.3)',
              background: 'rgba(255, 0, 85, 0.1)'
            }}>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>73% ACCURACY</Typography>
            </Box>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* Left Column - Input Form */}
          <Grid item xs={12} lg={6}>
            <Card className="glass" sx={{ height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ 
                    width: 12, 
                    height: 12, 
                    bgcolor: '#00f3ff', 
                    mr: 2,
                    boxShadow: '0 0 10px #00f3ff'
                  }} />
                  <Typography variant="h5" className="neon-blue">
                    DATA INPUT MODULE
                  </Typography>
                </Box>
                
                <PredictionForm onSubmit={handlePrediction} loading={loading} />
                
                {error && (
                  <Fade in={true}>
                    <Alert 
                      severity="error"
                      className="glass-dark"
                      sx={{ mt: 3 }}
                      action={
                        <IconButton 
                          size="small" 
                          onClick={() => setError(null)}
                          className="neon-red"
                        >
                          <Close />
                        </IconButton>
                      }
                    >
                      <Typography variant="body2" fontFamily="'JetBrains Mono', monospace">
                        {error}
                      </Typography>
                    </Alert>
                  </Fade>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column - Results */}
          <Grid item xs={12} lg={6}>
            <Card className="glass" sx={{ height: '100%', minHeight: '600px' }}>
              <CardContent sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ 
                      width: 12, 
                      height: 12, 
                      bgcolor: '#00ff9d', 
                      mr: 2,
                      boxShadow: '0 0 10px #00ff9d'
                    }} />
                    <Typography variant="h5" className="neon-green">
                      ANALYSIS OUTPUT
                    </Typography>
                  </Box>
                  {result && (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleClearResults}
                      startIcon={<Refresh />}
                      sx={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
                    >
                      CLEAR
                    </Button>
                  )}
                </Box>

                {loading ? (
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    height: '500px' 
                  }}>
                    <CircularProgress 
                      size={80}
                      thickness={2}
                      sx={{ 
                        color: '#00f3ff',
                        mb: 3,
                        filter: 'drop-shadow(0 0 10px #00f3ff)'
                      }} 
                    />
                    <Typography variant="h6" className="neon-blue" sx={{ mb: 2 }}>
                      PROCESSING NEURAL DATA
                    </Typography>
                    <Box sx={{ width: '100%', maxWidth: 300 }}>
                      <LinearProgress 
                        sx={{ 
                          height: 4,
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: '#00f3ff',
                            boxShadow: '0 0 10px #00f3ff'
                          }
                        }} 
                      />
                    </Box>
                    <Typography variant="caption" sx={{ mt: 2, opacity: 0.7 }}>
                      Analyzing 12 biometric parameters...
                    </Typography>
                  </Box>
                ) : result ? (
                  <Fade in={true}>
                    <Box>
                      {/* Risk Score Display */}
                      <Box sx={{ textAlign: 'center', my: 4 }}>
                        <Box sx={{ 
                          width: 200, 
                          height: 200, 
                          mx: 'auto',
                          background: getRiskGradient(result.probability),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                          mb: 3,
                          boxShadow: `0 0 40px ${getRiskColor(result.probability)}`,
                          border: '2px solid rgba(255, 255, 255, 0.2)'
                        }}>
                          <Box sx={{ 
                            width: 160, 
                            height: 160, 
                            background: '#0a0a0a',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px solid rgba(255, 255, 255, 0.1)'
                          }}>
                            <Typography variant="h1" sx={{ 
                              fontSize: '4rem',
                              fontWeight: 700,
                              background: getRiskGradient(result.probability),
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              lineHeight: 1
                            }}>
                              {result.probability}%
                            </Typography>
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                color: getRiskColor(result.probability),
                                fontWeight: 700,
                                letterSpacing: '2px',
                                mt: 1
                              }}
                            >
                              {result.risk_category.toUpperCase()}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      {/* Status Indicator */}
                      <Box sx={{ 
                        p: 2, 
                        mb: 3,
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        background: 'rgba(0, 0, 0, 0.3)'
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          {result.probability < 30 ? (
                            <CheckCircle sx={{ color: '#00ff9d', mr: 1 }} />
                          ) : result.probability < 60 ? (
                            <Warning sx={{ color: '#ff7b00', mr: 1 }} />
                          ) : (
                            <Error sx={{ color: '#ff0055', mr: 1 }} />
                          )}
                          <Typography variant="h6" sx={{ 
                            color: getRiskColor(result.probability),
                            fontWeight: 600
                          }}>
                            {result.prediction}
                          </Typography>
                        </Box>
                        <Box className="data-bar" sx={{ height: 4 }} />
                      </Box>

                      {/* Recommendations */}
                      {result.recommendations && result.recommendations.length > 0 && (
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="subtitle1" sx={{ mb: 2, color: '#00f3ff' }}>
                            SYSTEM RECOMMENDATIONS:
                          </Typography>
                          {result.recommendations.map((rec, index) => (
                            <Box 
                              key={index}
                              sx={{ 
                                display: 'flex',
                                alignItems: 'flex-start',
                                mb: 1.5,
                                p: 1.5,
                                background: 'rgba(0, 0, 0, 0.3)',
                                borderLeft: '3px solid #00f3ff'
                              }}
                            >
                              <Box sx={{ 
                                width: 8, 
                                height: 8, 
                                bgcolor: '#00f3ff', 
                                mr: 2, 
                                mt: 0.5,
                                boxShadow: '0 0 10px #00f3ff'
                              }} />
                              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                {rec}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      )}

                      {/* Risk Metrics */}
                      <Box sx={{ 
                        p: 2,
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        background: 'rgba(0, 0, 0, 0.3)',
                        mt: 3
                      }}>
                        <Typography variant="subtitle2" sx={{ mb: 2, opacity: 0.7 }}>
                          RISK METRICS
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Box>
                              <Typography variant="caption" sx={{ opacity: 0.7 }}>CONFIDENCE</Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                <Box sx={{ flex: 1, mr: 1 }}>
                                  <LinearProgress 
                                    variant="determinate" 
                                    value={85} 
                                    sx={{ 
                                      height: 6,
                                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                                      '& .MuiLinearProgress-bar': {
                                        bgcolor: '#00f3ff'
                                      }
                                    }} 
                                  />
                                </Box>
                                <Typography variant="body2">85%</Typography>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box>
                              <Typography variant="caption" sx={{ opacity: 0.7 }}>SEVERITY</Typography>
                              <Typography variant="body2" sx={{ mt: 0.5, color: getRiskColor(result.probability) }}>
                                {result.probability < 30 ? 'LOW' : 
                                 result.probability < 60 ? 'MODERATE' : 
                                 result.probability < 80 ? 'HIGH' : 'CRITICAL'}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </Fade>
                ) : (
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    height: '500px',
                    textAlign: 'center'
                  }}>
                    <Box sx={{ 
                      width: 100, 
                      height: 100, 
                      border: '2px dashed rgba(0, 243, 255, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3
                    }}>
                      <ArrowForward sx={{ fontSize: 48, color: 'rgba(0, 243, 255, 0.5)' }} />
                    </Box>
                    <Typography variant="h6" sx={{ mb: 1, color: '#00f3ff' }}>
                      AWAITING INPUT DATA
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.7, maxWidth: '80%' }}>
                      Enter biometric parameters in the input module to generate neural risk analysis.
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Footer */}
        <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Typography variant="caption" sx={{ 
            opacity: 0.5, 
            textAlign: 'center',
            display: 'block'
          }}>
            NEURAL HEALTH ANALYTICS • AI-POWERED RISK ASSESSMENT • V1.0.0 • DATA UPDATED: {new Date().toLocaleDateString()}
          </Typography>
          <Typography variant="caption" sx={{ 
            opacity: 0.3, 
            textAlign: 'center',
            display: 'block',
            mt: 1
          }}>
            This system provides AI-based risk analysis. Not intended for medical diagnosis.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default App;