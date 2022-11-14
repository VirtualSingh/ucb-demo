// import { style } from '@angular/animations';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { DatePipe } from '@angular/common';

// interface Frequency {
//   name: string;
// }

@Component({
  selector: 'app-ae-form',
  templateUrl: './ae-form.component.html',
  styleUrls: ['./ae-form.component.scss'],
})
export class NewAEFormComponent implements OnInit {
  // reactiveForm: FormGroup;
  // frequencies: Frequency[];
  // selectedFrequency: Frequency;
  // <<<<<<< HEAD
  activeIndex = 1;

  // =======
  public refno = '464';

  public surveyJson = {
    patient: {
      patientInitials: 'VM',
      patientDateOfBirth: '22-08-2022 09:06:55',
      estimatedBirthDate: '',
      firstDayLMP: '22-08-2022 09:06:55',
    },
    product: {
      medicationTakenByPatient: ['CIMZIA'],
      regimen: [
        {
          drugName: '',
          indication: '',
          dose: '',
          units: '',
          frequency: '',
          startDate: '',
          endDate: '',
        },
      ],
    },
    medicalHistory: {
      patientMedicalHistory: 'value',
    },
    complications: {
      previousPregnancyComplications: ['Unknown'],
      pregnancyOutcomeDate: '22-08-2022 09:06:55',
      pregnancyOutcome: ['Miscarriage'],
      height: 123,
      heightUnits: 'CM',
      weight: 80,
      weightUnits: 'Kilogram',
      newBornGender: 'Male',
      apgarScore: '100',
      newBornSufferedCongInfo: 'yes',
      riskFactorsForReportedMalformations: 'Miscarriage',
      congMalfRelatedToMedications: 'yes',
    },
  };

  // >>>>>>> 4784c0793ea257eed09d681e47d88d70b5dd0bb8
  mainEl: any;
  step: any = 1;
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

  aeForm = new FormGroup({
    patientDetails: new FormGroup({
      patient_name: new FormControl(''),
      // patient_dob: new FormControl(''),
      // menstrual_date: new FormControl(''),
      // estimated_dob: new FormControl(''),
    }),
    drugs: new FormArray([]),
    medicationArray: new FormArray([
      // initially it will be empty
      new FormGroup({
        drugName: new FormControl(''),
        reasonForDrug: new FormControl(''),
        medicationChannel: new FormControl(''),
        dosage: new FormControl(''),
        dosageUnit: new FormControl(''),
        frequency: new FormControl(''),
        startMedicationDate: new FormControl(''),
        stopMedicationDate: new FormControl(''),
      }),
    ]),
    medicalHistory: new FormGroup({
      patientMedicalHistory: new FormControl(''),
    }),
  });

  onDrugsChange(e: any) {
    const drugsArrayTemp: FormArray = this.aeForm.get('drugs') as FormArray;
    const medArray: FormArray = this.aeForm.get('medicationArray') as FormArray;

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
    return this.aeForm.get('drugs') as FormArray;
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private elRef: ElementRef,
    private renderer: Renderer2,
    private route: ActivatedRoute
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
    // console.log(this.aeForm);
    // this.activeIndex = this.step;
    if (this.route.snapshot.queryParamMap.get('step') === '4') {
      this.step = Number(this.route.snapshot.queryParamMap.get('step'));
      this.renderer.addClass(this.el, 'align__center');
      this.renderer.addClass(this.mainEl, 'max-height');
    }
    // console.log(this.route.snapshot.queryParamMap.get('step'));
  }
  onClickNext() {
    this.activeIndex++;
    if (this.step === 4) {
      return;
    } else {
      this.step = this.step + 1;
      if (this.step > 3) {
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
      if (this.step <= 3) {
        this.renderer.removeClass(this.el, 'align__center');
        this.renderer.removeClass(this.mainEl, 'max-height');
      }
    }
  }
  onSubmit() {
    // console.log(this.aeForm.value);

    // let estimated_dob = this.aeForm.value.patientDetails?.estimated_dob;
    // this.surveyJson.patient.estimatedBirthDate = new DatePipe('en').transform(estimated_dob, 'd-MM-yyyy') || '';

    // let menstrual_date = this.aeForm.value.patientDetails?.menstrual_date;
    // this.surveyJson.patient.firstDayLMP = new DatePipe('en').transform(menstrual_date, 'd-MM-yyyy') || '';

    // let patient_dob = this.aeForm.value.patientDetails?.patient_dob;
    // this.surveyJson.patient.patientDateOfBirth = new DatePipe('en').transform(patient_dob, 'd-MM-yyyy') || '' || '';

    // this.surveyJson.patient.patientInitials = this.aeForm.value.patientDetails?.patient_initials || '';

    // this.surveyJson.product.medicationTakenByPatient = this.aeForm.value.drugs || [];
    // let j=0;
    // this.aeForm.value.medicationArray?.forEach((regimenItem: any, i) => {

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

    // this.surveyJson.medicalHistory.patientMedicalHistory = this.aeForm.value.medicalHistory?.patientMedicalHistory || '';

    // this.surveyJson.complications.previousPregnancyComplications[0] = this.aeForm.value.complications?.previousPregnancyComplications || '';

    // let pregnancyOutcomeDate = this.aeForm.value.complications?.pregnancyOutcomeDate || '';
    // this.surveyJson.complications.pregnancyOutcomeDate = new DatePipe('en').transform(pregnancyOutcomeDate, 'd-MM-yyyy') || '';
    // this.surveyJson.complications.pregnancyOutcome[0] = this.aeForm.value.complications?.pregnancyOutcome || '';
    // this.surveyJson.complications.newBornGender = this.aeForm.value.complications?.newBornGender || '';
    // this.surveyJson.complications.height = parseInt(this.aeForm.value.complications?.height || '') || 0 ;
    // this.surveyJson.complications.heightUnits = this.aeForm.value.complications?.heightUnits|| '';
    // this.surveyJson.complications.weight = parseInt(this.aeForm.value.complications?.weight || '') || 0;
    // this.surveyJson.complications.weightUnits = this.aeForm.value.complications?.weightUnits || '';
    // this.surveyJson.complications.apgarScore = this.aeForm.value.complications?.apgarScore || '';
    // this.surveyJson.complications.newBornSufferedCongInfo = this.aeForm.value.complications?.newBornSufferedCongInfo || '';
    // this.surveyJson.complications.riskFactorsForReportedMalformations = this.aeForm.value.complications?.riskFactorsForReportedMalformations || '';
    // this.surveyJson.complications.congMalfRelatedToMedications = this.aeForm.value.complications?.congMalfRelatedToMedications || '';

    this.onClickNext();
    // let jsonObj = JSON.stringify(this.surveyJson, (key, value) => (value === '') ? null : value);
    //console.log(JSON.stringify(this.surveyJson));
    // console.log(jsonObj);
    //this.saveLocal(jsonObj);
    // send the data to the server
    // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJicmlsbHkiLCJpYXQiOjE2NjE1MTIxNjN9.MLXWNm_blGPva7nOHfIZQOjwN--noR44korowr6bmWpX1XMGte-Wx-whgtYmYDHv32U9Ogn4woXN3WFal9zafQ';
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    // });

    // AuthInterceptor.accessToken = token; // ADDED THROUGH THE INTERCEPTOR
    //this.http.post('http://172.168.1.82:8080/hilitloginservice/auth/capeicaseintake/capeicaseintakeservice/caseIntakeService/ucbFormSubmit',  this.surveyJson, {headers})
    // this.http.post('http://172.168.1.82:8080/hilitloginservice/auth/capeicaseintake/capeicaseintakeservice/caseIntakeService/ucbFormSubmit',  jsonObj, {headers})
    // .subscribe((res:any)=>{
    //   console.log('response',res);
    //   if(res.message === 'Success'){
    //     let resultTxt = res.result;
    //     this.refno = resultTxt.split(':')[1];
    //     //console.log(this.refno);
    //     this.saveLocal(jsonObj);
    //     // store to local storage

    //   }
    // });
  }

  saveLocal(jsonObj: any) {
    console.log('saving local');
    let refArray: any = [];
    const refArrayString = localStorage.getItem('refs');

    if (refArrayString) {
      refArray = JSON.parse(refArrayString);
    }
    refArray.push({ [this.refno]: jsonObj });
    localStorage.setItem('refs', JSON.stringify(refArray));
  }
  // alignCenter(currentStep: any) {}
}
