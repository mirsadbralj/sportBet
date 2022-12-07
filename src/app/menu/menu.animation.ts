import { animate, group, state, style, transition, trigger } from "@angular/animations";
export const MenuArrowAnimation = trigger('MenuArrowAnimation', [
    state('true', style({
        transform: 'rotate(-136deg) translate(0, -50%)'
    })),
    state('false', style({
        transform: 'rotate(-45deg) translate(0, -50%)'
    })),
    transition('false => true', animate('300ms ease-in-out')),
    transition('true => false', animate('300ms ease-in-out'))
])