import type { ReactNode } from 'react';
import { SectionHeading } from '../SectionHeading/SectionHeading';
import './Faq.css';

export interface FaqItemProps {
  question: ReactNode;
  /** Always visible — Figma shows no accordion. */
  children: ReactNode;
}

/** One question with its answer (Figma "faq-text"). */
export function FaqItem({ question, children }: FaqItemProps) {
  return (
    <div className="sg-faq-item">
      <h3 className="sg-faq-item__question">{question}</h3>
      <div className="sg-faq-item__answer">{children}</div>
    </div>
  );
}

export interface FaqProps {
  title?: ReactNode;
  intro?: ReactNode;
  items: { question: ReactNode; answer: ReactNode }[];
}

/** FAQ block: section heading + list of questions, max 1240px wide, single column at every size. */
export function Faq({ title = 'FAQ', intro, items }: FaqProps) {
  return (
    <section className="sg-faq">
      <SectionHeading title={title} intro={intro} />
      <div className="sg-faq__items">
        {items.map((item, i) => (
          <FaqItem key={i} question={item.question}>
            {item.answer}
          </FaqItem>
        ))}
      </div>
    </section>
  );
}
