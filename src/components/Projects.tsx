import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, X, Calendar, MapPin, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

// Mock project data - replace with real data
const projects = [
  {
    id: 1,
    title: 'Luxury Villa Dubai',
    category: 'Finishing',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    description: 'A luxurious villa transformation featuring premium finishing materials and elegant design elements.',
    details: [
      'Premium marble flooring throughout',
      'Custom kitchen with Italian appliances',
      'Master suite with walk-in closet',
      'Landscaped garden with pool',
      'Smart home automation system'
    ],
    duration: '6 months',
    location: 'Dubai Hills',
    team: '12 specialists'
  },
  {
    id: 2,
    title: 'Modern Garden Design',
    category: 'Landscaping',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    description: 'Contemporary outdoor living space with sustainable landscaping and modern amenities.',
    details: [
      'Native plant selection',
      'Automated irrigation system',
      'Outdoor kitchen and dining area',
      'Fire pit and seating zones',
      'LED landscape lighting'
    ],
    duration: '3 months',
    location: 'Jumeirah',
    team: '8 landscapers'
  },
  {
    id: 3,
    title: 'Contemporary Kitchen',
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&h=600&fit=crop',
    description: 'Modern kitchen design with custom cabinetry and premium appliances.',
    details: [
      'Custom-built cabinets',
      'Quartz countertops',
      'Professional-grade appliances',
      'Pantry organization system',
      'Breakfast nook seating'
    ],
    duration: '4 weeks',
    location: 'Downtown Dubai',
    team: '6 craftsmen'
  },
  {
    id: 4,
    title: 'Outdoor Living Space',
    category: 'Landscaping',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    description: 'Complete outdoor transformation creating multiple entertainment zones.',
    details: [
      'Covered patio area',
      'Built-in BBQ station',
      'Swimming pool with deck',
      'Outdoor furniture set',
      'Weather-resistant materials'
    ],
    duration: '5 months',
    location: 'Arabian Ranches',
    team: '10 specialists'
  },
  {
    id: 5,
    title: 'Executive Office',
    category: 'Designs',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    description: 'Professional office space designed for productivity and executive comfort.',
    details: [
      'Executive desk and seating',
      'Meeting room setup',
      'Storage solutions',
      'Acoustic treatments',
      'Professional lighting'
    ],
    duration: '2 months',
    location: 'DIFC',
    team: '5 designers'
  },
  {
    id: 6,
    title: 'Villa Exterior',
    category: 'Finishing',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=600&fit=crop',
    description: 'Complete exterior renovation with modern materials and architectural details.',
    details: [
      'Stone cladding facade',
      'Modern window treatments',
      'Landscape integration',
      'Outdoor lighting design',
      'Driveway and walkways'
    ],
    duration: '4 months',
    location: 'Emirates Hills',
    team: '15 contractors'
  },
];

export const Projects = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id="projects" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-4">
            {t('projects.title')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('projects.subtitle')}
          </p>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 ${inView ? 'animate-slide-up' : 'opacity-0'}`}>
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="relative"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <Card
                className="group overflow-hidden border-2 border-black/20 dark:border-white/20 hover:border-[hsl(var(--accent-hover))] transition-all duration-500 cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_rgba(255,255,255,0.1)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_12px_48px_rgba(255,255,255,0.15)] bg-gradient-to-br from-black/5 to-black/10 dark:from-white/5 dark:to-white/10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <Button
                    size="icon"
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[hsl(var(--accent-hover))] hover:bg-[hsl(var(--accent-hover))]/90 shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
                  >
                    <ExternalLink className="h-5 w-5 text-white" />
                  </Button>
                </div>
                
                <div className="p-6 text-center">
                  <div className="inline-block px-4 py-2 bg-[hsl(var(--accent-hover))]/10 text-[hsl(var(--accent-hover))] text-sm font-semibold rounded-full mb-4 border border-[hsl(var(--accent-hover))]/20">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-display font-semibold text-black dark:text-white group-hover:text-[hsl(var(--accent-hover))] transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>
              </Card>

              {/* Project Details Modal */}
              {hoveredProject === project.id && (
                <div 
                  className="absolute top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] border-2 border-[hsl(var(--accent-hover))]/30 overflow-hidden animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2 duration-500"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover animate-in fade-in-0 duration-700"
                    />
                    <button
                      onClick={() => setHoveredProject(null)}
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 animate-in fade-in-0 slide-in-from-top-2 duration-500 delay-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4 animate-in fade-in-0 slide-in-from-left-2 duration-500 delay-300">
                      <div className="px-3 py-1 bg-[hsl(var(--accent-hover))]/10 text-[hsl(var(--accent-hover))] text-sm font-semibold rounded-full border border-[hsl(var(--accent-hover))]/20">
                        {project.category}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-display font-bold text-black dark:text-white mb-3 animate-in fade-in-0 slide-in-from-left-2 duration-500 delay-400">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed animate-in fade-in-0 slide-in-from-left-2 duration-500 delay-500">
                      {project.description}
                    </p>

                    <div className="grid grid-cols-3 gap-4 mb-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-600">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-[hsl(var(--accent-hover))]" />
                        <span className="text-gray-600 dark:text-gray-300">{project.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-[hsl(var(--accent-hover))]" />
                        <span className="text-gray-600 dark:text-gray-300">{project.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-[hsl(var(--accent-hover))]" />
                        <span className="text-gray-600 dark:text-gray-300">{project.team}</span>
                      </div>
                    </div>

                    <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-700">
                      <h4 className="text-lg font-semibold text-black dark:text-white mb-3 flex items-center gap-2">
                        <Award className="w-5 h-5 text-[hsl(var(--accent-hover))]" />
                        {t('projects.projectHighlights')}
                      </h4>
                      <ul className="space-y-2">
                        {project.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300 animate-in fade-in-0 slide-in-from-left-2 duration-500" style={{ animationDelay: `${800 + idx * 100}ms` }}>
                            <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent-hover))] mt-2 flex-shrink-0"></div>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/projects">
            <Button size="lg" variant="outline" className="group border-2 border-black/20 dark:border-white/20 hover:border-[hsl(var(--accent-hover))] text-black dark:text-white hover:text-[hsl(var(--accent-hover))] hover:bg-[hsl(var(--accent-hover))]/10 transition-all duration-300">
              {t('projects.viewAll')}
              <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
