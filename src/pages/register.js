import { useState } from 'react';
import { useRouter } from 'next/router';
import { useApi } from '../utils/api';

const initialState = {
  email: '',
  password: '',
  password_confirmation: '',
  full_name: '',
  phone: '',
  user_type: 'investor',
  investor_type: 'individual',
  address: '',
  state: '',
  country: '',
  date_of_birth: '',
  nationality: '',
};

export default function Register() {
  const [form, setForm] = useState(initialState);
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { api } = useApi();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSuccess('');
    setIsLoading(true);
    try {
      const res = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess('Registration successful! Please check your email to verify your account.');
        // Optionally redirect: router.push('/login');
      } else {
        if (data.error && data.error.details) {
          // Show first validation error
          const firstError = Object.values(data.error.details)[0][0];
          setFormError(firstError);
        } else if (data.error && data.error.message) {
          setFormError(data.error.message);
        } else {
          setFormError('Registration failed. Please try again.');
        }
      }
    } catch (err) {
      setFormError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4">
            <h2 className="mb-4 text-center">Register</h2>
            {formError && <div className="alert alert-danger">{formError}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" name="full_name" value={form.full_name} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Phone</label>
                  <input type="text" className="form-control" name="phone" value={form.phone} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">User Type</label>
                  <select className="form-select" name="user_type" value={form.user_type} onChange={handleChange} required>
                    <option value="investor">Investor</option>
                    <option value="issuer">Issuer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                {form.user_type === 'investor' && (
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Investor Type</label>
                    <select className="form-select" name="investor_type" value={form.investor_type} onChange={handleChange} required>
                      <option value="individual">Individual</option>
                      <option value="corporate">Corporate</option>
                    </select>
                  </div>
                )}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-control" name="address" value={form.address} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">State</label>
                  <input type="text" className="form-control" name="state" value={form.state} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Country</label>
                  <input type="text" className="form-control" name="country" value={form.country} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Date of Birth</label>
                  <input type="date" className="form-control" name="date_of_birth" value={form.date_of_birth} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Nationality</label>
                  <input type="text" className="form-control" name="nationality" value={form.nationality} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input type="password" className="form-control" name="password_confirmation" value={form.password_confirmation} onChange={handleChange} required />
                </div>
              </div>
              <button type="submit" className="btn btn-success w-100" disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </form>
            {/* TODO: Add validation, error handling, and API integration */}
          </div>
        </div>
      </div>
    </div>
  );
}