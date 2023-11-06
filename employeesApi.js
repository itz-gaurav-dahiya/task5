import React, { Component } from "react";
import http from './httpService'
class NewEmployeeForm extends Component {
  state = {
      empcode: "",
      name: "",
      department: "", // Default value for department dropdown
      designation: "", // Default value for designation dropdown
      salary: "",
      gender: "", // Default value for gender radio
      edit:false
  };

  handleInputChange = (e) => {
   let s1={...this.state};
   let {currentTarget:input}=e;
   s1[input.name]=input.value;
   this.setState(s1);
   console.log(s1)
  };

async componentDidMount(){
  this.fetchData();
}
async componentDidUpdate(prevProps ,prevState){
  if(prevProps!==this.props){
      this.fetchData();
  }
}

async fetchData() {
  const { id } = this.props.match.params;
  if (id) {
    let response = await http.get(`/Employees/${id}`);
    let { data } = response;
    // console.log('resp',response)
    console.log('data',data)
    this.setState({ empcode:data.empcode,name:data.name, department:data.department,designation:data.designation,
    salary:data.salary, gender:data.gender,
    edit:'', edit: true }); // Set edit to true when editing
  } else {
    
    this.setState({ empcode: '',name: '', department: '',designation: '',
    salary:'', gender:'',
    edit:'', edit: false });
  }
  console.log(this.state);
}

  handleSubmit = (event) => {
    let {edit}=this.state
    if(edit){
      this.putData(this.state)
    }
    else{
      this.postData(this.state)
    }
    this.setState({edit:false})
    this.props.history.push('/Employees')
  };


  async putData(data){
  const { id } = this.props.match.params;

    let response=await http.put(`/Employees/${id}`,data)
    // this.props.history.push('/Employees')

  }
 async postData(data){
     let response= await http.post('/Employees',data)
    //  this.props.history.push('/Employees')
  }

  render() {
    return (
     <div className="container ">
      <div className="row">
        <h2>New Employee Form</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="col-12 ">
            <label>
              Employee Code:
            </label>
              <input
                type="text"
                name="empcode"
                value={this.state.empcode}
                onChange={this.handleInputChange}
                className="form-control "
                disabled={this.state.edit?true:false}
              />
          </div>
          <div  className="col-12 ">
            <label>
              Name:
            </label>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleInputChange}
                className="form-control "

              />
          </div>
          <div  className="col-12 ">
            <label>
              Department:
              </label>
              <select
                name="department"
                value={this.state.department}
                onChange={this.handleInputChange}
                className="form-select "
              >
                <option value=''>select</option>
                <option value="Finance">Finance</option>
                <option value="HR">HR</option>
                <option value="IT">IT</option>
                <option value="Technology">Technology</option>
                <option value="Marketing">Marketing</option>

                {/* Add more departments as needed */}
              </select>
           
          </div>
          <div className="col-12 ">
            <label>
              Designation:
              </label>
              <select
                name="designation"
                value={this.state.designation}
                onChange={this.handleInputChange}
                className="form-select "
              >
                <option value=''>select</option>
                <option value="Manager">Manager</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Associate">Associate</option>
                <option value="Trainee">Trainee</option>
                <option value="VP">VP</option>
                {/* Add more designations as needed */}
              </select>
           
          </div>
          <div className="col-12 ">
            <label>
            </label>
              Salary:
              <input
                type="number"
                name="salary"
                value={this.state.salary}
                onChange={this.handleInputChange}
                className="form-control "
              />
          </div>
          <div className="col-12 ">
            <label>Gender:</label>
            <div>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={this.state.gender === "Male"}
                onChange={this.handleInputChange}
                
              />
              <label>Male</label>
            </div>
            <div>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={this.state.gender === "Female"}
                onChange={this.handleInputChange}
              />
              <label>Female</label>
            </div>
            {/* Add more gender options if needed */}
          </div>
          <div>
            <button type="submit" onClick={()=>this.handleSubmit()} className="btn btn-primary ">Submit</button>
          </div>
        </form>
      </div>
      </div>
    );
  }
}

export default NewEmployeeForm;
