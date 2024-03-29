// Pregnancy Followup form component

// import { style } from '@angular/animations';
import { AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, DoCheck } from '@angular/core';
// import * as CryptoJS from 'crypto-js';


// interface Frequency {
//   name: string;
// }

interface Regimen {
  drugName: string | null,
  indication: string | null,
  dose: string | null,
  units: string | null,
  frequency: string | null,
  startDate: string | null,
  endDate: string | null,
};

interface Complications{
  previousPregnancyComplications: [string],
  pregnancyOutcomeDate: string | null,
  pregnancyOutcome: [string],
  height: number | null,
  heightUnits: string | null,
  weight: number | null,
  weightUnits: string | null,
  newBornGender: string,
  apgarScore: string | null,
  newBornSufferedCongInfo: string | null,
  riskFactorsForReportedMalformations: string | null,
  congMalfRelatedToMedications: string | null,
};


interface Survey {
  patient: {
    patientInitials: string | null,
    patientDateOfBirth: string | null,
    estimatedBirthDate: string | null,
    firstDayLMP: string | null,
  }
  product: 
    {
      medicationTakenByPatient: Array<string | null>,
      regimen: Array<Regimen>
    },
  medicalHistory: {
    patientMedicalHistory: string | null,
  },
  complications: Complications
};

// this.surveyJson.product.medicationTakenByPatient


@Component({
  selector: 'app-follow-up-form',
  templateUrl: './follow-up-form.component.html',
  styleUrls: ['./follow-up-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FollowUpFormComponent implements OnInit, DoCheck, AfterViewChecked {
  // reactiveForm: FormGroup;
  // frequencies: Frequency[];
  // selectedFrequency: Frequency;
  // <<<<<<< HEAD
  activeIndex = 1;
  // =======
  public refno = '354';
  action = '';
  refArray:any = [];
  lastRecObj:Survey;
  // public base64Key = "aGlsaXRsZGFwc2NydGtleQ==";
  // key = CryptoJS.enc.Base64.parse(this.base64Key);



  public surveyJson : Survey;
  //   patient: {
  //     patientInitials: '',
  //     patientDateOfBirth: '',
  //     estimatedBirthDate: '',
  //     firstDayLMP: '',
  //   },
  //   product: 
  //     {
  //       medicationTakenByPatient: [''],
  //       regimen: [{
  //         drugName: '',
  //         indication: '',
  //         dose: '',
  //         units: '',
  //         frequency: '',
  //         startDate: '',
  //         endDate: '',
  //       }]
  //     },
  //   medicalHistory: {
  //     patientMedicalHistory: '',
  //   },
  //   complications: {
  //     previousPregnancyComplications: [''],
  //     pregnancyOutcomeDate: '',
  //     pregnancyOutcome: [''],
  //     height: 0,
  //     heightUnits: '',
  //     weight: 80,
  //     weightUnits: '',
  //     newBornGender: '',
  //     apgarScore: '',
  //     newBornSufferedCongInfo: '',
  //     riskFactorsForReportedMalformations: '',
  //     congMalfRelatedToMedications: '',
  //   },
  // };

  // >>>>>>> 4784c0793ea257eed09d681e47d88d70b5dd0bb8
  mainEl: any;
  step = 1;
  currentStep: any;
  el: any;
  selectedValues: string[] = [];

  drugsArray: Array<any> = [
    { name: 'Cimzia', value: 'Cimzia' },
    { name: 'Levetiracetam', value: 'Levetiracetam' },
    { name: 'Briviact', value: 'Briviact' },
    { name: 'Vimpat', value: 'Vimpat' },
    { name: 'Keppra', value: 'Keppra' },
    { name: 'Xyrem', value: 'Xyrem' },
    { name: 'Others', value: 'Others' },
  ];

  multiStep = new FormGroup({
    patientDetails: new FormGroup({
      patient_initials: new FormControl(''),
      patient_dob: new FormControl(''),
      menstrual_date: new FormControl(''),
      estimated_dob: new FormControl(''),
    }),
    drugs: new FormArray([]),
    medicationArray: new FormArray([
      // initially it will be empty
      //  new FormGroup({
      //     drugName: new FormControl(''),
      //     dosage : new FormControl(''),
      //     dosageUnit : new FormControl(''),
      //     frequency : new FormControl(''),
      //     startMedicationDate : new FormControl(''),
      //     stopMedicationDate : new FormControl(''),
      //     indication : new FormControl('')
      // })
    ]),
    medicalHistory: new FormGroup({
      patientMedicalHistory: new FormControl(''),
    }),
    complications: new FormGroup({
      previousPregnancyComplications: new FormControl(''),
      pregnancyOutcomeDate: new FormControl(''),
      pregnancyOutcome: new FormControl(''),
      newBornGender: new FormControl(''),
      height: new FormControl(''),
      heightUnits: new FormControl(''),
      weight: new FormControl(''),
      weightUnits: new FormControl(''),
      apgarScore:new FormControl(''),
      newBornSufferedCongInfo :new FormControl(''),
      riskFactorsForReportedMalformations :new FormControl(''),
      congMalfRelatedToMedications :new FormControl(''),
    })

  });

  onDrugsChange(e: any) {
    const drugsArrayTemp: FormArray = this.multiStep.get('drugs') as FormArray;
    const medArray: FormArray = this.multiStep.get(
      'medicationArray'
    ) as FormArray;

    if (e.target.checked) {
      drugsArrayTemp.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      drugsArrayTemp.controls.forEach((item) => {
        if (item.value == e.target.value) {
          drugsArrayTemp.removeAt(i);
          medArray.removeAt(i); // removing the med details at index i
          return;
        }
        i++;
      });
    }
    // console.log(drugsArrayTemp.value);
    if (e.target.checked) {
      const medication = new FormGroup({
        drugName: new FormControl(e.target.value),
        dosage: new FormControl(''),
        dosageUnit: new FormControl(''),
        frequency: new FormControl(''),
        startMedicationDate: new FormControl(''),
        stopMedicationDate: new FormControl(''),
        indication: new FormControl(''),
      });
      //this.medication.get('drugName')
      medArray.push(medication);
    } else {
    }
  }

  get drugs() {
    return this.multiStep.get('drugs') as FormArray;
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private elRef: ElementRef,
    private renderer: Renderer2,
    private route:ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {
    // this.frequencies = [
    //   { name: 'Regular' },
    //   { name: 'Weekly' },
    //   { name: 'Monthly' },
    // ];
    //console.log(JSON.stringify(this.surveyJson));
  }

  ngOnInit(): void {
    // this.step = 2;
    this.el = this.elRef.nativeElement.querySelector('.form');
    this.mainEl = this.elRef.nativeElement.querySelector('.main');
    // this.reactiveForm = new FormGroup({});
    // console.log(this.multiStep);
    // this.activeIndex = this.step;

    /// 1. read the local data
    
    this.route.queryParams.subscribe(params => {
      // console.log(params['form']);

      this.action = params['action'];
      if(this.action === 'view' || this.action === 'edit'){

        const refArrayString = localStorage.getItem('refs');
        if(refArrayString){
          this.refArray = JSON.parse(refArrayString);
          let keyArray = Object.keys(this.refArray);
          let lastRecObject = this.refArray[this.refArray.length-1];
          console.log('lastRecObject');
          console.log(lastRecObject);
          let lastRecString = Object.values(lastRecObject);
          console.log('lastRec');
          this.lastRecObj = JSON.parse(lastRecString.toString());
          console.log(this.lastRecObj);
          this.populateForm();
        } 

      }
    });
  }
  cbCheckValue(cbName:string){
    
    if(this.lastRecObj.product.medicationTakenByPatient?.indexOf(cbName) > -1) return true;
    else return null;
  }

  rbCheckValue(rbValue:string){
    // console.log(rbValue);
    // console.log('checking',this.lastRecObj.complications.previousPregnancyComplications.indexOf(rbValue));
    if(this.lastRecObj.complications.previousPregnancyComplications?.indexOf(rbValue) > -1) {
      this.multiStep.controls.complications.controls.previousPregnancyComplications.setValue(rbValue);
      return true;
    }
    else return null;
  }
  rbPregnancyOutcomeCheckValue(rbValue:string){
    if(this.lastRecObj.complications.pregnancyOutcome?.indexOf(rbValue) > -1) {
      this.multiStep.controls.complications.controls.pregnancyOutcome.setValue(rbValue);
      return true;}
    else return null;
  }

  rbnbGenderCheckValue(rbValue:string){
    if(this.lastRecObj.complications.newBornGender?.indexOf(rbValue) > -1) {
      this.multiStep.controls.complications.controls.newBornGender.setValue(rbValue);
      return true;}
    else return null;
  }


  normalizeDate(dt:any){
    if(dt) {
      let dd = dt.split('-')[0];
      if(dd.length === 1) dd = '0'+dd;
      let mm = dt.split('-')[1];
      if(mm.length === 1) mm = '0'+mm;
      let yyyy = dt.split('-')[2];
      return yyyy+'-'+mm+'-'+dd;
    } else return '';
  }
  

  populateForm(){
   
    this.multiStep.controls.patientDetails.controls.estimated_dob.setValue(this.normalizeDate(this.lastRecObj.patient.estimatedBirthDate));
    this.multiStep.controls.patientDetails.controls.menstrual_date.setValue(this.normalizeDate(this.lastRecObj.patient.firstDayLMP));
    this.multiStep.controls.patientDetails.controls.patient_dob.setValue(this.normalizeDate(this.lastRecObj.patient.patientDateOfBirth));
    this.multiStep.controls.patientDetails.controls.patient_initials.setValue(this.lastRecObj.patient.patientInitials);
    //this.multiStep.value.medicationArray?.push(regimen);
    const medArray: FormArray = this.multiStep.get('medicationArray') as FormArray;
    this.lastRecObj.product.regimen.forEach((regimen: Regimen, i) => {
      const medication = new FormGroup({
        drugName: new FormControl(regimen.drugName),
        dosage: new FormControl(regimen.dose),
        dosageUnit: new FormControl(regimen.units),
        frequency: new FormControl(regimen.frequency),
        startMedicationDate: new FormControl(this.normalizeDate(regimen.startDate)),
        stopMedicationDate: new FormControl(this.normalizeDate(regimen.endDate)),
        indication: new FormControl(regimen.indication)
      });
      medArray.push(medication);
    });

    console.log('drug array length');
    console.log(this.multiStep.controls.drugs.length);
    console.log('medicatin array length');
    console.log(this.multiStep.controls.medicationArray.controls.length);

    this.multiStep.controls.medicalHistory.controls.patientMedicalHistory.setValue(this.lastRecObj.medicalHistory.patientMedicalHistory);
    this.multiStep.controls.complications.controls.pregnancyOutcomeDate.setValue(this.normalizeDate(this.lastRecObj.complications.pregnancyOutcomeDate));
    this.multiStep.controls.complications.controls.height.setValue(this.lastRecObj.complications.height?.toString() || null);
    this.multiStep.controls.complications.controls.heightUnits.setValue(this.lastRecObj.complications.heightUnits);
    this.multiStep.controls.complications.controls.weight.setValue(this.lastRecObj.complications.weight?.toString() || null);
    this.multiStep.controls.complications.controls.weightUnits.setValue(this.lastRecObj.complications.weightUnits);
    this.multiStep.controls.complications.controls.apgarScore.setValue(this.lastRecObj.complications.apgarScore);
    this.multiStep.controls.complications.controls.newBornSufferedCongInfo.setValue(this.lastRecObj.complications.newBornSufferedCongInfo);
    this.multiStep.controls.complications.controls.riskFactorsForReportedMalformations.setValue(this.lastRecObj.complications.riskFactorsForReportedMalformations);
    this.multiStep.controls.complications.controls.congMalfRelatedToMedications.setValue(this.lastRecObj.complications.congMalfRelatedToMedications);

  }

  onClickNext() {
    this.activeIndex++;
    if (this.step === 5) {
      return;
    } else {
      this.step = this.step + 1;
      
      if(this.step === 2){
        
      }


      this.cd.detectChanges();
      if (this.step > 4) {
        this.renderer.addClass(this.el, 'align__center');
        this.renderer.addClass(this.mainEl, 'max-height');
      }
    }
  }
  onClickPrev() {
    if (this.activeIndex > 1) {
      this.activeIndex--;
    }

    if (this.step === 1) {
      console.log('you are on the first section');
      return;
    } else {
      this.step = this.step - 1;
      if (this.step <= 4) {
        this.renderer.removeClass(this.el, 'align__center');
        this.renderer.removeClass(this.mainEl, 'max-height');
      }
    }
  }
  onSubmit() {

    // console.log(this.multiStep.value);

    // let estimated_dob = this.multiStep.value.patientDetails?.estimated_dob;
    // this.surveyJson.patient.estimatedBirthDate = new DatePipe('en').transform(estimated_dob, 'd-MM-yyyy') || '';

    // let menstrual_date = this.multiStep.value.patientDetails?.menstrual_date;
    // this.surveyJson.patient.firstDayLMP = new DatePipe('en').transform(menstrual_date, 'd-MM-yyyy') || '';

    // let patient_dob = this.multiStep.value.patientDetails?.patient_dob;
    // this.surveyJson.patient.patientDateOfBirth = new DatePipe('en').transform(patient_dob, 'd-MM-yyyy') || '' || '';
    
    // this.surveyJson.patient.patientInitials = this.multiStep.value.patientDetails?.patient_initials || '';

    // this.surveyJson.product.medicationTakenByPatient = this.multiStep.value.drugs || [];
    // let j=0;
    // this.multiStep.value.medicationArray?.forEach((regimenItem: any, i) => {
      
    //   const NewRegimen = {
    //     drugName:regimenItem.drugName,
    //     dose: regimenItem.dosage,
    //     units:regimenItem.dosageUnit,
    //     frequency: regimenItem.frequency,
    //     startDate: new DatePipe('en').transform(regimenItem.startMedicationDate, 'd-MM-yyyy') || '',
    //     endDate: new DatePipe('en').transform(regimenItem.stopMedicationDate, 'd-MM-yyyy') || '',
    //     indication: regimenItem.indication
    //   };
    //   this.surveyJson.product.regimen.push(NewRegimen);
    // });

    // if(this.surveyJson.product.regimen.length>1)
    // this.surveyJson.product.regimen.shift(); // removing first record from the regimen array as it is dummy

    // this.surveyJson.medicalHistory.patientMedicalHistory = this.multiStep.value.medicalHistory?.patientMedicalHistory || '';

    // this.surveyJson.complications.previousPregnancyComplications[0] = this.multiStep.value.complications?.previousPregnancyComplications || '';

    // let pregnancyOutcomeDate = this.multiStep.value.complications?.pregnancyOutcomeDate || '';
    // this.surveyJson.complications.pregnancyOutcomeDate = new DatePipe('en').transform(pregnancyOutcomeDate, 'd-MM-yyyy') || '';
    // this.surveyJson.complications.pregnancyOutcome[0] = this.multiStep.value.complications?.pregnancyOutcome || '';
    // this.surveyJson.complications.newBornGender = this.multiStep.value.complications?.newBornGender || '';
    // this.surveyJson.complications.height = parseInt(this.multiStep.value.complications?.height || '') || 0 ;
    // this.surveyJson.complications.heightUnits = this.multiStep.value.complications?.heightUnits|| '';
    // this.surveyJson.complications.weight = parseInt(this.multiStep.value.complications?.weight || '') || 0;
    // this.surveyJson.complications.weightUnits = this.multiStep.value.complications?.weightUnits || '';
    // this.surveyJson.complications.apgarScore = this.multiStep.value.complications?.apgarScore || '';
    // this.surveyJson.complications.newBornSufferedCongInfo = this.multiStep.value.complications?.newBornSufferedCongInfo || '';
    // this.surveyJson.complications.riskFactorsForReportedMalformations = this.multiStep.value.complications?.riskFactorsForReportedMalformations || '';
    // this.surveyJson.complications.congMalfRelatedToMedications = this.multiStep.value.complications?.congMalfRelatedToMedications || '';
  

    this.onClickNext();
    // let jsonObj = JSON.stringify(this.surveyJson, (key, value) => (value === '') ? null : value);
    //console.log(JSON.stringify(this.surveyJson));
    // console.log(jsonObj);
    //this.saveLocal(jsonObj);
    // send the data to the server
    // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJicmlsbHkiLCJpYXQiOjE2NjE3ODExMDN9.4VBAZfc64YP1K211n9uSwyfISe3cOQ-A0RDJrnTHBG1LXceENPGaU77xPkoCUdYuMr3KnH85fQx2nB6TE2wQbQ';
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    // });
    
    // AuthInterceptor.accessToken = token; // ADDED THROUGH THE INTERCEPTOR
    //this.http.post('http://172.168.1.82:8080/hilitloginservice/auth/capeicaseintake/capeicaseintakeservice/caseIntakeService/ucbFormSubmit',  this.surveyJson, {headers})
    // this.http.post('http://172.168.1.82:8080/hilitloginservice/auth/capeicaseintake/capeicaseintakeservice/caseIntakeService/ucbFormSubmit',  jsonObj, {headers})
    // .subscribe((res:any)=>{
    //   console.log('response',res);

      //let userObj = this.decryptResponse(res);

      // let accessToken   = userObj.accessToken;
      // console.log('Decryped Access Token');
      // console.log(accessToken);

      // if(res.message === 'Success'){
      //   let resultTxt = res.result;
      //   this.refno = resultTxt.split(':')[1];
      //   console.log(this.refno);
        //this.saveLocal(jsonObj);
        // store to local storage
      // }
    // });
    this.refno = '654';
  }


  // decryptResponse(response: any){

  //   const crypted  = CryptoJS.enc.Base64.parse(response);
  //   let decryptedData = CryptoJS.AES.decrypt(
  //     crypted.toString(CryptoJS.enc.Hex),
  //     this.key,
  //     {
  //       mode: CryptoJS.mode.ECB,
  //       padding: CryptoJS.pad.Pkcs7
  //     }
  //   );

  //   const decryptedText = decryptedData.toString(CryptoJS.enc.Utf8);
  //   const str = (decryptedText.substring(decryptedText.lastIndexOf("::")+2,decryptedText.length));
  //   const saltLength = parseInt(str)
  //   const saltTrailingCount = 2 + str.length;
  //   const totalSaltLength = saltLength + saltTrailingCount;
  //   const decrypted = decryptedText.substring(0,decryptedText.length - totalSaltLength);
  //   const value= JSON.parse(decrypted);
  //   return value;
  // }


  saveLocal(jsonObj:any){
    console.log('saving local');
    let refArray:any = [];
    const refArrayString = localStorage.getItem('refs');

    if(refArrayString){
      refArray = JSON.parse(refArrayString);
    } 
    refArray.push({[this.refno]: jsonObj})
    localStorage.setItem('refs', JSON.stringify(refArray));
  }

  ngDoCheck(){
    this.cd.markForCheck();
    // console.log('do check');
  }

  ngAfterViewChecked(): void {
    this.cd.markForCheck();
    // console.log('after view checked');
  }


  markforChecked(){
    // console.log('mark for checked');
    // this.cd.detectChanges();
  }

  // alignCenter(currentStep: any) {}
}




