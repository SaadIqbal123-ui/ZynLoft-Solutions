import { motion } from 'framer-motion';
import { Award, Target, TrendingUp, Users } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, label: 'Team Members', value: '5+' },
    { icon: Target, label: 'Projects Completed', value: '20+' },
    { icon: Award, label: 'Awards Won', value: 'Not Yet Awarded' },
    { icon: TrendingUp, label: 'Client Satisfaction', value: '98%' },
  ];

  return (
    <section id="about" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium tracking-wide uppercase text-muted-foreground">About Us</span>
          <h2 className="text-4xl md:text-5xl font-heading font-semibold tracking-tight text-slate-900 mt-2">
            Building the Future of Software
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://images.unsplash.com/photo-1677078610152-8a627d8ced8d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzb2Z0d2FyZSUyMG9mZmljZSUyMHRlYW0lMjBjb2xsYWJvcmF0aW9ufGVufDB8fHx8MTc3MTQxMzUzMXww&ixlib=rb-4.1.0&q=85"
              alt="Team collaborating in modern office"
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-heading font-medium text-slate-900">
              We create innovative solutions that drive results
            </h3>
            <p className="text-base md:text-lg leading-relaxed text-slate-600">
              Founded in 2026, ZynLoft Solutions has been at the forefront of digital innovation. Our team of expert developers, designers, and strategists work together to deliver exceptional software solutions that exceed expectations.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-slate-600">
              We believe in the power of technology to transform businesses and create meaningful impact. Every project we undertake is a testament to our commitment to excellence and innovation.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <Icon className="w-8 h-8 mx-auto text-secondary mb-3" />
                <div className="text-3xl font-heading font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;