import {
  animate,
  style,
  transition,
  trigger,
  state
} from '@angular/animations';

export const fadeStateTrigger = trigger('fade', [
  transition(':enter', [
    style({
      opacity: 0
    }),
    animate(500)
  ]),
  transition(
    ':leave',
    animate(
      500,
      style({
        opacity: 0
      })
    )
  )
]);

export const fadeInOut = trigger('fade', [
  state(
    'void',
    style({
      opacity: 0
    })
  ),
  transition('void <=> *', animate(300))
]);
