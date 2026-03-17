import { motion } from 'framer-motion';
import { ArrowRight, Search, Code, Palette, Rocket } from 'lucide-react';
import { fadeInUpTitle, fadeInUpText, fadeInUpImage } from '../utils/animations';

const Process = () => {
  const steps = [
    {
      number: '01',
      icon: Search,
      title: 'In-Depth Research',
      description: 'We shape and refine brands by embarking on a journey of exploration, where every step is guided by meticulous, in-depth.',
      gradient: 'from-cyan-500 to-blue-600',
      color: 'cyan'
    },
    {
      number: '02',
      icon: Palette,
      title: 'Creative Design',
      description: 'Our design approach is to simplify. We embrace the joy in creating something unique that is easy for end users.',
      gradient: 'from-blue-600 to-indigo-600',
      color: 'blue'
    },
    {
      number: '03',
      icon: Code,
      title: 'Expertly Building',
      description: 'Using modern technologies, we build with efficiency and skill, creating flexible and scalable business-driven solutions.',
      gradient: 'from-indigo-600 to-purple-600',
      color: 'indigo'
    },
    {
      number: '04',
      icon: Rocket,
      title: 'Delivering Value',
      description: 'We take an iterative approach to both our work and our practice, always looking for ways to improve what we do.',
      gradient: 'from-purple-600 to-pink-600',
      color: 'purple'
    }
  ];

  return (
    <section className="py-[60px] lg:py-[80px] relative overflow-hidden bg-white">

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          {...fadeInUpText}
          className="text-center mb-20"
        >
          <motion.span
            {...fadeInUpText}
            transition={{ ...fadeInUpText.transition, delay: 0.1 }}
            className="px-6 py-3 bg-white text-slate-900 text-sm font-bold rounded-xl uppercase tracking-wider shadow-lg mb-6 inline-block"
          >
            OUR PROCESS
          </motion.span>
          <motion.h2
            {...fadeInUpTitle}
            className="text-4xl lg:text-5xl font-black text-slate-900 mb-4"
          >
            We simplify development <span className="text-cyan-500">process</span>
          </motion.h2>
          <motion.p
            {...fadeInUpText}
            transition={{ ...fadeInUpText.transition, delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Our streamlined approach ensures quality delivery at every stage
          </motion.p>
        </motion.div>

        {/* Horizontal Timeline */}
        <div className="relative">
          {/* Steps Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                {...fadeInUpImage}
                transition={{ ...fadeInUpImage.transition, delay: index * 0.15 }}
                className="group relative h-full"
              >
                {/* Card with hover effect */}
                <div className="relative bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 h-full flex flex-col">

                  {/* Large background number */}
                  <div className="absolute top-4 right-4 text-7xl font-black text-gray-100 leading-none select-none pointer-events-none group-hover:text-gray-200 transition-colors">
                    {step.number}
                  </div>

                  {/* Icon with gradient */}
                  <div className={`relative w-14 h-14 bg-gradient-to-br ${step.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex-1 flex flex-col">
                    {/* Title */}
                    <motion.h3
                      {...fadeInUpTitle}
                      transition={{ ...fadeInUpTitle.transition, delay: index * 0.15 + 0.1 }}
                      className="text-xl lg:text-2xl font-bold text-slate-900 mb-3 group-hover:text-cyan-600 transition-colors"
                    >
                      {step.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                      {...fadeInUpText}
                      transition={{ ...fadeInUpText.transition, delay: index * 0.15 + 0.2 }}
                      className="text-sm lg:text-base text-slate-600 leading-relaxed mb-4 flex-1"
                    >
                      {step.description}
                    </motion.p>

                    {/* Progress indicator */}
                    <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${step.gradient} rounded-full transition-all duration-1000 w-full`}
                        style={{ transitionDelay: `${(index * 150) + 500}ms` }}
                      />
                    </div>
                  </div>

                  {/* Arrow connector (desktop only) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 z-20 transform -translate-y-1/2">
                      <div className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center group-hover:scale-125 transition-transform">
                        <ArrowRight className="w-4 h-4 text-cyan-500" strokeWidth={3} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Step number badge for mobile */}
                <div className="lg:hidden absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
