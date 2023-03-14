import { Component, Inject,OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.scss']
})
export class AddEditEmpComponent implements OnInit{
  empForm: FormGroup;
education:string[] =[
  "O'level",'Intermediate','Diploma','Graduate','Post Graduate'
];
constructor(private _fb:FormBuilder,
  private _empService:EmployeeService,
  private _dialogRef:MatDialogRef<AddEditEmpComponent>,
  private _coreService: CoreService,
  @Inject(MAT_DIALOG_DATA) public data: any
  ){
  this.empForm = this._fb.group({
    firstName: '',
    lastName: '',
    email:'',
    dob:'',
    gender:'',
    education:'',
    company:'',
    experience:'',
    package:'',
  });
};
ngOnInit(): void {
  this.empForm.patchValue(this.data)
}
onSubmit(){
  if(this.empForm.valid){
    if(this.data){
      this._empService.updateEmployee(this.data.id,this.empForm.value).subscribe({
        next:(val:any) =>{
          // alert('Employee details updated successfully');
          this._coreService.openSnackBar('Employee details updated successfully');
          this._dialogRef.close(true);
        },
        error: (err:any) =>{
          console.error(err)
        }
      })
    }else{
      this._empService.addEmployee(this.empForm.value).subscribe({
        next:(val:any) =>{
          // alert('Employee added successfully');
          this._coreService.openSnackBar('Employee added successfully');
          this._dialogRef.close(true);
        },
        error: (err:any) =>{
          console.error(err)
        }
      })
    }
    
    
  }
}
}
