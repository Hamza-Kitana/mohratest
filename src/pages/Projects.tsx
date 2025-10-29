import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, MapPin, Users, Award, ExternalLink, ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import heroImg from '@/assets/hero-1.jpg';

// Extended project data with 20 projects
const allProjects = [
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
  {
    id: 7,
    title: 'Penthouse Interior',
    category: 'Designs',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    description: 'Luxury penthouse design with panoramic city views and premium finishes.',
    details: [
      'Floor-to-ceiling windows',
      'Open-plan living space',
      'Private terrace design',
      'Premium material selection',
      'Custom lighting design'
    ],
    duration: '8 months',
    location: 'Marina Walk',
    team: '18 specialists'
  },
  {
    id: 8,
    title: 'Restaurant Fit-out',
    category: 'Finishing',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
    description: 'Complete restaurant interior design and fit-out with modern aesthetics.',
    details: [
      'Custom bar design',
      'Kitchen equipment installation',
      'Dining area layout',
      'Ambient lighting system',
      'Brand identity integration'
    ],
    duration: '3 months',
    location: 'City Walk',
    team: '14 contractors'
  },
  {
    id: 9,
    title: 'Master Bedroom Suite',
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop',
    description: 'Elegant master bedroom with custom furniture and luxury amenities.',
    details: [
      'Custom bed design',
      'Walk-in closet system',
      'En-suite bathroom',
      'Reading nook setup',
      'Smart home integration'
    ],
    duration: '6 weeks',
    location: 'Palm Jumeirah',
    team: '8 craftsmen'
  },
  {
    id: 10,
    title: 'Swimming Pool Complex',
    category: 'Landscaping',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    description: 'Luxury swimming pool with infinity edge and integrated landscaping.',
    details: [
      'Infinity edge design',
      'Integrated water features',
      'Pool deck construction',
      'Landscape lighting',
      'Maintenance systems'
    ],
    duration: '4 months',
    location: 'Dubai Hills',
    team: '12 specialists'
  },
  {
    id: 11,
    title: 'Retail Store Design',
    category: 'Designs',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    description: 'Modern retail space design with customer flow optimization.',
    details: [
      'Customer journey mapping',
      'Product display systems',
      'Checkout area design',
      'Brand experience zones',
      'Lighting and ambiance'
    ],
    duration: '2 months',
    location: 'Dubai Mall',
    team: '7 designers'
  },
  {
    id: 12,
    title: 'Apartment Renovation',
    category: 'Finishing',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    description: 'Complete apartment renovation with modern finishes and smart solutions.',
    details: [
      'Open-plan layout',
      'Modern kitchen design',
      'Bathroom renovation',
      'Flooring installation',
      'Smart home setup'
    ],
    duration: '3 months',
    location: 'Business Bay',
    team: '10 contractors'
  },
  {
    id: 13,
    title: 'Kids Room Design',
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    description: 'Fun and functional kids room with custom furniture and storage solutions.',
    details: [
      'Custom bunk beds',
      'Study area setup',
      'Toy storage systems',
      'Safety features',
      'Colorful design elements'
    ],
    duration: '3 weeks',
    location: 'Jumeirah',
    team: '5 craftsmen'
  },
  {
    id: 14,
    title: 'Garden Pavilion',
    category: 'Landscaping',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    description: 'Elegant garden pavilion with integrated seating and weather protection.',
    details: [
      'Custom pavilion structure',
      'Integrated seating design',
      'Weather-resistant materials',
      'Garden integration',
      'Lighting installation'
    ],
    duration: '2 months',
    location: 'Arabian Ranches',
    team: '8 specialists'
  },
  {
    id: 15,
    title: 'Hotel Lobby',
    category: 'Designs',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
    description: 'Luxury hotel lobby design with grand entrance and welcoming atmosphere.',
    details: [
      'Grand entrance design',
      'Reception area layout',
      'Seating arrangements',
      'Art installation space',
      'Ambient lighting design'
    ],
    duration: '6 months',
    location: 'Downtown Dubai',
    team: '20 designers'
  },
  {
    id: 16,
    title: 'Kitchen Island Design',
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&h=600&fit=crop',
    description: 'Custom kitchen island with integrated appliances and storage solutions.',
    details: [
      'Custom island design',
      'Integrated appliances',
      'Storage compartments',
      'Seating integration',
      'Premium material finish'
    ],
    duration: '5 weeks',
    location: 'Emirates Hills',
    team: '6 craftsmen'
  },
  {
    id: 17,
    title: 'Rooftop Garden',
    category: 'Landscaping',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    description: 'Urban rooftop garden with sustainable plants and relaxation zones.',
    details: [
      'Sustainable plant selection',
      'Irrigation system',
      'Relaxation zones',
      'Urban farming area',
      'Weather monitoring'
    ],
    duration: '2 months',
    location: 'Business Bay',
    team: '6 landscapers'
  },
  {
    id: 18,
    title: 'Home Theater',
    category: 'Designs',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    description: 'Premium home theater design with acoustic treatment and luxury seating.',
    details: [
      'Acoustic wall treatment',
      'Premium sound system',
      'Luxury seating arrangement',
      'Ambient lighting control',
      'Climate control system'
    ],
    duration: '3 months',
    location: 'Dubai Hills',
    team: '9 specialists'
  },
  {
    id: 19,
    title: 'Bathroom Renovation',
    category: 'Finishing',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop',
    description: 'Luxury bathroom renovation with premium fixtures and spa-like features.',
    details: [
      'Premium fixture installation',
      'Marble wall cladding',
      'Rain shower system',
      'Heated flooring',
      'Vanity customization'
    ],
    duration: '4 weeks',
    location: 'Palm Jumeirah',
    team: '7 contractors'
  },
  {
    id: 20,
    title: 'Outdoor Kitchen',
    category: 'Landscaping',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    description: 'Complete outdoor kitchen with built-in appliances and dining area.',
    details: [
      'Built-in BBQ station',
      'Outdoor refrigerator',
      'Dining area setup',
      'Weather protection',
      'Storage solutions'
    ],
    duration: '6 weeks',
    location: 'Arabian Ranches',
    team: '8 specialists'
  }
];

const ProjectsPage = () => {
  const { t } = useTranslation();
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const navigate = useNavigate();

  const categories = ['All', 'Designs', 'Finishing', 'Furniture', 'Landscaping'];

  const visibleProjects = activeCategory === 'All' ? allProjects : allProjects.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero (like services page) */}
      <div className="relative">
        <img src={heroImg} alt="Projects" className="w-full h-[260px] md:h-[360px] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(25_20%_12%/_0.85)] via-[hsl(25_20%_12%/_0.4)] to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 sm:px-6 pb-8">
            <div className="inline-block rounded-2xl border border-[hsl(var(--accent-hover))]/30 bg-[hsl(25_20%_12%/_0.55)] backdrop-blur-sm shadow-[0_12px_36px_rgba(0,0,0,0.45)] px-5 py-3">
              <h1 className="text-4xl md:text-5xl font-display font-extrabold text-[hsl(var(--accent-hover))]">
                {t('projects.title')}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Back button */}
      <div className="container mx-auto px-4 sm:px-6 pt-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-[hsl(var(--accent-hover))] text-[hsl(var(--accent-hover))] hover:bg-[hsl(var(--accent-hover))]/10 transition-all duration-300 shadow-[0_6px_18px_rgba(0,0,0,0.15)]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('projects.backToHome')}</span>
        </button>
      </div>

      {/* Secondary sticky filter bar */}
      <div className="sticky top-20 z-40 bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 py-3">
          <div className="mx-auto w-full max-w-max rounded-full border border-border/60 bg-background/85 backdrop-blur-md px-2 sm:px-3 py-2 overflow-x-auto no-scrollbar">
            <div className="flex items-center justify-center gap-2 sm:gap-3 text-center whitespace-nowrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 sm:px-4 py-2 rounded-full border transition-all duration-300 ${
                    activeCategory === cat
                      ? 'border-[hsl(var(--accent-hover))] text-[hsl(var(--accent-hover))] bg-[hsl(var(--accent-hover))]/10'
                      : 'border-transparent hover:border-[hsl(var(--accent-hover))] text-muted-foreground hover:text-[hsl(var(--accent-hover))]'
                  }`}
                >
                  {cat === 'All' ? (t('services.viewAll') || 'View All') : cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {visibleProjects.map((project, index) => (
              <div 
                key={project.id} 
                className="relative"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <Card
                  className="group overflow-hidden border-2 border-black/20 dark:border-white/20 hover:border-[hsl(var(--accent-hover))] transition-all duration-500 cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_rgba(255,255,255,0.1)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_12px_48px_rgba(255,255,255,0.15)] bg-gradient-to-br from-black/5 to-black/10 dark:from-white/5 dark:to-white/10"
                  style={{ animationDelay: `${index * 50}ms` }}
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
                  
                  <div className="p-4 text-center">
                    <div className="inline-block px-3 py-1 bg-[hsl(var(--accent-hover))]/10 text-[hsl(var(--accent-hover))] text-xs font-semibold rounded-full mb-3 border border-[hsl(var(--accent-hover))]/20">
                      {project.category}
                    </div>
                    <h3 className="text-lg font-display font-semibold text-black dark:text-white group-hover:text-[hsl(var(--accent-hover))] transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>
                </Card>

                {/* Project Details Modal */}
                {hoveredProject === project.id && (
                  <div 
                    className="absolute top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] border-2 border-[hsl(var(--accent-hover))]/30 overflow-hidden"
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <div className="relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                      <button
                        onClick={() => setHoveredProject(null)}
                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="px-3 py-1 bg-[hsl(var(--accent-hover))]/10 text-[hsl(var(--accent-hover))] text-sm font-semibold rounded-full border border-[hsl(var(--accent-hover))]/20">
                          {project.category}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-display font-bold text-black dark:text-white mb-3">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="grid grid-cols-3 gap-4 mb-6">
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

                      <div>
                      <h4 className="text-lg font-semibold text-black dark:text-white mb-3 flex items-center gap-2">
                        <Award className="w-5 h-5 text-[hsl(var(--accent-hover))]" />
                        {t('projects.projectHighlights')}
                      </h4>
                        <ul className="space-y-2">
                          {project.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
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
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
