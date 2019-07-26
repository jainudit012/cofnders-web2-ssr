import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';

import { environment } from '../../../../environments/environment';
import { ProjectNature, Sector, StartupStage, TeamSizes } from '../../../models/project.model';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
  providers: [
    // { provide: MAT_DIALOG_DATA, useValue: {}}
  ]
})
export class ProjectFormComponent implements OnInit {


  page:number = 0
  categories: string[]
  sectors: string[]
  stages: string[]
  teamSizes: string[]
  imageType: string
  @ViewChild('chooseStartupIdentity', {static: true}) chooseStartupIdentity: any;
  logoImage: any
  coverImage: any
  fileName: string
  selectedValue: number
  isEdit:boolean = false
  uploadProgress:number = 0
  uploadProgress_cover:number = 0

  prevBtnName: string = 'Previous'
  nextBtnName: string = 'Next'
  public steps: number[] = [];
  public pages = [

    {
      formTitle: 'Create Project',
      description: 'Project Basics',
      nextBtnText: 'Project Details'
    },
    {
      formTitle: 'Create Project',
      description: 'Project Details',
      nextBtnText: 'Finishing Touch'
    },
    {
      formTitle: 'Create Project',
      description: 'Finishing Touch',
      nextBtnText: 'Finish',
      submitOnFinish: true
    }
  ]

  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'cofnderscloud', uploadPreset: 'wtittxoq' })
  )

  loading: any


  form = new FormGroup({
    projectBasic: new FormGroup({
      logo: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]),
      category: new FormControl('', Validators.required),
      sector: new FormControl('', Validators.required),
      stage: new FormControl('', Validators.required),
      teamSize: new FormControl('', Validators.required),
    }),
    projectDetails: new FormGroup({
      acceptingFunds: new FormControl('', Validators.required),
      pitch: new FormControl('', [Validators.required, Validators.minLength(16) ,Validators.maxLength(300)]),
      problemSolvingDescription: new FormControl(''),
      valueAddDescription: new FormControl('')
    }),
    projectFinishing : new FormGroup({
      websiteLink: new FormControl(''),
      facebookLink: new FormControl('', Validators.pattern('^.*(?:facebook\.com|fb\.me).*$')),
      twitterLink: new FormControl('', Validators.pattern('^.*(?:twitter\.com).*$')),
      linkedInLink: new FormControl('', Validators.pattern('^.*(?:linkedin\.com).*$')),
      coverImage: new FormControl('')
    })
  })

  constructor(public dialogRef: MatDialogRef<ProjectFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
    private dataService: DataService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.categories = [ProjectNature.CAUSE, ProjectNature.SERVICE ,ProjectNature.PRODUCT, ProjectNature.OTHERS]
    this.sectors = [Sector.HEALTHCARE_FITNESS, Sector.FIN_TECH, Sector.E_COMMERCE, Sector.CONSUMER, Sector.FOOD, Sector.EDUCATION, Sector.HR]
    this.stages = [StartupStage.IDEA, StartupStage.MVP, StartupStage.GROWTH, StartupStage.BETA, StartupStage.GROWING]
    this.teamSizes = [TeamSizes.SINGLE, TeamSizes.VERY_SMALL, TeamSizes.SMALL, TeamSizes.TEN_PLUS, TeamSizes.TWENTY_PLUS, TeamSizes.MEDIUM, TeamSizes.LARGE]
    this.uploadToCloudinary()
    this.selectedValue = 0
    this.steps = [1, 2, 3]
    this.prevBtnName = this.pages[this.selectedValue].description
    this.nextBtnName = this.pages[this.selectedValue].nextBtnText

    if(this.data.project){
      this.isEdit = true
      this.setFormValue()
    }
  }

  setFormValue() {
    this.logoImage = this.data.project.logo
    this.coverImage = this.data.project.projectCoverImage
    Object.keys((<FormGroup>this.form.controls['projectBasic']).controls).forEach(field => {
      const temp = {};
      temp[field] = this.assignDefaultValue(<FormGroup>this.form.controls['projectBasic'], field);
      this.form.controls['projectBasic'].patchValue(temp);
    });
    Object.keys((<FormGroup>this.form.controls['projectDetails']).controls).forEach(field => {
      const temp = {};
      temp[field] = this.assignDefaultValue(<FormGroup>this.form.controls['projectDetails'], field);
      this.form.controls['projectDetails'].patchValue(temp);
    });
    Object.keys((<FormGroup>this.form.controls['projectFinishing']).controls).forEach(field => {
      const temp = {};
      temp[field] = this.assignDefaultValue(<FormGroup>this.form.controls['projectFinishing'], field);
      this.form.controls['projectFinishing'].patchValue(temp);
    });
  }

  assignDefaultValue(formGroup: FormGroup, field) {
    let responseData = '';
    switch (field) {
      case 'category':
        responseData = ProjectNature[this.data.project.projectNature];
        break;
      case 'name':
        responseData = this.data.project.projectName;
        break;
      case 'stage':
        responseData = StartupStage[this.data.project.startupStage];
        break;
      case 'sector':
        responseData = Sector[this.data.project.sector];
        break;
      case 'acceptingFunds':
        responseData = this.data.project.acceptingFunds==='true'?'true':'false';
        break;
      case 'teamSize':
        if(this.data.project.teamSize%10===0) responseData = this.data.project.teamSize
        else responseData = TeamSizes[this.data.project.teamSize] ;
        break;
      case 'websiteLink':
        responseData = this.data.project.website;
        break;
      case 'facebookLink':
        responseData = this.data.project.facebookPage;
        break;
      case 'linkedInLink':
        responseData = this.data.project.linkedInPage;
        break;
      case 'twitterLink':
        responseData = this.data.project.twitterPage;
        break;
      default:
        if(this.data.project[field]) responseData = this.data.project[field]
        else responseData = ''
    }
    return responseData;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  triggerUploadPhoto(){
    let el: HTMLElement = this.chooseStartupIdentity.nativeElement as HTMLElement;
    el.click()
  }

  insertedFile(e){
    this.uploader.uploadAll()
    this.imageType = 'logo'
  }

  uploadCoverImage(e) {
    this.uploadProgress_cover = 1
    this.uploader.uploadAll();
    this.imageType = 'coverImage';
  }

  uploadToCloudinary(){
    this.uploader.onAfterAddingFile = (file)=>{
      this.uploadProgress = 1
      this.fileName = null 
    }
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any)=>{
      if(this.imageType === 'logo') this.uploadProgress = 100
      else this.uploadProgress_cover = 100
      const res = JSON.parse(response)
      if(this.imageType === 'logo'){
        this.logoImage = res.secure_url;
        (<FormControl>(<FormGroup>this.form.controls['projectBasic']).controls['logo']).setValue(res.secure_url)
      }else{
        this.coverImage = res.secure_url
        this.fileName = res.original_filename + '.' + res.format;
        (<FormControl>(<FormGroup>this.form.controls['projectFinishing']).controls['coverImage']).setValue(res.secure_url)
      }
    }

    this.uploader.onCompleteAll = () => {
      
    }

    this.uploader.onWhenAddingFileFailed = (item: any, filter: any, options: any) => {
      if(!environment.production) console.log('upload failed')
      this._snackBar.open('Could not upload the Images!', 'X', {duration: 1500})
    }
  }

  get projectName(){
    return this.form.get('projectBasic.name')
  }

  get projectCategory(){
    return this.form.get('projectBasic.category')
  }

  get projectSector(){
    return this.form.get('projectBasic.sector')
  }

  get projectStage(){
    return this.form.get('projectBasic.stage')
  }

  get projectTeamSize(){
    return this.form.get('projectBasic.teamSize')
  }

  get acceptingFunds(){
    return this.form.get('projectDetails.acceptingFunds')
  }

  get projectPitch(){
    return this.form.get('projectDetails.pitch')
  }

  get projectProblem(){
    return this.form.get('projectDetails.problemSolvingDescription')
  }

  get projectValue(){
    return this.form.get('projectDetails.valueAddDescription')
  }

  get websiteLink(){
    return this.form.get('projectFinishing.websiteLink')
  }

  get facebookLink(){
    return this.form.get('projectFinishing.facebookLink')
  }

  get twitterLink(){
    return this.form.get('projectFinishing.twitterLink')
  }

  get linkedInLink(){
    return this.form.get('projectFinishing.linkedInLink')
  }

  clickNext() {
    if(this.selectedValue===0){
      let isFormValid = this.form.get('projectBasic').valid
      if(!isFormValid){
       Object.keys((<any>this.form.controls['projectBasic']).controls).forEach(a=>{
        (<FormControl>(<FormGroup>this.form.controls['projectBasic']).controls[a]).markAsDirty();
        (<FormControl>(<FormGroup>this.form.controls['projectBasic']).controls[a]).markAsTouched();
       })
      }else {
        this.goNext()
      }
    }else if(this.selectedValue===1){
      let isFormValid = this.form.get('projectDetails').valid
      if(!isFormValid){
        Object.keys((<any>this.form.controls['projectDetails']).controls).forEach(a=>{
          (<FormControl>(<FormGroup>this.form.controls['projectDetails']).controls[a]).markAsDirty();
          (<FormControl>(<FormGroup>this.form.controls['projectDetails']).controls[a]).markAsTouched();
         })
      }else {
        this.goNext()
      }
    }
  }

  goNext() {
    if (this.selectedValue < this.steps.length - 1) {
      this.selectedValue = this.selectedValue + 1;

      /* set next button name */
      this.prevBtnName = this.pages[this.selectedValue - 1].description;
      this.nextBtnName = this.pages[this.selectedValue].nextBtnText;
    }
  }

  goPrev(){
    if (this.selectedValue !== 0) {
      this.selectedValue = this.selectedValue - 1;
      /* set prev button name */
      this.prevBtnName = this.pages[this.selectedValue]['description'];
      this.nextBtnName = this.pages[this.selectedValue]['nextBtnText'];
    }
  }

  onClose() {
    this.dialogRef.close()
  }

  createProject() {
    if(this.data.project){
      this.dataService.editProject(this.form.value, this.data.project._id)
    }else {
      this.dataService.createProject(this.form.value)
    }
    this.dialogRef.close()
  }
}
