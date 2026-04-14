import { useState, useRef, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CaseStudy {
  id: string;
  company: string;
  logo: ReactNode;
  title: string;
  features: string[];
  quote: string;
  attribution: string;
  accentColor: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "mgu",
    company: "МГУ им. Ломоносова",
    logo: (
      <svg fill="none" height="48" viewBox="0 0 38 48" width="38" xmlns="http://www.w3.org/2000/svg">
        <path
          d="m14.25 5c0 7.8701-6.37994 14.25-14.25 14.25v9.5h14.25v14.25h9.5c0-7.8701 6.3799-14.25 14.25-14.25v-9.5h-14.25v-14.25z"
          fill="#16b364"
        />
      </svg>
    ),
    title: "МГУ использует Дневник для перевода всего учебного документооборота в цифровой формат.",
    features: ["Расписание занятий", "Электронные оценки", "Уведомления о дедлайнах"],
    quote: "Дневник сократил время на административную работу преподавателей в 3 раза.",
    attribution: "Алексей Морозов, Проректор по цифровизации, МГУ",
    accentColor: "#16b364",
  },
  {
    id: "spbgu",
    company: "СПбГУ",
    logo: (
      <svg fill="none" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
        <rect fill="url(#gradient1)" height="48" rx="12" width="48" />
        <circle cx="24" cy="24" r="12" fill="white" />
        <circle cx="24" cy="24" r="8" fill="#3b82f6" />
        <defs>
          <linearGradient id="gradient1" gradientUnits="userSpaceOnUse" x1="24" x2="24" y1="0" y2="48">
            <stop stopColor="#3b82f6" />
            <stop offset="1" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: "СПбГУ подключил Дневник для 15 000 студентов — успеваемость выросла на 18%.",
    features: ["Расписание занятий", "Электронные оценки", "Уведомления о дедлайнах"],
    quote: "Студенты перестали пропускать сдачи работ — все уведомления приходят вовремя.",
    attribution: "Ирина Соколова, Декан факультета, СПбГУ",
    accentColor: "#3b82f6",
  },
  {
    id: "hse",
    company: "ВШЭ",
    logo: (
      <svg fill="none" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="20" fill="#0A0D12" />
        <circle cx="28" cy="20" r="8" fill="white" />
      </svg>
    ),
    title: "ВШЭ внедрила Дневник для синхронизации расписания между кампусами в 4 городах.",
    features: ["Расписание занятий", "Уведомления о дедлайнах"],
    quote: "Приложение объединило всех студентов в единую систему — это настоящий прорыв.",
    attribution: "Дмитрий Волков, IT-директор, ВШЭ",
    accentColor: "#0A0D12",
  },
  {
    id: "itmo",
    company: "ИТМО",
    logo: (
      <svg fill="none" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
        <rect fill="#101828" height="48" rx="12" width="48" />
        <path d="M16 16h16v16H16z" fill="#155eef" />
        <path d="M20 20h8v8h-8z" fill="white" />
      </svg>
    ),
    title: "ИТМО использует Дневник для управления проектными заданиями и командной работой студентов.",
    features: ["Электронные оценки", "Уведомления о дедлайнах"],
    quote: "Студенты сдают проекты вовремя — это прямо влияет на качество образования.",
    attribution: "Павел Кузнецов, Проректор по учебной работе, ИТМО",
    accentColor: "#155eef",
  },
];

const FeatureBadge = ({ name }: { name: string }) => {
  const getIcon = (featureName: string) => {
    if (featureName.includes("Расписание")) {
      return (
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 opacity-50">
          <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="#156d95" strokeWidth="1.5" />
          <path d="M5 2V4M11 2V4M2 7H14" stroke="#156d95" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    } else if (featureName.includes("оценки") || featureName.includes("Электронные")) {
      return (
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 opacity-50">
          <path d="M3 4C3 3.44772 3.44772 3 4 3H12C12.5523 3 13 3.44772 13 4V12C13 12.5523 12.5523 13 12 13H4C3.44772 13 3 12.5523 3 12V4Z" stroke="#5E6AD2" strokeWidth="1.5" />
          <path d="M6 8L8 10L11 6" stroke="#5E6AD2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    } else if (featureName.includes("Уведомления") || featureName.includes("дедлайн")) {
      return (
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 opacity-50">
          <path d="M8 2C5.79086 2 4 3.79086 4 6V10L2.5 11.5H13.5L12 10V6C12 3.79086 10.2091 2 8 2Z" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6.5 12C6.5 12.8284 7.17157 13.5 8 13.5C8.82843 13.5 9.5 12.8284 9.5 12" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="flex items-center gap-2 bg-white/75 shadow-sm border border-black/5 rounded-lg px-2 py-1 text-sm font-medium text-foreground">
      {getIcon(name)}
      {name}
    </div>
  );
};

const NotionCollaborationCard = ({ delay, zIndex }: { accentColor: string; delay: number; zIndex: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay }}
      className="absolute w-[380px] rounded-xl p-6 backdrop-blur-xl"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.8), 0 8px 32px 0 rgba(0, 0, 0, 0.12)",
        filter: "drop-shadow(0 4px 6px rgba(30, 30, 44, 0.15))",
        transform: "translate(-200px, -80px)",
        zIndex,
      }}
    >
      <div className="flex flex-col space-y-5">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-foreground">Успеваемость факультета</h4>
          <span className="text-xs text-muted-foreground">Текущий семестр</span>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm text-foreground">Сданы вовремя</span>
            </div>
            <span className="text-sm font-semibold text-green-600">94%</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-sm text-foreground">Средний балл</span>
            </div>
            <span className="text-sm font-semibold text-blue-600">4.3</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-sm text-foreground">Посещаемость</span>
            </div>
            <span className="text-sm font-semibold text-purple-600">89%</span>
          </div>
        </div>
        <div className="pt-3 border-t border-border/50">
          <div className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">348</span> активных студентов
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const StripeGlobalCard = ({ accentColor, delay, zIndex }: { accentColor: string; delay: number; zIndex: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay }}
      className="absolute w-[400px] rounded-xl p-6 backdrop-blur-xl"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.8), 0 8px 32px 0 rgba(0, 0, 0, 0.12)",
        filter: "drop-shadow(0 4px 6px rgba(30, 30, 44, 0.15))",
        transform: "translate(-180px, -60px)",
        zIndex,
      }}
    >
      <div className="flex flex-col space-y-5">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-foreground">Ближайшие дедлайны</h4>
          <span className="text-xs text-muted-foreground">Эта неделя</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-muted/20 rounded-lg">
            <div className="text-2xl font-bold text-foreground">3</div>
            <div className="text-xs text-muted-foreground mt-1">Сегодня</div>
            <div className="text-xs font-semibold text-green-600 mt-2">Сдано</div>
          </div>
          <div className="text-center p-3 bg-muted/20 rounded-lg">
            <div className="text-2xl font-bold text-foreground">2</div>
            <div className="text-xs text-muted-foreground mt-1">Завтра</div>
            <div className="text-xs font-semibold text-blue-600 mt-2">В работе</div>
          </div>
          <div className="text-center p-3 bg-muted/20 rounded-lg">
            <div className="text-2xl font-bold text-foreground">5</div>
            <div className="text-xs text-muted-foreground mt-1">На неделе</div>
            <div className="text-xs font-semibold text-purple-600 mt-2">Планирую</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Выполнено в срок</span>
            <span className="font-semibold text-foreground">94%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: "94%", backgroundColor: accentColor }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FigmaSprintCard = ({ accentColor, delay, zIndex }: { accentColor: string; delay: number; zIndex: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay }}
      className="absolute w-[380px] rounded-xl p-6 backdrop-blur-xl"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.8), 0 8px 32px 0 rgba(0, 0, 0, 0.12)",
        filter: "drop-shadow(0 4px 6px rgba(30, 30, 44, 0.15))",
        transform: "translate(-190px, -70px)",
        zIndex,
      }}
    >
      <div className="flex flex-col space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
              style={{ backgroundColor: accentColor }}
            >
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                <rect x="3" y="3" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Успеваемость по предметам</h4>
              <p className="text-xs text-muted-foreground">Текущий семестр</p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
            <span className="text-sm text-foreground">Математический анализ</span>
            <div className="flex items-center gap-2">
              <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: "90%" }} />
              </div>
              <span className="text-xs font-semibold text-foreground">4.5</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
            <span className="text-sm text-foreground">Программирование</span>
            <div className="flex items-center gap-2">
              <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: "96%" }} />
              </div>
              <span className="text-xs font-semibold text-foreground">4.8</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
            <span className="text-sm text-foreground">Пропусков занятий</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-green-600">Нет</span>
            </div>
          </div>
        </div>
        <div className="pt-3 border-t border-border/50">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Средний балл GPA</span>
            <span className="font-semibold text-foreground">4.6</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const CaseStudiesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentStudy = caseStudies[currentIndex];

  const startAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 5000);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    return () => stopAutoPlay();
  }, [isAutoPlaying, currentIndex]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % caseStudies.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 1000 : -1000, opacity: 0 }),
  };

  return (
    <div
      className="w-full min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center py-24 px-8"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="max-w-7xl w-full">
        <div className="text-center mb-16">
          <h1 className="text-[40px] leading-tight font-normal text-foreground mb-6 tracking-tight">
            Что говорят университеты
          </h1>
          <p className="text-lg leading-7 text-muted-foreground max-w-2xl mx-auto">
            Узнайте, как ведущие российские вузы используют Дневник для повышения успеваемости и вовлечённости студентов.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStudy.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="space-y-6"
              >
                <div className="text-foreground/60">{currentStudy.logo}</div>
                <h2 className="text-4xl font-bold text-foreground leading-tight tracking-tight text-[32px] font-normal">
                  {currentStudy.title}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {currentStudy.features.map((feature, idx) => (
                    <FeatureBadge key={idx} name={feature} />
                  ))}
                </div>
                <blockquote className="border-l-4 border-primary pl-6 py-2">
                  <p className="text-lg leading-7 text-foreground/80 italic mb-3">
                    "{currentStudy.quote}"
                  </p>
                  <footer className="text-sm text-muted-foreground">
                    {currentStudy.attribution}
                  </footer>
                </blockquote>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-6">
              <div className="flex gap-2">
                {caseStudies.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                    aria-label={`Перейти к слайду ${idx + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-lg border border-border hover:bg-accent transition-colors"
                  aria-label="Предыдущий слайд"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-lg border border-border hover:bg-accent transition-colors"
                  aria-label="Следующий слайд"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="relative h-[500px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStudy.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                {currentStudy.id === "notion" && (
                  <NotionCollaborationCard accentColor={currentStudy.accentColor} delay={0} zIndex={1} />
                )}
                {currentStudy.id === "cloudwatch" && (
                  <StripeGlobalCard accentColor={currentStudy.accentColor} delay={0} zIndex={1} />
                )}
                {currentStudy.id === "eightball" && (
                  <NotionCollaborationCard accentColor={currentStudy.accentColor} delay={0} zIndex={1} />
                )}
                {currentStudy.id === "coreos" && (
                  <FigmaSprintCard accentColor={currentStudy.accentColor} delay={0} zIndex={1} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};