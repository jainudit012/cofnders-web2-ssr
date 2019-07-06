import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';

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
import { FundCardComponent } from './components/funds/fund-card/fund-card.component';
import { FundComponent } from './components/funds/fund/fund.component';
import { ListFundFormComponent } from './components/funds/list-fund-form/list-fund-form.component';
import { IdeaComponent } from './components/ideas/idea/idea.component';
import { OpportunityCardComponent } from './components/ideas/opportunity-card/opportunity-card.component';
import { OpportunityFormComponent } from './components/ideas/opportunity-form/opportunity-form.component';
import { ProjectCardComponent } from './components/ideas/project-card/project-card.component';
import { ProjectFormComponent } from './components/ideas/project-form/project-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PrivacyPageComponent } from './components/privacy-page/privacy-page.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { RecentCardComponent } from './components/recent-card/recent-card.component';
import { TermsPageComponent } from './components/terms-page/terms-page.component';
import { TrustPageComponent } from './components/trust-page/trust-page.component';
import { MaterialModule } from './material.module';
import { SubmitIfValidDirective } from './submit-if-valid.directive';
import { MatDialogRef } from '@angular/material/dialog';
import { FooterBlackComponent } from './components/footer-black/footer-black.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CustomDatePipe } from './pipes/customDate.pipe';
import { TeamSizePipe } from './pipes/teamSize.pipe';
import { ProjectCategoryPipe } from './pipes/projectCategory.pipe';
import { ProjectSectorPipe } from './pipes/projectSector.pipe';
import { ProjectStagePipe } from './pipes/projectStage.pipe';
import { OpportunityRequirementPipe } from './pipes/opportunityRequirement.pipe';

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
    TrustPageComponent,
    SubmitIfValidDirective,
    FooterBlackComponent,
    CustomDatePipe,
    TeamSizePipe,
    ProjectCategoryPipe,
    ProjectSectorPipe,
    ProjectStagePipe,
    OpportunityRequirementPipe
  ],
  entryComponents: [
    PostSignUpFormComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, 
    NgtUniversalModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    CloudinaryModule.forRoot({Cloudinary}, { cloud_name: 'cofnderscloud' } as CloudinaryConfiguration)
  ],
  providers: [
    // {provide: MatDialogRef, useValue: {}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
