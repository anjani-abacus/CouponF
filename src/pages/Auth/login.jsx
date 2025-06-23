import { useState, useEffect } from "react";
import { Phone, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  InputAdornment,
  Paper,
  Typography,
} from "@mui/material";
import { TextField } from '@mui/material';
import { useDispatch } from "react-redux";
import { setToken } from "../../store/feature/authSlice";
import { useSendOTPMutation, useVerifyOTPMutation } from "../../store/services/authApi";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ mobile: "", otp: "" });
  const [step, setStep] = useState("send-otp");
  const [resendTimer, setResendTimer] = useState(0);

  const [sendOtp, { isLoading: sendingOtp }] = useSendOTPMutation();
  const [verifyOtp, { isLoading: verifyingOtp }] = useVerifyOTPMutation();

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendTimer]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSendOtp = async () => {
    try {
      const res = await sendOtp({ mobile: formData.mobile }).unwrap();
      toast.success(res.message);
      setStep("verify-otp");
      setResendTimer(60);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await verifyOtp(formData).unwrap();
      toast.success(res.message);
      dispatch(setToken(res.token));
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await sendOtp({ mobile: formData.mobile }).unwrap();
      toast.success(res.message);
      setResendTimer(60);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", borderRadius: 3 }}>
        <Typography variant="h4" align="center" fontWeight="bold" color="orange" gutterBottom>
          Login with OTP
        </Typography>

        <Box
          component="form"
          onSubmit={handleVerifyOtp}
          sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            fullWidth
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone fontSize="small" />
                </InputAdornment>
              )
            }}

          />

          {step === "verify-otp" && (
            <>
              <TextField
                label="Enter OTP"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock size={18} />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "orange",
                  color: "white",
                  mt: 1,
                  "&:hover": {
                    backgroundColor: "#e69500",
                  },
                }}
                disabled={verifyingOtp}
              >
                {verifyingOtp ? <CircularProgress size={24} color="inherit" /> : "Verify OTP"}
              </Button>

              <Button
                onClick={handleResendOtp}
                disabled={resendTimer > 0}
                color="secondary"
                sx={{ mt: 1 }}
              >
                {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
              </Button>
            </>
          )}

          {step === "send-otp" && (
            <Button
              onClick={handleSendOtp}
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "orange",
                color: "white",
                mt: 2,
                "&:hover": {
                  backgroundColor: "#e69500",
                },
              }}
              disabled={sendingOtp}
            >
              {sendingOtp ? <CircularProgress size={24} color="inherit" /> : "Send OTP"}
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
