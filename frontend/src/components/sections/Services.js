import React from 'react';
import { motion } from 'framer-motion';
import { Code, Smartphone, Palette, Cloud, Shield, Zap } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies like React, Node.js, and Python.',
      color: 'bg-blue-500/10 text-blue-600',
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile apps for iOS and Android that deliver exceptional user experiences.',
      color: 'bg-purple-500/10 text-purple-600',
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces designed with user experience at the forefront of every decision.',
      color: 'bg-pink-500/10 text-pink-600',
    },
    {
      icon: Setting,
      title: 'Automation',
      description: 'Smart workflow automation and process optimization to streamline operations and boost efficiency.',
      color: 'bg-cyan-500/10 text-cyan-600',
    },
    {
      icon: Pen,
      title: 'Graphic Design',
      description: 'Professional graphic design services for branding, marketing materials, and digital assets.',
      color: 'bg-green-500/10 text-green-600',
    },
    {
      icon: Zap,
      title: 'API Integration',
      description: 'Seamless integration of third-party services and custom API development for your needs.',
      color: 'bg-yellow-500/10 text-yellow-600',
    },
  ];

  return (
    <section id="services" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium tracking-wide uppercase text-muted-foreground">Our Services</span>
          <h2 className="text-4xl md:text-5xl font-heading font-semibold tracking-tight text-slate-900 mt-2">
            What We Do Best
          </h2>
          <p className="text-base md:text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
            Comprehensive software development services tailored to your business needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                data-testid={`service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-heading font-medium text-slate-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;