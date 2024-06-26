import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { Cloudinary } from 'cloudinary-core';
import { FileUploadModule } from 'ng2-file-upload';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { CallbackComponent } from './components/callback/callback.component';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';
import { CtaComponent } from './components/cta/cta.component';
import { FilterComponent } from './components/filter/filter.component';
import { FooterBlackComponent } from './components/footer-black/footer-black.component';
import { FooterComponent } from './components/footer/footer.component';
import { ApplicationFormComponent } from './components/forms/application-form/application-form.component';
import { GetInTouchFormComponent } from './components/forms/get-in-touch-form/get-in-touch-form.component';
import { ListFundFormComponent } from './components/forms/list-fund-form/list-fund-form.component';
import { OpportunityFormComponent } from './components/forms/opportunity-form/opportunity-form.component';
import { PostSignUpFormComponent } from './components/forms/post-sign-up-form/post-sign-up-form.component';
import { ProjectFormComponent } from './components/forms/project-form/project-form.component';
import { FundCardComponent } from './components/funds/fund-card/fund-card.component';
import { FundComponent } from './components/funds/fund/fund.component';
import { IdeaComponent } from './components/ideas/idea/idea.component';
import { OpportunityCardComponent } from './components/ideas/opportunity-card/opportunity-card.component';
import { ProjectCardComponent } from './components/ideas/project-card/project-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NoApprovedProjectsComponent } from './components/no-approved-projects/no-approved-projects.component';
import { PrivacyPageComponent } from './components/privacy-page/privacy-page.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { RecentCardComponent } from './components/recent-card/recent-card.component';
import { TermsPageComponent } from './components/terms-page/terms-page.component';
import { TrustPageComponent } from './components/trust-page/trust-page.component';
import { MaterialModule } from './material.module';
import { CustomDatePipe } from './pipes/customDate.pipe';
import { InvestorTypePipe } from './pipes/investorType.pipe';
import { OpportunityRequirementPipe } from './pipes/opportunityRequirement.pipe';
import { ProjectCategoryPipe } from './pipes/projectCategory.pipe';
import { ProjectSectorPipe } from './pipes/projectSector.pipe';
import { ProjectStagePipe } from './pipes/projectStage.pipe';
import { RemoveQuotesPipe } from './pipes/removeQuotes.pipe';
import { TeamSizePipe } from './pipes/teamSize.pipe';
import { SubmitIfValidDirective } from './directives/submit-if-valid.directive';
import { BadInputDirective } from './directives/bad-input.directive';
import { BadNameDirective } from './directives/bad-name.directive';
import { CheckUrlDirective } from './directives/check-url.directive';

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
    OpportunityRequirementPipe,
    InvestorTypePipe,
    RemoveQuotesPipe,
    NoApprovedProjectsComponent,
    ConfirmDeleteComponent,
    BadInputDirective,
    BadNameDirective,
    CheckUrlDirective
  ],
  entryComponents: [
    PostSignUpFormComponent,
    ProjectFormComponent,
    OpportunityFormComponent,
    ListFundFormComponent,
    ApplicationFormComponent,
    GetInTouchFormComponent,
    NoApprovedProjectsComponent,
    ConfirmDeleteComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgtUniversalModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    CloudinaryModule.forRoot({Cloudinary}, { cloud_name: 'cofnderscloud' } as CloudinaryConfiguration),
    FileUploadModule,
    InfiniteScrollModule
  ],
  providers: [
    // {provide: MatDialogRef, useValue: {}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
