
const Search_result_form = document.getElementById("Search_result_form");
const sheet = document.querySelector(".student_result_sheet");



// form submit 


Search_result_form.onsubmit = (e) => {
  e.preventDefault();

  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());

 
  let oldData = getDatals("students");
  
  const studentResult = oldData.find(item => item.roll === data.roll && item.reg === data.reg);
  
  let content = "";

  if(studentResult){
      content += `
      <div class="student-info">
      <div class="row justify-content-between">
        <h2 class="text-center">Mark Sheet</h2>
        <hr>
        <div class="col-md-6">
           <div class="d-flex">
            <h6 style="width: 40%;">Name of Student : </h6>
            <p class="text-uppercase" > ${studentResult.name}</p>
           </div>
           <div class="d-flex">
            <h6 style="width: 40%;">Roll No : </h6>
            <p class="text-uppercase" > ${studentResult.roll}</p>
           </div>
           <div class="d-flex">
            <h6 style="width: 40%;">Registration No.: </h6>
            <p class="text-uppercase" > ${studentResult.reg} </p>
           </div>
           <div class="d-flex">
              <h6 style="width: 40%;">Result :  </h6> 
             
            <p class="text-uppercase"><strong>
            ${
                getFinalResult({
                    bangla: studentResult.result.bangla,
                    english: studentResult.result.english,
                    math: studentResult.result.math,
                    science: studentResult.result.science,
                    social_science: studentResult.result.social_science,
                    religion: studentResult.result.religion,
                }).result ===  'F' ? `<h4 class="btn btn-danger">Faild</h4>`: `<h4 class="btn btn-primary">Passed</h4>`
            }
                </strong></p>



           </div>
           <div class="d-flex">
            <h6 style="width: 40%;">CGPA : </h6>
            <p class="text-uppercase" > ${getFinalResult({bangla : studentResult.result.bangla , english : studentResult.result.english, math : studentResult.result.math , science : studentResult.result.science, social_science :  studentResult.result.social_science , religion : studentResult.result.religion  }).cgpa.toFixed(2)}</p>
           </div>
        </div>
        <div class="col-md-4">
          <img style="width: 150PX; height: 150; border-radius: 10px; " src="${studentResult.photo}" alt="">
        </div>
      </div>
      <h2 class="text-center mt-3">Grade Sheet</h2>
      <hr>
      <table class="table table-striped table-bordered">
        <tr>
          <th>CODE</th>
          <th>SUBJECT</th>
          <th>MARKS</th>
          <th>GPA</th>
          <th>GRADE</th>
          <th>CGPA</th>
          <th>FINALRESULT</th>
        </tr>
        <tr>
          <td>101</td>
          <td>Bangla</td>
          <td>${studentResult.result.bangla} </td>
          <td>${getGpaGrade(studentResult.result.bangla).gpa}</td>
          <td>${getGpaGrade(studentResult.result.bangla).grade}</td>
          <td rowspan="6">${getFinalResult({bangla : studentResult.result.bangla , english : studentResult.result.english, math : studentResult.result.math , science : studentResult.result.science, social_science :  studentResult.result.social_science , religion : studentResult.result.religion  }).cgpa.toFixed(2)} </td>
          <td rowspan="6">${getFinalResult({bangla : studentResult.result.bangla , english : studentResult.result.english, math : studentResult.result.math , science : studentResult.result.science, social_science :  studentResult.result.social_science , religion : studentResult.result.religion  }).result}</td>
        </tr>
        <tr>
          <td>102</td>
          <td>English</td>
          <td>${studentResult.result.english} </td>
          <td>${getGpaGrade(studentResult.result.english).gpa}</td>
          <td>${getGpaGrade(studentResult.result.english).grade}</td>
        </tr>
        <tr>
          <td>103</td>
          <td>Math</td>
          <td>${studentResult.result.math} </td>
          <td>${getGpaGrade(studentResult.result.math).gpa}</td>
          <td>${getGpaGrade(studentResult.result.math).grade}</td>
        </tr>
        <tr>
          <td>104</td>
          <td>Science</td>
          <td>${studentResult.result.science} </td>
          <td>${getGpaGrade(studentResult.result.science).gpa}</td>
          <td>${getGpaGrade(studentResult.result.science).grade}</td>
        </tr>
        <tr>
          <td>105</td>
          <td> Social Science</td>
          <td>${studentResult.result.social_science} </td>
          <td>${getGpaGrade(studentResult.result.social_science).gpa}</td>
          <td>${getGpaGrade(studentResult.result.social_science).grade}</td>
        </tr>
        <tr>
          <td>106</td>
          <td>Religion</td>
          <td>${studentResult.result.religion} </td>
          <td>${getGpaGrade(studentResult.result.religion).gpa}</td>
          <td>${getGpaGrade(studentResult.result.religion).grade}</td>
        </tr>
      </table>
    </div>
   
      
      `


  }else{
    content = "<h2> Result not found </h2>";
  }
  sheet.innerHTML = content;
}


















