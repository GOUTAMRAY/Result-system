

const student_create_form = document.getElementById("student_create_form");
const msg = document.querySelector(".msg");
const msgEdit = document.querySelector(".msg-edit");
const studentsList= document.querySelector(".all_students_list");
const singleStudent= document.querySelector(".single-data");
const student_edit_form = document.getElementById("student_edit_form");
const student_result_form = document.getElementById("student_result_form");
const student_edit_result_form = document.getElementById("student_edit_result_form");


// show all students
const getStudents = () => {
    const students = getDatals("students");

    let content = "";

   if(students.length > 0){
    students.reverse().map ((student , index) => {
      content += `
      <tr class="align-middle">
      <th>${index + 1}</th>
      <th>${student.name}</th>
      <th><img style="width: 50px; height: 50px; object-fit: cover; border-radius:50%;" src="${student.photo}" alt="${student.name}"></th>
     
      <th>${student.roll}</th>
      <th>${student.reg}</th>
      <th>${timeAgo(student.CreateAt)}</th>
      <th>
      ${student.result === null ? `<button class="btn btn-success" data-bs-toggle = "modal" data-bs-target ="#student_result_modal" onclick = "addResult('${student.id}')"> Add marks </button>` : `<button class="btn btn-warning" data-bs-toggle = "modal" data-bs-target ="#student_edit_result_modal" onclick = "editResult('${student.id}')"> View marks </button>` }
 
       
      </th>
      <th>
        <button class="btn btn-sm btn-info" data-bs-toggle = "modal" data-bs-target ="#show_single_student_modal" onclick = "showSingleStudent('${student.roll}')"> <i class="fa-solid fa-eye"></i></button>

        <button class="btn btn-sm btn-warning" data-bs-toggle ="modal" data-bs-target = "#edit_student_modal" onclick ="editStudentData('${student.id}')"> <i class="fa-solid fa-edit"></i></button>

        <button class="btn btn-sm btn-danger" onclick="deleteStudent('${student.roll}')"> <i class="fa-solid fa-trash"></i></button>
      </th>
    </tr>
      
      `
    });
   }else{
    content = `<tr>
     <td colspan = "8" class= "text-center">  No student found </td>
    </tr> `;
   }

   
    studentsList.innerHTML = content;
};
getStudents();


// show single view
const showSingleStudent = (roll) => {
  
  const allStudent = getDatals("students");

  const single = allStudent.find((data) => data.roll == roll);

  singleStudent.innerHTML = ` 
      <img style="width: 300px;" src="${single.photo}" alt="">
      <h2>${single.name}</h2> 
      <p>Roll : ${single.roll}  </p>
      <h5> Reg : ${single.reg}</h5>
  `
}


// Add  result
 const addResult = (id) => {
  student_result_form.querySelector('input[name="id"]').value = id;

 }

// edit result 
const editResult = (id) => {
  const data = getDatals("students");
  const editResultData = data.find(item => item.id == id);

  student_edit_result_form.querySelector('input[placeholder="Bangla"]').value  = editResultData.result.bangla;
  student_edit_result_form.querySelector('input[placeholder="English"]').value = editResultData.result.english;
  student_edit_result_form.querySelector('input[placeholder="Math"]').value    = editResultData.result.math;
  student_edit_result_form.querySelector('input[placeholder="Science"]').value = editResultData.result.science;
  student_edit_result_form.querySelector('input[placeholder="Social Science"]').value = editResultData.result.social_science;
  student_edit_result_form.querySelector('input[placeholder="Religion"]').value = editResultData.result.religion;
  student_edit_result_form.querySelector('input[placeholder="id"]').value = id;
}

// edit result form submit 
student_edit_result_form.onsubmit = (e) => {
  e.preventDefault();

  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());

  const oldData = getDatals("students");

  oldData[oldData.findIndex(item => item.id === data.id)] = {
    ...oldData[oldData.findIndex(item => item.id === data.id)],
    result : data,
  }
  
  sendDatals("students", oldData);

  getStudents();

  

}




 // student result form submit 
  student_result_form.onsubmit = (e) =>{
      e.preventDefault();

    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data.entries());

  // update result
   const oldFinalData = getDatals("students");

   oldFinalData[oldFinalData.findIndex(item => item.id === data.id)] = {
    ...oldFinalData[oldFinalData.findIndex(item => item.id === data.id)],
    result : data,
   }

    sendDatals("students", oldFinalData);
    
    getStudents();

  e.target.reset();
  }

// edit sstudent data 
const editStudentData = (id) => {
    const oldData = getDatals("students");
    const data = oldData.find(data => data.id === id);

    student_edit_form.querySelector('input[name="name"]').value = data.name;
    student_edit_form.querySelector('input[name="roll"]').value = data.roll;
    student_edit_form.querySelector('input[name="reg"]').value = data.reg;
    student_edit_form.querySelector('input[name="id"]').value = data.id;
    student_edit_form.querySelector('input[name="photo"]').value = data.photo;
    student_edit_form.querySelector('img#prevPho').setAttribute("src", data.photo)
};


// edit form submit 
student_edit_form.onsubmit = (e) => {
  e.preventDefault();

  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());

  const getOldData = getDatals("students");


      // roll  number check 
      // if(getOldData.some(item => item.roll === data.roll)){
      //   msgEdit.innerHTML = createAlert("Roll number already exists", "info");
      //  return;
      // };

     // reg  number check 
    //  if(getOldData.some(item => item.reg === data.reg)){
    //   msgEdit.innerHTML = createAlert("Reg number already exists", "warning");
    //  return;
    //  };

    getOldData[getOldData.findIndex(item => item.id === data.id)] = {
      ...getOldData[getOldData.findIndex(item => item.id === data.id)] ,
       ...data
    };


    sendDatals("students",getOldData);

    getStudents();
 
};



// delete student data 
const deleteStudent = (roll) => {
  const conf = confirm("Are you sure");
   if(conf){
    const oldStudent = getDatals("students");
    const updateData = oldStudent.filter((data) => data.roll != roll );
    sendDatals("students", updateData);
    getStudents();
   }else{
    alert("Your data safe");
   }

 
};




// form submit data
student_create_form.onsubmit = (e) => {
    e.preventDefault();

    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data.entries());

    // validation 
    if(!data.name || !data.roll || !data.reg){
        msg.innerHTML = createAlert("All fields are required");
    }else if(!isRoll(data.roll)){
      msg.innerHTML = createAlert("Invaild roll number", "info");
      
    }else if(!isReg(data.reg)){
      msg.innerHTML = createAlert("Invaild reg  number" , "warning");     
    }else{

     const oldStudents = getDatals("students");

      //roll  number check 
       if(oldStudents.some((item) => item.roll === data.roll)){
         msg.innerHTML = createAlert("Roll number already exists", "info");
        return;
       };

      // reg  number check 
       if(oldStudents.some((item) => item.reg === data.reg)){
         msg.innerHTML = createAlert("Reg number already exists", "warning");
       return;
      };


      oldStudents.push({
      ...data,
      result : null,
      CreateAt : Date.now(),
      id : getRandomUniqueID(26),
     });


      sendDatals("students", oldStudents);

      e.target.reset();
      msg.innerHTML = createAlert(` <b>${data.name}</b>created success`, "success");

      getStudents();
    }


};

















