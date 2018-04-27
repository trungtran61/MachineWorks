import { NgModule } from '@angular/core';
import { IconCamera, IconChevronsLeft, IconGithub } from 'angular-feather';

const icons = [
  IconCamera,
  IconChevronsLeft,
  IconGithub
];

@NgModule({
  exports: icons
})
export class IconsModule { }
