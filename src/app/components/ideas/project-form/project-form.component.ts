import { Component, OnInit, Optional, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProjectNature, Sector, StartupStage, TeamSizes } from '../../../models/project.model';
import { CloudinaryUploader, CloudinaryOptions } from 'ng2-cloudinary';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {}}
  ]
})
export class ProjectFormComponent implements OnInit {

  page:number = 0
  categories: string[]
  sectors: string[]
  stages: string[]
  teamSize: string[]
  imageType: string
  @ViewChild('chooseStartupIdentity', {static: true}) chooseStartupIdentity: any;
  logoImage: any
  coverImage: any
  fileName: string

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
      team: new FormControl('', Validators.required),
    }),
    projectDetails: new FormGroup({
      acceptingFunds: new FormControl('', Validators.required),
      pitch: new FormControl('', [Validators.required, Validators.maxLength(13)]),
      problemSolvingDescription: new FormControl(''),
      valueAddCustomer: new FormControl('')
    }),
    projectFinishing : new FormGroup({
      website: new FormControl(''),
      facebook: new FormControl(''),
      twitter: new FormControl(''),
      linkedIn: new FormControl(''),
      coverImage: new FormControl('')
    })
  })

  constructor(public dialogRef: MatDialogRef<ProjectFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.categories = [ProjectNature.CAUSE, ProjectNature.SERVICE ,ProjectNature.PRODUCT, ProjectNature.OTHERS]
    this.sectors = [Sector.HEALTHCARE_FITNESS, Sector.FIN_TECH, Sector.E_COMMERCE, Sector.CONSUMER, Sector.FOOD, Sector.EDUCATION, Sector.HR]
    this.stages = [StartupStage.IDEA, StartupStage.MVP, StartupStage.GROWTH, StartupStage.BETA, StartupStage.GROWING]
    this.teamSize = [TeamSizes.SINGLE, TeamSizes.VERY_SMALL, TeamSizes.SMALL, TeamSizes.TEN_PLUS, TeamSizes.TWENTY_PLUS, TeamSizes.MEDIUM, TeamSizes.LARGE]
    this.uploadToCloudinary()
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
      console.log(res)
      if(this.imageType === 'logo'){
        this.logoImage = res.secure_url
      }else{
        this.coverImage = res.secure_url
        this.fileName = res.original_filename + '.' + res.format;
      }
    }

    this.uploader.onCompleteAll = () => {
      
    }

    this.uploader.onWhenAddingFileFailed = (item: any, filter: any, options: any) => {
      console.log('upload failed')
    }
  }

  send(){
    console.log(this.form)
    console.log(this.form.value)
    console.log(this.form.get('projectBasic.name'))
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
    return this.form.get('projectBasic.team')
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
    return this.form.get('projectDetails.valueAddCustomer')
  }

}
