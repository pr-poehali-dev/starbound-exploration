import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  faqs?: FAQItem[];
}

const defaultFAQs: FAQItem[] = [
  {
    question: "Что такое Дневник и для кого он предназначен?",
    answer:
      "Дневник — это мобильное приложение для студентов, которое собирает в одном месте расписание занятий, оценки, задания и уведомления о дедлайнах. Оно подходит студентам любых вузов и факультетов. Просто скачайте приложение, введите данные своего учебного заведения — и всё расписание появится автоматически.",
  },
  {
    question: "Приложение платное? Нужна ли подписка?",
    answer:
      "Базовая версия для студентов абсолютно бесплатна и остаётся таковой навсегда. В неё входят расписание, просмотр оценок и базовые уведомления о дедлайнах. Тариф «Студент+» за 299 ₽/мес добавляет умные напоминания с AI, аналитику успеваемости и синхронизацию с LMS вашего вуза. Для учебных заведений доступен корпоративный тариф с расширенными возможностями для деканата.",
  },
  {
    question: "Мой вуз уже есть в системе? Как подключиться?",
    answer:
      "В системе уже подключено более 500 российских вузов. Просто найдите своё учебное заведение при регистрации — расписание и оценки загрузятся автоматически. Если вашего вуза нет в списке, вы можете добавить расписание вручную или отправить нам запрос на подключение — мы свяжемся с администрацией в течение 3 рабочих дней.",
  },
  {
    question: "Безопасны ли мои учебные данные?",
    answer:
      "Все данные шифруются и хранятся на серверах в России в соответствии с требованиями 152-ФЗ. Мы не передаём ваши личные данные третьим сторонам. Вы в любой момент можете удалить свой аккаунт и все связанные данные через настройки приложения.",
  },
];

export const FAQSection = ({ title = "Часто задаваемые вопросы", faqs = defaultFAQs }: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-24 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <h2 className="text-[40px] leading-tight font-normal text-[#202020] tracking-tight sticky top-24">
              {title}
            </h2>
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-0">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-[#e5e5e5] last:border-b-0">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between py-6 text-left group hover:opacity-70 transition-opacity duration-150"
                    aria-expanded={openIndex === index}
                  >
                    <span className="text-lg leading-7 text-[#202020] pr-8 font-normal">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 45 : 0 }}
                      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                      className="flex-shrink-0"
                    >
                      <Plus className="w-6 h-6 text-[#202020]" strokeWidth={1.5} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pr-12">
                          <p className="text-lg leading-6 text-[#666666]">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};