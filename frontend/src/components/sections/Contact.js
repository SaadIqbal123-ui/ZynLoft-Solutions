import axios from 'axios';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import FileUpload from '../ui/FileUpload';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    project_name: '',
    project_description: '',
  });
  const [files, setFiles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length > 4) {
      toast.error('Maximum 4 files allowed');
      return;
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('full_name', formData.full_name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('project_name', formData.project_name);
      formDataToSend.append('project_description', formData.project_description);

      files.forEach((file) => {
        formDataToSend.append('files', file);
      });

      await axios.post(`${API}/contact/submit`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Your message has been sent successfully!');
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        project_name: '',
        project_description: '',
      });
      setFiles([]);
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'contact@zynloftsolutions.com' },
    { icon: Phone, label: 'Phone', value: '+92 3119053298' },
  ];

  return (
    <section id="contact" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium tracking-wide uppercase text-muted-foreground">Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-heading font-semibold tracking-tight text-slate-900 mt-2">
            Let's Start Your Project
          </h2>
          <p className="text-base md:text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
            Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-heading font-medium text-slate-900 mb-4">Contact Information</h3>
              <p className="text-slate-600 leading-relaxed">
                Reach out to us through any of these channels. We're here to help bring your vision to life.
              </p>
            </div>

            {contactInfo.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">{item.label}</div>
                    <div className="text-slate-600">{item.value}</div>
                  </div>
                </div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-sm space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input
                    id="full_name"
                    data-testid="contact-full-name-input"
                    placeholder="John Doe"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    data-testid="contact-email-input"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    data-testid="contact-phone-input"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project_name">Project Name *</Label>
                  <Input
                    id="project_name"
                    data-testid="contact-project-name-input"
                    placeholder="My Awesome Project"
                    value={formData.project_name}
                    onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="project_description">Project Description *</Label>
                <Textarea
                  id="project_description"
                  data-testid="contact-project-description-input"
                  placeholder="Tell us about your project..."
                  rows={5}
                  value={formData.project_description}
                  onChange={(e) => setFormData({ ...formData, project_description: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Project Photos (Max 4 files)</Label>
                <FileUpload files={files} setFiles={setFiles} maxFiles={4} />
              </div>

              <Button
                data-testid="contact-submit-button"
                type="submit"
                className="w-full bg-secondary hover:bg-secondary-hover text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;