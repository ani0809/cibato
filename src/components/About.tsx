import { motion } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';
import { fadeInUpTitle, fadeInUpText, fadeInUpImage } from '../utils/animations';

interface AboutProps {
  title?: string;
  description?: string;
  image?: string;
  btnLabel?: string;
  stat_team?: string;
  stat_projects?: string;
  stat_years?: string;
}

const About = ({
  title = 'We want to give you the best <span class="text-cyan-500">services</span>',
  description,
  image = '/about-person.png',
  btnLabel = 'KNOW MORE',
  stat_team,
  stat_projects,
  stat_years
}: AboutProps) => {
  const { settings } = useSettings();
  // Use props if provided, otherwise fallback to settings or hardcoded defaults
  const displayTeam = stat_team || settings.stat_team || '15+';
  const displayProjects = stat_projects || settings.stat_projects || '490+';
  const displayYears = stat_years || settings.stat_years || '5+';

  // Default description if not provided
  const defaultDesc = `
    <p class="mb-6">Founded in 2020, Cibato has quickly established itself as a leading provider of cutting-edge digital marketing and IT solutions. We are a passionate team of over 15 professionals, each with their own unique expertise and experience, working together to create customized solutions that drive real results. Over the years, we have completed more than 490+ successful projects for clients in diverse industries, delivering excellence in every aspect of our work.</p>
    <p>Our team members are skilled in the latest technologies and tools, and we pride ourselves on staying ahead of the curve with continuous learning and adaptation. We are committed to offering innovative, efficient, and effective solutions, ensuring that every project we work on not only meets but exceeds expectations.</p>
  `;

  const displayDesc = description || defaultDesc;



  return (
    <section className="py-[60px] lg:py-[80px] bg-gradient-to-b from-white via-slate-50/30 to-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 left-20 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            {...fadeInUpImage}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-md mx-auto lg:mx-0">
              <div className="relative">
                <div className="relative w-full aspect-square rounded-full overflow-hidden bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-500 p-1 transition-all duration-500 hover:scale-105">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-cyan-50 to-blue-50 p-1">
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-inner">
                      <img
                        src={image}
                        alt="Professional Business Person"
                        className="w-full h-full object-cover object-top scale-105"
                      />
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-white/90 backdrop-blur-md rounded-2xl border border-white/50 animate-float-medium">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {/* You might want to remove the logic for splitting numbers if it's too complex for dynamic data, or parse it */}
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">{displayTeam.replace('+', '')}</div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">+</div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Expert Team</p>
                      <p className="text-xs text-slate-600">Professionals</p>
                    </div>
                  </div>
                </div>

                <div className="absolute top-6 -right-4 px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl border border-white/50 animate-float-slower">
                  <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">{displayProjects}</p>
                  <p className="text-xs text-slate-600 font-semibold">Projects</p>
                </div>

                <div className="absolute top-[28%] -left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl border border-white/50 animate-float-slow">
                  <p className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">{displayYears}</p>
                  <p className="text-xs text-slate-600 font-semibold">Years</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div
            className="-mt-2.5 -ml-0"
          >
            {/* ABOUT US label */}
            <motion.span
              {...fadeInUpText}
              transition={{ ...fadeInUpText.transition, delay: 0.2 }}
              className="inline-block px-5 py-2.5 bg-white/30 backdrop-blur-3xl backdrop-saturate-150 border border-white/40 text-slate-900 text-sm font-bold rounded-xl uppercase tracking-wider shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] mb-6"
            >
              {btnLabel}
            </motion.span>

            <motion.h2
              {...fadeInUpTitle}
              className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-tight"
              style={{ textAlign: 'justify' }}
              dangerouslySetInnerHTML={{ __html: title }}
            />

            <motion.div
              {...fadeInUpText}
              className="space-y-6 text-slate-700 leading-relaxed"
              style={{ textAlign: 'justify' }}
              dangerouslySetInnerHTML={{ __html: displayDesc }}
            />
          </div>
        </div>
      </div>
    </section >
  );
};

export default About;
