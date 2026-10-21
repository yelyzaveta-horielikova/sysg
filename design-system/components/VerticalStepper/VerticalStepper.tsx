import type { ReactNode } from 'react';
import './VerticalStepper.css';

export interface Step {
  title: ReactNode;
  text?: ReactNode;
  /** Optional dash list (— item). */
  list?: ReactNode[];
}

export interface VerticalStepperProps {
  steps: Step[];
}

/** An ordered process (Figma "vertical-stepper"): steps on a vertical line, each marked with a dot. Vertical at every size. */
export function VerticalStepper({ steps }: VerticalStepperProps) {
  return (
    <ol className="sg-stepper">
      {steps.map((step, i) => (
        <li key={i} className="sg-stepper__step">
          <span className="sg-stepper__dot" aria-hidden="true" />
          <h3 className="sg-stepper__title">{step.title}</h3>
          {(step.text || step.list) && (
            <div className="sg-stepper__body">
              {step.text && <div className="sg-stepper__text">{step.text}</div>}
              {step.list && step.list.length > 0 && (
                <ul className="sg-stepper__list">
                  {step.list.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
