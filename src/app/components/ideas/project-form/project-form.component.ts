import { Component, OnInit, Optional, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProjectNature, Sector, StartupStage, TeamSizes } from '../../../models/project.model';
import { CloudinaryUploader, CloudinaryOptions } from 'ng2-cloudinary';
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
      name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      sector: new FormControl('', Validators.required),
      stage: new FormControl('', Validators.required),
      teamSize: new FormControl('', Validators.required),
    }),
    projectDetails: new FormGroup({
      acceptingFunds: new FormControl('', Validators.required),
      pitch: new FormControl('', [Validators.required, Validators.maxLength(300)]),
      problemSolvingDescription: new FormControl(''),
      valueAddDescription: new FormControl('')
    }),
    projectFinishing : new FormGroup({
      websiteLink: new FormControl(''),
      facebookLink: new FormControl(''),
      twitterLink: new FormControl(''),
      linkedInLink: new FormControl(''),
      coverImage: new FormControl('')
    })
  })

  constructor(public dialogRef: MatDialogRef<ProjectFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
    private dataService: DataService) { }

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
    this.uploader.uploadAll();
    this.imageType = 'coverImage';
  }

  uploadToCloudinary(){
    this.uploader.onAfterAddingFile = (file)=>{
      this.fileName = null 
    }
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any)=>{
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
      console.log('upload failed')
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
    this.dialogRef.close()
    this.dataService.createProject(this.form.value)
  }


}
