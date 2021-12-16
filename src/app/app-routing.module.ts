import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'bio',
    loadChildren: () => import('./bio/bio.module').then( m => m.BioPageModule)
  },
  {
    path: 'bio/:id',
    loadChildren: () => import('./bio/bio.module').then( m => m.BioPageModule)
  },
  
  {
    path: 'medicamentos',
    loadChildren: () => import('./medicamentos/medicamentos.module').then( m => m.MedicamentosPageModule)
  },
  {
    path: 'medicamentos/:id',
    loadChildren: () => import('./medicamentos/medicamentos.module').then( m => m.MedicamentosPageModule)
  },
  {
    path: 'medicmodal',
    loadChildren: () => import('./medicmodal/medicmodal.module').then( m => m.MedicmodalPageModule)
  },
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.module').then( m => m.BlogPageModule)
  },
  {
    path: 'single',
    loadChildren: () => import('./single/single.module').then( m => m.SinglePageModule)
  },
  

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
