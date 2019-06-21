import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { CallbackComponent } from './components/callback/callback.component';
import { CtaComponent } from './components/cta/cta.component';
import { FilterComponent } from './components/filter/filter.component';
import { FooterComponent } from './components/footer/footer.component';
import { ApplicationFormComponent } from './components/forms/application-form/application-form.component';
import { GetInTouchFormComponent } from './components/forms/get-in-touch-form/get-in-touch-form.component';
import { PostSignUpFormComponent } from './components/forms/post-sign-up-form/post-sign-up-form.component';
import { FundComponent } from './components/funds/fund/fund.component';
import { FundCardComponent } from './components/funds/fund-card/fund-card.component';
import { ListFundFormComponent } from './components/funds/list-fund-form/list-fund-form.component';
import { IdeaComponent } from './components/ideas/idea/idea.component';
import { OpportunityCardComponent } from './components/ideas/opportunity-card/opportunity-card.component';
import { ProjectCardComponent } from './components/ideas/project-card/project-card.component';
import { ProjectFormComponent } from './components/ideas/project-form/project-form.component';
import { OpportunityFormComponent } from './components/ideas/opportunity-form/opportunity-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PrivacyPageComponent } from './components/privacy-page/privacy-page.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { RecentCardComponent } from './components/recent-card/recent-card.component';
import { TermsPageComponent } from './components/terms-page/terms-page.component';
import { TrustPageComponent } from './components/trust-page/trust-page.component';
import { MaterialModule } from './material.module';
import { NgtUniversalModule } from '@ng-toolkit/universal';

@NgModule({
  declarations: [
    AppComponent,
    AboutPageComponent,
    CallbackComponent,
    CtaComponent,
    FilterComponent,
    FooterComponent,
    ApplicationFormComponent,
    GetInTouchFormComponent,
    PostSignUpFormComponent,
    FundComponent,
    FundCardComponent,
    ListFundFormComponent,
    IdeaComponent,
    OpportunityCardComponent,
    ProjectCardComponent,
    ProjectFormComponent,
    OpportunityFormComponent,
    NavbarComponent,
    PrivacyPageComponent,
    ProfileCardComponent,
    RecentCardComponent,
    TermsPageComponent,
    TrustPageComponent
  ],
  entryComponents: [
    PostSignUpFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, 
    NgtUniversalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
