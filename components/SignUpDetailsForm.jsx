import React, { useState, useEffect } from 'react';

const SignUpDetailsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const validatePassword = (password) => {
    const passwordRules = {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    const passwordErrors = [];
    if (!passwordRules.minLength) passwordErrors.push("At least 8 characters");
    if (!passwordRules.hasUpperCase) passwordErrors.push("One uppercase letter");
    if (!passwordRules.hasLowerCase) passwordErrors.push("One lowercase letter");
    if (!passwordRules.hasNumber) passwordErrors.push("One number");
    if (!passwordRules.hasSpecialChar) passwordErrors.push("One special character");

    return passwordErrors;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Invalid email format";
    return "";
  };

  const validateForm = () => {
    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password).join(", "),
      confirmPassword: formData.password !== formData.confirmPassword 
        ? "Passwords do not match" 
        : ""
    };

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every(error => error === "") &&
                   formData.name !== "" &&
                   formData.username !== "" &&
                   formData.agreeToTerms;

    setIsFormValid(isValid);
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Validate the field in real-time as the user types
    if (name === 'email' || name === 'password' || name === 'confirmPassword') {
      validateForm();
    }
  };

  const handleBlur = (fieldName) => {
    setTouched(prev => ({
      ...prev,
      [fieldName]: true
    }));

    // Validate the field when the user moves away from it
    validateForm();
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched to show all errors
    setTouched({
      email: true,
      password: true,
      confirmPassword: true
    });

    // Validate the form again before submission
    validateForm();

    if (!isFormValid) {
      console.log('Form is invalid. Please fix the errors.');
      return;
    }

    console.log('Form submitted:', formData);
  };

  // Helper function to show error message only if field is touched
  const ErrorMessage = ({ field, message }) => (
    touched[field] && message ? <p className="text-red-500 text-xs mt-1">{message}</p> : null
  );

  return (
    <div className="max-w-md w-full mx-auto p-4 sm:p-6 bg-gray-100 rounded-3xl relative">
      <button
        onClick={() => {}} // Add your back handler
        className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-200 transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </button>

      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-2 text-center">
          Sign up to Ask IT
        </h1>
        
        <div className="space-y-1 text-center">
          <p className="text-sm sm:text-base">
            Your Google account Joseph will be connected to your new Ask IT account
          </p>
          <p className="text-sm sm:text-base">
            <a href="#" className="text-blue-600 hover:underline">
              Wrong identity? Start over
            </a>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm mb-1">
              Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm mb-1">
              Username*
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm mb-1">
            Email*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={() => handleBlur('email')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              touched.email && errors.email ? 'border-red-500' : ''
            }`}
            required
          />
          <ErrorMessage field="email" message={errors.email} />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm mb-1">
            Password*
          </label>
          <div className="relative">
            <input
              type={showPassword.password ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={() => handleBlur('password')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                touched.password && errors.password ? 'border-red-500' : ''
              }`}
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('password')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword.password ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          <ErrorMessage field="password" message={errors.password} />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm mb-1">
            Confirm password*
          </label>
          <div className="relative">
            <input
              type={showPassword.confirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={() => handleBlur('confirmPassword')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                touched.confirmPassword && errors.confirmPassword ? 'border-red-500' : ''
              }`}
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirmPassword')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword.confirmPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          <ErrorMessage field="confirmPassword" message={errors.confirmPassword} />
        </div>

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="agreeToTerms"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="mt-1"
            required
          />
          <label htmlFor="agreeToTerms" className="text-sm">
            I agree with Ask IT{' '}
            <a href="#" className="underline">
              Terms of Service
            </a>
            ,{' '}
            <a href="#" className="underline">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="#" className="underline">
              default Notification Settings
            </a>
          </label>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-all"
        >
          Create an account
        </button>

        <p className="text-sm text-center">
          Already have an account?{' '}
          <a href="#" className="text-black underline">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUpDetailsForm;