import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Building Digital Excellence
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight text-slate-900">
              Transforming Ideas into
              <span className="block text-secondary mt-2">Digital Reality</span>
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-slate-600 max-w-xl">
              We're a team of passionate developers and designers creating cutting-edge software solutions that drive business growth and innovation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                data-testid="hero-cta-button"
                onClick={scrollToContact}
                size="lg"
                className="bg-secondary hover:bg-secondary-hover text-white px-8"
              >
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                data-testid="hero-learn-more-button"
                onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg"
                variant="outline"
                className="border-2 border-slate-300 hover:bg-slate-50"
              >
                Learn More
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1762951566390-e35eb7dfe9c5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjBibHVlJTIwZ2VvbWV0cmljJTIwYmFja2dyb3VuZHxlbnwwfHx8fDE3NzE0MTM1MzV8MA&ixlib=rb-4.1.0&q=85"
                alt="Abstract geometric technology background"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-accent/20 blur-3xl rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;