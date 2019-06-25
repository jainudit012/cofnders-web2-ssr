import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutPageComponent } from './components/about-page/about-page.component';
import { CallbackComponent } from './components/callback/callback.component';
import { FundComponent } from './components/funds/fund/fund.component';
import { IdeaComponent } from './components/ideas/idea/idea.component';
import { PrivacyPageComponent } from './components/privacy-page/privacy-page.component';
import { TermsPageComponent } from './components/terms-page/terms-page.component';
import { TrustPageComponent } from './components/trust-page/trust-page.component';
import { PostSignUpFormComponent } from './components/forms/post-sign-up-form/post-sign-up-form.component';

const routes: Routes = [
  {
    path: 'callback', component: CallbackComponent
  },

  {
    path: 'ideas', component: IdeaComponent
  },

  {
    path: 'funds', component: FundComponent
  },

  {
    path: 'about', component: AboutPageComponent
  },

  {
    path: 'privacy', component: PrivacyPageComponent
  },

  {
    path: 'terms', component: TermsPageComponent
  },

  {
    path: 'trust', component: TrustPageComponent
  },

  {
    path: 'form', component: PostSignUpFormComponent
  },

  {
    path: '**', component: IdeaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
