import { useTranslation } from 'react-i18next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function Contact() {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('contact.toastTitle'),
      description: t('contact.toastDesc'),
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contact.visitUs'),
      details: [t('contact.addressLine1'), t('contact.addressLine2')],
    },
    {
      icon: Phone,
      title: t('contact.callUs'),
      details: [t('contact.phone1'), t('contact.phone2')],
    },
    {
      icon: Mail,
      title: t('contact.emailUs'),
      details: [t('contact.email1'), t('contact.email2')],
    },
    {
      icon: Clock,
      title: t('contact.workingHours'),
      details: [t('contact.hoursMonFri'), t('contact.hoursSat')],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-wood text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-primary-foreground dark:text-white">{t('contact.heroTitle')}</h1>
            <p className="text-xl text-primary-foreground/90 dark:text-white/90">{t('contact.heroSubtitle')}</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8 bg-card dark:bg-white/10 border-border dark:border-white/15 shadow-elegant animate-fade-in">
              <h2 className="text-3xl font-display font-bold text-[hsl(var(--accent-hover))] mb-6">{t('contact.formTitle')}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">{t('contact.fullName')}</label>
                    <Input
                      placeholder={i18n.language === 'ar' ? 'مثال: أحمد علي' : 'John Doe'}
                      required
                      className="bg-background border-border focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">{t('contact.email')}</label>
                    <Input
                      type="email"
                      placeholder={i18n.language === 'ar' ? 'ahmed@example.com' : 'john@example.com'}
                      required
                      className="bg-background border-border focus:border-accent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t('contact.phone')}</label>
                  <Input
                    placeholder={i18n.language === 'ar' ? '+971 XX XXX XXXX' : '+971 XX XXX XXXX'}
                    className="bg-background border-border focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t('contact.serviceInterest')}</label>
                  <Input
                    placeholder={t('contact.serviceInterestPlaceholder')}
                    className="bg-background border-border focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t('contact.message')}</label>
                  <Textarea
                    placeholder={t('contact.messagePlaceholder')}
                    rows={6}
                    required
                    className="bg-background border-border focus:border-accent"
                  />
                </div>
                  <Button
                    type="submit"
                    variant="outline"
                    size="lg"
                    className="w-full border-2 border-[hsl(var(--accent-hover))] text-[hsl(var(--accent-hover))] hover:bg-[hsl(var(--accent-hover))]/10"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    {t('contact.submit')}
                  </Button>
              </form>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8 animate-slide-up">
              <div>
                <h2 className="text-3xl font-display font-bold text-[hsl(var(--accent-hover))] mb-6">{t('contact.getInTouchTitle')}</h2>
                <p className="text-muted-foreground dark:text-white/80 mb-8 leading-relaxed">{t('contact.getInTouchDesc')}</p>
              </div>

              <div className="grid gap-6">
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    className="p-6 bg-card dark:bg-white/10 border-border dark:border-white/15 hover:border-accent transition-all duration-300 shadow-card hover:shadow-elegant"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-secondary/40 dark:bg-white/10 border border-wood/30 dark:border-white/20 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-wood dark:text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[hsl(var(--accent-hover))] mb-2">
                          {info.title}
                        </h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-muted-foreground dark:text-white/80 text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Map Placeholder */}
              <Card className="overflow-hidden bg-card dark:bg-white/10 border-border dark:border-white/15 shadow-card">
                <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground">
                  <MapPin className="w-12 h-12" />
                  <span className="ml-4">{t('contact.mapLocation')}</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
